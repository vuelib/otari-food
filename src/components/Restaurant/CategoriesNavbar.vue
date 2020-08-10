<template>
  <nav class="categories-navbar">
    <div class="categories-navbar__wrapper">
      <ul class="categories-navbar__categories">
        <scroll-link
          v-for="(category, key) in categories"
          :key="key"
          :href="getAnchorLink(category)"
          :class="{
            'categories-navbar__category--active': isActiveCategory(category)
          }"
          class="categories-navbar__category"
        >
          {{ category }}
        </scroll-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  computed: {},
  methods: {
    getAnchorLink(category) {
      return `#${category.trim().replace(/\s/g, '-')}`;
    },
    isActiveCategory(category) {
      return this.categories[0] === category;
    }
  },
  data: () => ({}),
  name: 'CategoriesNavbar'
};
</script>

<style lang="scss" scoped>
.categories-navbar {
  position: sticky;
  top: 80px;
  z-index: 99;
  border: solid #eee;
  font-size: 16px;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.05);
  line-height: 70px;
  border-width: 0 1px;
  background-color: #fff;
  &__wrapper {
    margin: 0 80px;
    display: flex;
  }
  &__categories {
    height: 70px;
    margin: 0 -16px;
    overflow: hidden;
  }
  &__category {
    height: 70px;
    cursor: pointer;
    display: inline-block;
    padding: 0 16px;
    line-height: 70px;
    &:first-letter {
      text-transform: uppercase;
    }
    &--active {
      box-shadow: inset 0 -4px 0 $theme-mainColor;
    }
  }
  &__link {
    height: 70px;
    width: 100%;
  }
}
</style>
