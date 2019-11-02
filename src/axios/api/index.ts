import user from './user';
import article from './article';
import articleClass from './articleClass'


const apiList = {
    // 分模块
    ...user,
    ...article,
    ...articleClass,
};
export default apiList;
