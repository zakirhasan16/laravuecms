import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: require(/* webpackChunkName: "Home"*/ './views/Home').default
        },
        {
            path: '/admin/login',
            name: 'login',
            meta: {
                auth: false
            },
            component: require(/* webpackChunkName: "Home"*/ './views/Login').default
        },
        {
            path: '/admin',
            meta: {
                auth: true,
                roles: 'admin'
            },
            component: require(/* webpackChunkName: "adminAuth" */ './views/Control.vue').default,
        },
        {
            path: '*',
            meta: {
                auth: true,
                roles: 'admin'
            },
            component: require(/* webpackChunkName: "adminAuth" */ './views/Control.vue').default,
        },
    ]
})
