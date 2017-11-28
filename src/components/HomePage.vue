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
          <weather-icon :location="location">
          </weather-icon>
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
      @click="addRandomLocation('San Fernando')"
    >
      <v-ons-icon icon="md-plus"></v-ons-icon>
    </v-ons-fab>
  </v-ons-page>
</template>

<script>
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
    goTo (location) {
      this.$router.push({
        name: 'Weather',
        params: {location: location}},
      );
    },
    addRandomLocation () {
      const locations = [
        'San Fernando',
        'Tokyo',
        'New York',
        'Sevilla',
        'Paris',
        'Roma',
        'Qwerty',  // non-existing location
      ];
      const location = locations[Math.floor(Math.random() * locations.length)];
      this.addLocation(location);
    },
    addLocation (name) {
      this.$store.dispatch('forecast/addlocation', name);
    },
    fetchWeather (location) {
      this.$store.dispatch('forecast/fetchweather', location.name);
    },
    removeLocation (location) {
      this.$store.dispatch('forecast/removelocation', location.name);
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  text-align: center;
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
