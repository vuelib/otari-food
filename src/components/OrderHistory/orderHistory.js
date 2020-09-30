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
      await this.refreshToken();
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
        // Refresh Token
        await this.refreshToken();
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
      // Refresh Token
      await this.refreshToken();
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
    ]),
    ...createNamespacedHelpers('auth').mapActions(['refreshToken'])
  },
  data: () => ({
    orderHistory: null
  })
};
