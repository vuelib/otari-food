<template>
  <div class="restaurant-page">
    <div class="restaurant-page__content-wrapper">
      <!-- Info Header Component -->
      <InfoHeader :store="store" />
      <div class="restaurant-page-content">
        <!-- Categories Navbar Component -->
        <CategoriesNavbar :categories="Object.keys(getStoreProductsCategory)" />
        <div class="restaurant-page__menu-wrapper">
          <!-- Menu List Component -->
          <MenuList :categories="getStoreProductsCategory" />
        </div>
      </div>
    </div>
    <div class="restaurant-page__sidebar-wrapper">
      <!-- SidebarMap Component -->
      <SidebarMap
        v-if="isCurrentLocationNull"
        :destination-points="store.destination_points"
      />
      <AppCart
        v-else
        :destination-points="store.destination_points"
        :uuid-store="store.uuid"
      />
    </div>
  </div>
</template>

<script>
import SidebarMap from '@/components/Restaurant/SidebarMap.vue';
import InfoHeader from '@/components/Restaurant/InfoHeader.vue';
import CategoriesNavbar from '@/components/Restaurant/CategoriesNavbar.vue';
import MenuList from '@/components/Restaurant/MenuList.vue';
import AppCart from '@/components/AppCart.vue';

import auth from '@/mixins/auth.js';

import { createNamespacedHelpers } from 'vuex';

export default {
  async created() {
    await this.initStore();
    await this.fetchProductsThatStore();
  },
  computed: {
    getStore() {
      return this.store;
    },
    ...createNamespacedHelpers('stores').mapGetters([
      'getStoreProductsCategory',
      'findStoreProductByUUID'
    ]),
    ...createNamespacedHelpers('cart').mapGetters([
      'isCartEmpty',
      'getActiveStoreUUID'
    ]),
    ...createNamespacedHelpers('location').mapGetters(['isCurrentLocationNull'])
  },
  methods: {
    async initStore() {
      const STORE_UUID = this.$route.params.id;
      let { store } = this.$route.params;
      if (!store) store = await this.getStoresByUUID({ uuid: STORE_UUID });
      this.store = store;
    },
    async fetchProductsThatStore() {
      const { uuid } = this.store;
      await this.getStoreProductsByFilter({ storeuuid: uuid });
    },
    ...createNamespacedHelpers('stores').mapActions([
      'getStoresByUUID',
      'getStoreProductsByFilter'
    ])
  },
  data: () => ({
    store: {},
    categories: {}
  }),
  mixins: [auth],
  name: 'RestaurantPage',
  components: {
    SidebarMap,
    InfoHeader,
    CategoriesNavbar,
    MenuList,
    AppCart
  }
};
</script>

<style lang="scss">
.restaurant-page {
  display: flex;
  &__content-wrapper {
    flex: 1 1 100%;
    display: flex;
    flex-wrap: wrap;
    max-width: calc(100% - 320px);
    align-content: flex-start;
  }
  &__sidebar-wrapper {
    flex: 0 0 310px;
    margin-left: 10px;
  }
  &__menu-wrapper {
    border: solid 1px #eeeeee;
    padding: 25px 80px;
    background: #f2f2f2;
    border-top: none;
    background-image: linear-gradient(to bottom, #ffffff, #f2f2f2 480px);
  }
}
.restaurant-page-content {
  flex-grow: 1;
  flex-basis: 100%;
  flex-shrink: 0;
}
</style>
