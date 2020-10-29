<template>
  <div class="checkout-page">
    <div class="checkout-page__content-wrapper">
      <div class="checkout-page__content">
        <div class="checkout-page__form-with-meta">
          <div class="checkout-page__form-wrapper">
            <div class="checkout-page__form">
              <div class="checkout-page-form">
                <div class="checkout-page-form__group"></div>
                <div class="checkout-page-form__group">
                  <div class="checkout-page-form-address">
                    <div class="checkout-page-form-address__title">
                      Адрес доставки
                    </div>
                    <div class="checkout-page-form-address__inputs">
                      <div class="checkout-page-form-address__input">
                        <div
                          class="checkout-page-form-address__input-container disabled"
                        >
                          <input
                            :value="getCurrentLocation.unrestricted_value"
                            disabled
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      class="checkout-page-form-address__inputs checkout-page-form-address__inputs-row"
                    >
                      <!--  -->
                      <div class="checkout-page-form-address__input">
                        <div class="checkout-page-form-address__input-label">
                          Кв./офис
                        </div>
                        <div
                          class="checkout-page-form-address__input-container"
                        >
                          <input v-model="meta.front_door" type="text" />
                        </div>
                      </div>
                      <!--  -->
                      <div class="checkout-page-form-address__input">
                        <div class="checkout-page-form-address__input-label">
                          Домофон
                        </div>
                        <div
                          class="checkout-page-form-address__input-container"
                        >
                          <input v-model="meta.intercom" type="text" />
                        </div>
                      </div>
                      <!--  -->
                      <div class="checkout-page-form-address__input">
                        <div class="checkout-page-form-address__input-label">
                          Подъезд
                        </div>
                        <div
                          class="checkout-page-form-address__input-container"
                        >
                          <input v-model="meta.entrance" type="text" />
                        </div>
                      </div>
                      <!--  -->
                      <div class="checkout-page-form-address__input">
                        <div class="checkout-page-form-address__input-label">
                          Этаж
                        </div>
                        <div
                          class="checkout-page-form-address__input-container"
                        >
                          <input v-model="meta.floor" type="text" />
                        </div>
                      </div>
                    </div>
                    <div class="checkout-page-form-address__inputs">
                      <div class="checkout-page-form-address__input">
                        <div class="checkout-page-form-address__input-label">
                          Комментарий к заказу
                        </div>
                        <div
                          class="checkout-page-form-address__input-container"
                        >
                          <textarea v-model="meta.comment" type="text" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="checkout-page-form__group">
                  <div class="checkout-page-form-pay">
                    <div class="checkout-page-form-pay__title">Оплата</div>
                    <div class="checkout-page-form-pay__inputs">
                      <!-- <label class="checkout-page-form-pay__input">
                        <div class="checkout-page-form-pay__radio-control">
                          <div class="options-item__control">
                            <input
                              v-model="payType"
                              value="card"
                              type="radio"
                            />
                            <span class="checkmark checkradio"></span>
                          </div>
                        </div>
                        <div class="checkout-page-form-pay__radio-content">
                          <div
                            class="checkout-page-form-pay__radio-content-title"
                          >
                            Оплата банковской картой
                          </div>
                          <div
                            class="checkout-page-form-pay__radio-content-description"
                          >
                            Мы заморозим сумму заказа на вашей карте и спишем
                            после доставки
                          </div>
                          <div class="checkout-page-form-pay__input-container">
                            <input
                              type="text"
                              placeholder="Промокод (если есть)"
                            />
                            <button class="button button--yellow">
                              Применить
                            </button>
                          </div>
                        </div>
                      </label> -->
                      <label class="checkout-page-form-pay__input">
                        <div class="checkout-page-form-pay__radio-control">
                          <div class="options-item__control">
                            <input
                              v-model="payType"
                              value="cash"
                              type="radio"
                            />
                            <span class="checkmark checkradio"></span>
                          </div>
                        </div>
                        <div class="checkout-page-form-pay__radio-content">
                          <div
                            class="checkout-page-form-pay__radio-content-title"
                          >
                            Оплата наличными
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="checkout-page__meta">
            <div class="checkout-page-meta">
              <div class="info-header__delivery-by-us"></div>
              <div class="checkout-page-meta__delivery-time">
                <div class="checkout-page-meta__delivery-time-title">
                  Время доставки
                </div>
                <div class="checkout-page-meta__delivery-time-value">
                  <span>{{ Math.floor(preparationTime / 60) }} мин</span>
                </div>
              </div>
              <div class="checkout-page-meta__total-price">
                <div class="checkout-page-meta__total-price-title">Итого</div>
                <div class="checkout-page-meta__total-price-value">
                  {{ getTotalPrice }} ₽
                </div>
              </div>
              <div class="checkout-page-meta__divider"></div>
              <div class="checkout-page-meta__cutlery">
                <button @click="sendOrder" class="button button--yellow">
                  Подтвердить заказ
                </button>
                <!-- <div class="checkout-page-meta__cutlery-title">
                  Количество приборов
                </div>
                <div class="checkout-page-meta__cutlery-value">
                  <div class="checkout-page-meta__cutlery-value-counter">
                    <span class="cutlery-value-counter">
                      <div class="cutlery-value-counter__control">-</div>
                      <div class="cutlery-value-counter__value">1</div>
                      <div class="cutlery-value-counter__control">+</div>
                    </span>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="checkout-page__button">
          <!-- <button class="button button--yellow">Перейти к оплате</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '@/mixins/auth.js';
import cart from '@/components/Cart/cart.js';
import { createNamespacedHelpers } from 'vuex';
export default {
  mixins: [auth, cart],
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
  },
  data: () => ({
    destinationPoints: [],
    preparationTime: 0,
    uuidStore: ''
  }),
  computed: {
    ...createNamespacedHelpers('cart').mapGetters(['getTotalPrice']),
    ...createNamespacedHelpers('location').mapGetters(['getCurrentLocation'])
  }
};
</script>

<style lang="scss" scoped>
.checkout-page {
  display: flex;
  min-height: calc(100vh - 100px);
  align-items: stretch;
  &__content-wrapper {
    flex: 1 1 auto;
  }
  &__content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  &__form-with-meta {
    flex: 1 1 auto;
    display: flex;
    border-radius: 4px;
    flex-direction: column;
    background-color: #f2f2f2;
  }
  &__form-wrapper {
    flex: 1 1 auto;
    padding: 13px 40px;
    overflow-x: auto;
    overflow-y: auto;
  }
  &__meta {
    flex: 0 0 auto;
  }
  &__button {
    margin-top: 10px;
  }
  &__form {
    width: 470px;
  }
}
.checkout-page-form {
  &__group {
    padding: 10px 0;
  }
}
.checkout-page-form-address {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 18px;
  &__input-label {
    color: #b0b0b0;
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
  }
  &__title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 18px;
  }
  &__inputs {
    margin: 0 -5px;
  }
  &__inputs-row {
    display: flex;
  }
  &__input {
    flex: 1;
    margin: 0 5px;
    margin-bottom: 10px;
  }
  &__input-container {
    width: 100%;
    border: 1px solid #cecece;
    display: inline-flex;
    position: relative;
    overflow: hidden;
    font-size: 16px;
    background: #ffffff;
    box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    line-height: 1.15;
    border-radius: 4px;
    &.disabled {
      background-color: #e6e6e6;
    }
    > input {
      flex: 1 1 auto;
      height: auto;
      resize: vertical;
      border: none;
      padding: 7px 10px;
      outline: none;
      font-size: 16px;
      box-shadow: none;
      line-height: 1.15;
      border-radius: 0;
      background-color: transparent;
      :disabled {
        background-color: #e6e6e6;
      }
    }
    > textarea {
      min-height: 32px;
      flex: 1 1 auto;
      height: auto;
      resize: vertical;
      border: none;
      padding: 7px 10px;
      outline: none;
      font-size: 16px;
      box-shadow: none;
      line-height: 1.15;
      border-radius: 0;
      background-color: transparent;
    }
  }
}
.checkout-page-form-pay {
  &__title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 18px;
  }
  &__input {
    display: flex;
    margin: 0 5px;
    margin-bottom: 10px;
  }
  &__radio-control {
    margin-right: 5px;
  }
  &__radio-content {
  }
  &__radio-content-title {
    line-height: 22px;
    margin-bottom: 5px;
    font-weight: bold;
  }
  &__radio-content-description {
    color: #b0b0b0;
    font-size: 14px;
    margin-bottom: 10px;
  }
}
.checkout-page-form-pay {
  &__input-container {
    display: flex;
    border: 1px solid #cecece;
    position: relative;
    overflow: hidden;
    font-size: 16px;
    background: #ffffff;
    box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    line-height: 1.15;
    border-radius: 4px;
    > input {
      flex: 1 1 auto;
      height: auto;
      resize: vertical;
      border: none;
      padding: 7px 10px;
      outline: none;
      font-size: 16px;
      box-shadow: none;
      line-height: 1.15;
      border-radius: 0;
      background-color: transparent;
    }
    > button {
      flex: 0 0 auto;
      width: auto;
      height: auto;
      font-size: 14px;
      min-height: auto;
      border-radius: 0;
    }
  }
}
.checkout-page-meta {
  width: 100%;
  display: flex;
  padding: 20px 40px;
  position: relative;
  border-top: solid 1px #dbdbdb;
  &__cutlery {
    @media only screen and (min-width: 1180px) {
      display: flex;
      margin-top: 10px;
      align-items: center;
    }
  }
  &__cutlery-title {
    color: #b0b0b0;
    font-size: 14px;
    padding-bottom: 7px;
    @media only screen and (min-width: 1180px) {
      color: #000000;
      margin-right: 25px;
      padding-bottom: 0;
    }
  }
  &__delivery {
    width: 37px;
    height: 42px;
    position: relative;
    margin-right: 15px;
  }
  &__delivery-time-title {
    color: #b0b0b0;
    font-size: 14px;
    padding-bottom: 7px;
  }
  &__delivery-time-value {
    font-size: 25px;
  }
  &__total-price {
    margin-left: 20px;
    margin-right: auto;
  }
  &__total-price-title {
    color: #b0b0b0;
    font-size: 14px;
    padding-bottom: 7px;
  }
  &__total-price-value {
    font-size: 25px;
  }
  &__divider {
    margin: -20px 40px;
    padding: 20px 0;
    position: relative;
    border-left: solid 1px #dbdbdb;
    &::before {
      top: 0;
      left: 0;
      height: 100%;
      content: '';
      position: absolute;
      border-left: solid 1px #f7f7f7;
    }
  }
  &__cutlery-value-counter {
    border: solid 1px #cecece;
    display: inline-block;
    background: #eeeeee;
    border-radius: 4px;
  }
}
.cutlery-value-counter {
  display: flex;
  text-align: center;
  align-items: center;
  line-height: 23px;
  &__control {
    margin: 2px 6px;
    font-size: 28px;
    font-weight: 100;
    width: 24px;
    height: 24px;
    cursor: pointer;
    line-height: 24px;
    user-select: none;
  }
  &__value {
    width: 46px;
    margin: 0;
    border: solid 1px #cecece;
    padding: 2px 0;
    border-top: none;
    background: #ffffff;
    box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    border-bottom: none;
    min-width: 24px;
    font-size: 16px;
    line-height: 24px;
  }
}
</style>
