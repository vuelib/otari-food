<template>
  <div class="mobile-place-page-restaurant">
    <!-- Header -->
    <!-- <div class="restaurant-page-header__head">
      <div class="restaurant-page-header__top-bar">
        <div
          v-if="!isUserFromMessenger && !isSpecialStores"
          @click="$router.go(-1)"
          class="restaurant-page-header__back"
        ></div>
        <div v-else class="restaurant-page-header__search"></div>
        <div class="restaurant-page-header__head-title">
          {{ getStore.name }}
        </div>
        <div class="restaurant-page-header__search"></div>
      </div>
    </div> -->
    <div class="restaurant-page-header__body">
      <h1 class="restaurant-page-header__name">
        <span>
          {{ getStore.name }}
        </span>
        <span @click="isShowInfoBadge = true">
          <span
            :class="{ active: isShowInfoBadge }"
            class="restaurant-page-header__info-badge"
          >
            <div class="restaurant-page-header__info-badge-icon"></div>
          </span>
        </span>
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
    <!-- Bottom Sheet -->
    <app-bottom-sheet
      @closePopup="isShowInfoBadge = false"
      v-if="isShowInfoBadge"
      :header="true"
    >
      <div slot="header">{{ getStore.name }}</div>
      <div slot="body" class="mobile-place-info-bottom-body">
        <ul class="mobile-place-info-bottom-sheet">
          <li class="mobile-place-info-bottom-sheet__address">
            <div class="mobile-place-info-bottom-sheet__address-section">
              <span>
                {{ getStore.destination_points[0].unrestricted_value }}
              </span>
              <!-- <span class="mobile-place-info-bottom-sheet__time-lable">
                Работаем до
                {{ getHoursWork(getStore.work_schedule).work_ending }}
              </span> -->
              <!-- staff_phones  -->
            </div>
          </li>
        </ul>
      </div>
      <div slot="footer">
        <ul class="mobile-place-info-bottom-sheet">
          <li class="mobile-place-info-bottom-sheet__contact">
            <span class="mobile-place-info-bottom-sheet__time-lable">
              Тел. {{ getStorePhone }}
            </span>
          </li>
          <li class="mobile-place-info-bottom-sheet__contact">
            <span class="mobile-place-info-bottom-sheet__time-lable">
              Режим работы: с
              {{ getHoursWork(getStore.work_schedule).work_beginning }} до
              {{ getHoursWork(getStore.work_schedule).work_ending }}
            </span>
          </li>
        </ul>
      </div>
    </app-bottom-sheet>
  </div>
</template>

<script>
import MobileMenuList from '@/components/MenuList/MobileMenuList';
// import InfoHeader from '@/components/Restaurant/InfoHeader.vue';
// import CategoriesNavbar from '@/components/Restaurant/CategoriesNavbar.vue';
// import MenuList from '@/components/Restaurant/MenuList.vue';
// import AppCart from '@/components/AppCart.vue';
import auth from '@/mixins/auth.js';
import {
  setRestaurantPageTitle,
  setRestaurantPageDescription,
  setSpecialPageTitle
} from '@/mixins/seo.js';

import { createNamespacedHelpers } from 'vuex';

export default {
  async created() {
    await this.initStore();
    await this.fetchProductsThatStore();
    this.setActiveStore(this.store);
    this.checkFromMessanger();
    this.setPageTitle();
  },
  computed: {
    getStore() {
      return this.store;
    },
    getStorePhone() {
      if (!this.getStore.staff_phones) return;
      return this.getStore.phone || this.getStore.staff_phones[0];
    },
    getHoursWork() {
      return workSchedule => {
        const { work_beginning, work_ending } = this.detectWeekDay(
          workSchedule
        );
        return {
          work_beginning: this.constructTime(work_beginning),
          work_ending: this.constructTime(work_ending)
        };
      };
    },
    ...createNamespacedHelpers('stores').mapGetters([
      'getStoreProductsCategory',
      'findStoreProductByUUID',
      'isSpecialStores',
      'getSpecialStoresData'
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
    setPageTitle() {
      if (!this.isSpecialStores) {
        setRestaurantPageTitle(this.store.name);
        setRestaurantPageDescription(
          this.store.name,
          this.store.product_category
        );
      } else {
        setSpecialPageTitle(this.getSpecialStoresData.pageTitle);
      }
    },
    detectWeekDay(workSchedule) {
      const currentWeekDay = new Date().getDay();
      for (const day of workSchedule) {
        if (currentWeekDay === 0 && day.week_day === 7) return day;
        if (day.week_day === currentWeekDay) return day;
      }
    },
    constructTime(min) {
      const h = Math.floor(min / 60);
      const m = Math.floor(min % 60);
      return `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}`;
    },
    ...createNamespacedHelpers('stores').mapActions([
      'getStoresByUUID',
      'getStoreProductsByFilter',
      'setActiveStore'
    ]),
    ...createNamespacedHelpers('cart').mapActions(['setUserDataFromMessenger'])
  },
  data: () => ({
    store: {},
    categories: {},
    isShowInfoBadge: false
  }),
  mixins: [auth],
  components: {
    MobileMenuList,
    MobileBottomBar: () => import('@/components/BottomBar/MobileBottomBar.vue'),
    AppBottomSheet: () => import('@/components/BottomSheet/AppBottomSheet.vue')
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
    padding: 16px;
    background: #ffffff;
  }
  &__name {
    color: #3f3f3f;
    font-size: 24px;
    line-height: 28px;
    font-weight: bold;
    padding-bottom: 12px;
  }
  &__info-badge {
    top: 0;
    width: 28px;
    height: 28px;
    display: inline-flex;
    overflow: hidden;
    position: relative;
    font-size: 28px;
    box-shadow: 0 2px 16px 0px rgba(0, 0, 0, 0.07);
    align-items: center;
    margin-left: 5px;
    border-radius: 14px;
    justify-content: center;
    background-color: #ffffff;
  }
  &__info-badge.active {
    background-color: $theme-mainColor;
  }
  &__info-badge-icon {
    width: 16px;
    height: 16px;
    background-size: 16px 16px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjEzIiB2aWV3Qm94PSIwIDAgNCAxMyI+CiAgICA8cGF0aCBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0yIC45MTNhMS4zMDQgMS4zMDQgMCAxIDAgMCAyLjYwOUExLjMwNCAxLjMwNCAwIDAgMCAyIC45MTN6TS4yNiA1LjI2MXYuODdoLjg3djUuNjUySC4yNjF2Ljg3aDMuNDc4di0uODdIMi44N1Y1LjI2SC4yNnoiLz4KPC9zdmc+Cg==);
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
  }
  &__info-badge.active > &__info-badge-icon {
    filter: invert(1);
  }
}
// Restaurant Menu
.mobile-restaurant-page-menu-list {
  margin-top: 8px;
}
.mobile-place-info-bottom-sheet {
  display: flex;
  flex-flow: column nowrap;
  align-content: flex-start;
  &__address {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 0;
    // border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  &__address-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__time-lable {
    color: #b0b0b0;
    font-size: 15px;
    margin-top: 7px;
  }
}
.mobile-place-info-bottom-body {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
