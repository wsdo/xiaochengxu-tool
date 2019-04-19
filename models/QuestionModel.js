import Base from './Base'
import config from '../config/index'
class QuestionModel extends Base {
  constructor() {
    super()
  }

  /**
   * 初始化试题 存到本地
   */
  init(){
    let url = '/getRandomQuestionsFromPaper'
    return this.get(url).then(res => {
      let questions = res.questions
      wx.setStorageSync('questions', questions)
      return res.paperId
    })
  }

  /**
   * 获取单个试题
   * @param {number} num 题号
   */
  question(num = 0) {
    return new Promise((resolve, reject) => {
      let question = wx.getStorageSync('questions')
      resolve(question[num])
    })
  }

  /**
   * 提交试卷
   * @param {obj} data
   */
  submitRecords(data) {
    let url = '/submitRecords'
    this.post(url, data, 'application/json').then(res=>{
      // 批改成功 把信息存储到本地
        wx.setStorageSync('result', res)
        return res
    })
  }

}
export default new QuestionModel
