import axios from '../axios';
import Types from '../../../types/index';

// 新增文章
const addArticle = (params: Types.ArticleData) => {
    return axios.post(`article/addArticle`, params);
};

// 删除文章
const deleteArticle = (params: { articleId: string | number,classId: string | number }) => {
    return axios.post(`article/deleteArticle`, params);
};


// 获取分类所有文章
const getArticle = (params:{id: number}): object => {
    return axios.post(`article/getArticle`,params);
};

// 获取指定文章详情
const getArticleDetails = (params: {id: any}) => {
    return axios.post(`article/details`,params);
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
    getArticleDetails,
};

