import * as Mutation from '../mutations';

const state = {
    articleData: undefined,
    currentArticle: undefined,
};
const mutations = {
    [Mutation.GET_ARTICLE_INFO]: (state: any, article: any) => {
        state.articleData = article;
    },
    [Mutation.CHANGE_CURRENT_ARTICLE]: (state: any, article: number) => {
        state.currentArticle = article;
    },
};

const actions = {
    getArticleInfo: ({commit}: any, article: any) => {
        commit(Mutation.GET_ARTICLE_INFO, article);
    },
    changeCurrentArticle: ({commit}: any, article: any) => {
        commit(Mutation.CHANGE_CURRENT_ARTICLE, article);
    },
};


export default {
    state,
    mutations,
    actions,
};
