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
            {{ category.name }}
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
              {{ category.name }}
            </div>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('stores');

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
    constructStoresCategory() {
      // constructStoresCategory(stores)
      // const category = new Set(['все']);
      // for (const { product_category } of stores) {
      //   if (!product_category) continue;
      //   product_category.map(el => {
      //     category.add(el.replace(/.*(>|\|)\.*/g, '').trim());
      //   });
      // }
      // this.storesCategory = [...category];
      this.storesCategory = [
        { uuid: '', name: 'все' },
        { uuid: 'c71bd3c7-6185-4f21-88ec-833a341adbcd', name: 'Шаурма' },
        { uuid: '6023b5f3-8072-47c5-b794-1a24b88094d8', name: 'Бургеры' },
        { uuid: '57744251-0c97-44ac-b38b-9d57264bdd3b', name: 'Пицца' },
        { uuid: '65ae5393-4417-4175-84c4-c7ae1954f1d5', name: 'Роллы' },
        { uuid: '5573da25-eb64-41d4-bb3b-c2353e4d2aa7', name: 'Пироги' },
        { uuid: '03bd35e8-fad4-4883-a464-4dd68a86ac97', name: 'Хинкали' },
        { uuid: 'd45c2c26-0140-4b39-9b68-6c44b2dd2ddd', name: 'Cэндвичи' },
        { uuid: 'b6c737e2-df73-499e-809f-84c28a4958ad', name: 'Шашлык' },
        { uuid: 'b208356b-48eb-42ee-88a9-a40889a8bfb7', name: 'Чебуреки' },
        { uuid: '12261efb-e2b2-4005-ad92-ca1e4dfb8438', name: 'Таук' },
        { uuid: 'fd2ad810-8753-4fac-b179-db109d39dfa0', name: 'Кутабы' },
        { uuid: '2330850e-00fd-48a1-b140-0559a20943fb', name: 'Суши' }
      ];
    },
    // getStoresByCategory(category) {},
    isActive(category) {
      return category.name === this.selected;
    },
    async handlerFilter(category) {
      this.selected = category.name;
      if (category.name === 'все') {
        await this.getStoresByFilter({
          page: 1,
          limit: 30
        });
        return;
      }
      await this.getStoresByFilter({
        page: 1,
        limit: 30,
        category: category.uuid,
        filter: true
      });
      // this.$emit('filteredCategory', category);
    },
    ...mapActions(['getStoresByFilter'])
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
