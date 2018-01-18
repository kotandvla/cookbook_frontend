import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '@/components/MainWindow/StartPage'
import RecipeView from '@/components/MainWindow/RecipeView'
import ShortCategoryPreview from '@/components/MainWindow/ShortCategoryPreview'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'StartPage',
      component: StartPage
    },
    {
      path: '/recipe/:id',
      name: 'RecipeView',
      component: RecipeView,
      props: true
    },
    {
      path: '/category/:name',
      name: 'ShortCategoryPreview',
      component: ShortCategoryPreview,
      props: true
    }
  ]
})
