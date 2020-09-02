import Vue from 'vue'
import router from './router'

import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

window.Vue = Vue;
Vue.router = router;

import axios from '../axios.js';
window.axios = axios;
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = '/api';

import VueAuth from '@websanova/vue-auth';
import auth from './auth';
Vue.use(VueAuth, auth);

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate);

import Notifications from 'vue-notification'
Vue.use(Notifications)

const app = new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
