//index.js
//获取应用实例
const app = getApp()
const avatarUrl1 = "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLYO1ARAeXTx71ibwtQaFkDe3iblRGMMdbBvdRjbd8QwezTPVV4uPjMTzyibwaRMh9qsZricsnCt6o2Qg/132"
const imagePath = '../../static/image/common/'
import api, { login } from '../../service/api'
// import QuestionModel from '../../models/QuestionModel'

Page({
  data: {
    motto: 'Hello World',
    hidden: true,
    report: true,
    userInfo: {},
    hasUserInfo: false,
    code: '请点击按钮获取code',
    token: '请点击获取code按钮获取toen',
    avatarUrl: 'http://file.shudong.wang/logo.jpeg',
    imageURL: 'http://file.shudong.wang/logo.jpeg',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLaunch: function () {
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShareAppMessage: function (res) {
    // if (res.from === 'button') {
    //   // 来自页面内转发按钮
    //   console.log(res.target)
    // }
    // return {
    //   title: '自定义转发标题',
    //   path: '/page/user?id=123'
    // }
    wx.showShareMenu({
      withShareTicket: true,
      success(res) {
        console.log('success :', res);
      },
      fail(res) {
        console.log('fail :', res);
      },
      complete(res) {
        console.log('complete :', res);
      }
    })
  },
  login: function () {
    let that = this
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log('这是你需要的code： ', res.code)
          that.setData({ code: res.code })
          //发起网络请求
          // login().then(res => {
          //   that.setData({ token: res })
          // })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  testLogin: function () {
    let that = this
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log('这是你需要的code： ', res.code)
          that.setData({ code: res.code })
          //发起网络请求
          login().then(res => {
            that.setData({ token: res })
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  onLoad: function () {

  },
  updateUser() {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.showLoading({
            title: '正在更新用户信息...'
          })
          wx.getUserInfo({
            success: function (data) {
              // 把用户信息存储到本地，方便之后分享图片使用
              wx.setStorageSync('userInfo', data.userInfo)
              let params = { rawData: data.rawData, signature: data.signature }
              console.log('rawData',data.rawData)
              console.log('signature',data.signature)

              // api.post('/saveUserInfo', params)
              //   .then(res => {
              //     console.log(res)
              //     wx.hideLoading()
              //     wx.showToast({
              //       title: '用户信息已经更新，请去控制台查看！',
              //       icon: 'none',
              //       duration: 2000,
              //       mask: false,
              //     });
              //   })
              //   .catch(res => {
              //     console.log(res)
              //   })
            }
          })
        }
      }
    })
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    let userInfo = e.detail.userInfo
    console.log('userInfo', userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  formSubmit: function(e) {
    console.log('formSubmit', e.detail.formId)
  },
  saveFormId: function(e) {
    console.log('saveFormId', e.detail.formId)
  },
  formSubmit1: function(e) {
    console.log('formSubmit1', e.detail.formId)
  },
  formReset: function() {
    console.log('form发生了reset事件')
  },

  inputAccount: function (v) {
    this.data.account = v.detail.value
  },
  inputPsw: function (v) {
    this.data.password = v.detail.value
  },
  authorize: function () {
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord()
            }
          })
        }
      }
    })
  }
})
