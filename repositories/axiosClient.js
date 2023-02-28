import axios from 'axios';

const $axios = axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
        Accept: 'application/json',
    }
})

$axios.interceptors.request.use(function(config) {
    if (localStorage.getItem('auth._token.local')) {
        config.headers.Authorization = localStorage.getItem('auth._token.local');
    }
    return config;
})

export default $axios;