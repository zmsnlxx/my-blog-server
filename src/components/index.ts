import CardNav from './card.vue';
import LabelNav from './label.vue';
import ListNav from './list.vue';
import SmallLabel from './Small-label.vue';
import CommentNav from './comment.vue';
import MarkDown from './MarkDown/index.vue';

export default {
    install(Vue: any) {
        Vue.component('CardNav', CardNav);
        Vue.component('LabelNav', LabelNav);
        Vue.component('ListNav', ListNav);
        Vue.component('SmallLabel', SmallLabel);
        Vue.component('CommentNav', CommentNav);
        Vue.component('MarkDown', MarkDown);
    },
};

