import { createNamespacedHelpers } from 'vuex';
export default {
  methods: {
    goToCart() {
      if (
        this.$route.name === 'RestaurantPage' &&
        this.$route.params.id === this.getActiveStoreUUID
      )
        return;
      this.$router.push({
        name: 'RestaurantPage',
        params: {
          id: this.getActiveStoreUUID
        }
      });
    },
    enterAddress() {
      this.$emit('showEnterAddressModal');
    },
    openLoginModal() {
      if (this.isAuthUser) this.logout();
      else this.isModalVisible = true;
    },
    showMyOrders() {
      this.$refs['my-orders'].loadMyOrders();
      this.isShowMyOrders = true;
    },
    closeMyOrdersModal() {
      this.isShowMyOrders = false;
    },
    closeLoginModal() {
      this.isModalVisible = false;
    }
  },
  computed: {
    ...createNamespacedHelpers('location').mapGetters([
      'isCurrentLocationNull',
      'getCurrentLocation'
    ]),
    ...createNamespacedHelpers('cart').mapGetters([
      'getTotalPrice',
      'isCartEmpty',
      'getActiveStoreUUID'
    ]),
    ...createNamespacedHelpers('stores').mapGetters([
      'isSpecialStores',
      'getSpecialStoresData'
    ])
  },
  data: () => ({
    isModalVisible: false,
    isShowMyOrders: false,
    city: 'Владикавказ'
  })
};
