import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'

// import VueResource from 'vue-resource'


import Employee from './components/employees/Employee'


Vue.use(VueRouter)
Vue.use(VueAxios, axios)
// Vue.use(VueResource)
Vue.config.productionTip = false
const routes = [
  { path: '/employees', component: Employee }
]
const router = new VueRouter({
  routes,
  mode: 'history' // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
