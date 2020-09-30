import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('cart');
export default {
  computed: {
    isSingle() {
      return this.quantity === 1;
    },
    getPrice() {
      return this.extra.reduce(
        (sum, option) => (sum += option.price),
        this.cartItem.price
      );
    },
    getStoreBG() {
      console.log(this.cartItem);
      try {
        const parseImg = JSON.parse(this.cartItem.image);
        return parseImg.full || parseImg.full_format;
      } catch {
        return this.cartItem.image;
      }
    }
  },
  methods: {
    incrementQuantity() {
      this.incrementProductFromCart(this.keyIndex);
    },
    decrementQuantity() {
      this.deleteProductFromCart(this.keyIndex);
    },
    ...mapActions([
      'pushProductToCart',
      'deleteProductFromCart',
      'incrementProductFromCart'
    ])
  }
};
