import axios from 'axios'
axios.defaults.baseURL = 'http://club.myhitron.com'
axios.defaults.oauthLogin = '/userChat/oauthLogin'
axios.defaults.timeout = 5000

export default axios
