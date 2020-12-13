import VueRouter from 'vue-router';
import BookAbles from './pages/Bookables';
import BookAble from './pages/Bookable';
import Review from "./pages/Review";
import Checkout from "./pages/Checkout";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Account from "./pages/Account";

const routes = [
    {
        path: '/',
        component: BookAbles,
        name: 'home'
    },
    {
        path: '/bookable/:id',
        component: BookAble,
        name: 'bookable'
    },
    {
        path: '/review/:id',
        component: Review,
        name: 'review'
    },
    {
        path: '/checkout',
        component: Checkout,
        name: 'checkout'
    },
    {
        path: '/login',
        component: Login,
        name: 'login'
    },
    {
        path: '/register',
        component: Register,
        name: 'register'
    },
    {
        path: '/account',
        component: Account,
        name: 'account'
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
