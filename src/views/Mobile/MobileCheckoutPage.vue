<template>
  <div class="mobile-checkout-page">
    <div class="mobile-checkout-page__header">
      <div class="mobile-checkout-page__header-title">Оформление заказа</div>
    </div>
    <div class="mobile-checkout-page-content">
      <div class="mobile-checkout-page-content__group">
        <div class="mobile-checkout-page-content__title">Адрес доставки</div>
        <div class="mobile-checkout-page-labeled-field">
          <div class="mobile-checkout-page-labeled-field__label">
            Адрес доставки
          </div>
          <div class="mobile-checkout-page-labeled-field__content">
            <div class="mobile-checkout-page-labeled-field__value">
              {{ getCurrentLocation.unrestricted_value }}
            </div>
            <div class="mobile-checkout-page-labeled-field__lock-icon"></div>
          </div>
        </div>
        <div class="mobile-checkout-page-delivery-address">
          <div class="mobile-checkout-page-delivery-address__left">
            <div class="mobile-checkout-page-delivery-address__container">
              <div class="group">
                <input v-model="meta.front_door" type="text" required />
                <span class="bar"></span>
                <label>Кв./офис</label>
              </div>
            </div>
          </div>
          <div class="mobile-checkout-page-delivery-address__right">
            <div class="mobile-checkout-page-delivery-address__container">
              <div class="group">
                <input v-model="meta.intercom" type="text" required />
                <span class="bar"></span>
                <label>Домофон</label>
              </div>
            </div>
          </div>
          <div class="mobile-checkout-page-delivery-address__left">
            <div class="mobile-checkout-page-delivery-address__container">
              <div class="group">
                <input v-model="meta.entrance" type="text" required />
                <span class="bar"></span>
                <label>Подъезд</label>
              </div>
            </div>
          </div>
          <div class="mobile-checkout-page-delivery-address__right">
            <div class="mobile-checkout-page-delivery-address__container">
              <div class="group">
                <input v-model="meta.floor" type="text" required />
                <span class="bar"></span>
                <label>Этаж</label>
              </div>
            </div>
          </div>
        </div>
        <div class="mobile-checkout-page-comment">
          <div class="group">
            <textarea required rows="3" spellcheck="false"></textarea>
            <span class="bar"></span>
            <label>Комментарий к заказу</label>
          </div>
        </div>
      </div>
      <div class="mobile-checkout-page-content__group">
        <div class="mobile-checkout-page-content__title">Способ оплаты</div>
        <label class="mobile-checkout-page-payment-method">
          <div class="mobile-checkout-page-payment-method__content">
            <div class="mobile-checkout-page-payment-method__text">
              Картой онлайн
            </div>
            <div class="mobile-checkout-page-payment-method__control">
              <input v-model="payType" value="card" type="radio" />
              <span class="checkmark checkradio"></span>
            </div>
          </div>
        </label>
        <label class="mobile-checkout-page-payment-method">
          <div class="mobile-checkout-page-payment-method__content">
            <div class="mobile-checkout-page-payment-method__text">
              Оплата наличными
            </div>
            <div class="mobile-checkout-page-payment-method__control">
              <input v-model="payType" value="cash" type="radio" />
              <span class="checkmark checkradio"></span>
            </div>
          </div>
        </label>
      </div>
    </div>
    <MobileBottomBar
      @BottomBarClick="cloudPay"
      restaurant-name="Подтвердить"
      :price="getTotalPrice"
    />
  </div>
</template>

<script>
import auth from '@/mixins/auth.js';
import cart from '@/components/Cart/cart.js';
import { createNamespacedHelpers } from 'vuex';
export default {
  mixins: [auth, cart],
  name: 'CheckoutPage',
  created() {
    const {
      destinationPoints,
      preparationTime,
      uuidStore
    } = this.$route.params;
    if (!uuidStore) this.$router.go(-1);
    this.destinationPoints = destinationPoints;
    this.preparationTime = preparationTime;
    this.uuidStore = uuidStore;
    console.log(this.$route.params);
  },
  data: () => ({
    destinationPoints: [],
    preparationTime: 0,
    uuidStore: ''
  }),
  computed: {
    ...createNamespacedHelpers('cart').mapGetters(['getTotalPrice']),
    ...createNamespacedHelpers('location').mapGetters(['getCurrentLocation'])
  },
  components: {
    MobileBottomBar: () => import('@/components/BottomBar/MobileBottomBar.vue')
  }
};
</script>

<style lang="scss" scoped>
.mobile-checkout-page {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1;
  height: 100%;
  padding-bottom: 56px;
  &__header {
    position: relative;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    min-height: 64px;
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.03);
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
  }
  &__header-title {
    flex: 0 0 100%;
    padding: 0 74px;
    overflow: hidden;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.mobile-checkout-page-content {
  padding-top: 8px;
  background-color: #fafafa;
  &__group {
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    padding-top: 27px;
    padding-left: 16px;
    margin-bottom: 8px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding-bottom: 16px;
    background-color: #ffffff;
  }
  &__title {
    color: #000000;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 25px;
  }
}
.mobile-checkout-page-labeled-field {
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  &__label {
    color: #b0b0b0;
    font-size: 12px;
    padding-top: 9px;
    padding-bottom: 4px;
  }
  &__content {
    display: flex;
    align-items: center;
    padding-bottom: 6px;
    justify-content: space-between;
  }
  &__value {
    color: #b0b0b0;
    padding-right: 44px;
    font-size: 14px;
    line-height: 1.43;
  }
  &__lock-icon {
    right: 20px;
    bottom: 5px;
    position: absolute;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNCMEIwQjAiIGQ9Ik02IDExaDEydjlINnoiLz48cGF0aCBzdHJva2U9IiNCMEIwQjAiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTkgMTJoNlY4YTMgMyAwIDAgMC02IDB2NHoiLz48L2c+PC9zdmc+);
    width: 24px;
    height: 24px;
    display: inline-block;
    background-size: 24px 24px;
    background-repeat: no-repeat;
    background-position: center;
  }
}
.mobile-checkout-page-delivery-address {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &__left {
    width: calc(50% - 20px);
    margin-top: 26px;
  }
  &__right {
    width: 50%;
    margin-top: 26px;
  }
  &__container {
    display: flex;
    position: relative;
    font-size: 16px;
    line-height: 1.4;
    // border-bottom: 1px solid #f5f5f5;
  }
}
.mobile-checkout-page-comment {
  height: 64px;
  position: relative;
  // border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  margin-top: 20px;
  width: 100%;
}

.mobile-checkout-page-payment-method {
  flex: 1;
  display: flex;
  align-items: center;
  &__content {
    flex: 1;
    height: 60px;
    display: flex;
    margin-left: 16px;
    padding-top: 20px;
    align-items: center;
    padding-right: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding-bottom: 20px;
    justify-content: space-between;
  }
  &__text {
    height: 20px;
    font-size: 14px;
    padding-top: 2px;
    line-height: 1.43;
  }
  &__control {
    position: relative;
  }
}

/* form starting stylings ------------------------------- */
.group {
  position: relative;
  width: 100%;
  // margin-bottom: 45px;
}
input,
textarea {
  font-size: 14px;
  padding: 10px 10px 10px 5px;
  // display: block;
  // width: 300px;
  width: 100%;
  border: none;
  resize: none;
  // border-bottom: 1px solid #757575;

  border-bottom: 1px solid #f5f5f5;
}
input:focus,
textarea:focus {
  outline: none;
}

/* LABEL ======================================= */
input ~ label,
textarea ~ label {
  color: #999;
  font-size: 14px;
  font-weight: 100;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}
textarea ~ label {
  top: 30px;
}

/* active state */
input:focus ~ label,
input:valid ~ label,
textarea:focus ~ label,
textarea:valid ~ label {
  top: -10px;
  font-size: 12px;
  color: $theme-mainColor;
}

/* BOTTOM BARS ================================= */
.bar {
  position: relative;
  display: block;
  // width: 300px;
  width: 100%;
}
.bar:before,
.bar:after {
  content: '';
  height: 2px;
  width: 0;
  bottom: 1px;
  position: absolute;
  background: $theme-mainColor;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}
.bar:before {
  left: 50%;
}
.bar:after {
  right: 50%;
}

/* active state */
input:focus ~ .bar:before,
input:focus ~ .bar:after,
textarea:focus ~ .bar:before,
textarea:focus ~ .bar:after {
  width: 50%;
}
</style>
