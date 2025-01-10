import axios from 'axios';
// import { disconnect } from "@wagmi/core";
import { MessagePlugin } from 'tdesign-react';

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: '/api',
  timeout: 60000, // 请求超时时间
})

// 异常拦截处理器
function errorHandler(error) {
  if (error.response) {
    const { data = {}, status, statusText } = error.response
    // 403 无权限
    if (status === 403) {
      // showNotify({
      //   type: 'danger',
      //   message: (data && data.message) || statusText,
      // })
    }
    // 401 未登录/未授权
    if (status === 401 && data.result && data.result.isLogin) {
      // showNotify({
      //   type: 'danger',
      //   message: 'Authorization verification failed',
      // })
      // 如果你需要直接跳转登录页面
      // location.replace(loginRoutePath)
    }
  }
  return Promise.reject(error)
}

// 请求拦截器
function requestHandler(config) {
  const savedToken = localStorage.getItem('access_token');
  // 如果 token 存在
  // 让每个请求携带自定义 token, 请根据实际情况修改
  if (savedToken) {
    // config.headers['Authorization'] = `Bearer ${savedToken}`
    config.headers['clientId'] = '48688a98fd39bc5133036266b274db1c'
  }

  config.headers['Authorization'] = 'uAAthIuq2JH448NZgLxYvMLbMwW5Wq'
  return config
}

// Add a request interceptor
request.interceptors.request.use(requestHandler, errorHandler)

// 响应拦截器
function responseHandler(response) {
  const res = response.data
  const code = res.code
  if (code === 401) {
    localStorage.removeItem('access_token')

    return Promise.reject(new Error('请重新登录'))
  }
  else if (code !== 200 && response.status != 200) {
    // console.log('res',res)
    MessagePlugin.error(res.msg || 'unknown error', 5000);
    return res;
    // return Promise.reject(new Error(res.message))
  }
  return response.data
}

// Add a response interceptor
request.interceptors.response.use(responseHandler, errorHandler)

export default request