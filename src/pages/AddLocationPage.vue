<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button>Back</v-ons-back-button>
      </div>
      <div class="center">Add New City</div>
    </v-ons-toolbar>
    <div class="container">
      <v-ons-search-input
        v-model="query" debounce="500"
        placeholder="Type something">
      </v-ons-search-input>
      <v-ons-list>
        <v-ons-list-item
          v-for="suggestion in suggestions"
          :key="suggestion.id"
          @click="addLocation(suggestion)">
          {{ suggestion.description }}
        </v-ons-list-item>
      </v-ons-list>
    </div>
  </v-ons-page>
</template>

<script>
import { debounce } from 'lodash'
import { countries } from 'country-data'
import loader from '~/lib-loader'

export default {
  name: 'weather',
  data () {
    return {
      query: '',
      countries: countries,
      suggestions: [],
    };
  },
  watch: {
    query (query) {
      if (query) {
        this.getSuggestions();
      }
    }
  },
  methods: {
    getSuggestions: _.debounce(function () {
        loader.ensureReady().then(() => {
          let service = new window.google.maps.places.AutocompleteService();
          service.getPlacePredictions({
            input: this.query,
            types: ['(regions)']
          }, (results, status) => {
            this.suggestions = [];

            results && results.forEach((suggestion, i) => {
              this.suggestions.push(suggestion);
            });
          });
        })
      }, 500),
    addLocation(suggestion) {
      this.$store.dispatch(
        'forecast/addlocation', suggestion.structured_formatting.main_text);
      this.$router.back();
    }
  },
}
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
  }
</style>
