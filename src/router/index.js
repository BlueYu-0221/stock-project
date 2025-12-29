import { createRouter, createWebHistory } from 'vue-router'
import ListPage from '../views/ListPage.vue'
import DetailPage from '../views/DetailPage.vue'

const routes = [
  {
    path: '/',
    name: 'List',
    component: ListPage // 首页，列表页
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: DetailPage, // 点击进去的详情页
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

