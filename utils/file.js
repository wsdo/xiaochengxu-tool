import { PROMISE_STATUS } from '../const/status';
const { success, fail, complete} = PROMISE_STATUS

/**
 * 
 * @param {url} url
 */
export const downLoadFile = (url) => {
  console.log(url)
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url: url,
      success: function (data) {
        resolve({ success, data})
      },
      fail: function (data) {
        console.log('fail', data)
        reject({ fail, data})
      },
      complete: function (data) {
        resolve({ complete, data})
      }
    })
  })
}
