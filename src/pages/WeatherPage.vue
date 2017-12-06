<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>Back</v-ons-back-button>
      </div>
      <div class="center">Weather in {{ location.name }}</div>
    </v-ons-toolbar>
    <div class="container">
      <v-ons-progress-bar indeterminate v-if="location.isFetching">
      </v-ons-progress-bar>
      <div v-else-if="location.isInvalid">
        Unable to fetch data!
      </div>
      <div v-else class="forecast">
        <div class="name">
          {{ location.name }}
        </div>
        <div class="country">
          {{ locationCountry }}
        </div>
        <div>
          <weather-icon
            iconClass="main-icon"
            :size="150"
            :outline="true"
            :location="location"></weather-icon>
        </div>
        <div class="forecast-details">
          <div class="column">
            <div class="value">
              {{ location.temperature }}&deg;
            </div>
            <div class="caption">
              TEMPERATURE
            </div>
          </div>
          <div class="column">
            <div class="value">
              {{ location.humidity }}%
            </div>
            <div class="caption">
              HUMIDITY
            </div>
          </div>
        </div>
        <forecast :location="location" />
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import {countries} from 'country-data';

export default {
  name: 'weather',
  data () {
    return {
      countries: countries,
    };
  },
  computed: {
    location () {
      return this.$route.params.location;
    },
    locationCountry () {
      return countries[this.location.country.toUpperCase()].name
    }
  },
}
</script>

<style scoped>
  .container {
    color: #4a4a4a;
    width: 100%;
    margin-top: 30px;
  }
  .forecast {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .name {
    text-transform: uppercase;
    font-size: 24px;
    line-height: 24px;
  }
  .country {
    margin: 2px 0 0 0;
    text-transform: uppercase;
    font-size: 12px;
    line-height: 12px;
  }
  .main-icon {
    margin: 20px 0 0px 0;
  }
  .main-icon i {
    width: 100px;
    height: 100px;
    background-size: 100px 100px;
  }
  .forecast-details {
    width: 100%;
    font-size: 40px;
    font-weight: 300;
    display: flex;
    margin: 40px 25px;
  }
  .column {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .value {
    font-size: 60px;
  }
  .caption {
    font-size: 14px;
    font-weight: 400;
  }
</style>
