<template>
  <div class="modal-wrapper">
    <div class="modal modal-menu-item-options">
      <div class="modal__header">{{ headerTitle }}</div>
      <div class="modal__body">{{ bodyTitle }}</div>
      <div class="modal__footer">
        <button @click="acceptConfirm" class="button button--yellow">
          {{ footerBtnTitle }}
        </button>
        <button @click="closePopup" class="button">
          Отмена
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('cart');

export default {
  methods: {
    acceptConfirm() {
      this.clearCartOfProducts();
      this.$emit('acceptConfirm', this.selectProduct);
      this.closePopup();
    },
    closePopup() {
      this.$emit('closePopup');
    },
    ...mapActions(['clearCartOfProducts'])
  },
  props: {
    headerTitle: {
      type: String,
      default: '',
      required: true
    },
    bodyTitle: {
      type: String,
      default: '',
      required: true
    },
    footerBtnTitle: {
      type: String,
      default: '',
      required: true
    },
    selectProduct: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  name: 'AppConfirm'
};
</script>

<style lang="scss" scoped></style>
