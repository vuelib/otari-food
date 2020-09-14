<template>
  <article
    :class="{ 'category-menu-item-in-cart': isInCart }"
    class="category-menu-item"
  >
    <div class="category-menu-item__top-line">
      <div class="category-menu-item__price-wrapper">
        <div class="category-menu-item__price-and-count-wrapper">
          <template v-if="isInCart">
            <span class="category-menu-item__count">
              {{ menuItem.quantity }}
            </span>
            <span class="category-menu-item__cross"></span>
          </template>
          <span class="category-menu-item__price">{{ menuItem.price }} ₽</span>
        </div>
      </div>
      <h3 class="category-menu-item__title">{{ menuItem.name }}</h3>
      <span class="category-menu-item__weight">
        {{ menuItem.weight }}&nbsp;{{ menuItem.weight_measure }}
      </span>
    </div>
    <div class="category-menu-item__description">{{ menuItem.comment }}</div>
    <div class="category-menu-item__image-container">
      <div
        class="category-menu-item__image"
        role="img"
        :aria-label="menuItem.name"
        :style="{ backgroundImage: `url('${menuItem.image}')` }"
      ></div>
    </div>
  </article>
</template>

<script>
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
  },
  props: {
    menuItem: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  name: 'CategoryMenuItem'
};
</script>

<style lang="scss">
.category-menu-item {
  flex: 1 1 auto;
  width: 100%;
  cursor: pointer;
  display: flex;
  padding: 18px 20px;
  position: relative;
  border-radius: 4px;
  flex-direction: column;
  background-color: #ffffff;
  transition: box-shadow 0.15s;
  &:hover,
  &:focus {
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2);
  }
  &__top-line {
    flex: 1 0 auto;
  }
  &__title {
    display: inline;
    font-size: 18px;
    line-height: 1.39;
  }
  &__weight {
    color: #999999;
    line-height: 1.39;
    white-space: nowrap;
  }
  &__price-wrapper {
    float: right;
    min-width: 80px;
    text-align: right;
    margin-left: 10px;
  }
  &__price-and-count-wrapper {
    font-size: 18px;
    line-height: 1.39;
    margin-bottom: 2px;
  }
  &__cross {
    &::before {
      margin: 0 4px;
      content: '×';
    }
  }
  &__count {
    font-weight: bold;
  }
  &__description {
    color: #b0b0b0;
    width: 100%;
    overflow: hidden;
    font-size: 15px;
    margin-top: 8px;
    line-height: 1.33;
    overflow-wrap: break-word;
  }
  &__image-container {
    position: relative;
    margin-top: 24px;
    height: 210px;
    overflow: hidden;
    border-radius: 4px;
  }
  &__image {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 100%;
  }
}
.category-menu-item-in-cart {
  &:before {
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    content: '';
    position: absolute;
    background-color: $theme-mainColor;
  }
}
</style>
