<template>
  <div class="mobile-fullscreen-modal">
    <div class="mobile-fullscreen-modal-layout">
      <div class="mobile-fullscreen-modal__header">
        <div class="mobile-fullscreen-modal__control-container">
          <div class="mobile-fullscreen-modal__control">
            <div
              @click="closeOrderHistory"
              class="mobile-fullscreen-modal__control-close"
            ></div>
          </div>
        </div>
        <div class="mobile-fullscreen-modal__content-container">
          <div class="mobile-fullscreen-modal__content">
            <img
              :src="getLogo"
              class="mobile-fullscreen-modal__logo"
              alt="FaemDelivery"
            />
          </div>
        </div>
        <div class="mobile-fullscreen-modal__control-container">
          <div class="mobile-fullscreen-modal__control"></div>
        </div>
      </div>
      <div class="mobile-fullscreen-modal__body">
        <div class="mobile-fullscreen-modal__body-content">
          <div
            v-if="isOrderHistoryEmpty"
            class="mobile-single-order-modal__none-order"
          >
            У вас нет заказов
          </div>
          <template v-else>
            <div
              v-for="order in orderHistory"
              :key="order.uuid"
              class="mobile-single-order-modal"
            >
              <div>
                <div class="mobile-single-order-modal__main-info">
                  <div class="mobile-single-order-modal__name">
                    {{ order.products_data.store.name }}
                  </div>
                  <div class="mobile-single-order-modal__price-wrapper">
                    <div class="mobile-single-order-modal__price">
                      {{
                        getTotalPrice(
                          order.products_data.products,
                          order.tariff.total_price
                        )
                      }}
                      ₽
                    </div>
                  </div>
                </div>
                <div class="mobile-single-order-modal__meta">
                  {{ getCreateAtDate(order.created_at_unix) }}
                  <span class="mobile-single-order-modal__status">
                    — {{ order.state_title }}
                  </span>
                </div>
                <div>
                  <div class="mobile-single-order-modal__menu-items">
                    <div
                      v-for="product in order.products_data.products"
                      :key="product.uuid"
                      class="mobile-single-order-modal__menu-item"
                    >
                      <div class="mobile-single-order-modal__menu-item-info">
                        <div>{{ product.name }}</div>
                        <div class="mobile-single-order-modal__menu-item-count">
                          {{ product.number }}&nbsp;×&nbsp;
                        </div>
                        <div>{{ getPrice(product) }} ₽</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                @click="confirmCancelOrder(order.uuid)"
                class="mobile-single-order-modal__interaction-button"
              >
                <span
                  class="mobile-single-order-modal__interaction-button-content"
                >
                  Отменить
                </span>
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import orderHistory from './orderHistory.js';
import special from '@/mixins/special.js';
export default {
  mixins: [orderHistory, special],
  methods: {
    closeOrderHistory() {
      this.$emit('closeOrderHistory');
    }
  },
  name: 'MobileOrderHistory'
};
</script>

<style lang="scss" scoped>
.mobile-fullscreen-modal {
  background: #ffffff;
  position: fixed;
  overflow: hidden;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  position: fixed;
  z-index: 90000;
}
.mobile-fullscreen-modal-layout {
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  max-height: 100%;
  flex-direction: column;
}
.mobile-fullscreen-modal {
  &__body {
    flex: 1 0 auto;
    position: relative;
  }
  &__body-content {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    position: absolute;
    overflow: auto;
    transition: all 400ms;
    line-height: initial;
    white-space: initial;
  }
}
.mobile-single-order-modal {
  padding: 20px 15px 20px 0;
  margin-left: 15px;
  border-bottom: 1px solid #eee;
  font-weight: 100;
  &__main-info {
    display: flex;
  }
  &__name {
    display: flex;
    align-items: center;
  }
  &__price-wrapper {
    margin-left: auto;
  }
  &__price {
    border: 1px solid #b0b0b0;
    padding: 4px 6px;
    border-radius: 4px;
  }

  &__meta {
    padding-top: 20px;
  }
  &__status {
    color: #b0b0b0;
  }

  &__menu-items {
    padding-top: 10px;
  }
  &__menu-item {
    padding-top: 10px;
  }
  &__menu-item-info {
    display: flex;
  }
  &__menu-item-count {
    margin-left: auto;
    padding-left: 15px;
  }

  &__interaction-button {
    width: 100%;
    height: 44px;
    border-radius: 16px;
    margin-top: 20px;
    border: 0;
    display: inline-block;
    padding: 0 20px;
    position: relative;
    overflow: hidden;
    font-size: 16px;
    color: $theme-textColor;
    background-color: $theme-mainColor;
  }
  &__interaction-button-content {
    width: 100%;
    display: inline-block;
    overflow: hidden;
    transition: all 150ms;
    text-align: center;
    line-height: 44px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__none-order {
    text-align: center;
    padding: 20px;
  }
}
</style>
