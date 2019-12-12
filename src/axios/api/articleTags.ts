import axios from '../axios';

// 新增文章标签
const addArticleTags = (params: {
    name: string,
    type:string
}) => {
    return axios.post(`tags/addArticleTags`, params);
};

// 删除文章标签
const deleteArticleTags = (params: { id: string }) => {
    return axios.post(`tags/deleteArticleTags`, params);
};


// 获取文章标签
const getArticleTags = (): object => {
    return axios.get(`tags/getArticleTags`);
};


export default {
    addArticleTags,
    deleteArticleTags,
    getArticleTags,
};

