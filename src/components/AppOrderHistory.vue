<template>
  <div class="modal-wrapper">
    <div class="modal modal-order-history">
      <div class="order-history">
        <div class="modal__header order-history__header">
          Мои заказы
        </div>
        <div class="modal__body order-history__body">
          <div v-if="isOrderHistoryEmpty" class="order-history__list">
            У Вас нет заказов
          </div>
          <ul v-if="!isOrderHistoryEmpty" class="order-history__list">
            <li
              v-for="order in orderHistory"
              :key="order.uuid"
              class="order-history__item"
            >
              <div class="order-history__short-info">
                <div class="order-history__date">
                  {{ getCreateAtDate(order.created_at_unix) }}
                </div>
                <div class="order-history__restaurant">
                  {{ order.products_data.store.name }}
                </div>
                <div class="order-history__price">
                  {{
                    getTotalPrice(
                      order.products_data.products,
                      order.tariff.total_price
                    )
                  }}₽
                </div>
                <div class="order-history__status">{{ order.state_title }}</div>
              </div>
              <div class="order-history__products">
                <div
                  v-for="product in order.products_data.products"
                  :key="product.uuid"
                  class="order-history__product"
                >
                  <div class="order-history__product-name">
                    {{ product.name }}
                    <span class="order-history__product-weight">
                      {{ product.weight }}
                      {{ product.weight_measure }}
                    </span>
                    <div class="order-history__options">
                      <div class="order-history__option">
                        {{ product.selected_variant.name }}
                      </div>
                      <div
                        v-for="option in product.toppings"
                        :key="option.uuid"
                        class="order-history__option"
                      >
                        {{ option.name }}
                      </div>
                    </div>
                  </div>
                  <div class="order-history__product-quantity">
                    {{ product.number }}
                  </div>
                  <div class="order-history__product-price">
                    {{ getPrice(product) }} ₽
                  </div>
                </div>
              </div>
              <div class="order-history__buttons-wrap">
                <div class="order-history__button-wrap">
                  <button
                    @click="confirmRepeatOrder(order)"
                    class="order-history__button button button--yellow"
                  >
                    Повторить
                  </button>
                </div>
                <div class="order-history__button-wrap">
                  <button
                    @click="confirmCancelOrder(order.uuid)"
                    class="order-history__button button button--yellow"
                  >
                    Отменить
                  </button>
                </div>
              </div>
            </li>
          </ul>
          <!--  -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { createNamespacedHelpers } from 'vuex';

export default {
  computed: {
    getCreateAtDate() {
      return createAt => {
        return new Date(createAt * 1000).toLocaleString('ru', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        });
      };
    },
    isOrderHistoryEmpty() {
      return !this.orderHistory || !this.orderHistory.length;
    }
  },
  beforeUpdate() {},
  methods: {
    getTotalPrice(products, delivery_price) {
      return products.reduce((sum, product) => {
        sum += this.getPrice(product) * product.number;
        return sum;
      }, delivery_price);
    },
    getPrice(product) {
      if (!product.toppings)
        return product.price + product.selected_variant.price;

      return product.toppings.reduce(
        (sum, option) => (sum += option.price),
        product.price + product.selected_variant.price
      );
    },
    async loadMyOrders() {
      this.orderHistory = await this.getMyOrders();
    },
    confirmRepeatOrder(order) {
      Swal.fire({
        title: 'Подтверждение заказа',
        text: 'Вы уверены, что хотите подтвердить заказ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#fc5b58',
        confirmButtonText: 'Подтвердить',
        cancelButtonText: 'Отмена'
      }).then(result => {
        if (result.value) {
          this.sendOrder(order);
        }
      });
    },
    async sendOrder(order) {
      let productsInput = [];
      const orderData = {
        routes: order.routes,
        service_uuid: order.service.uuid
      };
      order.products_data.products.map(product => {
        const productData = {
          uuid: product.uuid,
          number: product.number,
          variant_uuid: product.selected_variant.uuid
        };
        if (product.toppings) {
          const toppings_uuid = product.toppings.reduce((acc, { uuid }) => {
            acc.push(uuid);
            return acc;
          }, []);
          productData.toppings_uuid = toppings_uuid;
        }
        productsInput.push(productData);
      });
      orderData.productsInput = productsInput;
      try {
        await this.repeatOrder(orderData);
        Swal.fire({
          title: 'Заказ успешно оформлен',
          text: 'Ожидайте звонка оператора',
          icon: 'success',
          confirmButtonColor: '#fc5b58'
        });
      } catch (e) {
        console.log('Err', e);
      }
    },
    confirmCancelOrder(order_uuid) {
      Swal.fire({
        title: 'Отменить заказ?',
        confirmButtonColor: '#fc5b58',
        showCancelButton: true,
        confirmButtonText: 'Да',
        cancelButtonText: 'Нет',
        icon: 'question'
      }).then(result => {
        if (result.value) {
          this.cancelSendOrder(order_uuid);
        }
      });
    },
    async cancelSendOrder(order_uuid) {
      const data = await this.cancelOrder({ order_uuid });
      if (data.code === 200) {
        this.orderHistory = this.orderHistory.filter(
          ({ uuid }) => uuid !== order_uuid
        );
        Swal.fire({
          title: 'Заказ успешно отменен',
          confirmButtonColor: '#fc5b58'
        });
      }
    },
    ...createNamespacedHelpers('cart').mapActions([
      'getMyOrders',
      'cancelOrder',
      'createOrder',
      'repeatOrder'
    ])
  },
  data: () => ({
    orderHistory: null
  }),
  name: 'OrderHistory'
};
</script>

<style lang="scss">
.order-history {
  width: 900px;
  &__list {
    padding: 0 6px;
  }
  &__item {
    padding: 15px 0;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
  }
  &__short-info {
    font-weight: bold;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: start;
  }
  &__date {
    flex: 0 0 32%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__restaurant {
    flex: 0 0 28%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__price {
    flex: 0 0 12%;
    overflow: hidden;
    text-align: right;
    text-overflow: ellipsis;
  }
  &__status {
    flex: 0 0 28%;
    color: #a0a0a0;
    overflow: hidden;
    text-align: right;
    font-weight: lighter;
    text-overflow: ellipsis;
  }
  &__products {
    display: flex;
    flex-wrap: wrap;
  }
  &__product {
    flex: 0 0 100%;
    display: flex;
    align-items: center;
    font-weight: 100;
  }
  &__product-name {
    flex: 0 0 52%;
    padding-top: 10px;
  }
  &__product-quantity {
    flex: 0 0 8%;
    color: #a0a0a0;
    text-align: right;
    padding-top: 10px;
  }
  &__product-price {
    flex: 0 0 12%;
    text-align: right;
    padding-top: 10px;
  }
  &__buttons-wrap {
    display: flex;
  }
  &__button-wrap {
    width: 152px;
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 5px;
  }
  &__options {
    color: #b0b0b0;
    font-size: 14px;
    margin-top: 2px;
    line-height: 18px;
  }
  &__product-weight {
    color: #b0b0b0;
    font-size: 14px;
    white-space: nowrap;
  }
}
</style>
