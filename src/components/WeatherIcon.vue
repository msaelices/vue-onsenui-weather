<template>
  <div class="icon" :style="'background-color:' + getIconColor(location)">
    <i class="wi" :class="'wi-owm-' + location.icon"></i>
  </div>
</template>

<script>
import { weatherCodeToColor } from '~/util';

export default {
  name: 'weather-icon',
  props: ['location'],
  methods: {
    getIconColor (location) {
      return weatherCodeToColor(location.icon);
    },
  },
}
</script>

<style scoped>
.icon {
  color: #fff;
  text-align: center;
  width: 36px;
  height: 36px;
  line-height: 36px;
  border-radius: 6px;
  font-size: 16px;
}
</style>


