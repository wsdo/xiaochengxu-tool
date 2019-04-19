//用来快速初始化页面，复制这个文件改名字即可
//获取应用实例
const app = getApp()
import api from '../../service/api'
import ArticleModel from '../../models/ArticleModel'
import { getList } from '../../models/Article'
// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onShareAppMessage: function (res) {
//     // if (res.from === 'button') {
//     //   // 来自页面内转发按钮
//     //   console.log(res.target)
//     // }
//     // return {
//     //   title: '自定义转发标题',
//     //   path: '/page/user?id=123'
//     // }
//     wx.showShareMenu({
//       withShareTicket: true,
//       success(res) {
//         console.log('success :', res);
//       },
//       fail(res) {
//         console.log('fail :', res);
//       },
//       complete(res) {
//         console.log('complete :', res);
//       }
//     })
//   },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse){
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   data: {
//     current: 'tab1',
//     current_scroll: 'tab1'
//   }
// })
