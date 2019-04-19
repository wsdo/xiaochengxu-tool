const rootUrl = 'api.xxx.com/info'
const prefix = {
  qa: 'qa',
  dev: 'dev',
  yz: 'yz',
  pro: ''
}
const paperId = {
  dev: 384670,
  qa: 384670,
  pro: 391544
}
let env = 'pro'

const apiRoot = 'https://' + prefix[env] + rootUrl
const config = {
  apiRoot: apiRoot,
  paperId: paperId[env],
  appID: 'wx14a083a458c802a0'
}
export default config
