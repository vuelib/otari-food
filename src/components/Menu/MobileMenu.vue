<template>
  <div class="mobile-restaurant-components-category">
    <div class="mobile-restaurant-components-category__header">
      <div class="mobile-restaurant-components-category__label">
        <div class="mobile-restaurant-components-category__title-and-count">
          <h2 class="mobile-restaurant-components-category__name">
            {{ categoryName.replace(/.*(>|\|)\.*/g, '').trim() }}
          </h2>
        </div>
      </div>
    </div>
    <ul class="mobile-restaurant-components-category__items">
      <!-- MobileMenuItemContent_root -->
      <button
        v-for="item in category"
        :key="item.uuid"
        style="display: contents;"
      >
        <MobileMenuItem :menu-item="item" :data-product="item.uuid" />
      </button>
    </ul>
  </div>
</template>

<script>
import MobileMenuItem from '@/components/MenuItem/MobileMenuItem.vue';

import menu from './menu.js';
export default {
  mixins: [menu],
  props: {
    categoryName: {
      type: String,
      default: '',
      required: true
    },
    category: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  name: 'MobileCategoryMenu',
  components: {
    MobileMenuItem
  }
};
</script>

<style lang="scss" scoped>
// mobile-restaurant-components-category
.mobile-restaurant-components-category {
  &__header {
    display: flex;
    position: relative;
    padding-top: 27px;
    align-items: center;
    padding-left: 24px;
    padding-right: 24px;
    flex-direction: row;
  }
  &__items {
    display: flex;
    padding: 3px 5px 24px 5px;
    flex-wrap: wrap;
    align-items: stretch;
  }
  &__label {
    flex: 1 auto;
    padding-bottom: 7px;
  }
  &__title-and-count {
    display: flex;
  }
  &__name {
    color: #3f3f3f;
    font-size: 28px;
    line-height: 33px;
    font-weight: bold;
    &::first-letter {
      text-transform: uppercase;
    }
  }
}
</style>
