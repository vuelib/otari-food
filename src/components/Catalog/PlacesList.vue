<template>
  <div class="places-list">
    <h2 id="restourants" class="places-list__title">Рестораны</h2>
    <ul
      @click="pushToStore"
      ref="places-list-container"
      class="places-list__container"
    >
      <li
        v-for="store in filteredStories"
        :key="store.uuid"
        class="places-list__place"
        :class="{
          'places-list__closed': !checkStoreOnOpened(store.work_schedule)
        }"
      >
        <pre>
        {{ new Date().getHours() * 60 + new Date().getMinutes() }}
        {{ detectWeekDay(store.work_schedule).work_beginning }}
        {{ detectWeekDay(store.work_schedule).work_ending }}
      </pre
        >
        <PlaceItem :store="store" :data-store="store.uuid" />
      </li>
    </ul>
    <div v-if="isShowMore" class="places-list__more">
      <button class="places-list__more-button button button--yellow">
        Показать ещё
      </button>
    </div>
    <app-popup v-show="isModalVisible" @closePopup="closeLoginModal">
      <AppLogin />
    </app-popup>
  </div>
</template>

<script>
import PlaceItem from './PlaceItem.vue';
import AppLogin from '@/components/AppLogin';

import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('stores');

export default {
  created() {
    if (!this.getStores.length) this.showMore();
  },
  computed: {
    filteredStories() {
      if (!this.filteredCategory || this.filteredCategory === 'все') {
        return this.getStores;
      }
      return this.getStores.filter(({ product_category }) => {
        if (!product_category) return;
        return product_category
          .map(el => el.replace(/.*(>|\|)\.*/g, '').trim())
          .includes(this.filteredCategory);
      });
    },
    isShowMore() {
      return this.getStoresCount - this.getStores.length > 0;
    },
    checkStoreOnOpened() {
      return workSchedule => {
        const { day_off, work_beginning, work_ending } = this.detectWeekDay(
          workSchedule
        );
        const curTime = new Date().getHours() * 60 + new Date().getMinutes();
        return !day_off && work_beginning < curTime && curTime < work_ending;
      };
    },
    getHoursWork() {
      return workSchedule => {
        const { work_beginning, work_ending } = this.detectWeekDay(
          workSchedule
        );
        return {
          work_beginning: this.constructTime(work_beginning),
          work_ending: this.constructTime(work_ending)
        };
      };
    },
    ...mapGetters(['getStores', 'getStoresCount', 'findStoreByUUID']),
    ...mapGetters(['isAuthUser'])
  },
  methods: {
    pushToStore({ target }) {
      // Delegating events
      const storeContainer = target.closest('article');
      if (
        !storeContainer &&
        !this.$refs['places-list-container'].contains(storeContainer)
      ) {
        return;
      }
      // Push to store
      const store = this.findStoreByUUID(storeContainer.dataset.store);
      // check on closed
      if (!this.checkStoreOnOpened(store.work_schedule)) return;
      this.$router.push({
        name: 'RestaurantPage',
        params: {
          id: storeContainer.dataset.store,
          store
        }
      });
    },
    detectWeekDay(workSchedule) {
      const currentWeekDay = new Date().getDay();
      for (const day of workSchedule) {
        if (currentWeekDay === 0 && day.week_day === 7) return day;
        if (day.week_day === currentWeekDay) return day;
      }
    },
    constructTime(min) {
      const h = Math.floor(min / 60);
      const m = Math.floor(min % 60);
      return `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}`;
    },
    async showMore() {
      await this.getStoresByFilter();
    },
    openLoginModal() {
      this.isModalVisible = true;
    },
    closeLoginModal() {
      this.isModalVisible = false;
    },
    ...mapActions(['getStoresByFilter'])
  },
  props: {
    filteredCategory: {
      type: String,
      default: '',
      require: false
    }
  },
  data: () => ({
    isModalVisible: false
  }),
  name: 'PlacesList',
  components: {
    PlaceItem,
    AppLogin
  }
};
</script>

<style lang="scss">
.places-list {
  display: block;
  padding: 20px 80px;
  background: white;
  &__title {
    margin: 16px 0 24px;
    font-size: 28px;
    font-weight: bold;
  }
  &__container {
    display: flex;
    flex-flow: row wrap;
    margin-right: -30px;
  }
  &__place {
    flex: 1 0 30%;
    position: relative;
    max-width: 33.3%;
    padding-right: 30px;
    margin-bottom: 40px;
  }
  &__more {
    text-align: center;
  }
  &__more-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__closed {
    filter: grayscale(100%);
  }
}
</style>
