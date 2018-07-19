import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router'


import Dashboard from './components/DashBoard'
import Login from './components/auth/Login'
import Employee from './components/employees/Employee'
import Calculator from './components/programs/Calculator'


Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/login', component: Login },
  { path: '/employees', component: Employee },
  { path: '/calculator', component: Calculator}
]
const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
