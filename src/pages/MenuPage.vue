<template>
  <v-ons-page>
    <v-ons-toolbar modifier="transparent"></v-ons-toolbar>
    <div class="header">
      <img src="../assets/onsenui-logo.png">
    </div>

    <v-ons-list-title>MENU</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item v-for="item in menuItems" @click="goTo(item.page)" :key="item.link">
        <v-ons-icon fixed-width :icon="item.icon" class="left"></v-ons-icon>
        {{ item.label }}
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>

export default {
  name: 'menu-page',
  data () {
    return {
      menuItems: [
        {
          label: 'Add location',
          icon: 'ion-plus',
          page: null
        },
        {
          label: 'Settings',
          icon: 'ion-gear-b',
          page: null
        },
      ]
    }
  },
  methods: {
    goTo (page) {
      console.log(`go to page ${page}`);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  text-align: center;
  margin-bottom: 20px;
}

img {
  max-width: 150px;
}

ons-list-title {
  text-transform: none;
}

ons-list-item {
  cursor: pointer;
}
</style>
