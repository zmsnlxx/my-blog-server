import axios from '../axios';

// 新增文章
const addArticle = (params: {
    author: string;
    title: string;
    time: string;
    tags: string;
    content: string;
    contentMD: string;
}) => {
    return axios.post(`article/addArticle`, params);
};

// 删除文章
const deleteArticle = (params: { _id: string }) => {
    return axios.post(`article/deleteArticle`, params);
};


// 获取文章
const getArticle = (): object => {
    return axios.get(`article/getArticle`);
};

// 更新文章
const updateArticle = (params: {
    _id: string,
    title: string;
    updateTime: string;
    content: string;
    contentMD: string;
    titleImg: string;
    abstract: string;
    tabs: string;
}) => {
    return axios.post(`article/updateArticle`, params);
};


export default {
    addArticle,
    getArticle,
    deleteArticle,
    updateArticle,
};

