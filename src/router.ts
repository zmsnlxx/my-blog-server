import Vue from 'vue';
import Router from 'vue-router';
import entrance from './views/index.vue';
import login from './views/other/login.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/', component: entrance, redirect: {name: 'home'}, children: [
                {path: '/home', name: 'home', component: () => import('./views/home/index.vue')},
            ],
        },
        {path: '/login', component: login},
    ],
});
