import user from './user';
import article from './article';


const apiList = {
    // 分模块
    ...user,
    ...article,
};
export default apiList;
