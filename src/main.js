import Vue from 'vue'
import App from './App.vue'
//引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ServiceApi from '@/api/ServiceApi'
Vue.config.productionTip = false
// 初始化
Vue.use(ServiceApi)
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
}).$mount('#app')
