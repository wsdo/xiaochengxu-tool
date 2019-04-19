import api from '../service/api'
class Base {
  constructor() {

  }
  get(url, data) {
    return api.get(url, data)
  }
  post(url, data) {
    return api.post(url, data)
  }
  getName() {
    return 'stark'
  }
}
export default Base
