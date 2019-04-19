import Base from './Base'
class ArticleModel extends Base {
  constructor() {
    super()
  }
  getList(success) {
    let url = '/v1/stark'
    return this.get(url)
  }
}
export default new  ArticleModel
// import api from '../service/api'
// export function ArticleList() {
//   let url = '/v1/stark'
//   return api.get(url)
// }
