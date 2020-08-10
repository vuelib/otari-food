<template>
  <div @click="pushToCart" ref="menu-list" class="menu-list">
    <div
      v-for="([name, category], key) of Object.entries(categories)"
      :key="key"
      class="menu-list__category"
    >
      <!-- Menu Component -->
      <Menu :category-name="name" :category="category" />
    </div>
    <AppPopup @closePopup="closePopup" v-show="isShowOptions">
      <MenuItemOptions
        @closePopup="closePopup"
        :option-product="optionProduct"
      />
    </AppPopup>
  </div>
</template>

<script>
import Menu from '@/components/Restaurant/Menu.vue';
import MenuItemOptions from '@/components/Restaurant/MenuItemOptions.vue';
import AppPopup from '@/components/AppPopup.vue';

import { createNamespacedHelpers } from 'vuex';
const mapGettersStores = createNamespacedHelpers('stores').mapGetters;
const mapActionsCart = createNamespacedHelpers('cart').mapActions;

export default {
  computed: {
    ...mapGettersStores(['findStoreProductByUUID'])
  },
  methods: {
    pushToCart({ target }) {
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
      if (product.variants || product.toppings) {
        this.optionProduct = product;
        this.isShowOptions = true;
      } else this.pushProductToCart(product);
    },
    closePopup() {
      this.isShowOptions = false;
    },
    ...mapActionsCart(['pushProductToCart'])
  },
  props: {
    categories: {
      type: Object,
      default: () => {},
      reuired: true
    }
  },
  data: () => ({
    optionProduct: {},
    isShowOptions: false
  }),
  name: 'MenuList',
  components: {
    Menu,
    MenuItemOptions,
    AppPopup
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
