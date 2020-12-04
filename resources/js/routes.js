import VueRouter from 'vue-router';
import BookAbles from './pages/Bookables';
import BookAble from './pages/Bookable';
import Review from "./pages/Review";

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
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
