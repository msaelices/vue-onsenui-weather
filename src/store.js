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
        locations: {},
      },
      mutations: {
        ADD_LOCATION (state, payload) {
          const location = Object.assign({isInvalid: false, isFetching: false}, payload);
          state.locations = {[location.name]: location, ...state.locations};
        },
      },
      actions: {
        addlocation ({commit, state}, name) {
          if (name in state.locations) {
            this._vm.$ons.notification.toast({
              message: `${name} is already in your locations`,
              buttonLabel: 'Dismiss',
              timeout: 5000
            });
            return;
          }
          queryWeather(name)
            .catch((err) => {
              console.error(err.stack);
              this._vm.$ons.notification.toast({
                message: `Error fetching ${name} forecast`,
                buttonLabel: 'Dismiss',
                timeout: 5000
              });
            })
            .then((data) => {
              commit('ADD_LOCATION', data);

              this._vm.$ons.notification.toast({
                message: `${name} added successfully`,
                buttonLabel: 'Dismiss',
                timeout: 5000
              });
            });
        }
      },
    }
  },
  plugins: [vuexLocalStorage.plugin],
})
