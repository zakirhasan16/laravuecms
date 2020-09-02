import Vue from 'vue'
import Router from 'vue-router'

import LayoutBackend from './layouts/variations/BackendStarter.vue'
import Dashboard from "./views/Dashboard";

Vue.use(Router)

export default new Router({
    linkActiveClass: 'active',
    linkExactActiveClass: '',
    mode: 'history',
    scrollBehavior() {
        return {x: 0, y: 0}
    },
    routes: [
        {
            path: '/admin',
            redirect: '/admin/dashboard',
            component: LayoutBackend,
            meta: {
                auth: true,
                roles: 'admin'
            },
            children: [
                {
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: Dashboard
                },
                {
                    path: 'change-password',
                    name: 'ChangePassword',
                    component: require(/* webpackChunkName: "ChangePassword" */ './views/ChangePassword').default
                },
                {
                    path: 'blog-category',
                    component: require(/* webpackChunkName: "BlogCategory" */ './views/modules/BlogCategory').default,
                    children: [
                        {
                            path: '',
                            name: 'blog-category-index',
                            component: require(/* webpackChunkName: "BlogCategory" */ './views/modules/BlogCategory/List').default
                        },
                        {
                            path: 'create',
                            name: 'blog-category-create',
                            component: require(/* webpackChunkName: "BlogCategory" */ './views/modules/BlogCategory/Create').default
                        },
                        {
                            path: ':id/edit',
                            name: 'blog-category-edit',
                            component: require(/* webpackChunkName: "BlogCategory" */ './views/modules/BlogCategory/Edit').default
                        }
                    ]
                },
                {
                    path: 'blog',
                    component: require(/* webpackChunkName: "Blog" */ './views/modules/Blog').default,
                    children: [
                        {
                            path: '',
                            name: 'blog-index',
                            component: require(/* webpackChunkName: "Blog" */ './views/modules/Blog/List').default
                        },
                        {
                            path: 'create',
                            name: 'blog-create',
                            component: require(/* webpackChunkName: "Blog" */ './views/modules/Blog/Create').default
                        },
                        {
                            path: ':id/edit',
                            name: 'blog-edit',
                            component: require(/* webpackChunkName: "Blog" */ './views/modules/Blog/Edit').default
                        }
                    ]
                },
            ]
        }
    ]
})
