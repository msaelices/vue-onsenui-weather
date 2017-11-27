<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="left">
        <v-ons-toolbar-button @click="$store.commit('splitter/toggle')">
          <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center">Onsen UI Vue - Weather</div>
    </v-ons-toolbar>

    <v-ons-list>
      <v-ons-list-item
        v-for="location in locations"
        @click="goTo(location)"
        :key="location.id"
        tappable>
        <div class="left">
          <div class="icon" :style="'background-color:' + getIconColor(location)">
            <i class="wi" :class="'wi-owm-' + location.icon"></i>
          </div>
        </div>
        <div class="center">
          <div class="list-item__title">
            {{ location.name }}
          </div>
          <div class="list-item__subtitle">
            {{ location.subtitle }}
            <span v-if="location.isFetching">
              Fetching data...
            </span>
            <span v-else-if="location.isInvalid" class="error">
              Unable to fetch data!
            </span>
            <span v-else>
              &nbsp;{{ location.temperature }}&deg;C&nbsp;{{ location.humidity }}%
            </span>
          </div>
        </div>
        <div class="right buttons">
          <div @click.stop="fetchWeather(location)">
            <v-ons-icon
              icon="refresh"
              class="refresh-button"
              :spin="location.isFetching"
            ></v-ons-icon>
          </div>
          <div @click.stop="removeLocation(location)">
            <v-ons-icon
              icon="trash"
              class="remove-button"
            ></v-ons-icon>
          </div>
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-fab
      position="bottom right"
      @click="addLocation('San Fernando')"
    >
      <v-ons-icon icon="md-plus"></v-ons-icon>
    </v-ons-fab>
  </v-ons-page>
</template>

<script>

import { weatherCodeToColor } from '~/util';

export default {
  name: 'home',
  computed: {
    locations () {
      return this.$store.state.forecast.locations;
    },
  },
  mounted () {
    // TODO: Find out a better way to do refresh the locations
    // computed value from the persisted locations in the store
    setTimeout(() => {
      this.$forceUpdate();
    }, 100);
  },
  methods: {
    goTo (url) {
      window.open(url, '_blank')
    },
    addLocation (name) {
      this.$store.dispatch('forecast/addlocation', name);
    },
    getIconColor (location) {
      return weatherCodeToColor(location.icon);
    },
    fetchWeather (location) {
      this.$store.dispatch('forecast/fetchweather', location.name);
    },
    removeLocation (location) {
      console.log('Removing location...');
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  text-align: center;
}

.icon {
  color: #fff;
  text-align: center;
  width: 36px;
  height: 36px;
  line-height: 36px;
  border-radius: 6px;
  font-size: 16px;
}

.buttons {
  fontSize: 20px;
  color: #cacaca;
}

.refresh-button {
  margin: 0 25px 0 0;
}

.remove-button {
  margin: 0 10px 0 0;
}

.error {
  color: red;
}
</style>
