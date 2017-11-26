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
        SET_WEATHER (state, payload) {
          const location = Object.assign(
            {isInvalid: false, isFetching: false},
            payload);
          state.locations = { ...state.locations, [location.name]: location};
        },
        ADD_LOCATION (state, name) {
          const location = {
            isInvalid: false,
            isFetching: true,
            name: name,
          };
          state.locations = {[name]: location, ...state.locations};
        },
      },
      actions: {
        addlocation ({commit, dispatch, state}, name) {
          if (name in state.locations) {
            this._vm.$ons.notification.toast({
              message: `${name} is already in your locations`,
              buttonLabel: 'Dismiss',
              timeout: 5000
            });
            return;
          }
          // add the location before fetching the weather
          commit('ADD_LOCATION', name);
          // fetch location weather
          dispatch('fetchweather', name);
        },
        fetchweather ({commit, state}, name) {
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
              commit('SET_WEATHER', data);
            });
        }
      },
    }
  },
  plugins: [vuexLocalStorage.plugin],
})
