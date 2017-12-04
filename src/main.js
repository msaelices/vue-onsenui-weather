import 'onsenui/css/onsenui-core.min.css'; // Onsen UI basic CSS
import '~/app.css'
import '~/assets/icons/css/weather-icons.css';

import Vue from 'vue'
import VueOnsen from 'vue-onsenui'

import router from '~/router'
import store from '~/store'
import App from '~/App.vue'
import loader  from '~/lib-loader'
import { Forecast, WeatherIcon } from '~/components'
import { WeatherPage, MenuPage, HomePage } from '~/pages'

Vue.config.productionTip = false

Vue.use(VueOnsen)

loader.load({
  apiKey: 'AIzaSyCR8j38VbOGP8YDAtHx2jVqEirAbssAsK0',
  version: '3',
  libraries: ['places'],
})

Object.values([
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
