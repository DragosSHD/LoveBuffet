import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import Favourites from "../views/Favourites.vue";
import History from "../views/History.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Preferences from "../views/Preferences.vue";
import Recommendation from "../views/Recommendation.vue";
import Account from "../views/Account.vue";


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/preferences',
        name: 'Preferences',
        component: Preferences
    },
    {
        path: '/favourites',
        name: 'Favourites',
        component: Favourites
    },
    {
        path: '/history',
        name: 'History',
        component: History
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/recommendation',
        name: 'Recommendation',
        component: Recommendation
    },
    {
        path: '/account',
        name: 'Account',
        component: Account
    }
];

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

