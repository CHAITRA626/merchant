import Vue from 'vue'
import VueRouter from 'vue-router'
// import Vuetify from 'vuetify'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// import { component } from 'vue/types/umd'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
import MerchantPortal from '../views/MerchantPortal'
import AddProduct from '../views/AddProduct'
import EditProduct from '../views/EditProduct'
import Sales from '../views/Sales'
import Register from '../views/Register'
import MerchantProfile from '../views/MerchantProfile'
import CreateProduct from '../views/CreateProduct'
import Cart from '../views/Cart'
import UserProfile from '../views/UserProfile'
Vue.use(VueRouter)
// Vue.use(Vuetify)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/About',
    name: 'About',
    component: About
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/MerchantPortal',
    name: 'MerchantPortal',
    component: MerchantPortal
  },
  {
    path: '/AddProduct',
    name: 'AddProduct',
    component: AddProduct
  },
  {
    path: '/EditProduct',
    name: 'EditProduct',
    component: EditProduct
  },
  {
    path: '/Sales',
    name: 'Sales',
    component: Sales
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/MerchantProfile',
    name: 'MerchantProfile',
    component: MerchantProfile
  },
  {
    path: '/CreateProduct',
    name: 'CreateProduct',
    component: CreateProduct
  },
  {
    path: '/Cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/UserProfile',
    name: 'UserProfile',
    component: UserProfile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
