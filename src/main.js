import Vue from 'vue'
import App from './App.vue'
//引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入
import Bmob from 'hydrogen-js-sdk'
Vue.config.productionTip = false
// 初始化
Bmob.initialize("102024734a988f4f", "14c9f61c4c58b08c1f830d2a7d44a67c");
Bmob.debug(true)
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
}).$mount('#app')
