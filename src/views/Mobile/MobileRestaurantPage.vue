<template>
  <div class="mobile-place-page-restaurant">
    <!-- Header -->
    <div class="restaurant-page-header__head">
      <div class="restaurant-page-header__top-bar">
        <div
          v-if="!isUserFromMessenger"
          @click="$router.go(-1)"
          class="restaurant-page-header__back"
        ></div>
        <div v-else class="restaurant-page-header__search"></div>
        <div class="restaurant-page-header__head-title">
          {{ getStore.name }}
        </div>
        <div class="restaurant-page-header__search"></div>
      </div>
    </div>
    <div class="restaurant-page-header__body">
      <h1 class="restaurant-page-header__name">
        {{ getStore.name }}
      </h1>
      <ul class="restaurant-page-header__badges"></ul>
    </div>
    <!--  -->
    <div class="mobile-restaurant-page-menu-list">
      <MobileMenuList :categories="getStoreProductsCategory" />
    </div>
    <!-- MobileBottomBar -->
    <MobileBottomBar
      @BottomBarClick="
        $router.push({
          name: 'CartPage',
          params: {
            store: getStore
          }
        })
      "
      v-if="!isCartEmpty && checkOnEqualActiveStoreUUID(getStore.uuid)"
      :price="getTotalPrice"
    />
  </div>
</template>

<script>
import MobileMenuList from '@/components/MenuList/MobileMenuList';
// import InfoHeader from '@/components/Restaurant/InfoHeader.vue';
// import CategoriesNavbar from '@/components/Restaurant/CategoriesNavbar.vue';
// import MenuList from '@/components/Restaurant/MenuList.vue';
// import AppCart from '@/components/AppCart.vue';
import auth from '@/mixins/auth.js';

import { createNamespacedHelpers } from 'vuex';

export default {
  async created() {
    await this.initStore();
    await this.fetchProductsThatStore();
    this.checkFromMessanger();
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
      'getActiveStoreUUID',
      'getTotalPrice',
      'checkOnEqualActiveStoreUUID',
      'isUserFromMessenger'
    ]),
    ...createNamespacedHelpers('location').mapGetters(['isCurrentLocationNull'])
  },
  methods: {
    async initStore() {
      const STORE_UUID = this.$route.params.id || this.$route.query.si;
      if (!STORE_UUID) return this.$router.go(-1);
      let { store } = this.$route.params;
      if (!store) store = await this.getStoresByUUID({ uuid: STORE_UUID });
      this.store = store;
    },
    async fetchProductsThatStore() {
      const { uuid } = this.store;
      await this.getStoreProductsByFilter({ storeuuid: uuid });
    },
    checkFromMessanger() {
      const { ui, si } = this.$route.query;
      if (!ui || !si) return;
      this.setUserDataFromMessenger({ userId: ui, storeId: si });
    },
    ...createNamespacedHelpers('stores').mapActions([
      'getStoresByUUID',
      'getStoreProductsByFilter'
    ]),
    ...createNamespacedHelpers('cart').mapActions(['setUserDataFromMessenger'])
  },
  data: () => ({
    store: {},
    categories: {}
  }),
  mixins: [auth],
  components: {
    MobileMenuList,
    MobileBottomBar: () => import('@/components/BottomBar/MobileBottomBar.vue')
  }
};
</script>

<style lang="scss">
.mobile-place-page-restaurant {
  width: 100%;
  height: 100%;
  flex-flow: column nowrap;
  display: block;
  background-color: #fafafa;
  height: 100%;
}
// Restaurant Header
.restaurant-page-header {
  &__head {
    position: sticky;
    top: 0px;
    left: 0;
    right: 0;
    height: 60px;
    z-index: 5;
    background: #ffffff;
    padding-top: 8px;
  }
  &__top-bar {
    display: flex;
    padding: 0 8px;
    align-items: center;
    justify-content: space-between;
  }
  &__head-title {
    padding: 0 10px;
    overflow: hidden;
    flex-grow: 1;
    text-align: center;
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__back {
    width: 24px;
    height: 24px;
    display: inline-block;
    background-size: 24px 24px;
    background-repeat: no-repeat;
    background-position: center;
    padding: 22px;
    border-radius: 99px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xMS40ODUzIDVMMTIuODk5NSA2LjQxNDIyTDcuODI4NDMgMTEuNDg1M0gyMC41VjEzLjQ4NTNINy44Mjg0M0wxMi44OTk1IDE4LjU1NjNMMTEuNDg1MyAxOS45NzA2TDQgMTIuNDg1M0wxMS40ODUzIDVaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K);
  }
  &__search {
    width: 24px;
    height: 24px;
    padding: 16px;
    margin-right: 2px;
    vertical-align: middle;
  }
  &__body {
    padding: 0 16px 16px 16px;
    background: #ffffff;
  }
  &__name {
    color: #3f3f3f;
    font-size: 24px;
    line-height: 28px;
    font-weight: bold;
    padding-bottom: 12px;
  }
}
// Restaurant Menu
.mobile-restaurant-page-menu-list {
  margin-top: 8px;
}
</style>
