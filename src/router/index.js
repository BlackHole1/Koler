import Vue from 'vue'
import Router from 'vue-router'

const Main = () => import('@/components/Main')
const Subject = () => import('@/components/Subject')
const Setting = () => import('@/components/Setting')
const Login = () => import('@/components/Login')
const UserManage = () => import('@/components/UserManage')
const AddUser = () => import('@/components/UserManage/AddUser')
const DelUser = () => import('@/components/UserManage/DelUser')
const OnlineExam = () => import('@/components/OnlineExam')
const MyTest = () => import('@/components/MyTest')

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
      path: '/OnlineExam',
      name: 'OnlineExam',
      component: OnlineExam
    },
    {
      path: '/MyTest',
      name: 'MyTest',
      component: MyTest
    },
    {
      path: '/UserManage',
      name: 'UserManage',
      component: UserManage,
      children: [
        {
          path: 'AddUser',
          name: 'AddUser',
          component: AddUser
        },
        {
          path: 'DelUser',
          name: 'DelUser',
          component: DelUser
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
