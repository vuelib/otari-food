<template>
  <div class="catalog-page">
    <AppMobileHeader v-if="false" @showSidebar="isShowSidebar = true" />
    <MobileSidebar
      :show="isShowSidebar"
      @showLogin="isShowLogin = true"
      @showOrderHistory="showOrderHistory"
      @closeSidebar="isShowSidebar = false"
    />
    <MobilePromo @setAddress="isShowEnterAddress = true" />
    <Toolbar v-if="false" @filteredCategory="filteredStories" />
    <div class="catalog-content">
      <!-- <CatalogSearch /> -->
      <MobilePlacesList :filtered-category="filteredCategory" />
    </div>
    <!-- MobileBottomBar -->
    <MobileBottomBar
      @BottomBarClick="
        $router.push({
          name: 'RestaurantPage',
          params: {
            id: getRestaurant.uuid,
            store: getRestaurant
          }
        })
      "
      v-if="!isCartEmpty"
      :restaurant-name="getRestaurant.name"
      :price="getTotalPrice"
    />

    <MobileEnterAddress
      @closePopup="isShowEnterAddress = false"
      v-show="isShowEnterAddress"
    />
    <!-- MobileOrderHistory -->
    <MobileOrderHistory
      ref="my-orders"
      v-show="isShowOrderHistory"
      @closeOrderHistory="isShowOrderHistory = false"
    />
    <!-- MobileLogin-->
    <AppMobileLogin
      @closeLoginModal="isShowLogin = false"
      v-show="isShowLogin"
    />
  </div>
</template>

<script>
import MobilePromo from '@/components/Promo/MobilePromo.vue';
import Toolbar from '@/components/Catalog/Toolbar.vue';
import MobilePlacesList from '@/components/PlacesList/MobilePlacesList.vue';
// import AppBottomSheet from '@/components/BottomSheet/AppBottomSheet.vue';
// import CatalogSearch from '@/components/Catalog/CatalogSearch.vue';

import { createNamespacedHelpers } from 'vuex';
export default {
  methods: {
    filteredStories(category) {
      this.filteredCategory = category;
    },
    showOrderHistory() {
      this.$refs['my-orders'].loadMyOrders();
      this.isShowOrderHistory = true;
    }
  },
  computed: {
    getRestaurant() {
      if (this.isCartEmpty) return;
      return this.findStoreByUUID(this.getActiveStoreUUID) || {};
    },
    ...createNamespacedHelpers('stores').mapGetters(['findStoreByUUID']),
    ...createNamespacedHelpers('cart').mapGetters([
      'isCartEmpty',
      'getActiveStoreUUID',
      'getTotalPrice'
    ])
  },
  data: () => ({
    filteredCategory: '',
    sheetVisible: false,
    isShowEnterAddress: false,
    isShowSidebar: false,
    isShowLogin: false,
    isShowOrderHistory: false
  }),
  name: 'MobileCatalogPage',
  components: {
    MobilePromo,
    Toolbar,
    MobilePlacesList,
    MobileSidebar: () => import('@/components/Sidebar/MobileSidebar.vue'),
    AppMobileLogin: () => import('@/components/Login/AppMobileLogin.vue'),
    MobileOrderHistory: () =>
      import('@/components/OrderHistory/MobileOrderHistory.vue'),
    MobileBottomBar: () => import('@/components/BottomBar/MobileBottomBar.vue'),
    AppMobileHeader: () => import('@/components/Header/AppMobileHeader.vue'),
    MobileEnterAddress: () =>
      import('@/components/EnterAddress/MobileEnterAddress.vue')
    // CatalogSearch
  }
};
</script>

<style lang="scss">
.catalog-page {
  border: solid 1px #eeeeee;
  border-radius: 4px 4px 0 0;
  padding-bottom: 65px;
}
</style>
