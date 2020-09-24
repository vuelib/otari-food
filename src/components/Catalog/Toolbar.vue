<template>
  <div class="catalog-page-toolbar">
    <nav class="catalog-page-filters">
      <ul ref="filters" class="catalog-page-filters__list">
        <li
          v-for="(category, key) in getIntervalCategories(0, getViewInterval)"
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
        <li ref="filters-more" class="filters-more catalog-page-filters__item">
          <a class="catalog-page-filters__link">Ещё</a>
          <div class="list-options">
            <div
              v-for="(category, key) in getIntervalCategories(getViewInterval)"
              :key="key"
              @click="handlerFilter(category)"
              class="list-option"
            >
              {{ category }}
            </div>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('stores');

export default {
  created() {
    this.constructStoresCategory(this.getStores);
    setTimeout(this.constructToolbar, 0);
  },
  watch: {
    getStores(value) {
      this.constructStoresCategory(value);
      setTimeout(this.constructToolbar, 0);
    }
  },
  methods: {
    constructToolbar() {
      const navEl = this.$refs['filters'];
      const moreEl = this.$refs['filters-more'];
      const navWidth =
        navEl.getBoundingClientRect().width -
        moreEl.getBoundingClientRect().width;
      const categories = [...navEl.children];
      let sumWidthCategories = 0;
      for (const ind in categories) {
        sumWidthCategories += categories[ind].getBoundingClientRect().width;
        if (sumWidthCategories > navWidth) {
          this.isShowMoreBtn = true;
          this.viewInterval = ind - 1;
          return;
        }
      }
    },
    // construct unique caterories
    constructStoresCategory(stores) {
      const category = new Set(['все']);
      for (const { product_category } of stores) {
        if (!product_category) continue;
        product_category.map(el => {
          category.add(el.replace(/.*(>|\|)\.*/g, '').trim());
        });
      }
      this.storesCategory = [...category];
    },
    isActive(category) {
      return category === this.selected;
    },
    handlerFilter(category) {
      this.selected = category;
      this.$emit('filteredCategory', category);
    }
  },
  computed: {
    getIntervalCategories() {
      return (fromIndex, toIndex) => {
        if (!toIndex) toIndex = this.storesCategory.length;
        return this.storesCategory.slice(fromIndex, toIndex);
      };
    },
    getViewInterval() {
      return this.viewInterval;
    },
    ...mapGetters(['getStores'])
  },
  data: () => ({
    storesCategory: [],
    selected: 'все',
    isShowMoreBtn: false,
    viewInterval: 0
  }),
  name: 'Toolbar'
};
</script>

<style lang="scss">
.catalog-page-toolbar {
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
  justify-content: space-between;
}
.catalog-page-filters {
  // flex: 1;
  margin: 21px 10px 21px 80px;
  display: flex;
  width: 100%;
  // overflow-x: hidden;
  &__list {
    width: 100%;
    // flex: 1;
    height: 46px;
    display: flex;
    position: relative;
  }
  &__item {
    white-space: nowrap;
    padding-right: 4px;
  }
  &__link {
    height: 46px;
    padding: 0 18px;
    display: block;
    line-height: 46px;
    border-radius: 22px;
    text-align: center;
    &:hover {
      background: #f5f5f5;
      color: inherit;
    }
    &::first-letter {
      text-transform: uppercase;
    }
  }
  &--active {
    background-color: $theme-mainColor;
    color: $theme-textColor;
  }
}
.filters-more {
  position: relative;
  &:hover {
    > .list-options {
      visibility: visible;
      opacity: 1;
    }
  }
}
.list-options {
  z-index: 2;
  width: 320px;
  padding: 7px 0;
  max-height: 368px;
  overflow-y: auto;
  // box-sizing: content-box;
  position: absolute;
  right: 0;
  // left: 50%;
  // transform: translateX(-50%);
  top: 55px;
  line-height: 20px;

  font-size: 10px;
  background: #fff;
  box-sizing: border-box;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.15);
  border-radius: 4px;

  visibility: hidden;
  opacity: 0;
  transition: 0.3s;
  &::before {
    content: '';
    width: 12px;
    height: 12px;
    display: block;
    position: absolute;
    background: #fff;
    box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.15);
    left: 50%;
    top: -10px;
    transform: translateX(-50%) rotate(45deg);
    z-index: 99;
  }
}
.list-option {
  cursor: pointer;
  padding: 13px 0 14px 36px;
  position: relative;
  font-size: 16px;
  margin-bottom: -1px;
  font-weight: 100;
  &:hover {
    background: #e6e6e6;
  }
  &::first-letter {
    text-transform: uppercase;
  }
}
.list-option:not(:first-child)::before {
  content: '';
  top: 0;
  left: 36px;
  right: 0;
  display: block;
  position: absolute;
  border-top: 1px solid #f4f4f4;
}
</style>
