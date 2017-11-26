import 'onsenui/css/onsenui-core.min.css'; // Onsen UI basic CSS
import '~/app.css'
import '~/assets/icons/css/weather-icons.css';

import Vue from 'vue'
import VueOnsen from 'vue-onsenui'
import store from '~/store'
import App from '~/App.vue'

Vue.config.productionTip = false

Vue.use(VueOnsen)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
