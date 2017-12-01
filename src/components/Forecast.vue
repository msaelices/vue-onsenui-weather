<template>
  <div class="forecast">
    <div
      v-for="day in location.forecast"
      :key="day.weekday"
      class="weekday">
      <div class="week-day-name">
      {{ weekDayLabel(day.weekday) }}
      </div>
      <div class="weekday-icon">
        <weather-icon :location="day" />
      </div>
      <div class="weekday-maxtemp">
        {{ day.maxTemp }}&deg;C
      </div>
      <div class="weekday-mintemp">
        {{ day.minTemp }}&deg;C
      </div>
    </div>
  </div>
</template>

<script>
const WEEKDAYS = {
  0: 'SUN',
  1: 'MON',
  2: 'TUE',
  3: 'WED',
  4: 'THU',
  5: 'FRI',
  6: 'SAT'
};

export default {
  name: 'forecast',
  props: ['location'],
  methods: {
    weekDayLabel (weekday) {
      return WEEKDAYS[weekday];
    },
  }
}
</script>

<style scoped>
.forecast {
  width: 100%;
  margin: 0 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.weekday {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.weekday-name {
  font-size: 16px;
  margin: 0 0 6px 0;
  font-weight: 200;
}
.weekday-icon {
  font-size: 24px;
}
.weekday-maxtemp {
  margin: 6px 0 0 0;
  font-size: 12px;
}
.weekday-mintemp {
  opacity: 0.85;
  margin: 2px 0 0 0;
  font-size: 12px;
}

</style>
