import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import TDesign from 'tdesign-vue';
import MainBox from './components/MainBox.vue'
// 引入组件库全局样式资源
import 'tdesign-vue/es/style/index.css';


import VCA from '@vue/composition-api'



Vue.use(TDesign);
Vue.use(VCA)

Vue.use(VueRouter);
Vue.config.productionTip = false
const router = new VueRouter({
  routes: [{
    path: '/',
    component: MainBox,
    redirect: '/WwOpenGetUser'
  }, {
    path: '/:operationid',
    component: MainBox,
  }] // (缩写) 相当于 routes: routes
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


// 设置暗色模式
document.documentElement.setAttribute('theme-mode', 'dark')