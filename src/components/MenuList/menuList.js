import { createNamespacedHelpers } from 'vuex';
export default {
  computed: {
    ...createNamespacedHelpers('stores').mapGetters(['findStoreProductByUUID']),
    ...createNamespacedHelpers('location').mapGetters([
      'isCurrentLocationNull'
    ]),
    ...createNamespacedHelpers('cart').mapGetters([
      'isCartEmpty',
      'checkOnEqualActiveStoreUUID'
    ])
  },
  methods: {
    handlerPushToCart({ target }) {
      // Delegating events
      const productContainer = target.closest('article');
      if (
        !productContainer &&
        !this.$refs['menu-list'].contains(productContainer)
      ) {
        return;
      }
      const product = this.findStoreProductByUUID(
        productContainer.dataset.product
      );
      // Check current location
      if (this.isCurrentLocationNull) {
        this.$parent.$emit('showEnterAddressModal');
        return;
      }
      // Product have variants or toppings
      if (product.variants || product.toppings) {
        this.optionProduct = product;
        this.isShowOptions = true;
        this.$refs['menu-item-options'].resetOptions();
      } else this.checkEqualStore(product);
    },
    checkEqualStore(product) {
      const cartItem = !product.extra
        ? {
            menuItem: product,
            extra: [],
            quantity: 1
          }
        : product;
      const { menuItem } = cartItem;
      if (
        !this.checkOnEqualActiveStoreUUID(menuItem.store_uuid) &&
        !this.isCartEmpty
      ) {
        this.isChangingStore = true;
        this.selectProduct = cartItem;
      } else this.pushToCart(cartItem);
    },
    pushToCart(product) {
      this.pushProductToCart(product);
    },
    closeOptionsPopup() {
      this.isShowOptions = false;
    },
    closeChangeStorePopup() {
      this.isChangingStore = false;
    },
    ...createNamespacedHelpers('cart').mapActions([
      'pushProductToCart',
      'clearCartOfProducts'
    ])
  },
  data: () => ({
    selectProduct: {},
    optionProduct: {},
    isShowOptions: false,
    isChangingStore: false
  })
};
