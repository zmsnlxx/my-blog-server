import Vue from 'vue';
import Router from 'vue-router';
import entrance from './views/index.vue';
import login from './views/other/login.vue';
import edit from './views/edit/index.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {path: '/', component: entrance},
        {
            path: '/home',
            name: 'home',
            redirect:{name: 'index'},
            component: () => import('./views/home/index.vue'),
            children:[
                {path:'index',name:'index',component: () => import('./views/home/article/index.vue')},
                {path:'addClass',name:'addClass',component: () => import('./views/home/articleClass/index.vue')},
                {path:'editRecord',name:'editRecord',component: () => import('./views/home/editRecord/index.vue')},
                {path:'dataSummary',name:'dataSummary',component: () => import('./views/home/dataSummary/index.vue')},
                {path:'addArticle',name:'addArticle',component: () => import('./views/home/article/addArticle.vue')},
            ],
        },
        {path: '/login', component: login},
        {path: '/edit', component: edit},
    ],
});
