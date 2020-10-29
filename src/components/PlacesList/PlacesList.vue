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
        :class="getSpecialStoresClass"
      >
        <PlaceItem
          :store="store"
          :data-store="store.uuid"
          :class="{
            'places-list__closed': !checkStoreOnOpened(store.work_schedule)
          }"
        />
      </li>
    </ul>
    <div v-if="isShowMore" class="places-list__more">
      <button
        @click="showMore"
        class="places-list__more-button button button--yellow"
      >
        Показать ещё
      </button>
    </div>
    <app-popup v-show="isModalVisible" @closePopup="closeLoginModal">
      <AppLogin />
    </app-popup>
  </div>
</template>

<script>
import PlaceItem from '../PlaceItem/PlaceItem.vue';
import AppLogin from '@/components/AppLogin';
import placesList from './placesList.js';
export default {
  mixins: [placesList],
  computed: {
    getSpecialStoresClass() {
      if (!this.isSpecialStores) return;
      return `special-stores-${12 / this.getSpecialStoresData.urls.length}`;
    }
  },
  props: {
    filteredCategory: {
      type: String,
      default: '',
      require: false
    }
  },
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
.special-stores-6 {
  max-width: 50%;
}
</style>
