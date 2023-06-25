import { createApp } from 'vue'
import { createPinia } from 'pinia'
import AppRoot from './AppRoot.vue'
import axios from 'axios'
import router from './routers'
import NaiveUI from './components/naive-ui'
import Maska from 'maska'

import './styles/main.css'
import 'uno.css'
import 'iconify-icon'

axios.defaults.baseURL =
  import.meta.env.VITE_BASE_URL ||
  'http://localhost:3000'

const app = createApp(AppRoot)
const pinia = createPinia()

app.use(Maska)
app.use(NaiveUI)
app.use(pinia)
app.use(router)
app.mount('#app')
