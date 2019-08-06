// 评论接口
const express = require("express");
const router = express.Router();
const db = require("../db");
const util = require('../util');
const _ = require('lodash');


// 文章新增
router.post('/api/article/addArticle', (req, res) => {
    const newArticle = new db.articleInfo({
        id: util.setRandomId(),
        author: req.body.author,
        title: req.body.title,
        time: req.body.time,
        tags: req.body.tags,
        content: req.body.content, // 转换过后的html
        contentMD: req.body.contentMD // markdown
    });
    newArticle.save((err) => {
        if (!err) {
            res.send({
                code: 0,
                data: {
                    message: "创建文章成功!"
                }
            })
        } else {
            res.send({
                code: 1,
                data: {
                    message: "创建文章失败!"
                },
            })
        }
    })
});

// 获取所有文章
router.get('/api/article/getArticle', async (req,res) => {
    const articleArr = await util.getArticle();
    if(_.isEmpty(articleArr)){
        res.send({
            code: 1,
            data: {
                message: "暂无文章"
            }
        })
    }else{
        res.send({
            code: 1,
            data: articleArr
        })
    }
});

// 删除文章
router.post('/api/article/deleteArticle',async (req, res) => {
    const data = await db.articleInfo.deleteOne({_id: req.body._id});
    if(data.ok === 1){
        res.send({
            code: 0,
            data: {
                message: '删除成功!'
            }
        })
    }else{
        res.send({
            code: 1,
            data: {
                message: '删除失败!'
            }
        })
    }
});

function updateArticle(req) {
    return db.articleInfo.update({
        _id: req.body._id
    }, {
        $set: {
            title: req.body.title,
            updateTime: req.body.updateTime,
            content: req.body.content,
            contentMD: req.body.contentMD,
        }
    })
}

// 更新文章
router.post('/api/article/updateArticle',async (req,res) => {
    await updateArticle(req).then(req => {
        if(req.ok === 1){
            res.send({
                code: 0,
                data: {
                    message: '发布成功!'
                }
            })
        }else{
            res.send({
                code: 1,
                data: {
                    message: '发布失败!'
                }
            })
        }
    })
});


module.exports = router;
