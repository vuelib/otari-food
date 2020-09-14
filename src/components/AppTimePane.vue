<template>
  <transition name="timepane-fade">
    <div class="timepane">
      <ul class="timepane__buttons">
        <li
          @click="toggleTimeDay('today')"
          class="timepane__today timepane__button"
          :class="{ timepane__active: isActiveDay('today') }"
        >
          Сегодня
        </li>
        <li
          @click="toggleTimeDay('tomorrow')"
          class="timepane__tomorrow timepane__button"
          :class="{ timepane__active: isActiveDay('tomorrow') }"
        >
          Завтра
        </li>
      </ul>
      <ul class="timepane__time-list">
        <li
          v-for="(timeItem, index) in timeList"
          :key="index"
          @click="selectTime(timeItem)"
          class="timepane__time-item"
          :class="{ timepane__selected: isActiveTime(timeItem) }"
        >
          {{ timeItem.time }}
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
export default {
  created() {
    this.constructTimeList();
  },
  computed: {
    isActiveTime() {
      return selectTime => {
        return (
          selectTime.time === this.activeTime.time &&
          selectTime.day === this.activeTime.day
        );
      };
    },
    isActiveDay() {
      return day => this.timeDay === day;
    },
    toTimeCount() {
      if (this.timeDay === 'today') return 24 - new Date().getHours();
      return 24 - 10;
    }
  },
  methods: {
    toggleTimeDay(day) {
      this.timeDay = day;
      this.constructTimeList();
    },
    selectTime(time) {
      this.activeTime = time;
      this.$emit('selectTime', time);
    },
    constructTimeList() {
      this.timeList = [];
      let time;
      if (this.timeDay === 'today') {
        this.timeList.push({
          day: 'today',
          time: 'Сейчас'
        });
        time = new Date().getHours();
      } else {
        time = 10;
      }
      for (let i = 0; i < this.toTimeCount; i++) {
        this.timeList.push({
          time: `${time}:00`,
          day: this.timeDay
        });
        this.timeList.push({
          time: `${time}:30`,
          day: this.timeDay
        });
        time++;
      }
    }
  },
  data: () => ({
    timeList: [],
    activeTime: {
      day: 'today',
      time: 'Сейчас'
    },
    timeDay: 'today'
  })
};
</script>

<style lang="scss" scoped>
.timepane {
  overflow: auto;
  font-size: 10px;
  background: #fff;
  box-sizing: border-box;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.15);
  border-radius: 4px;

  position: absolute;
  left: 0;
  top: -400px;
  width: 240px;
  max-height: 410px;
  overflow-x: hidden;
  overflow-y: auto;
  &__buttons {
    flex: 0 0 auto;
    color: black;
    padding: 10px 10px 0;
    border-bottom: 1px solid #eeeeee;
  }
  &__button {
    width: calc(50% - 20px);
    height: 34px;
    display: inline-block;
    font-size: 15px;
    text-align: center;
    line-height: 34px;
    cursor: pointer;
  }
  &__active {
    cursor: default;
    background: $theme-mainColor;
    font-weight: bold;
    border-color: $theme-mainColor;
  }
  &__today {
    margin: 20px 0 20px 20px;
    border: 1px solid #e0e0e0;
    border-right: none;
    border-radius: 4px 0 0 4px;
    vertical-align: middle;
  }
  &__tomorrow {
    margin: 20px 20px 20px 0;
    border: 1px solid #e0e0e0;
    border-left: none;
    border-radius: 0 4px 4px 0;
    vertical-align: middle;
  }
  &__time-list {
    flex: 0 1 auto;
    color: black;
    margin: 0 10px 10px;
    cursor: pointer;
    display: flex;
    overflow: auto;
    flex-flow: row wrap;
    text-align: center;
    padding-top: 10px;
    line-height: 30px;
  }
  &__time-item {
    flex: 0 0 100%;
    font-size: 15px;
    line-height: 2;
    transition: color 0.1s;
    &:hover {
      color: $theme-mainColor;
    }
  }
  &__selected {
    font-weight: bold;
  }
}

.timepane-fade-enter,
.timepane-fade-leave-active {
  opacity: 0;
  transform: translateY(20px);
}

.timepane-fade-enter-active,
.timepane-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.2s ease;
}
</style>
