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
    navigator: {
      strict: true,
      namespaced: true,
      state: {
        stack: [],
        options: {}
      },
      mutations: {
        PUSH (state, page) {
          state.stack.push(page);
        },
        POP (state) {
          if (state.stack.length > 1) {
            state.stack.pop();
          }
        },
        REPLACE (state, page) {
          state.stack.pop();
          state.stack.push(page);
        },
        RESET (state, pageStack) {
          state.stack = pageStack || [state.stack[0]];
        },
        OPTIONS (state, newOptions = {}) {
          state.options = newOptions;
        },
      },
    },

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
        SET_FETCHING (state, name) {
          let location = state.locations[name];
          location.isFetching = true;
          state.locations = {...state.locations, [location.name]: location};
        },
        SET_INVALID (state, name) {
          let location = state.locations[name];
          location.isInvalid = true;
          location.isFetching = false;
          state.locations = {...state.locations, [location.name]: location};
        },
        SET_WEATHER (state, payload) {
          const location = Object.assign(
            {isInvalid: false, isFetching: false},
            payload);
          state.locations = {...state.locations, [location.name]: location};
        },
        ADD_LOCATION (state, name) {
          const location = {
            isInvalid: false,
            isFetching: true,
            name: name,
          };
          state.locations = {[name]: location, ...state.locations};
        },
        REMOVE_LOCATION (state, name) {
          // we cannot use delete state.locations[name]
          // because of a JS limitation, Vue does not know that
          // the state.locations is mutated and the view does not get
          // refreshed
          Vue.delete(state.locations, name);
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
        removelocation ({commit, state}, name) {
          commit('REMOVE_LOCATION', name);
          this._vm.$ons.notification.toast({
            message: `${name} has been removed from your locations`,
            buttonLabel: 'Dismiss',
            timeout: 5000
          });
        },
        fetchweather ({commit, state}, name) {
          commit('SET_FETCHING', name);

          queryWeather(name)
            .catch((err) => {
              commit('SET_INVALID', name);
              console.error(err.stack);

              this._vm.$ons.notification.toast({
                message: `Error fetching ${name} forecast`,
                buttonLabel: 'Dismiss',
                timeout: 5000
              });
            })
            .then((data) => {
              if (data) {
                commit('SET_WEATHER', data);
              }
            });
        },
        refresh ({dispatch, state}) {
          Object.entries(state.locations).forEach(([name, data]) => {
            dispatch('fetchweather', name);
          });
        },
      },
    }
  },
  plugins: [vuexLocalStorage.plugin],
})
