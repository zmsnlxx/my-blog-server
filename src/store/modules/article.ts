import * as Mutation from '../mutations';

const state = {
    articleData: [],
    choiceIndex: 0,
};
const mutations = {
    [Mutation.GET_ARTICLE_INFO]: (state: any, article: any) => {
        state.articleData = article;
    },
    [Mutation.CHANGE_ARTICLE_INDEX]: (state: any, index: number) => {
        state.choiceIndex = index;
    },
};

const actions = {
    getArticleInfo: ({commit}: any, article: any) => {
        commit(Mutation.GET_ARTICLE_INFO, article);
    },
    changeArticleIndex: ({commit}: any, index: number) => {
        commit(Mutation.CHANGE_ARTICLE_INDEX, index);
    },
};


export default {
    state,
    mutations,
    actions,
};
