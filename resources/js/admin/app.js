import Vue from 'vue'
import router from './router'

import App from './App.vue'
import store from './store'

import BootstrapVue from 'bootstrap-vue'

// Custom components
import BaseLayoutModifier from './components/BaseLayoutModifier'
import BaseBlock from './components/BaseBlock'
import BaseBackground from './components/BaseBackground'
import BasePageHeading from './components/BasePageHeading'
import BaseNavigation from './components/BaseNavigation'

// Custom directives
import clickRipple from './directives/clickRipple'
import toggleClass from './directives/toggleClass'

// Set Vue globally
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

// Register global plugins
Vue.use(BootstrapVue)

// Register global components
Vue.component(BaseLayoutModifier.name, BaseLayoutModifier)
Vue.component(BaseBlock.name, BaseBlock)
Vue.component(BaseBackground.name, BaseBackground)
Vue.component(BasePageHeading.name, BasePageHeading)
Vue.component(BaseNavigation.name, BaseNavigation)

// Register global directives
Vue.directive('click-ripple', clickRipple)
Vue.directive('toggle-class', toggleClass)

// Disable tip shown in dev console when in development mode
Vue.config.productionTip = false

import Notifications from 'vue-notification'
Vue.use(Notifications)

import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

import Vuelidate from "vuelidate";
Vue.use(Vuelidate)

import moment from "moment";
window.moment = moment;
moment.locale('tr');

const urlify = require('urlify').create({
    addEToUmlauts:false,
    szToSs:true,
    spaces:"-",
    nonPrintable:"-",
    trim:true,
    toLower: true
});
window.urlify = urlify;

import { RichTextEditorPlugin } from '@syncfusion/ej2-vue-richtexteditor';

Vue.use(RichTextEditorPlugin);

Vue.mixin({
    watch: {
        '$route.path'(val) {
            if(val === '/admin/login') {
                location.pathname = '/admin/login';
            }
        }
    },
    methods: {
        makeFormData(obj, rootName, ignoreList, formData) {
            formData = formData || new FormData();

            let appendFormData = (data, root) => {
                if (!ignore(root)) {
                    root = root || '';
                    if (data instanceof File) {
                        formData.append(root, data);
                    } else if (Array.isArray(data)) {
                        for (let i = 0; i < data.length; i++) {
                            appendFormData(data[i], root + '[' + i + ']');
                        }
                    } else if (typeof data === 'object' && data) {
                        for (let key in data) {
                            if (data.hasOwnProperty(key)) {
                                if (root === '') {
                                    appendFormData(data[key], key);
                                } else {
                                    appendFormData(data[key], root + '[' + key + ']');
                                }
                            }
                        }
                    } else {
                        if (data !== null && typeof data !== 'undefined') {
                            if (typeof data === 'boolean' ) data = data?1:0;
                            formData.append(root, data);
                        }
                    }
                }
            }

            function ignore(root){
                return Array.isArray(ignoreList)
                    && ignoreList.some(function(x) { return x === root; });
            }

            appendFormData(obj, rootName);

            return formData;
        },
    },
    data() {
        return {
            request : {
                get: (url, config) => {
                    config = config || {};

                    config.source = axios.CancelToken.source();

                    config.cancelToken = config.source.token;

                    return axios.get(url, config).then((res) => {
                        if (res.data && res.data.notify) {
                            this.$notify({
                                group: 'foo',
                                type: res.data.notify.type || "success",
                                title: res.data.notify.title||"",
                                text: res.data.notify.message,
                            });
                        }
                        return res;
                    }).catch((error) => {
                        if(error.response.status === 401) {
                            window.location.reload();
                        }
                        if (axios.isCancel(error)) {
                            throw error;
                        }
                        let message = error.response.data ? error.response.data.message : error;

                        this.$notify({
                            group: 'foo',
                            type: error.response.data.notify.type || "danger",
                            title: error.response.data.notify.title||"",
                            text: error.response.data.notify.message,
                        })

                        throw error;
                    });
                },
                post: (url, data, config) => {
                    config = config || {};

                    config.source = axios.CancelToken.source();

                    config.cancelToken = config.source.token;
                    return axios.post(url, data, config).then((res) => {
                        if (res.data && res.data.notify) {
                            this.$notify({
                                group: 'foo',
                                type: res.data.notify.type || "success",
                                title: res.data.notify.title||"",
                                text: res.data.notify.message,
                            })
                        }
                        return res;
                    }, (error) => {
                        if(error.response.status === 401) {
                            window.location.reload();
                        }

                        if (axios.isCancel(error)) {
                            throw error;
                        }

                        let message = error.response.data ? error.response.data.message : error;

                        if (error.response.data && error.response.data.errors) {

                            message = Object.values(error.response.data.errors)
                                .map(function(error){
                                    return error.map((v) => {
                                        return v;
                                    }).join(", ");
                                }).join(", ");
                        }

                        this.$notify({
                            group: 'foo',
                            type: error.response.data.notify.type || "danger",
                            title: error.response.data.notify.title||"",
                            text: error.response.data.notify.message,
                        })

                        throw error;
                    });
                },
                delete: (url, config) => {
                    return axios.delete(url, config).then((res) => {
                        if (res.data && res.data.notify) {
                            this.$notify({
                                group: 'foo',
                                type: res.data.notify.type || "success",
                                title: res.data.notify.title||"",
                                text: res.data.notify.message,
                            })
                        }
                        return res;
                    }, (error) => {
                        if(error.response.status === 401) {
                            window.location.reload();
                        }

                        let message = error.response.data ? error.response.data.message : error;

                        if (error.response.data && error.response.data.errors) {

                            message = Object.values(error.response.data.errors)
                                .map(function(error){
                                    return error.map((v) => {
                                        return v;
                                    }).join(", ");
                                }).join(", ");
                        }

                        this.$notify({
                            group: 'foo',
                            type: error.response.data.notify.type || "success",
                            title: error.response.data.notify.title||"",
                            text: error.response.data.notify.message,
                        })

                        throw error;
                    });
                },
            }
        }
    },
})


// Craft new application
new Vue({
    store,
    router,
    render: h => h(App),
    mounted() {
        if (window.redirectToPage) {
            router.push(window.redirectToPage);
        }
    }
}).$mount('#app')
