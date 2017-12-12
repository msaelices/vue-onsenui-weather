<template>
  <v-ons-page id="app">
    <v-ons-splitter>
      <v-ons-splitter-side swipeable collapse width="250px"
        :animation="$ons.platform.isAndroid() ? 'overlay' : 'reveal'"
        :open.sync="menuIsOpen">
        <menu-page></menu-page>
      </v-ons-splitter-side>

      <v-ons-splitter-content>
        <v-ons-navigator swipeable swipe-target-width="200px"
          :page-stack="pageStack"
          :pop-page="goBack"
          @postpush="togglePagesVisibility"
          @postpop="togglePagesVisibility">
        </v-ons-navigator>
      </v-ons-splitter-content>
    </v-ons-splitter>
  </v-ons-page>
</template>

<script>

export default {
  name: 'app',
  computed: {
    pageStack () {
      return this.$store.state.navigator.stack;
    },
    menuIsOpen: {
      get () {
        return this.$store.state.splitter.open
      },
      set (newValue) {
        this.$store.commit('splitter/toggle', newValue)
      }
    }
  },
  methods: {
    /* Override default pop behavior and delegate it to the router */
    goBack () {
      // Go to the parent route component
      this.$router.push({ name: this.$route.matched[this.$route.matched.length - 2].name });
    },
    togglePagesVisibility(event) {
      // OnsenUI uses visibility hidden styles to show/hide pages
      // this still keep the page in the render tree and SVG animations
      // are still considered by the browser.
      // Set display to none/block instead to speed up SVG rendering
      event.enterPage.style.display = 'block';
      event.leavePage.style.display = 'none';
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ons-splitter-side[side=left][animation=overlay] {
  border-right: 1px solid #BBB;
}
</style>
