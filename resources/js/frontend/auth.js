import bearer from '@websanova/vue-auth/drivers/auth/bearer'
import axios from '@websanova/vue-auth/drivers/http/axios.1.x'
import router from '@websanova/vue-auth/drivers/router/vue-router.2.x'

const authConfig = {
    auth: bearer,
    http: axios,
    router: router,
    tokenDefaultKey: 'admin_token',
    tokenStore: ['localStorage','cookie'],
    rolesKey: 'role',

    authRedirect: {name: 'login'},

    loginData: {
        url: 'auth/login',
        method: 'POST',
        redirect: '/admin',
        fetchUser: false
    },
    fetchData: {
        url: 'auth/user',
        method: 'GET',
        enabled: false
    },
    refreshData: {
        url: 'auth/refresh',
        method: 'POST',
        enabled: false,
        interval: 30
    }
}
export default authConfig
