import axios from '../axios';

// 新增文章分类
const addArticleClass = (params: {
    name: string,
    desc:string
}) => {
    return axios.post(`class/addArticleClass`, params);
};

// 删除文章
const deleteArticleClass = (params: { id: string }) => {
    return axios.post(`class/deleteArticleClass`, params);
};


// 获取文章
const getArticleClass = (): object => {
    return axios.get(`class/getArticleClass`);
};

// 更新文章
const updateArticleClass = (params: {
    id: string | number,
    name: string;
    desc: string;
}) => {
    return axios.post(`class/updateArticleClass`, params);
};


export default {
    addArticleClass,
    getArticleClass,
    deleteArticleClass,
    updateArticleClass,
};

