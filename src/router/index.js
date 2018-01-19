import Vue from 'vue'
import Router from 'vue-router'

const Main = () => import('@/components/Main')
const Subject = () => import('@/components/Subject')
const Setting = () => import('@/components/Setting')
const Login = () => import('@/components/Login')
const UserManage = () => import('@/components/UserManage')
const addUser = () => import('@/components/UserManage/addUser')
const delUser = () => import('@/components/UserManage/delUser')

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: 'ProblemsWarehouse/:name/:num',
          name: 'ProblemsWarehouse',
          component: Subject
        }
      ]
    },
    {
      path: '/Setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/UserManage',
      name: 'UserManage',
      component: UserManage,
      children: [
        {
          path: 'addUser',
          name: 'addUser',
          component: addUser
        },
        {
          path: 'delUser',
          name: 'delUser',
          component: delUser
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
