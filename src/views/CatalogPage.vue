<template>
  <div class="catalog-page">
    <Promo />
    <Toolbar />
    <div class="catalog-content">
      <CatalogSearch />
      <PlacesList />
    </div>
  </div>
</template>

<script>
import Promo from '@/components/Catalog/Promo.vue';
import Toolbar from '@/components/Catalog/Toolbar.vue';
import CatalogSearch from '@/components/Catalog/CatalogSearch.vue';
import PlacesList from '@/components/Catalog/PlacesList.vue';

export default {
  name: 'CatalogPage',
  components: {
    Promo,
    Toolbar,
    CatalogSearch,
    PlacesList
  }
};
</script>

<style lang="scss">
.catalog-page {
  border: solid 1px #eeeeee;
  border-radius: 4px 4px 0 0;
}
</style>
