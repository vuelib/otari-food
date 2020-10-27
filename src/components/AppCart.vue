<template>
  <div>
    <div class="app-cart-with-button">
      <div class="app-cart">
        <div class="app-cart__content">
          <div class="app-cart__top-line">
            <div class="app-cart__title">Мой заказ</div>
            <div
              v-if="checkOnEqualActiveStoreUUID(uuidStore)"
              @click="confirmClearCart"
              class="trash-icon app-cart_trash-icon"
            ></div>
          </div>
          <div
            v-if="isCartEmpty || !checkOnEqualActiveStoreUUID(uuidStore)"
            class="app-cart__empty-cart"
          >
            Выберите блюда и добавьте их к заказу
          </div>
          <template
            v-if="!isCartEmpty && checkOnEqualActiveStoreUUID(uuidStore)"
          >
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
            <div class="app-cart__without-delivery app-cart__delivery-fee">
              <div class="app-cart__delivery-fee-wrapper">
                <label
                  for="without_delivery"
                  class="app-cart__without-delivery-label app-cart__delivery-fee-name"
                  >Заберу сам</label
                >
                <div class="app-cart__delivery-fee-value">
                  <span class="app-cart__delivery-fee-cost">
                    <input
                      :value="isWithoutDelivery"
                      @change="changeWithoutDelivery"
                      id="without_delivery"
                      class="toggle-button"
                      type="checkbox"
                    />
                  </span>
                </div>
              </div>
            </div>
            <div class="app-cart__delivery-fee">
              <div class="app-cart__delivery-fee-wrapper">
                <div class="app-cart__delivery-fee-name">Доставка</div>
                <div class="app-cart__delivery-fee-value">
                  <span class="app-cart__delivery-fee-cost">
                    {{ getDeliveryPrice }} ₽
                  </span>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="app-cart__meta">
          <div class="app-cart__delivery-time">
            <div class="app-cart__delivery-time-title">Время доставки</div>
            <span class="app-cart__delivery-time-value">
              <span>{{ Math.floor(preparationTime / 60) }} мин</span>
              <!-- <span class="pencil-icon app-cart__pencil-icon"></span> -->
            </span>
          </div>
          <div class="app-cart__total-price">
            <div class="app-cart__total-price-title">Итого</div>
            <div class="app-cart__total-price-value">
              <template v-if="checkOnEqualActiveStoreUUID(uuidStore)">
                {{ getTotalPrice }} ₽
              </template>
              <template v-else> 0 ₽ </template>
            </div>
          </div>
        </div>
      </div>
      <div class="app-cart-with-button__button">
        <button
          @click="confirmCreateOrder"
          :disabled="isSendOrderDisabled"
          class="button button--yellow"
        >
          Оформить заказ
        </button>
      </div>
    </div>
    <!-- Auth Modal  -->
    <app-popup v-show="isShowModal && !isAuthUser" @closePopup="closePopup">
      <AppLogin />
    </app-popup>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import AppCartItem from './AppCartItem.vue';
import AppLogin from './AppLogin.vue';

import auth from '@/mixins/auth.js';

import { createNamespacedHelpers } from 'vuex';

export default {
  created() {
    if (!this.destinationPoints.length) return;
    this.fetchTariffToDelivery();
  },
  computed: {
    isSendOrderDisabled() {
      return (
        this.isCartEmpty || !this.checkOnEqualActiveStoreUUID(this.uuidStore)
      );
    },
    ...createNamespacedHelpers('cart').mapGetters([
      'isCartEmpty',
      'isWithoutDelivery',
      'getCartProducts',
      'getTotalPrice',
      'getDeliveryPrice',
      'checkOnEqualActiveStoreUUID'
    ])
  },
  watch: {
    destinationPoints() {
      this.fetchTariffToDelivery();
    }
  },
  methods: {
    async changeWithoutDelivery() {
      if (this.isWithoutDelivery) await this.fetchTariffToDelivery();
      this.changeWithoutDeliveryState();
    },
    async fetchTariffToDelivery() {
      await this.getTariffToDelivery({
        routeFrom: JSON.parse(localStorage.getItem('location')),
        routeTo: this.destinationPoints[0],
        serviceUUID: '6b73e9e3-927b-453c-81c4-dfae818291f4'
      });
    },
    async sendOrder() {
      if (this.isSendOrderDisabled || !this.destinationPoints.length) return;
      if (!this.isAuthUser) return (this.isShowModal = true);
      try {
        // Refresh Token
        await this.refreshToken();
        // Create Order Action
        await this.createOrder({
          routeFrom: JSON.parse(localStorage.getItem('location')),
          routeTo: this.destinationPoints[0]
        });
        Swal.fire({
          title: 'Заказ успешно оформлен',
          text: 'Ожидайте звонка оператора',
          icon: 'success',
          confirmButtonColor: '#fc5b58'
        });
        this.clearCart();
      } catch (e) {
        console.log(e);
        Swal.fire({
          title: 'Упс... Что-то пошло не так',
          icon: 'error',
          confirmButtonColor: '#fc5b58'
        });
      }
    },
    confirmCreateOrder() {
      if (this.isSendOrderDisabled || !this.destinationPoints.length) return;
      if (!this.isAuthUser) return (this.isShowModal = true);
      this.$router.push({
        name: 'Checkout',
        params: {
          destinationPoints: this.destinationPoints,
          preparationTime: this.preparationTime,
          uuidStore: this.uuidStore
        }
      });
      // Swal.fire({
      //   title: 'Подтверждение заказа',
      //   text: 'Вы уверены, что хотите подтвердить заказ?',
      //   icon: 'question',
      //   showCancelButton: true,
      //   confirmButtonColor: '#fc5b58',
      //   confirmButtonText: 'Подтвердить',
      //   cancelButtonText: 'Отмена'
      // }).then(result => {
      //   if (result.value) {
      //     this.sendOrder();
      //   }
      // });
    },
    confirmClearCart() {
      Swal.fire({
        title: 'Удаление корзины',
        text: 'Все ранее добавленные Вами товары будут удалены',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#fc5b58',
        confirmButtonText: 'Подтвердить',
        cancelButtonText: 'Отмена'
      }).then(result => {
        if (result.value) {
          this.clearCart();
        }
      });
    },
    clearCart() {
      this.clearCartOfProducts();
    },
    closePopup() {
      this.isShowModal = false;
    },
    ...createNamespacedHelpers('cart').mapActions([
      'clearCartOfProducts',
      'getTariffToDelivery',
      'createOrder',
      'changeWithoutDeliveryState'
    ]),
    ...createNamespacedHelpers('auth').mapActions(['refreshToken'])
  },
  props: {
    destinationPoints: {
      type: Array,
      default: () => [],
      required: true
    },
    uuidStore: {
      type: String,
      default: '',
      required: true
    },
    preparationTime: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data: () => ({
    isShowModal: false
  }),
  mixins: [auth],
  name: 'AppCart',
  components: {
    AppCartItem,
    AppLogin
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
  &__without-delivery-label {
    cursor: pointer;
    user-select: none;
  }
  &__without-delivery {
    padding-bottom: 10px;
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
<style lang="scss">
$toggle-width: 40px;
$toggle-height: $toggle-width / 2;
$toggle-bg-color: #c6c6c6;
$toggle-bg-color-active: $theme-mainColor;
$toggle-color: #fff;

.toggle-button {
  position: relative;
  width: $toggle-width;
  height: $toggle-height;
  -webkit-appearance: none;
  background-color: $toggle-bg-color;
  border-radius: $toggle-height;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
  cursor: pointer;
}

.toggle-button:checked {
  background-color: $toggle-bg-color-active;
}

.toggle-button:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: $toggle-height;
  height: $toggle-height;
  background-color: $toggle-color;
  border-radius: $toggle-height / 2;
  transform: scale(1.1);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

.toggle-button:checked:before {
  left: $toggle-height;
}
</style>
