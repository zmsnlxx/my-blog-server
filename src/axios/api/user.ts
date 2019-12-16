import axios from '../axios';
import * as Types from '../../../types/index';

// 登录接口
const login = (params: Types.UserItem): object => {
    return axios.post(`user/login`, params);
};

const getUserInfo = (params: any): object => {
    return axios.get('user/info', {params});
};

const register = (params: any):object => {
    return axios.post(`user/register`, params)
};

const user = {
    login,
    getUserInfo,
    register
};
export default user;
