import moment from "moment";

require('./bootstrap');
import router from './routes';
import VueRouter from 'vue-router';
import Index from './index';
import StarRating from "./components/StarRating";
import FatalError from "./components/FatalError";

window.Vue = require('vue');
Vue.use(VueRouter);

Vue.filter("fromNow", value => moment(value).fromNow());
Vue.component("star-rating", StarRating);
Vue.component("fatal-error", FatalError);


const app = new Vue({
    el: '#app',
    router,
    components: {
        "index": Index
    }
});
