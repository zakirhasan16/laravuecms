import axios from 'axios'

const domain = ""

require('promise.prototype.finally').shim();

let instance = axios.create({
    domain,
    // You can add your headers here
    baseURL: window.location.origin,
})

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

export default instance
