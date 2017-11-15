import Vue from 'vue'
import Router from 'vue-router'

const Main = () => import('@/components/Main')
const Subject = () => import('@/components/Subject')
const Login = () => import('@/components/Login')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: 'problemsWarehouse/:name/:num',
          name: 'ProblemsWarehouse',
          component: Subject
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      children: [
        {
          path: 'out',
          name: 'Logout',
          component: Login
        }
      ]
    }
  ]
})
