// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import axios from 'axios';
import Vuex from 'vuex'
import VideoPlayer from 'vue-video-player'
import VueMarkdown from 'vue-markdown';

require('video.js/dist/video-js.css');
require('vue-video-player/src/custom-theme.css');
Vue.use(VideoPlayer);
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false
/* eslint-disable no-new */

router.beforeEach((to, from, next) => {

  //to即将进入的目标路由对象，from当前导航正要离开的路由， next  :  下一步执行的函数钩子

  if (to.path === '/') {
    next()
  }  // 如果即将进入登录路由，则直接放行

  else {     //进入的不是登录路由

    if (to.meta.requiresAuth && !sessionStorage.getItem('token')) {
      alert("请先登录！")
      next({path: '/'})
    }

    //下一跳路由需要登录验证，并且还未登录，则路由定向到  登录路由

    else {
      next()
    }
  }  //如果不需要登录验证，或者已经登录成功，则直接放行

});
new Vue({
  el: '#app',
  router,
  components: {
    App,
    VueMarkdown
  },
  template: '<App/>'
});

let store = new Vuex.store({});

// axios.defaults.headers.post['Authorization'] = sessionStorage.getItem('token');
// axios.defaults.headers.post['Content-Type'] = 'application/json';
