<template>
  <div @click="handlerPushToCart" ref="menu-list" class="menu-list">
    <div
      v-for="([name, category], key) of Object.entries(categories)"
      :key="key"
      class="menu-list__category"
    >
      <!-- Menu Component -->
      <Menu :category-name="name" :category="category" />
    </div>

    <!-- Modals -->
    <app-popup @closePopup="closeOptionsPopup" v-show="isShowOptions">
      <!-- Menu Item Options Component -->
      <MenuItemOptions
        ref="menu-item-options"
        :option-product="optionProduct"
        @pushProductToCart="checkEqualStore"
        @closePopup="closeOptionsPopup"
      />
    </app-popup>

    <!-- Confirm to change store -->
    <app-popup @closePopup="closeChangeStorePopup" v-show="isChangingStore">
      <!-- Confirm component -->
      <AppConfirm
        header-title="Оформить заказ из другого ресторана"
        body-title="Все ранее добавленные блюда будут удалены из корзины"
        :select-product="selectProduct"
        @acceptConfirm="pushToCart"
        @closePopup="closeChangeStorePopup"
      />
    </app-popup>
  </div>
</template>

<script>
import Menu from '@/components/Restaurant/Menu.vue';
import MenuItemOptions from '@/components/Restaurant/MenuItemOptions.vue';
import AppConfirm from '@/components/AppConfirm.vue';
import AppPopup from '@/components/AppPopup.vue';

import { createNamespacedHelpers } from 'vuex';

export default {
  computed: {
    ...createNamespacedHelpers('stores').mapGetters(['findStoreProductByUUID']),
    ...createNamespacedHelpers('location').mapGetters([
      'isCurrentLocationNull'
    ]),
    ...createNamespacedHelpers('cart').mapGetters([
      'isCartEmpty',
      'checkOnEqualActiveStoreUUID'
    ])
  },
  methods: {
    handlerPushToCart({ target }) {
      // Delegating events
      const productContainer = target.closest('article');
      if (
        !productContainer &&
        !this.$refs['menu-list'].contains(productContainer)
      ) {
        return;
      }
      const product = this.findStoreProductByUUID(
        productContainer.dataset.product
      );
      // Check current location
      console.log(this.isCurrentLocationNull);
      if (this.isCurrentLocationNull) {
        this.$parent.$emit('showEnterAddressModal');
        return;
      }
      // Product have variants or toppings
      if (product.variants || product.toppings) {
        this.optionProduct = product;
        this.isShowOptions = true;
        this.$refs['menu-item-options'].resetOptions();
      } else this.checkEqualStore(product);
    },
    checkEqualStore(product) {
      const cartItem = !product.extra
        ? {
            menuItem: product,
            extra: [],
            quantity: 1
          }
        : product;
      const { menuItem } = cartItem;
      if (
        !this.checkOnEqualActiveStoreUUID(menuItem.store_uuid) &&
        !this.isCartEmpty
      ) {
        this.isChangingStore = true;
        this.selectProduct = cartItem;
      } else this.pushToCart(cartItem);
    },
    pushToCart(product) {
      this.pushProductToCart(product);
    },
    closeOptionsPopup() {
      this.isShowOptions = false;
    },
    closeChangeStorePopup() {
      this.isChangingStore = false;
    },
    ...createNamespacedHelpers('cart').mapActions([
      'pushProductToCart',
      'clearCartOfProducts'
    ])
  },
  props: {
    categories: {
      type: Object,
      default: () => {},
      reuired: true
    }
  },
  data: () => ({
    selectProduct: {},
    optionProduct: {},
    isShowOptions: false,
    isChangingStore: false
  }),
  name: 'MenuList',
  components: {
    Menu,
    MenuItemOptions,
    AppPopup,
    AppConfirm
  }
};
</script>

<style lang="scss" scoped>
.menu-list {
  &__category {
    padding: 20px 0;
  }
}
</style>
