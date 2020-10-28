import Swal from 'sweetalert2';
import { createNamespacedHelpers } from 'vuex';
const widget = new window.cp.CloudPayments();
export default {
  created() {
    if (!this.destinationPoints || !this.destinationPoints.length) return;
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
      'checkOnEqualActiveStoreUUID',
      'isUserFromMessenger',
      'getUserDataFromMessenger'
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

      const { front_door, intercom, entrance, floor, comment } = this.meta;
      const orderComment = `Кв./офис: ${front_door}, Домофон: ${intercom}, Подъезд: ${entrance}, Этаж: ${floor}, Комментарий: ${comment}`;
      try {
        // Refresh Token
        await this.refreshToken();
        // Create Order Action
        const { uuid } = await this.createOrder({
          routeFrom: JSON.parse(localStorage.getItem('location')),
          routeTo: this.destinationPoints[0],
          comment: orderComment
        });
        // console.log(data);
        if (this.isUserFromMessenger) {
          console.log('set to msg', uuid);
          await this.confirmOrderToMessenger({
            userId: this.getUserDataFromMessenger.userId,
            orderId: uuid
          });
        }
        Swal.fire({
          title: 'Заказ успешно оформлен',
          text: 'Ожидайте звонка оператора',
          icon: 'success',
          confirmButtonColor: '#fc5b58'
        });
        this.clearCart();
        this.$router.go(-1);
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
      if (!this.isAuthUser) {
        this.isShowModal = true;
        this.$emit('showLoginModal');
        return;
      }
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
    cloudPay() {
      if (this.isSendOrderDisabled || !this.destinationPoints.length) return;
      if (!this.isAuthUser) return (this.isShowModal = true);
      //
      if (this.payType !== 'card') return this.sendOrder();

      widget.pay(
        'auth', // или 'charge'
        {
          //options
          publicId: 'pk_da2989a1a7b849e2aa35cde4d1f32', //id из личного кабинета
          description: 'Оплата заказа', //назначение
          amount: this.getTotalPrice, //сумма
          currency: 'RUB', //валюта
          // invoiceId: '1234567', //номер заказа  (необязательно)
          // accountId: 'user@example.com', //идентификатор плательщика (необязательно)
          skin: 'classic' //дизайн виджета (необязательно)
        },
        {
          onSuccess: options => {
            console.log('onSuccess', options);
            this.sendOrder();
            // success
            //действие при успешной оплате
          },
          onFail: (reason, options) => {
            console.log(reason, options);
            return;
            // fail
            //действие при неуспешной оплате
          },
          onComplete: (paymentResult, options) => {
            console.log('onComplete', paymentResult, options);
            //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
            //например вызов вашей аналитики Facebook Pixel
          }
        }
      );
    },
    ...createNamespacedHelpers('cart').mapActions([
      'clearCartOfProducts',
      'getTariffToDelivery',
      'createOrder',
      'changeWithoutDeliveryState',
      'confirmOrderToMessenger'
    ]),
    ...createNamespacedHelpers('auth').mapActions(['refreshToken'])
  },
  data: () => ({
    isShowModal: false,
    meta: {
      front_door: '',
      intercom: '',
      entrance: '',
      floor: '',
      comment: ''
    },
    payType: 'cash'
  })
};
