import { HTTP_STATUS, COMMON_STATUS, RESULT_STATUS } from '../const/status.js'
import config from '../config/index.js'
const isLoginLoading = false
export default {
  baseOptions(params, method = 'GET') {
    let { url, data } = params
    let token = wx.getStorageSync('token')
    if (!token) login()
    let contentType = 'application/x-www-form-urlencoded'
    contentType = params.contentType || contentType
    console.log('正在使用token', token)
    return new Promise((resolve, reject) => {
      const option = {
        isShowLoading: false,
        loadingText: '正在加载',
        url: config.apiRoot + url,
        data: data,
        method: method,
        header: { 'content-type': contentType, 'token': token },
        success(res) {
          // 签名失败 或 认证失败 重新执行登录事件，更新token
          if (res.data.status === RESULT_STATUS.SIGNATURE_FAILED || res.data.status === COMMON_STATUS.AUTH_FAILED) {
            login()
            wx.showToast({
              title: res.data.message,
              icon: 'loading',
              duration: 2000
            })
          } else if (res.data.status === COMMON_STATUS.PARAM_ERROR) {
            wx.showToast({
              title: '网络错误',
              icon: 'loading',
              duration: 2000
            })
            reject(res.data.message)
          } else if (!res.data) {
            reject('接口返回数据为空')
          } else if (res.data.status === RESULT_STATUS.SUCCESS) {
            resolve(res.data.data)
          } else {
            wx.showToast({
              title: '网络错误',
              icon: 'loading',
              duration: 2000
            })
            reject()
          }
        },
        error(e) {
          reject('网络出错')
        }
      }
      console.log(option)
      wx.request(option)
    })
  },
  get(url, data = '') {
    let option = { url, data }
    return this.baseOptions(option)
  },
  post: function (url, data, contentType) {
    let params = { url, data, contentType }
    return this.baseOptions(params, 'POST')
  }
}

export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: config.apiRoot + '/login',
            method: 'GET',
            data: { code: res.code },
            header: 'application/x-www-form-urlencoded',
            success: (res) => {
              console.log(res)
              if (res.statusCode === HTTP_STATUS.SUCCESS) {

                let data = res.data.data
                wx.setStorageSync('token', data.token)
                resolve(data.token)
              } else {
                // 登录失败 此处打点
                wx.showToast({
                  title: '网络错误',
                  icon: 'loading',
                  duration: 2000
                })
              }
            },
            fail: () => { }
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  })
}
