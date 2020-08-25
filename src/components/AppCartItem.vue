<template>
  <div class="app-cart-item">
    <div class="app-cart-item__info-wrapper">
      <!--  -->
      <div class="app-cart-item__info">
        <span class="app-cart-item__name">
          {{ cartItem.name }}
        </span>
        <span class="app-cart-item__weight">{{ cartItem.weight }} г</span>
      </div>
      <!-- Quantity Controller -->
      <div class="app-cart-item__quantity-container">
        <div @click="incrementQuantity" class="app-cart-item__increment">+</div>
        <div class="app-cart-item__quantity">{{ quantity }}</div>
        <div
          @click="decrementQuantity"
          class="app-cart-item__decrement"
          :class="{ 'app-cart-item__remove': isSingle }"
        >
          <span v-if="isSingle">×</span>
          <span v-else>-</span>
        </div>
      </div>
      <!--  -->
      <div class="app-cart-item__price">
        <span>{{ getPrice }} ₽</span>
      </div>
    </div>
    <div class="app-cart-item__options">
      <div
        v-for="option in extra"
        :key="option.uuid"
        class="app-cart-item__option"
      >
        <div class="app-cart-item__option-name">{{ option.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('cart');

export default {
  watch: {
    quantity(value) {
      console.log(value);
    }
  },
  created() {
    console.log(this.cartItem);
  },
  computed: {
    isSingle() {
      return this.cartItem.quantity === 1;
    },
    getPrice() {
      if (!this.extra.length) return this.cartItem.price;

      return this.cartItem.options.reduce((sum, option) => {
        return (sum += option.price);
      }, this.cartItem.price);
    }
  },
  methods: {
    incrementQuantity() {
      this.pushProductToCart(this.cartItem);
    },
    decrementQuantity() {
      this.deleteProductFromCart(this.cartItem);
    },
    ...mapActions(['pushProductToCart', 'deleteProductFromCart'])
  },
  props: {
    cartItem: {
      type: Object,
      default: () => {},
      required: true
    },
    extra: {
      type: Array,
      default: () => [],
      required: true
    },
    quantity: {
      type: Number,
      default: 1,
      required: true
    }
  },
  name: 'AppCartItem'
};
</script>

<style lang="scss" scoped>
.app-cart-item {
  &__info-wrapper {
    display: flex;
  }
  &__info {
    flex: 1 1 60%;
  }
  &__name {
    font-size: 16px;
  }
  &__weight {
    color: #b0b0b0;
    font-size: 12px;
    white-space: nowrap;
  }
  &__quantity-container {
    flex: 0 1 10%;
    color: #b0b0b0;
    height: 35px;
    margin: -10px 0;
    position: relative;
    min-width: 35px;
    font-size: 14px;
    text-align: center;
    background: #f2f2f2;
    user-select: none;
  }
  &__increment {
    width: 100%;
    height: 35px;
    cursor: pointer;
    bottom: 100%;
    display: none;
    position: absolute;
    font-size: 20px;
    line-height: 35px;
    font-weight: bold;
  }
  &__quantity {
    height: 35px;
    line-height: 35px;
  }
  &__decrement {
    top: 100%;
    width: 100%;
    height: 35px;
    cursor: pointer;
    display: none;
    position: absolute;
    font-size: 20px;
    line-height: 35px;
    font-weight: bold;
  }
  &__quantity-container:hover &__increment,
  &__quantity-container:hover &__quantity,
  &__quantity-container:hover &__decrement {
    border: 1px solid #c0c0c0;
    display: block;
    z-index: 1;
    background: linear-gradient(-180deg, #ffffff 0%, #f5f5f5 100%);
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  }
  &__quantity-container:hover &__quantity {
    z-index: 2;
    border-top: none;
    border-bottom: none;
  }
  &__remove {
    color: #8b0000;
  }
  &__price {
    flex: 0 1 20%;
    font-size: 14px;
    text-align: right;
  }
  &__options {
    color: #b0b0b0;
    font-size: 13px;
    margin-top: 2px;
    line-height: 18px;
  }
}
</style>
