<template>
  <div class="catalog-page-toolbar">
    <nav class="catalog-page-filters">
      <ul class="catalog-page-filters__list">
        <li
          v-for="(item, key) in list"
          :key="key"
          class="catalog-page-filters__item"
        >
          <a
            @click="handlerFilter(item)"
            :class="{ 'catalog-page-filters--active': isActive(item.id) }"
            class="catalog-page-filters__link"
          >
            {{ item.title }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    isActive(id) {
      return id === this.selected;
    },
    handlerFilter({ id }) {
      this.selected = id;
    }
  },
  data: () => ({
    selected: 1,
    list: [
      {
        title: 'Все',
        id: 1
      },
      {
        title: 'Бургеры',
        id: 2
      },
      {
        title: 'Суши',
        id: 3
      }
    ]
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
