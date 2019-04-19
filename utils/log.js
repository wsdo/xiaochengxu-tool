import { getCurrentPageUrl, formatTime } from './common'
// import elk from './libs/elk-report'
// let option = { env: "prod", appId: "wxd2cd009145b22662", project: 8, business: 8000, page_id: 'score' }
// const elkReport = new elk(option)
/**
 * 主动上报信息
 * @param {string} name  错误名字
 * @param {string} message 错误信息 
 * @param {Objec} option  可选 一般信息
 */
export const msg = (name, message, option) => {
  try {
    var deviceInfo = wx.getSystemInfoSync()
    var device = JSON.stringify(deviceInfo)
  } catch (e) {
    console.error('not support getSystemInfoSync api', err.message)
  }
  option = Object.assign({}, deviceInfo)
  let time = formatTime(new Date())
  // fundebug.notify(name, message)
  console.log(name, message, option)
  getApp().globalData.elkReport.send({ message: message, status: 0 })
  getApp().globalData.fundebug.notify(name, message, option)

}

/**
 * 上报异常
 * @param {string} name 错误名字
 * @param {Object} option 错误信息，通常是 fail 返回的 
 */
export const error = (name, option) => {
  option = serializeError(option)
  try {
    var deviceInfo = wx.getSystemInfoSync()
    var device = JSON.stringify(deviceInfo)
  } catch (e) {
    console.error('not support getSystemInfoSync api', err.message)
  }
  let time = formatTime(new Date())
  console.error(time, name, option, device)
  let user = getApp().globalData.user
  getApp().globalData.elkReport.send({ message: { time, name, option, user, deviceInfo }, status: 500 })
  getApp().globalData.fundebug.notifyError(name,{ time, name, option, user, deviceInfo })
  // fundebug.notifyError(name, option)
}

export const serializeError = (err = {}) => {
  return {
    name: err.name,
    message: err.message,
    description: err.description,
    fileName: err.fileName,
    lineNumber: err.lineNumber,
    columnNumber: err.columnNumber,
    stack: err.stack,
  }
}