<template>
  <div class="mobile-cart-page">
    <!-- Cart Header -->
    <MobileCart
      @showLoginModal="isShowLogin = true"
      :destination-points="getStore.destination_points"
      :preparation-time="getStore.order_preparation_time_second"
      :uuid-store="getStore.uuid"
    />
    <MobileLogin @closeLoginModal="isShowLogin = false" v-show="isShowLogin" />
  </div>
</template>

<script>
export default {
  created() {
    let { store } = this.$route.params;
    if (!store) return this.$router.go(-1);
    this.store = store;
  },
  computed: {
    getStore() {
      return this.store;
    }
  },
  data: () => ({
    store: {},
    isShowLogin: false
  }),
  components: {
    MobileCart: () => import('@/components/Cart/MobileCart.vue'),
    MobileLogin: () => import('@/components/Login/AppMobileLogin')
  },
  name: 'MobileCartPage'
};
</script>

<style lang="scss" scoped>
.mobile-cart-page {
  padding-bottom: 160px;
  background-color: white;
}
</style>
