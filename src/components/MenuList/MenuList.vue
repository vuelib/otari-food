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
import Menu from '@/components/Menu/Menu.vue';
import MenuItemOptions from '@/components/MenuItemOptions/MenuItemOptions.vue';
import AppConfirm from '@/components/AppConfirm.vue';
import AppPopup from '@/components/AppPopup.vue';

import menuList from './menuList.js';
export default {
  mixins: [menuList],
  props: {
    categories: {
      type: Object,
      default: () => {},
      reuired: true
    }
  },
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
