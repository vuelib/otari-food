<template>
  <div div class="mobile-catalog-page-places">
    <div class="mobile-catalog-page-places__flex-by-height">
      <div class="mobile-catalog-page-places-content">
        <!-- Promo Banners -->
        <h2 v-if="!isSpecialStores" class="mobile-catalog-page-places__title">
          Акции
        </h2>
        <div
          class="mobile-catalog-page-places__inner-content mobile-catalog-page-places__flex-by-height"
        >
          <ul
            v-if="!isSpecialStores"
            class="mobile-catalog-page-places__places-list mobile-catalog-page-places__flex-by-height"
          >
            <swiper class="swiper" :options="swiperOption">
              <swiper-slide>
                <a href="https://faem.page.link/s2qh">
                  <img
                    src="../../assets/promo1.jpg"
                    class="mobile-place-item__magical-image"
                  />
                </a>
              </swiper-slide>
              <swiper-slide>
                <router-link
                  :to="{
                    name: 'RestaurantPage',
                    params: { id: '7a59f790-e5f4-42e2-b60e-a13bf2091097' }
                  }"
                >
                  <img
                    src="../../assets/promo2.jpg"
                    class="mobile-place-item__magical-image"
                  />
                </router-link>
              </swiper-slide>
              <swiper-slide>
                <router-link
                  :to="{
                    name: 'RestaurantPage',
                    params: { id: 'ee00f90e-f901-4f49-8a2f-83b119d5cec0' }
                  }"
                >
                  <img
                    src="../../assets/promo3.jpg"
                    class="mobile-place-item__magical-image"
                  />
                </router-link>
              </swiper-slide>
            </swiper>
          </ul>
          <!-- Places -->
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
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';

import MobilePlaceItem from '../PlaceItem/MobilePlaceItem.vue';
import placesList from './placesList.js';

import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('stores');
export default {
  mixins: [placesList],
  data: () => ({
    swiperOption: {
      slidesPerView: 'auto',
      // centeredSlides: true,
      spaceBetween: 15
    }
  }),
  props: {
    filteredCategory: {
      type: String,
      default: '',
      require: false
    }
  },
  computed: {
    ...mapGetters(['isSpecialStores'])
  },
  name: 'MobilePlacesList',
  components: {
    MobilePlaceItem,
    Swiper,
    SwiperSlide
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
    padding: 15px 27px 0px 27px;
    display: flex;
    font-size: 20px;
    font-weight: bold;
    line-height: 21px;
    align-items: center;
    margin-bottom: -8px;
    justify-content: flex-start;
    // padding: 5px 0;
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
.mobile-stock-list {
  display: flex;
  align-items: center;
  &__item {
    max-width: 300px;
    > img {
      max-width: 100%;
    }
  }
}
.swiper-container {
  width: 100%;
  margin-top: 20px;
}
.swiper-slide {
  width: 100%;
  // height: auto;
  height: auto;
  max-width: 250px;
  img {
    max-width: 100%;
    border-radius: 16px;
  }
}
</style>
