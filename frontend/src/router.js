import { createRouter, createWebHistory } from 'vue-router';
import Homepage from './views/HomePage.vue';

const routes = [
    {
        path: '/',
        name: 'Homepage',
        component: Homepage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;


