import user from './user';
import article from './article';
import articleClass from './articleClass'
import articleTags from './articleTags'


const apiList = {
    // 分模块
    ...user,
    ...article,
    ...articleClass,
    ...articleTags
};
export default apiList;
