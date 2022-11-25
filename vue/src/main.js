import Vue from 'vue'
import App from './App.vue'
import TDesign from 'tdesign-vue';
// 引入组件库全局样式资源
import 'tdesign-vue/es/style/index.css';


import VCA from '@vue/composition-api'



Vue.use(TDesign);
Vue.use(VCA)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


// 设置暗色模式
// document.documentElement.setAttribute('theme-mode', 'dark')