<template>
  <div class="catalog-page">
    <Promo />
    <Toolbar @filteredCategory="filteredStories" />
    <div class="catalog-content">
      <!-- <CatalogSearch /> -->
      <PlacesList :filtered-category="filteredCategory" />
    </div>
  </div>
</template>

<script>
import Promo from '@/components/Catalog/Promo.vue';
import Toolbar from '@/components/Catalog/Toolbar.vue';
import PlacesList from '@/components/Catalog/PlacesList.vue';
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
</style>
