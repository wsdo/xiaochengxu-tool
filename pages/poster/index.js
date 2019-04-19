// pages/test/index.js

// import { cutterInit, drawImage } from '../../utils/index'
// import PosterModel from '../../models/PosterModel'
import { cutterInit, drawText, drawImage, drawAvatar, logError, downLoadImg, handleName, promiseImage } from '../../utils/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseImage: 'https://n1audio.hjfile.cn/ebase/2018/10/29/effc11e534eafc52f16b22597a7df12e.png',
    avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJAgGYpnZGfZY8Oh7BPEtmHR1DMYKMwvtoDLH80h1N8Cm2DJMeI5pGXlGN1CbDyhvzSUSYZPABGkA/132',
    posterHeight: 534
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // PosterModel.init()
    // cutterInit()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // drawImage()
    // PosterModel.init().then(res => {
    //   console.log(res)
    // })
    this.poster()
  },
  poster() {
    let tempBg = downLoadImg(this.data.baseImage)
    let tempAvatarUrl = downLoadImg(this.data.avatar)
    // let nickName = handleName(result.nickName)
    const that = this
    Promise.all([
      tempBg, tempAvatarUrl
    ]).then(res => {
      console.log(res)
      const ctx = wx.createCanvasContext('poster')
      // 底图背景
      // 用户头像
      drawImage(ctx, res[0], 0, 0)
      drawAvatar(ctx, res[1])
      drawText(ctx, 'starkwang', 22, 30, 30)
      // ctx.save()
      // 用户昵称
      // // 神经病指数
      // that.drawText(ctx, result.accuracy, 30, 40, 384, '#EF4545')
      ctx.draw(true, function () {
        // logError('resultthen', '图片绘制完成', res)
        // that.generateTempImage()
      })
      wx.hideLoading()
    }).catch(res => {
      wx.hideLoading()
      // logError('result-catch', '图片加载抛出异常', res)
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})