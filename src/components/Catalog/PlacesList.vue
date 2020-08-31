<template>
  <div class="places-list">
    <h2 class="places-list__title">Рестораны</h2>
    <ul
      @click="pushToStore"
      ref="places-list-container"
      class="places-list__container"
    >
      <li
        v-for="store in getStores"
        :key="store.uuid"
        class="places-list__place"
        :class="{
          'places-list__closed': checkStoreOnClosed(store.work_schedule)
        }"
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
    isShowMore() {
      return this.getStoresCount - this.getStores.length > 0;
    },
    checkStoreOnClosed() {
      const currentWeekDay = new Date().getDay();
      return workSchedule => {
        for (const { week_day, day_off } of workSchedule) {
          if (week_day === currentWeekDay) return day_off;
        }
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
      if (this.checkStoreOnClosed(store.work_schedule)) return;
      this.$router.push({
        name: 'RestaurantPage',
        params: {
          id: storeContainer.dataset.store,
          store
        }
      });
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
