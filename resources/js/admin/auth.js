import bearer from '@websanova/vue-auth/drivers/auth/bearer'
import axios from '@websanova/vue-auth/drivers/http/axios.1.x'
import router from '@websanova/vue-auth/drivers/router/vue-router.2.x'

const authConfig = {
    auth: bearer,
    http: axios,
    router: router,
    tokenDefaultKey: 'admin_token',
    tokenStore: ['localStorage','cookie'],

    logoutData: {
        url: 'auth/logout',
        method: 'POST',
        redirect: '/admin/login',
        makeRequest: true
    },
    fetchData: {
        url: 'auth/user',
        method: 'GET',
        enabled: true
    },
    refreshData: {
        url: 'auth/refresh',
        method: 'POST',
        enabled: false,
        interval: 36
    }
}
export default authConfig
