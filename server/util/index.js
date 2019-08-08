const db = require("../db");
const trimHtml = require('trim-html');

// 自定义函数方法:
// cookie编码程序
function CodeCookie (str) {
    let strRtn = "";
    for (let i = str.length - 1; i >= 0; i--) {
        strRtn += str.charCodeAt(i);
        if (i) strRtn += "a" //用a作分隔符
    }
    return strRtn
}

function setRandomId() {
    return Date.now() + "" + Math.floor(Math.random() * 10000);
}

function getArticle(){
    return db.articleInfo.find()
}

function getTrimHtml(html){
    return trimHtml(html);
}

module.exports = {
    CodeCookie,
    setRandomId,
    getArticle,
    getTrimHtml,
};
