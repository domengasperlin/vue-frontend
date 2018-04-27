import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import Snotify from 'vue-snotify'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
let axiosDefaults = require('axios/lib/defaults')



// @ts-ignore
import rest from './rest'

Vue.use(BootstrapVue)
Vue.use(Snotify)

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'production') {
  axiosDefaults.baseURL = 'http://api.studis.tk/v1'
} else {
  axiosDefaults.baseURL = 'http://localhost:8080/v1'
}

router.beforeEach(
  (to: any, from: any, next: any) => {

    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
    axios.defaults.headers.common['Authorization'] = `Basic ${localStorage.getItem('token')}`

    if (to.matched.some((record: any) => record.meta.forVisitors)) {
      if (isAuthenticated()) {
        next({name: 'home'})
      } else {
        next()
      }
    } else if (to.matched.some((record: any) => record.meta.forAuth)) {
      if (isAuthenticated()) {
        next()
      } else {
        next({name: 'login'})
      }
    } else {
      next()
    }
  }
)

axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  console.log(error)
  if (!error.status) {
    localStorage.removeItem('token')
    router.push({name: 'login'})
    return Promise.reject(error)
  }
})


function isAuthenticated (): boolean {
  return localStorage.getItem('token') !== null
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')


