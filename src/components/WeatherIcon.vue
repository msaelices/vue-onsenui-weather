<template>
  <div
    class="icon"
    :class="iconClass"
    :style="{'background-color': backgroundColor, 'color': iconColor}">
    <i class="wi" :class="'wi-owm-' + location.icon"></i>
  </div>
</template>

<script>
import { weatherCodeToColor } from '~/util';

export default {
  name: 'weather-icon',
  props: ['location', 'outline', 'iconClass'],
  computed: {
    iconColor () {
      const { location, outline } = this;
      return outline
        ? weatherCodeToColor(location.icon) : 'white';
    },
    backgroundColor () {
      const { location, outline } = this;
      return outline
        ? 'transparent' : weatherCodeToColor(location.icon);
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


