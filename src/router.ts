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
        {path: '/home', name: 'home', component: () => import('./views/home/index.vue')},
        {path: '/login', component: login},
        {path: '/edit', component: edit},
    ],
});
