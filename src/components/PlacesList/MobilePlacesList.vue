<template>
  <div class="mobile-catalog-page-places">
    <div class="mobile-catalog-page-places__flex-by-height">
      <div class="mobile-catalog-page-places-content">
        <div
          class="mobile-catalog-page-places__inner-content mobile-catalog-page-places__flex-by-height"
        >
          <div class="mobile-catalog-page-places__flex-by-height">
            <h2 class="mobile-catalog-page-places__title">Рестораны</h2>
            <div
              class="mobile-catalog-page-places__root mobile-catalog-page-places__flex-by-height"
            >
              <ul
                @click="pushToStore"
                ref="places-list-container"
                class="mobile-catalog-page-places__places-list mobile-catalog-page-places__flex-by-height"
              >
                <MobilePlaceItem
                  v-for="store in filteredStories"
                  :key="store.uuid"
                  :store="store"
                  :data-store="store.uuid"
                  :class="{
                    'mobile-catalog-page-places__closed': !checkStoreOnOpened(
                      store.work_schedule
                    )
                  }"
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MobilePlaceItem from '../PlaceItem/MobilePlaceItem.vue';
import placesList from './placesList.js';
export default {
  mixins: [placesList],
  props: {
    filteredCategory: {
      type: String,
      default: '',
      require: false
    }
  },
  name: 'MobilePlacesList',
  components: {
    MobilePlaceItem
  }
};
</script>

<style lang="scss" scoped>
.mobile-catalog-page-places {
  flex: 1;
  display: flex;
  &__flex-by-height {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  &__inner-content {
    padding: 0px 0 4px;
  }
  &__title {
    color: #3f3f3f;
    padding: 0px 27px;
    display: flex;
    font-size: 20px;
    font-weight: bold;
    line-height: 21px;
    align-items: center;
    margin-bottom: -8px;
    justify-content: flex-start;
  }
  &__root {
    min-height: 150px;
    padding-top: 20px;
  }
  &__places-list {
    flex-wrap: wrap;
    margin-left: 16px;
    align-content: start;
    flex-direction: row;
    background-repeat: repeat;
    background-position: left top;
  }
  &__closed {
    filter: grayscale(100%);
  }
}
.mobile-catalog-page-places-content {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  width: 100vw;
  // min-height: 63200px;
  @media (min-width: 650px) {
    // min-height: 31600px;
  }
}
</style>
