/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-06-05 18:32:49
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-06-06 17:21:15
 * @FilePath: \cloudmusic\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
Vue.use(Router)

import index from "./components/index.vue"
import song from "./components/song.vue"

let router = new Router({
  routes:[{
    path: "/",
    component:index
  }, {
    path: "/song",
    component:song
  }]
})
// 引入reset.css
import "./assets/css/reset.css"
// 引入rem.js
import "./assets/js/rem.js"


new Vue({
  router:router,
  render: h => h(App),
}).$mount('#app')
