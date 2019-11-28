import Vue from 'vue'
import Router from 'vue-router'
const Login =()=>import('@/components/login')
const Register =()=>import('@/components/register')
const Index =()=>import('@/components/index')
const Home =()=>import('@/components/home')
const Type =()=>import('@/components/type')
const Shopcar =()=>import('@/components/shopcar')
const Mine =()=>import('@/components/mine')
const Detail =()=>import('@/components/detail')

Vue.use(Router)

export default new Router({
  mode:'history',
  scrollBehavior(){

  },
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path:'/register',
      component: Register
    },
    {
      path:'/index',
      component: Index,
      children:[
        {
          path:'/home',
          component:Home
        },
        {
          path:'/type',
          component:Type
        },
        {
          path:'/shopcar',
          component:Shopcar
        },
        {
          path:'/mine',
          component:Mine
        },
        {
          path: '*',
          redirect:'/home'
        }
      ]
    },
    {
      path: '/detail',
      component: Detail
    },
    {
      path: '*',
      redirect:'/home'
    }
  ]
})
