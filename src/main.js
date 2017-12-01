import 'onsenui/css/onsenui-core.min.css'; // Onsen UI basic CSS
import '~/app.css'
import '~/assets/icons/css/weather-icons.css';

import Vue from 'vue'
import VueOnsen from 'vue-onsenui'

import router from '~/router'
import store from '~/store'
import App from '~/App.vue'
import { AddLocation, Forecast, WeatherPage, MenuPage, HomePage, WeatherIcon } from '~/components'

Vue.config.productionTip = false

Vue.use(VueOnsen)

Object.values([
  AddLocation,
  Forecast,
  WeatherPage,
  MenuPage,
  HomePage,
  WeatherIcon]).forEach(c => Vue.component(c.name, c));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
