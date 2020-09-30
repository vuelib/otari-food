<template>
  <!-- Cart Item -->
  <div class="mobile-cart-page-item">
    <div>
      <div class="mobile-cart-page-item__wrapper-image">
        <img :src="getStoreBG" alt="" />
      </div>
    </div>
    <div class="mobile-cart-page-item__options-center-wrapper">
      <div class="mobile-cart-page-item__item-options">
        <div class="mobile-cart-page-item__name">
          <div class="mobile-cart-page-item__amount-prices">
            <div class="mobile-cart-page-item__price">
              {{ getPrice * quantity }} ₽
            </div>
          </div>
          {{ cartItem.name }}
        </div>
        <div class="mobile-cart-page-item__options">
          <div
            v-for="option in extra"
            :key="option.uuid"
            class="mobile-cart-page-item__option"
          >
            <span class="mobile-cart-page-item__option-name">
              {{ option.name }}
            </span>
          </div>
        </div>
        <div class="mobile-cart-page-item__quantity">
          <div
            @click="decrementQuantity"
            class="mobile-cart-page-item__minus mobile-cart-page-item__icon-btn"
          ></div>
          <div class="mobile-cart-page-item__quantity-value">
            {{ quantity }}
          </div>
          <div
            @click="incrementQuantity"
            class="mobile-cart-page-item__plus mobile-cart-page-item__icon-btn"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cartItemMixin from './cartItemMixin.js';

export default {
  mixins: [cartItemMixin],
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
    },
    keyIndex: {
      type: String,
      required: true
    }
  },
  name: 'MobileCartItem'
};
</script>

<style lang="scss" scoped>
// Cart Item
.mobile-cart-page-item {
  width: 100%;
  display: flex;
  padding: 15px 16px 15px 16px;
  font-size: 14px;
  border-bottom: 1px solid #f5f5f5;
  justify-content: flex-start;
  background-color: white;
  &__wrapper-image {
    width: 104px;
    height: 104px;
    overflow: hidden;
    transform: translate3d(0, 0, 0);
    border-radius: 24px;
    background-size: cover;
    position: relative;
    & > img {
      width: auto;
      height: 100%;
      opacity: 1;
      top: 50%;
      left: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
      transition: opacity 200ms;
    }
  }
  &__options-center-wrapper {
    width: 100%;
    display: flex;
    align-self: center;
    justify-content: space-between;
  }
  &__item-options {
    flex: 1 0 100%;
    padding-left: 12px;
  }
  &__name {
    font-size: 16px;
    line-height: 19px;
  }
  &__amount-prices {
    float: right;
    margin-left: 10px;
  }
  &__price {
    font-size: 16px;
    line-height: 19px;
  }
  &__options {
    color: #b0b0b0;
    font-size: 13px;
    margin-top: 8px;
  }
  &__quantity {
    display: flex;
    margin-top: 12px;
    align-items: center;
  }
  &__minus {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zIDEyLjVDMyAxMi43NzYxIDMuMjIzODYgMTMgMy41IDEzSDIwLjVDMjAuNzc2MSAxMyAyMSAxMi43NzYxIDIxIDEyLjVWMTEuNUMyMSAxMS4yMjM5IDIwLjc3NjEgMTEgMjAuNSAxMUgzLjVDMy4yMjM4NiAxMSAzIDExLjIyMzkgMyAxMS41VjEyLjVaIiBmaWxsPSIjMjEyMDFGIi8+Cjwvc3ZnPgo=);
  }
  &__plus {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS41IDNDMTEuMjIzOSAzIDExIDMuMjIzODYgMTEgMy41VjExSDMuNUMzLjIyMzg2IDExIDMgMTEuMjIzOSAzIDExLjVWMTIuNUMzIDEyLjc3NjEgMy4yMjM4NiAxMyAzLjUgMTNIMTFWMjAuNUMxMSAyMC43NzYxIDExLjIyMzkgMjEgMTEuNSAyMUgxMi41QzEyLjc3NjEgMjEgMTMgMjAuNzc2MSAxMyAyMC41VjEzSDIwLjVDMjAuNzc2MSAxMyAyMSAxMi43NzYxIDIxIDEyLjVWMTEuNUMyMSAxMS4yMjM5IDIwLjc3NjEgMTEgMjAuNSAxMUgxM1YzLjVDMTMgMy4yMjM4NiAxMi43NzYxIDMgMTIuNSAzSDExLjVaIiBmaWxsPSIjMjEyMDFGIi8+Cjwvc3ZnPgo=);
  }
  &__quantity-value {
    margin: 0 12px;
    font-size: 20px;
  }
  &__icon-btn {
    width: 48px;
    height: 48px;
    display: flex;
    font-size: 30px;
    transition: background-color 100ms;
    align-items: center;
    font-weight: normal;
    text-indent: -9999px;
    border-radius: 16px;
    justify-content: center;
    background-size: 24px;
    background-color: #f1f0ed;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
