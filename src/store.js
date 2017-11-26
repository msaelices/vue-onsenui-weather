import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';

import { queryWeather } from '~/api';

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

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
  },
  plugins: [vuexLocalStorage.plugin],
})
