import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('cart');
export default {
  mounted() {
    console.log(this.optionProduct);
    if (this.isDisabled) {
      this.scopedVariant = this.optionProduct.variants.find(
        ({ standard }) => standard
      );
    }
  },
  computed: {
    getOptionPrice() {
      return price => (price < 0 ? price : `+${price}`);
    },
    isDisabled() {
      return this.optionProduct.variants && !this.scopedVariant;
    },
    getLocalTotalPrice() {
      // Toppings sum
      const totalToppings = this.scopedToppings.reduce((total, { price }) => {
        total += price;
        return total;
      }, 0);

      // Variant sum
      const totalVariant = this.scopedVariant ? this.scopedVariant.price : 0;

      // Total sum
      return (
        (totalVariant + totalToppings + this.optionProduct.price) *
        this.scopedQuantity
      );
    }
  },
  methods: {
    sendOptionOrder() {
      if (this.isDisabled) return;

      // construct options
      const mergeOptions = [...this.scopedToppings];
      this.scopedVariant ? mergeOptions.push(this.scopedVariant) : false;

      const cartItem = {
        menuItem: this.optionProduct,
        extra: mergeOptions,
        quantity: this.scopedQuantity
      };
      this.$emit('pushProductToCart', cartItem);
      this.$emit('closePopup');
      this.resetOptions();
    },
    resetOptions() {
      this.scopedVariant = null;
      this.scopedToppings = [];
      this.scopedQuantity = 1;
    },
    incrementLocalQuantity() {
      this.scopedQuantity++;
    },
    decrementLocalQuantity() {
      if (this.scopedQuantity > 1) this.scopedQuantity--;
    },
    ...mapActions(['pushProductToCartWithOptions'])
  },
  data: () => ({
    scopedToppings: [],
    scopedVariant: null,
    scopedQuantity: 1
  })
};
