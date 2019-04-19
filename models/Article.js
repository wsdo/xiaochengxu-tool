import api from '../service/api'

/**
 * 文章列表
 */
export function ArticleList(){
    let url = '/v1/stark'
    return api.get(url)
}
