// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from './http'
import VueCookies from 'vue-cookies'
import map from  './map'
import 'lib-flexible'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import { Popup, Picker,Field ,IndexList,IndexSection,CellSwipe,DatetimePicker,Actionsheet,TabContainer, TabContainerItem ,Navbar, TabItem,Indicator,Toast,Search,MessageBox} from 'mint-ui';
import 'mint-ui/lib/style.css'
import './assets/less/base.less'

Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.component(Field .name, Field );
Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);
Vue.component(CellSwipe.name, CellSwipe);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Search.name, Search);
Vue.prototype.$toast=Toast
Vue.prototype.$messagebox=MessageBox
Vue.use(MuseUI)
Vue.use(VueCookies)
Vue.config.productionTip = false

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  Indicator.open({
    spinnerType: 'snake'
  });
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  Indicator.close();
  return response;
}, function (error) {
  Indicator.close();
  return Promise.reject(error);
});

Vue.prototype.$ajax = axios
Vue.prototype.$map = map
import './assets/js/BMapLib_GeoUtils'

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

Vue.filter('formatDate', function (value,str) {
  if (!value) return '';
  let year=value.getFullYear(), month=value.getMonth()+1, date=value.getDate(),hour=value.getHours(), second=value.getMinutes();
  month=month>9?month:'0'+month;
  date=date>9?date:'0'+date;
  hour=hour>9?hour:'0'+hour;
  second=second>9?second:'0'+second;
  let result='';
  switch (str){
    case 'YY-MM-DD':
      result=year+'-'+month+'-'+date;
      break;
    case 'hh:mm':
      result=hour+':'+second;
      break;
    case 'YY-MM-DD hh:mm':
      result=year+'-'+month+'-'+date + ' ' + hour+':'+second;
      break;
  }
  return result
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
