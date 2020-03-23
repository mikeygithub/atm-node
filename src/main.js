import Vue from 'vue'
import App from './App.vue'
//引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入
import Bmob from 'hydrogen-js-sdk'
//API
import ServiceApi from '@/api/ServiceApi'
Vue.config.productionTip = false
// 初始化
Bmob.initialize("102024734a988f4f", "123456");
Bmob.debug(true)
//挂载全局
Vue.prototype.Bmob = Bmob
Vue.use(ServiceApi)
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
}).$mount('#app')
