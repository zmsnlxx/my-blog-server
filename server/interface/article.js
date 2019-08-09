// 评论接口
const express = require("express");
const router = express.Router();
const db = require("../db");
const util = require('../util');
const _ = require('lodash');
const moment = require('moment');


// 文章新增
router.post('/api/article/addArticle', (req, res) => {
    const abstract = util.getTrimHtml(req.body.contentMD).html;
    const newArticle = new db.articleInfo({
        id: util.setRandomId(),
        title: req.body.title,
        time: moment().format("YYYY-MM-DD"),
        tags: req.body.tags,
        content: req.body.content, // 转换过后的html
        contentMD: req.body.contentMD, // markdown
        abstract: abstract.replace(/[&\|\\\*^%$#@\-]/g, ""), // 文章摘要
        titleImg: util.getArticleImage(req.body.contentMD), // 文章图片显示
    });
    newArticle.save().then(async (req) => {
        const data = await db.articleInfo.find();
        if (!_.isEmpty(req)) {
            res.send({
                code: 0,
                data: {
                    message: "创建文章成功!",
                    data,
                }
            })
        } else {
            res.send({
                code: 1,
                data: {
                    message: "创建文章失败!",
                    data: []
                },
            })
        }
    })
});

// 获取所有文章
router.get('/api/article/getArticle', async (req, res) => {
    const articleArr = await util.getArticle();
    if (_.isEmpty(articleArr)) {
        res.send({
            code: 1,
            data: [],
        })
    } else {
        res.send({
            code: 0,
            data: articleArr
        })
    }
});

// 删除文章
router.post('/api/article/deleteArticle', async (req, res) => {
    const data = await db.articleInfo.deleteOne({_id: req.body._id});
    if (data.ok === 1) {
        const arr = await db.articleInfo.find();
        console.log(arr);
        res.send({
            code: 0,
            data: {
                message: '删除成功!',
                data: arr
            }
        })
    } else {
        res.send({
            code: 1,
            data: {
                message: '删除失败!'
            }
        })
    }
});

const updateArticle = async (req) => {
    const {_id, title, updateTime, content, contentMD, tags, on} = req.body;
    const abstract = util.getTrimHtml(contentMD).html;
    if (on) return await db.articleInfo.update({_id}, {
        $set: {
            title,
            updateTime,
            content,
            contentMD,
            titleImg: util.getArticleImage(contentMD),
            abstract: abstract.replace(/[&\|\\\*^%$#@\-]/g, ""),
        }
    });
    return await db.articleInfo.update({_id}, {$set: {tags}})
};

// 更新文章（更新内容包含文章标题/更新时间/更新内容/文章图片/文章摘要）
router.post('/api/article/updateArticle', async (req, res) => {
    console.log(util.getTrimHtml(req.body.contentMD));
    await updateArticle(req).then(async req => {
        if (req.ok === 1) {
            const data = await db.articleInfo.find();
            res.send({
                code: 0,
                data,
            })
        } else {
            res.send({
                code: 1,
                data,
            })
        }
    })
});


module.exports = router;
