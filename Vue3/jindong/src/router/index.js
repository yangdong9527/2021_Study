import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
    beforeEnter: (to, from, next) => {
      const {isLogin} = localStorage
      isLogin ? next({name: 'Home'}) : next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/Register.vue'),
    beforeEnter: (to, from, next) => {
      const {isLogin} = localStorage
      isLogin ? next({name: 'Home'}) : next()
    }
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import('../views/shop/Shop.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage;
  const isLoginOrRegister = to.name === 'Login' || to.name === 'Register'
  isLogin || isLoginOrRegister ? next() : next({name: 'Login'})
})

export default router
