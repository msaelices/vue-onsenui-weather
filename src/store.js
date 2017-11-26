import Vue from 'vue'
import Vuex from 'vuex'

import { queryWeather } from '~/api';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    splitter: {
      namespaced: true,
      state: {
        open: false
      },
      mutations: {
        toggle (state, shouldOpen) {
          if (typeof shouldOpen === 'boolean') {
            state.open = shouldOpen
          } else {
            state.open = !state.open
          }
        },
      },
    },
    forecast: {
      namespaced: true,
      state: {
        locations: [],
      },
      mutations: {
        ADD_LOCATION (state, location) {
          state.locations = [location, ...state.locations];
        },
      },
      actions: {
        addlocation ({commit, state}, name) {
          queryWeather(name)
            .catch((err) => {
              this.$ons.notification.toast({
                message: 'Error',
                buttonLabel: 'Dismiss',
                timeout: 5000
              });
            })
            .then((data) => commit('ADD_LOCATION', data));
        }
      },
    }
  }
})
