<template>
  <div class="catalog-page-toolbar">
    <nav class="catalog-page-filters">
      <ul class="catalog-page-filters__list">
        <li
          v-for="(category, key) in storesCategory"
          :key="key"
          class="catalog-page-filters__item"
        >
          <a
            @click="handlerFilter(category)"
            :class="{ 'catalog-page-filters--active': isActive(category) }"
            class="catalog-page-filters__link"
          >
            {{ category }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('stores');

export default {
  watch: {
    getStores(value) {
      this.constructStoresCategory(value);
    }
  },
  methods: {
    constructStoresCategory(stores) {
      const category = new Set(['Все']);
      for (const { product_category } of stores) {
        if (!product_category) continue;
        product_category.map(el => {
          category.add(el.replace(/.*(>|\|)\.*/g, '').trim());
        });
      }
      this.storesCategory = [...category];
      console.log(this.storesCategory);
    },
    isActive(category) {
      return category === this.selected;
    },
    handlerFilter(category) {
      this.selected = category;
    }
  },
  computed: {
    ...mapGetters(['getStores'])
  },
  data: () => ({
    storesCategory: [],
    selected: 'Все'
  }),
  name: 'Toolbar'
};
</script>

<style lang="scss">
.catalog-page-toolbar {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
  justify-content: space-between;
}
.catalog-page-filters {
  flex: 1;
  margin: 21px 10px 21px 80px;
  display: flex;
  overflow-x: hidden;
  &__list {
    flex: 1;
    height: 46px;
    display: flex;
    position: relative;
  }
  &__item {
    white-space: nowrap;
    padding-right: 4px;
    &::first-letter {
      text-transform: uppercase;
    }
  }
  &__link {
    height: 46px;
    padding: 0 18px;
    display: block;
    line-height: 46px;
    border-radius: 22px;
    &:hover {
      background: #f5f5f5;
    }
  }
  &--active {
    background-color: $theme-mainColor;
  }
}
</style>
