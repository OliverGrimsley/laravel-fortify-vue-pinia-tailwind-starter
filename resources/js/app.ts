import axios from 'axios'
import { markRaw, onMounted } from 'vue'
import { createApp } from 'vue/dist/vue.esm-bundler.js'

import mitt from 'mitt'
const emitter = mitt()
window.emitter = emitter

import mainLayout from '@comp/layouts/mainLayout.vue'

import { router } from './router/routes'

import { createPinia } from 'pinia'
const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = markRaw(router)
})
import { useAuth } from '@/stores/auth'

import flash from '@comp/messages/flash.vue'
import '../css/app.css'

window.axios = axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.withCredentials = true
window.Laravel = {
  csrfToken: document.querySelector('meta[name="_token"]').getAttribute('content')
}

const app = createApp({
  router,
  components: {
    mainLayout
  },
  setup() {
    const authStore = useAuth()
    onMounted(async () => {
      authStore.getUser()
    })
  }
})
app.use(router)
app.component('flash', flash)
app.use(pinia)
app.mount('#app')
