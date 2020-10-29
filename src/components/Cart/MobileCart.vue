<template>
  <div>
    <div class="mobile-cart-page-header">
      <div class="mobile-cart-page-header__root">
        <div
          @click="$router.go(-1)"
          class="mobile-cart-page-header__back"
        ></div>
        <div
          v-if="!isCartEmpty"
          @click="confirmClearCart"
          class="mobile-cart-page-header__clear"
        ></div>
      </div>
    </div>
    <!-- Cart Empty-->
    <div v-if="isCartEmpty" class="mobile-cart-page-empty">
      <div class="mobile-cart-page-empty__pocket"></div>
      <div class="mobile-cart-page-empty__title">Корзина пуста</div>
      <div class="mobile-cart-page-empty__message">
        Перейдите к списку мест, чтобы оформить заказ заново
      </div>
    </div>
    <!-- Cart Items -->
    <div v-if="!isCartEmpty" class="mobile-cart-page-items">
      <h1 class="mobile-cart-page-items__cart-title">Заказ</h1>
      <div class="mobile-cart-page-items__list-items">
        <div
          v-for="[key, { menuItem, extra, quantity }] in Object.entries(
            getCartProducts
          )"
          :key="key"
          class="mobile-swippable-list-item"
        >
          <div class="mobile-swippable-list-item__content">
            <!-- Cart Item -->
            <MobileCartItem
              :cart-item="menuItem"
              :extra="extra"
              :quantity="quantity"
              :key-index="key"
            />
          </div>
        </div>
      </div>
      <div class="app-cart__without-delivery app-cart__delivery-fee">
        <div class="app-cart__delivery-fee-wrapper">
          <label
            for="without_delivery"
            class="app-cart__without-delivery-label app-cart__delivery-fee-name"
          >
            Заберу сам
          </label>
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
      <div class="mobile-cart-page-items__receiving-wrapper">
        <div class="mobile-cart-page-items__receiving-title">Доставка</div>
        <div class="mobile-cart-page-items__receiving-info">
          {{ getDeliveryPrice }} ₽
        </div>
      </div>
    </div>
    <!-- Cart Footer -->
    <div class="mobile-cart-page-footer">
      <div v-if="isCartEmpty" class="mobile-cart-page-footer__button-wrap">
        <router-link
          :to="{ name: 'CatalogPage' }"
          class="mobile-cart-page-footer__button"
        >
          <span class="mobile-cart-page-footer__button-content">
            Вернуться на главную
          </span>
        </router-link>
      </div>
      <div v-else class="mobile-cart-page-footer__cart-bar">
        <div class="mobile-cart-page-footer__button-wrap">
          <div class="mobile-cart-page-footer__cart-button-content">
            <div class="mobile-cart-page-footer__cart-button-price">
              {{ getTotalPrice }} ₽
            </div>
            <div class="mobile-cart-page-footer__cart-button-time">
              {{ Math.floor(preparationTime / 60) }} мин
            </div>
          </div>
          <button
            @click="confirmCreateOrder"
            :disabled="isSendOrderDisabled"
            class="mobile-cart-page-footer__button"
          >
            <span class="mobile-cart-page-footer__button-content">Далее</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MobileCartItem from '../CartItem/MobileCartItem.vue';
import auth from '@/mixins/auth.js';
import cart from './cart.js';
export default {
  mixins: [auth, cart],
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
  name: 'MobileCart',
  components: {
    MobileCartItem
  }
};
</script>

<style lang="scss" scoped>
.mobile-cart-page-header {
  top: 0px;
  position: sticky;
  z-index: 5;
  box-shadow: 0 8px 8px -4px rgba(0, 0, 0, 0.05);
  &__root {
    display: flex;
    position: relative;
    flex-wrap: nowrap;
    min-height: 64px;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    width: 100vw;
    box-shadow: none;
  }
  &__back {
    flex: 0 0 24px;
    width: 24px;
    height: 24px;
    margin: 20px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xMS40ODUzIDVMMTIuODk5NSA2LjQxNDIyTDcuODI4NDMgMTEuNDg1M0gyMC41VjEzLjQ4NTNINy44Mjg0M0wxMi44OTk1IDE4LjU1NjNMMTEuNDg1MyAxOS45NzA2TDQgMTIuNDg1M0wxMS40ODUzIDVaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K);
  }
  &__clear {
    flex: 0 0 24px;
    width: 24px;
    height: 24px;
    margin: 20px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoMzR2MzRIMHoiLz48cGF0aCBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xMCAxYy0uNTIzIDAtMS4wNTkuMTg0LTEuNDM4LjU2M0M4LjE4NCAxLjk0IDggMi40NzcgOCAzdjFINGExIDEgMCAxIDAgMCAydjEzYzAgMS42NDUgMS4zNTUgMyAzIDNoMTBjMS42NDUgMCAzLTEuMzU1IDMtM1Y2YTEgMSAwIDAgMCAwLTJoLTRWM2MwLS41MjMtLjE4NC0xLjA1OS0uNTYzLTEuNDM4QzE1LjA2IDEuMTg0IDE0LjUyNCAxIDE0IDFoLTR6bTAgMmg0djFoLTRWM3pNNiA2aDEydjEzYzAgLjU1NS0uNDQ1IDEtMSAxSDdjLS41NTUgMC0xLS40NDUtMS0xVjZ6bTMgM3Y4aDJWOUg5em00IDB2OGgyVjloLTJ6Ii8+PC9nPjwvc3ZnPg==);
  }
}
// mobile-cart-page-items
.mobile-cart-page-items {
  min-width: 100vw;
  margin-top: 10px;
  background: white;
  &__cart-title {
    margin: 20px 0 10px 16px;
    font-size: 32px;
    font-weight: bold;
  }
  &__receiving-wrapper {
    margin: 10px 16px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__receiving-title {
    font-size: 18px;
    font-weight: 500;
    // margin-bottom: 20px;
  }
  &__receiving-info {
    display: flex;
    // margin-top: 20px;
    align-items: center;
    justify-content: space-between;
  }
}
// mobile-cart-page-footer
.mobile-cart-page-footer {
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: #ffffff;
  box-shadow: 0px -4px 20px rgba(117, 115, 111, 0.2);
  &__cart-bar {
    display: flex;
    flex-direction: column;
  }
  &__button-wrap {
    display: flex;
    padding: 8px 16px 24px;
  }
  &__cart-button-content {
    display: flex;
    margin-right: 25px;
    flex-direction: column;
    justify-content: center;
  }
  &__cart-button-price {
    font-size: 24px;
    font-weight: 500;
    white-space: nowrap;
  }
  &__cart-button-time {
    font-size: 13px;
    margin-top: 3px;
    white-space: nowrap;
    font-weight: 500;
  }
  &__button {
    height: auto;
    padding: 8px 11px;
    z-index: 1;
    min-height: 56px;
    border-radius: 16px;
    width: 100%;
    display: block;
    position: relative;
    overflow: hidden;
    font-size: 16px;
    transition: background 200ms;
    font-weight: 400;
    user-select: none;
    background-color: $theme-mainColor;
    color: $theme-textColor;
    border: 0;
    &:disabled {
      opacity: 0.7;
    }
  }
  &__button-content {
    display: flex;
    white-space: unset;
    justify-content: center;
    position: relative;
    flex-wrap: nowrap;
    align-items: center;
    line-height: normal;
    width: 100%;
    height: 100%;
  }
}

.mobile-swippable-list-item {
  width: 100%;
  position: relative;
  overflow: hidden;
  max-height: 200px;
}

.app-cart {
  &__without-delivery-label {
    cursor: pointer;
    user-select: none;
  }
  &__without-delivery {
    padding-bottom: 10px;
  }
  &__delivery-fee {
    padding: 10px 16px;
    padding-top: 20px;
    font-weight: 100;
  }
  &__delivery-fee-wrapper {
    display: flex;
  }
  &__delivery-fee-name {
    font-size: 18px;
    font-weight: 500;
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
// mobile-cart-page-empty
.mobile-cart-page-empty {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: center;
  &__pocket {
    flex: 0 0 143px;
    height: 153px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDMiIGhlaWdodD0iMTU0IiB2aWV3Qm94PSIwIDAgMTQzIDE1NCI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjRUVFIiBkPSJNMTEuNzY0IDI5aDEwOC45NTRhMiAyIDAgMCAxIDEuOTkgMS44MDFMMTM1IDE1NEgyLjYyNGEyIDIgMCAwIDEtMS45MjgtMi41M2wzLjc5Ni0xMy44MDdhMiAyIDAgMCAwIC4wNjktLjQzMkw5Ljc2NyAzMC45MDJBMiAyIDAgMCAxIDExLjc2NCAyOXoiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTYuMjk0IDI2aDEwOS4wNGEyIDIgMCAwIDEgMS45ODggMS43NzlsMTIuMDU0IDEwOC4yNzZhMiAyIDAgMCAwIC4wMjguMTc1bDMuMTEgMTUuMzczYTIgMiAwIDAgMS0xLjk2IDIuMzk3SDE4LjMzNGEyIDIgMCAwIDEtMS45OC0xLjcxMmwtMi4zMzItMTUuOTk4YTIgMiAwIDAgMS0uMDItLjI5NGwuMjkzLTEwOC4wMDFhMiAyIDAgMCAxIDItMS45OTV6Ii8+PGcgZmlsbD0iIzAwMCIgdHJhbnNmb3JtPSJyb3RhdGUoLTQ1IDE0Ny4wNjkgLTcyLjAxOCkiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjEzIiB4PSI2IiByeD0iMSIvPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjEzIiB4PSI2IiByeD0iMSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNyA2LjUpIi8+PC9nPjxnIGZpbGw9IiMwMDAiIHRyYW5zZm9ybT0icm90YXRlKC00NSAxMjAuNTY5IC04LjA0MikiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjEzIiB4PSI2IiByeD0iMSIvPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjEzIiB4PSI2IiByeD0iMSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNyA2LjUpIi8+PC9nPjxwYXRoIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNNjUuNDQ0IDEwOGgyMy4xMTIiLz48cGF0aCBzdHJva2U9IiNCMEIwQjAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNNDggMjV2LTIuODcxYzAtOS43NTYgNy4wNjktMTcuODkgMTYuNDUxLTE5LjczNkEyMC45NjQgMjAuOTY0IDAgMCAxIDY4LjUgMmM4LjE3NCAwIDE1LjIzMSA0LjY5OCAxOC41MjMgMTEuNDk0QTE5Ljc1IDE5Ljc1IDAgMCAxIDg5IDIyLjEzVjI1Ii8+PHBhdGggc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTU1IDQyVjIxLjVDNTUgMTAuMTc4IDY0LjE3OCAxIDc1LjUgMVM5NiAxMC4xNzggOTYgMjEuNVY0MiIvPjwvZz48L3N2Zz4=);
  }
  &__title {
    flex: 0 0 100%;
    font-size: 20px;
    text-align: center;
    margin-top: 36px;
    font-weight: bold;
  }
  &__message {
    flex: 0 0 100%;
    color: #b0b0b0;
    font-size: 12px;
    text-align: center;
    margin-top: 12px;
    line-height: 1.67;
  }
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
