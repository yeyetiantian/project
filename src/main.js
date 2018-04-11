// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from './http'
import VueCookies from 'vue-cookies'
import 'lib-flexible'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import { Popup, Picker,Field ,IndexList,IndexSection,CellSwipe,DatetimePicker,Actionsheet,TabContainer, TabContainerItem ,Navbar, TabItem} from 'mint-ui';
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
Vue.use(MuseUI)
Vue.use(VueCookies)
Vue.config.productionTip = false
Vue.prototype.$ajax = axios

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
