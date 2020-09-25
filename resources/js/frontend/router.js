import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
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
            path: '/',
            component: require(/* webpackChunkName: "Main"*/ './views/Main').default,
            children: [
                {
                    path: '',
                    component: require(/* webpackChunkName: "Home"*/ './views/Home').default,
                    name: 'Home'
                },
                {
                    path: 'c/:url',
                    component: require(/* webpackChunkName: "CategoryBlogs"*/ './views/CategoryBlogs').default,
                    name: 'CategoryBlogs'
                },
                {
                    path: 'b/:url',
                    component: require(/* webpackChunkName: "CategoryBlogs"*/ './views/BlogDetail').default,
                    name: 'BlogDetail'
                },
                {
                    path: 'search',
                    component: require(/* webpackChunkName: "CategoryBlogs"*/ './views/SearchResults').default,
                    name: 'SearchResults'
                }
            ]
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
