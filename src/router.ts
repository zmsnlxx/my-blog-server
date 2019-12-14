import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
export default new Router({
    base: '/server',
    routes: [
        {path: '/', component: () => import('./views/index.vue')},
        {
            path: '/home',
            name: 'home',
            redirect: {name: 'article@index'},
            component: () => import('./views/home/index.vue'),
            children: [
                {path: 'index', name: 'article@index', component: () => import('./views/home/article/index.vue')},
                {path: 'addClass', name: 'class@index', component: () => import('./views/home/articleClass/index.vue')},
                {path: 'editRecord', name: 'editRecord', component: () => import('./views/home/editRecord/index.vue')},
                {
                    path: 'dataSummary',
                    name: 'dataSummary',
                    component: () => import('./views/home/dataSummary/index.vue')
                },
                {
                    path: 'addArticle',
                    name: 'article@add',
                    component: () => import('./views/home/article/addArticle.vue')
                },
                {path: 'tags', name: 'article@tags', component: () => import('./views/home/tags/index.vue')},
                {
                    path: 'articleDetails',
                    name: 'article@details',
                    component: () => import('./views/home/article/articleDetails.vue')
                },
            ],
        },
        {path: '/login', component: () => import('./views/other/login.vue')},
    ],
});
