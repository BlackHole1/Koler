import Vue from 'vue'
import Router from 'vue-router'

const Main = () => import('@/components/Main')
const Subject = () => import('@/components/Subject')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: 'questionBank/:name/:num',
          name: 'QuestionBank',
          component: Subject
        }
      ]
    }
  ]
})
