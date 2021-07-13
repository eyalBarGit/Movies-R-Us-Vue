import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/style.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { BootstrapVue } from 'bootstrap-vue'
import VModal from 'vue-js-modal'



Vue.use(BootstrapVue)
Vue.use(VModal, { componentName: 'Modal' })

library.add(faSearch)
library.add(faStar)

Vue.component('custom-icon', FontAwesomeIcon)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
