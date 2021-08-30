import { createRouter, createWebHistory } from 'vue-router'
import Blogs from '@views/Blogs.vue'

const routes = [
  {
    path: '/',
    name: 'Blogs',
    component: Blogs,
    props: (route) => ({ search: route.query.search }),
  },
  {
    path: '/single',
    name: 'Single',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Single.vue'),
    props: (route) => ({ id: route.query.id, editable: route.query.edit }),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
