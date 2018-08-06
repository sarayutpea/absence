import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
// import { createSimpleTransition } from 'vuetify/es5/util/helpers'


import Employee from './components/employees/Employee'


Vue.use(VueRouter)
Vue.use(VueResource)
Vue.config.productionTip = false

// const myTransition = createSimpleTransition('v-fade-transition')
// Vue.component(Dashboard, myTransition)

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
