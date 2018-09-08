import axios from 'axios'

// axios.defaults.baseURL = 'http://172.18.17.242:8080'
axios.defaults.baseURL = 'http://kanban.yunmuqiang.com'

axios.defaults.baseURL1 = 'http://180.169.233.34:9090'
//axios.defaults.baseURL1 = 'http://kanban.yunmuqiang.com'
axios.defaults.oauthLogin = '/authorization'
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json';
export default axios

