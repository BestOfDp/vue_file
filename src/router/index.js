import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import regist from '@/components/regist'
import add from '@/components/regist'
import user from '@/pages/user'
import play from '@/pages/play'
import mavonEditor from '@/components/markdown'
import blog from '@/pages/blog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
      path: '/regist',
      name: 'regist',
      component: regist,
    },
    {
      path: '/add',
      name: add,
      component: add,
      meta: {requiresAuth: true}
    },
    {
      path: '/user/',
      name: 'user',
      component: user,
      meta: {requiresAuth: true}
    },
    {
      path: '/play/:videoid/:playid/',
      name: 'play',
      component: play,
      meta: {requiresAuth: true}
    },
    {
      path: '/markdown',
      name: 'editor',
      component: mavonEditor,
      meta: {requiresAuth: true}
    },
    {
      path: '/blog',
      name: 'blog',
      component: blog
      // meta: {requiresAuth: true}
    }
  ]
})

