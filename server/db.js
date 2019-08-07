const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/myBlog", err => {
    if (err) {
        console.log("数据库连接失败");
    } else {
        console.log("数据库连接成功");
    }
});


const User = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
});

const articleSchema = new mongoose.Schema({
    title: String,
    time: Date,
    updateTime: Date,
    abstract: String,
    tags: String,
    content: String, // 转换过后的html
    contentMD: String // markdown
});

const db = {
    userInfo: mongoose.model("userInfo", User),
    articleInfo: mongoose.model("articleInfo", articleSchema),
};

module.exports = db;
