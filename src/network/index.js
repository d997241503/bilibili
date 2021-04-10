import axios from 'axios'
import router from '../router'
import Vue from 'vue'

const http = axios.create({
  baseURL:'http://112.74.99.5:3000/web/api',
  timeout:5000
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  if(localStorage.getItem('id')&&localStorage.getItem('token')){
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  if(error.response.status == 401 || error.response.status == 402){
    router.push('/login');
    Vue.prototype.$toast(error.response.data.message)
  }
  return Promise.reject(error);
});

export default http