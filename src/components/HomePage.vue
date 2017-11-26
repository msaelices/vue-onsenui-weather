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
      <v-ons-list-item v-for="location in locations" @click="goTo(location)" :key="location.id">
        <div class="left"></div>
        <div class="center">{{ location.name }}</div>
        <div class="right"><v-ons-icon icon="fa-external-link"></v-ons-icon></div>
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
export default {
  name: 'home',
  computed: {
    locations() {
      return this.$store.state.forecast.locations;
    },
  },
  mounted() {
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
    addLocation(name) {
      this.$store.dispatch('forecast/addlocation', name);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  text-align: center;
}

img {
  max-width: 300px;
}

ons-list-title {
  text-transform: none;
}

ons-list-title:not(:first-of-type) {
  margin-top: 30px;
}

ons-card {
  text-align: center;
}

ons-list-item, ons-card {
  cursor: pointer;
}
</style>
