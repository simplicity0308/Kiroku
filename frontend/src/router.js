import { createRouter, createWebHistory } from 'vue-router';
import Homepage from './views/HomePage.vue';
import LoginPage from './views/LoginPage.vue';
import { useUserStates } from './composables/useUserStates';

const routes = [
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: '/',
        name: 'Root',
        component: LoginPage
    },
    {
        path: '/home',
        name: 'HomePage',
        component: Homepage,
        meta: {
            requiresAuth: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

// nav guard to check for authentication
router.beforeEach((to, from, next) => {
    const { currentUser } = useUserStates();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    
    if (requiresAuth && !currentUser.value.isLoggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;

