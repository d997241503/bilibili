import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let register = () => import('@/views/register/Register')
let login = () => import('@/views/login/Login')
let userinfo = () => import('@/views/userinfo/UserInfo')
let edit = () => import('@/views/edit/Edit')
let home = () => import('@/views/home/Home')
let article = () => import('@/views/article/Article')

const routes = [
  {
    path:'/',
    component:home
  },
  {
    path:'/register',
    component:register
  },
  {
    path:'/login',
    component:login
  },
  {
    path:'/userinfo',
    component:userinfo,
    meta:{
      isToken:true
    }
  },
  {
    path:'/edit',
    component:edit,
    meta:{
      isToken:true
    }
  },
  {
    path:'/article/:id',
    component:article
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

//全局路由守卫，每个路由跳转前执行
router.beforeEach((to,from,next) => {
  if((!localStorage.getItem('id') || !localStorage.getItem('token')) && to.meta.isToken == true){
    router.push('/login');
    Vue.prototype.$toast('请重新登录')
  }else{
    next()
  }
})

export default router