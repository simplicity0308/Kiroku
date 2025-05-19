import { createRouter, createWebHistory } from 'vue-router';
import Homepage from './views/HomePage.vue';
import LoginPage from './views/LoginPage.vue';

const routes = [
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: '/',
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: '/home',
        name: 'HomePage',
        component: Homepage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;


