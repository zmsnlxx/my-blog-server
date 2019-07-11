import Vue from 'vue';
import App from './App.vue';
import Element from 'element-ui';
import router from './router';
import store from './store';
import util from './util';
import axios from './axios';
import Components from './components/index';
import * as jsCookie from 'js-cookie';

const whiteList: string[] = ['/login'];
router.beforeEach((to, from, next) => {
    const userInfo = jsCookie.get('email');
    if (whiteList.indexOf(to.path) < 0) {
        if (userInfo) {
            next();
        } else {
            if (to.path === '/login') {
                next();
            } else {
                next('/login');
            }
        }
    } else {
        next();
    }
});

Vue.config.productionTip = false;

Vue.use(Element, {size: 'small'});
Vue.prototype.$util = util;
Vue.use(axios);
// 注册全局组件
Vue.use(Components);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
