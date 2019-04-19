/* 生成海报 */

import { logError } from './error'
import { error, msg } from './log'
const that = this
let windowWidth, poster, widthOffset, heightOffset, posterHeight;

/**
 * 
 * @param {number} posterWidth 
 * @param {number} posterHeight 
 */
export const cutterInit = (posterWidth = 260, pHeight = 462) => {

  // 必须是在用户已经授权的情况下调用
  wx.getSystemInfo({
    success(res) {
      windowWidth = res.windowWidth;
      posterHeight = parseInt((windowWidth / posterWidth) * pHeight)
    }
  })
  posterHeight = pHeight
  widthOffset = parseInt(windowWidth / posterWidth)
  heightOffset = parseInt(posterHeight / posterHeight)
}

/**
 * 小程序canvas裁剪头像函数
 * @param {string} ctx  canvas
 * @param {string} img  图片
 * @param {number} x x坐标
 * @param {number} y y坐标
 * @param {number} r 半径
 */
export const drawAvatar = (ctx, img, x = 10, y = 10, r = 16, offset = 1) => {
  let imgDiameter = r * 2 + 2; //头像直径 让头像的裁剪尽量饱满
  // 响应X坐标
  let responsiveX = x * offset
  // 响应Y坐标
  let responsiveY = y * offset
  ctx.save()
  ctx.beginPath()
  // 画圆裁剪
  ctx.arc(responsiveX, responsiveY, r, 0, 2 * Math.PI)
  ctx.clip()
  // ctx.fill()
  // 画头像
  ctx.drawImage(img, responsiveX - r, responsiveY - r, imgDiameter, imgDiameter)
  ctx.restore() //恢复之前保存的绘图上下文。
}


/**
 * 绘制普通图片
 * @param {num} ctx canvas
 * @param {string} img  保存的图片
 * @param {number} x  起始坐标x
 * @param {number} y 起始坐标y
 * @param {number} posterWidth 海报图片的宽度
 * @param {number} posterHeight 海报图片的高度
 * @param {number} offset 相对于屏幕的偏移量
 */
export const drawImage = (ctx, img, x = 0, y = 0, posterWidth, posterHeight, offset = 1) => {
  const responsiveX = responsiveX != 1 ? x * offset : x
  const responsiveY = responsiveY != 1 ? y * offset : y
  ctx.save()
  ctx.drawImage(img, responsiveX, responsiveY, posterWidth, posterHeight)
  ctx.restore() //恢复之前保存的绘图上下文。
}

export const drawText = (ctx, text, offset, fontSize = 14, x, y, color = '#000') => {
  ctx.save()
  ctx.setFontSize(fontSize)
  ctx.setFillStyle(color)
  ctx.fillText(text, x * offset, y * offset)
}

export const generateTempImage = (id, width, height, offset = 1, that) => {
  let num = 1
  let destWidth = width * num
  let destHeight = height * num
  wx.canvasToTempFilePath({
    x: 0,
    y: 0,
    width: width,
    height: height,
    destWidth: destWidth,
    destHeight: destHeight,
    canvasId: id,
    fileType: 'png',
    success: function (res) {
      wx.hideLoading()
      wx.setStorageSync('resultImg', res.tempFilePath)
    },
    fail: function (res) {
      msg('generate_temp_image_fail_msg', id, { width, height, offset, that })
      error('generate_temp_image_fail', res)
    }
  }, that)
}


export const save = (resultImg) => {
  var that = this
  //生产环境时 记得这里要加入获取相册授权的代码
  wx.saveImageToPhotosAlbum({
    filePath: resultImg,
    success(res) {
      wx.showToast({
        title: '图片已经保存到相册',
        icon: 'none',
        duration: 1500,
        mask: false,
      });
    },
    fail: function (res) {
      error('save_album_reject', res)
      wx.openSetting({
        success: (res) => {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              error('authorize_album', res)
            }
          })
        }
      })
    }
  })
}

// 获取屏幕的信息
export const getAllRects = () => {
  const that = this
  // wx.createSelectorQuery().selectAll('.shareImg').boundingClientRect(function (rects) {
  //   rects.forEach(function (rect) {
  //     that.setData({ windowWidth: rect.width })
  //   })
  // }).exec()
}
