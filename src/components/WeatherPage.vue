<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>Back</v-ons-back-button>
      </div>
      <div class="center">Weather in {{ location.name }}</div>
    </v-ons-toolbar>
    <v-ons-progress-bar indeterminate v-if="location.isFetching">
    </v-ons-progress-bar>
    <div v-else-if="location.isInvalid">
      Unable to fetch data!
    </div>
    <div v-else>
      <weather-icon :location="location"></weather-icon>
    </div>
  </v-ons-page>
</template>

<script>
export default {
  name: 'weather',
  computed: {
    location() {
      return this.$route.params.location;
    }
  },
}
</script>

<style scoped>
</style>
