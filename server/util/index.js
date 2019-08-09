const db = require("../db");
const trimHtml = require('trim-html');

// 自定义函数方法:
// cookie编码程序
function CodeCookie(str) {
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

function getArticle() {
    return db.articleInfo.find()
}

/**
 * 过滤字符串函数
 **/
function filterStr(str) {
    const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]");
    let specialStr = "";
    for (let i = 0; i < str.length; i++) {
        specialStr += str.substr(i, 1).replace(pattern, '');
    }
    return specialStr;
}


// 文章摘要提取
function getTrimHtml(html) {
    return trimHtml(html);
}


// 文章图片提取
function getArticleImage(html) {
    // 如果有图片
    const starIndex = html.indexOf('![image]');
    const lastIndex = html.indexOf('#width-full');
    if (starIndex !== -1) return html.slice(starIndex + 9, lastIndex);
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd1mkbtzu7y0iw_fm9RnuWjP3R_CccH2jr6sOS_BjyNYv0oFBU';
}

module.exports = {
    CodeCookie,
    setRandomId,
    getArticle,
    getTrimHtml,
    getArticleImage,
    filterStr,
};
