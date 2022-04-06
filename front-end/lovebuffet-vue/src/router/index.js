import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import Favourites from "../views/Favourites.vue";
import History from "../views/Favourites.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Preferences from "../views/Preferences.vue";



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
];

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

