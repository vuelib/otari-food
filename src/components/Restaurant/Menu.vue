<template>
  <div class="category-menu">
    <a :id="getAnchorLink(categoryName)" class="category-anchor-link"></a>
    <div class="category-menu__header">
      <h2 class="category-menu__title">{{ categoryName }}</h2>
      <div class="category-menu__count">{{ category.length }}</div>
    </div>
    <div class="category-menu__items">
      <div
        v-for="item in category"
        :key="item.uuid"
        class="category-menu__item"
      >
        <div class="category-menu__item-wrapper">
          <MenuItem :menu-item="item" :data-product="item.uuid" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuItem from '@/components/Restaurant/MenuItem.vue';

export default {
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
  methods: {
    getAnchorLink(string) {
      return string.trim().replace(/\s/g, '-');
    }
  },
  name: 'CategoryMenu',
  components: {
    MenuItem
  }
};
</script>

<style lang="scss" scoped>
.category-menu {
  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  &__title {
    display: inline;
    font-weight: bold;
    margin-right: 12px;
    &:first-letter {
      text-transform: uppercase;
    }
  }
  &__count {
    color: #b0b0b0;
    font-size: 24px;
  }
  &__items {
    margin: 0 -20px;
    display: flex;
    overflow: hidden;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  &__item {
    width: 50%;
    display: flex;
  }
  &__item-wrapper {
    flex: 1 1 auto;
    width: 100%;
    display: flex;
    padding: 20px;
  }
}
.category-anchor-link {
  position: relative;
  bottom: 190px;
  opacity: 0;
  visibility: hidden;
}
</style>
