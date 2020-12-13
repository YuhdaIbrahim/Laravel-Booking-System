import moment from "moment";

require('./bootstrap');
import router from './routes';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Index from './index';
import StarRating from "./components/StarRating";
import FatalError from "./components/FatalError";
import ValidationErrors from "./components/ValidationErrors";
import Success from "./components/Success";
import storeDefinition from './store';

window.Vue = require('vue');
Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store(storeDefinition)

Vue.filter("fromNow", value => moment(value).fromNow());
Vue.component("star-rating", StarRating);
Vue.component("fatal-error", FatalError);
Vue.component("validation-errors", ValidationErrors);
Vue.component("success", Success);

window.axios.interceptors.response.use(
    res => {
        return res;
    },
    err => {
        if(401 === err.status){
            store.dispatch('logout');
        }

        return Promise.reject(err);
    }
)


const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        "index": Index
    },
    async beforeCreate(){
        this.$store.dispatch('loadStoredState');
        this.$store.dispatch('loadUser');
        //
    }
});
