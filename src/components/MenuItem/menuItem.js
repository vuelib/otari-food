/* eslint no-unused-vars: */
import { createNamespacedHelpers } from 'vuex';
export default {
  created() {
    this.checkInCart();
  },
  updated() {
    this.checkInCart();
  },
  computed: {
    getMenuItemBG() {
      try {
        const parseImg = JSON.parse(this.menuItem.image);
        return parseImg.full || parseImg.full_format;
      } catch {
        return this.menuItem.image;
      }
    },
    isInCart() {
      return this.menuItem.quantity > 0;
    },
    ...createNamespacedHelpers('cart').mapGetters([
      'getCartProducts',
      'checkOnEqualActiveStoreUUID'
    ])
  },
  methods: {
    checkInCart() {
      if (!this.checkOnEqualActiveStoreUUID(this.menuItem.store_uuid)) return;
      let quant = 0;
      for (const [key, { menuItem, quantity }] of Object.entries(
        this.getCartProducts
      )) {
        if (menuItem.uuid === this.menuItem.uuid) {
          quant += quantity;
        }
      }
      if (quant) this.$set(this.menuItem, 'quantity', quant);
    }
  }
};
