import Vue from 'vue'
import Router from 'vue-router'

import store from '~/store'
import HomePage from '~/components/HomePage.vue'
import WeatherPage from '~/components/WeatherPage.vue'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
      children: [
        {
          path: 'weather',
          name: 'Weather',
          component: WeatherPage,
        },
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  // Reset pageStack to the new route
  store.commit('navigator/RESET', to.matched.map(m => m.components.default));
  next();
});

export default router
