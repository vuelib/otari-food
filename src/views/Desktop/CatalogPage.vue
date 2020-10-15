<template>
  <div class="catalog-page">
    <Promo />
    <Toolbar @filteredCategory="filteredStories" />
    <div class="catalog-content">
      <!-- Promo -->
      <div class=" stock-list">
        <h2 class="places-list__title">Акции</h2>
        <ul class="places-list__container">
          <li class="places-list__place  stock-list__place">
            <a
              href="https://faem.page.link/eda"
              class="places-list__item place-item"
              target="_blank"
            >
              <div
                class="place-item__image-container stock-list__image-container"
                role="img"
                :style="{
                  backgroundImage: `url('${require('../../assets/promo1.jpg')}')`
                }"
              ></div>
            </a>
          </li>
          <li class="places-list__place stock-list__place">
            <a
              href="https://faem.page.link/eda"
              class="places-list__item place-item"
              target="_blank"
            >
              <div
                class="place-item__image-container stock-list__image-container"
                role="img"
                :style="{
                  backgroundImage: `url('${require('../../assets/promo2.jpg')}')`
                }"
              ></div>
            </a>
          </li>
          <li class="places-list__place stock-list__place">
            <a
              href="https://faem.page.link/eda"
              class="places-list__item place-item"
              target="_blank"
            >
              <div
                class="place-item__image-container stock-list__image-container"
                role="img"
                :style="{
                  backgroundImage: `url('${require('../../assets/promo3.jpg')}')`
                }"
              ></div>
            </a>
          </li>
        </ul>
      </div>
      <!-- <CatalogSearch /> -->
      <PlacesList :filtered-category="filteredCategory" />
    </div>
  </div>
</template>

<script>
import Promo from '@/components/Promo/Promo.vue';
import Toolbar from '@/components/Catalog/Toolbar.vue';
import PlacesList from '@/components/PlacesList/PlacesList.vue';
// import CatalogSearch from '@/components/Catalog/CatalogSearch.vue';

export default {
  methods: {
    filteredStories(category) {
      this.filteredCategory = category;
    }
  },
  data: () => ({
    filteredCategory: ''
  }),
  name: 'CatalogPage',
  components: {
    Promo,
    Toolbar,
    PlacesList
    // CatalogSearch
  }
};
</script>

<style lang="scss">
.catalog-page {
  border: solid 1px #eeeeee;
  border-radius: 4px 4px 0 0;
}
.stock-list {
  padding: 20px 80px;
  padding-bottom: 0;
  &__place {
    margin-bottom: 0;
  }
  &__image-container {
    padding-top: 97.5%;
    border-radius: 8px;
  }
}
</style>
