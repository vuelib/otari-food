<template>
  <div class="modal-wrapper">
    <div class="modal modal-my-orders">
      <div class="my-orders">
        <div class="modal__header my-orders__header">
          Мои заказы
        </div>
        <div
          v-for="order in myOrders"
          :key="order.uuid"
          class="modal__body my-orders__body"
        >
          <table class="my-orders__table">
            <thead>
              <tr>
                <th scope="col">
                  {{ getCreateAtDate(order.created_at_unix) }}
                </th>
                <th scope="col">{{ order.products_data.store.name }}</th>
                <th scope="col">214 ₽</th>
                <th scope="col"></th>
                <th scope="col">{{ order.state_title }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="product in order.products_data.products"
                :key="product.uuid"
              >
                <th scope="row">{{ product.name }}</th>
                <td>3,000</td>
                <td>{{ product.price }} ₽</td>
                <td>{{ product.number }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>

          <!--  -->
          <div class="modal__footer my-orders__footer">
            <button
              @click="repeatOrder"
              class="my-orders__button button button--yellow"
            >
              Повторить
            </button>
            <button
              @click="cancelOrder"
              class="my-orders__button button button--yellow"
            >
              Отменить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

export default {
  computed: {
    getCreateAtDate() {
      return createAt => {
        return new Date(createAt * 1000).toLocaleDateString();
      };
    }
  },
  updated() {
    console.log('aasdasd');
  },
  methods: {
    async loadMyOrders() {
      this.myOrders = (await this.getMyOrders()) || [];
    },
    repeatOrder() {
      console.log('repeatOrder');
    },
    cancelOrder() {
      console.log('cancelOrder');
    },
    ...createNamespacedHelpers('cart').mapActions(['getMyOrders'])
  },
  data: () => ({
    myOrders: []
  })
};
</script>

<style lang="scss">
.modal-my-orders {
  // width: 100%;
  width: 900px;
}
.my-orders__table {
  width: 100%;
}
thead,
tfoot {
  color: #000;
  font-weight: bold;
  width: 100%;
  font-family: YSText, helvetica, arial, sans-serif;
}

tbody {
  // background-color: #e4f0f5;
}

caption {
  padding: 10px;
  caption-side: bottom;
}

table {
  border: none;
  /*     border: 2px solid rgb(200, 200, 200); */
  letter-spacing: 1px;
  font-size: 0.8rem;
}

td,
th {
  /*     border: 1px solid rgb(190, 190, 190); */
  padding: 5px 10px;
}

td {
  text-align: center;
}
</style>
