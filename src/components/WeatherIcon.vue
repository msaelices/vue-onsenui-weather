<template>
  <div
    class="icon"
    :class="iconClass"
    :style="{height: height, width: width}">
    <i
      class="wi"
      :class="'wi-owm-' + location.icon"
      :style="{height: height, width: width, backgroundSize: backgroundSize}">
    </i>
  </div>
</template>

<script>
export default {
  name: 'weather-icon',
  props: {
    location: Object,
    outline: Boolean,
    iconClass: String,
    size: {
      type: Number,
      default: 64},
  },
  computed: {
    width () {
      return `${this.size}px`
    },
    height () {
      return `${this.size}px`
    },
    backgroundSize () {
      return `${this.size}px ${this.size}px`
    }
  }
}
</script>

<style scoped>
.icon {
  color: #fff;
  text-align: center;
  width: 64px;
  height: 64px;
  line-height: 36px;
  border-radius: 6px;
  font-size: 16px;
}
.icon i {
  width: 64px;
  height: 64px;
  background-size: 64px 64px;
}
</style>


