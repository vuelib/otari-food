<template>
  <div>
    <div class="app-cart-with-button">
      <div class="app-cart">
        <div class="app-cart__content">
          <div class="app-cart__top-line">
            <div class="app-cart__title">Мой заказ</div>
            <div
              @click="confirmClearCart"
              class="trash-icon app-cart_trash-icon"
            ></div>
          </div>
          <div v-if="isCartEmpty" class="app-cart__empty-cart">
            Выберите блюда и добавьте их к заказу
          </div>
          <template v-if="!isCartEmpty">
            <div class="app-cart__order-info">
              <div
                v-for="[key, { menuItem, extra, quantity }] in Object.entries(
                  getCartProducts
                )"
                :key="key"
                class="app-cart__item"
              >
                <!-- App Cart Item -->
                <AppCartItem
                  :cart-item="menuItem"
                  :extra="extra"
                  :quantity="quantity"
                  :key-index="key"
                />
              </div>
            </div>
            <div class="app-cart__divider"></div>
            <div class="app-cart__delivery-fee">
              <div class="app-cart__delivery-fee-wrapper">
                <div class="app-cart__delivery-fee-name">Доставка</div>
                <div class="app-cart__delivery-fee-value">
                  <span class="app-cart__delivery-fee-cost">100 ₽</span>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="app-cart__meta">
          <!-- AppTimePane -->
          <AppTimePane v-show="isShowTimeList" @selectTime="selectTime" />

          <div class="app-cart__delivery-time">
            <div class="app-cart__delivery-time-title">Время доставки</div>
            <span @click="showTimeList" class="app-cart__delivery-time-value">
              <span v-if="timeToDelivery.day === 'tomorrow'">завтра </span>
              <span>{{ timeToDelivery.time }}</span>
              <span class="pencil-icon app-cart__pencil-icon"></span>
            </span>
          </div>
          <div class="app-cart__total-price">
            <div class="app-cart__total-price-title">Итого</div>
            <div class="app-cart__total-price-value">{{ getTotalPrice }} ₽</div>
          </div>
        </div>
      </div>
      <div class="app-cart-with-button__button">
        <button @click="sendOrder" class="button button--yellow">
          Оформить заказ
        </button>
      </div>
    </div>
    <!-- Auth Modal  -->
    <app-popup v-show="isShowModal && !isAuthUser" @closePopup="closePopup">
      <AppLogin />
    </app-popup>
    <!-- Confirm Modal -->
    <app-popup
      v-show="isConfirmClearCart"
      @closePopup="closeConfirmClearCartPopup"
    >
      <AppConfirm
        header-title="Удалить все из корзины?"
        @acceptConfirm="clearCart"
        @closePopup="closeConfirmClearCartPopup"
      />
    </app-popup>
  </div>
</template>

<script>
import AppCartItem from './AppCartItem.vue';
import AppLogin from './AppLogin.vue';
import AppConfirm from './AppConfirm.vue';
import AppTimePane from './AppTimePane.vue';

import auth from '@/mixins/auth.js';

import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('cart');

export default {
  watch: {
    getCartProducts(val) {
      console.log(val);
    }
  },
  created() {
    console.log(this.getCartProducts);
  },
  computed: {
    ...mapGetters(['isCartEmpty', 'getCartProducts', 'getTotalPrice'])
  },
  methods: {
    showTimeList() {
      this.isShowTimeList = !this.isShowTimeList;
    },
    selectTime(time) {
      this.isShowTimeList = false;
      if (time.time === 'Сейчас') {
        this.timeToDelivery = {
          day: 'today',
          time: '~ 30 мин'
        };
        return;
      }
      this.timeToDelivery = time;
    },
    sendOrder() {
      if (!this.isAuthUser) return (this.isShowModal = true);
      // 4:28 am - want to sleep
      alert('Заказ успешно оформлен');
    },
    confirmClearCart() {
      this.isConfirmClearCart = true;
    },
    clearCart() {
      this.clearCartOfProducts();
    },
    closeConfirmClearCartPopup() {
      this.isConfirmClearCart = false;
    },
    closePopup() {
      this.isShowModal = false;
    },
    ...mapActions(['clearCartOfProducts'])
  },
  data: () => ({
    isShowModal: false,
    isShowTimeList: false,
    isConfirmClearCart: false,
    timeToDelivery: {
      day: 'today',
      time: '~ 30 мин'
    }
  }),
  mixins: [auth],
  name: 'AppCart',
  components: {
    AppCartItem,
    AppLogin,
    AppConfirm,
    AppTimePane
  }
};
</script>

<style lang="scss" scoped>
.app-cart-with-button {
  flex: 1 1 auto;
  position: fixed;
  top: 0px;
  width: 310px;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  padding-bottom: 0px;
  margin-top: 90px;
  &__button {
    margin-top: 10px;
  }
}
.app-cart {
  flex: 1 1 auto;
  height: 0;
  border: solid 1px #eeeeee;
  display: flex;
  border-radius: 4px;
  flex-direction: column;
  background-color: #f2f2f2;
  &__content {
    flex: 1 1 auto;
    display: flex;
    overflow-x: hidden;
    overflow-y: auto;
    flex-direction: column;
  }
  &__top-line {
    flex: 0 0 24px;
    display: flex;
    padding: 23px 20px 16px 20px;
    box-sizing: content-box;
  }
  &__title {
    font-size: 20px;
    font-weight: bold;
    margin-right: auto;
  }
  &__empty-cart {
    width: 170px;
    color: #b0b0b0;
    margin: auto;
    font-size: 16px;
    text-align: center;
  }
  &__order-info {
    font-weight: 100;
  }
  &__item {
    padding: 10px 20px;
  }
  &__meta {
    position: relative;
    flex: 0 0 auto;
    display: flex;
    padding: 14px 20px 16px 20px;
    border-top: solid 1px #e3e3e3;
  }
  &__delivery-time {
    flex: 1 1 auto;
  }
  &__delivery-time-title {
    color: #b0b0b0;
    padding: 1px 0 3px 0;
    font-size: 14px;
  }
  &__delivery-time-value {
    padding: 2px 0;
    font-size: 25px;
    cursor: pointer;
  }
  &__total-price {
    flex: 1 1 auto;
  }
  &__total-price-title {
    color: #b0b0b0;
    padding: 1px 0 3px 0;
    font-size: 14px;
  }
  &__total-price-value {
    padding: 2px 0;
    font-size: 25px;
  }
  &__divider {
    height: 1px;
    margin: 10px 20px;
    background-color: #e3e3e3;
  }
  &__delivery-fee {
    padding: 10px 20px;
    padding-bottom: 20px;
    font-weight: 100;
  }
  &__delivery-fee-wrapper {
    display: flex;
  }
  &__delivery-fee-name {
    font-size: 16px;
    margin-right: auto;
  }
  &__delivery-fee-value {
    font-size: 14px;
    text-align: right;
  }
  &__delivery-fee-cost {
    white-space: nowrap;
  }
}
.pencil-icon {
  width: 14px;
  height: 14px;
  margin: 2px 0 2px 8px;
  display: inline-block;
  background-size: 100%;
  background-image: url('~@/assets/svg/pencil-icon.svg');
  background-repeat: no-repeat;
  background-position: center;
}
.trash-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  background-size: 100%;
  background-image: url('~@/assets/svg/trash-icon.svg');
  background-repeat: no-repeat;
  background-position: center;
}
</style>
