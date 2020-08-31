<template>
  <nav class="categories-navbar">
    <div class="categories-navbar__wrapper">
      <scrollactive
        ref="categories-navbar"
        active-class="categories-navbar__category--active"
        class="categories-navbar__categories"
      >
        <scroll-link
          v-for="(category, key) in getIntervalCategories(0, getViewInterval)"
          :key="key"
          :href="getAnchorLink(category)"
          class="categories-navbar__category scrollactive-item"
        >
          {{ category }}
        </scroll-link>
      </scrollactive>
      <div class="more-category">
        <span
          v-if="isShowMoreBtn"
          ref="more-select"
          class="categories-navbar__more-wrapper"
        >
          <span
            @click="toggleShowMoreCategories"
            class="categories-navbar__more"
          >
            <div class="categories-navbar__more-text">Еще</div>
            <div class="categories-navbar__more-icon"></div>
          </span>
          <div class="list-options">
            <div
              @click="scroll(category)"
              v-for="(category, key) in getIntervalCategories(getViewInterval)"
              :key="key"
              class="list-option"
            >
              {{ category }}
            </div>
          </div>
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  mounted() {},
  created() {},
  computed: {
    // work
    getIntervalCategories() {
      return (fromIndex, toIndex) => {
        if (!toIndex) toIndex = this.categories.length;
        return this.categories.slice(fromIndex, toIndex).map(el => {
          return el.replace(/.*(>|\|)\.*/g, '').trim();
        });
      };
    },
    getCategories() {
      return this.categories.map(el => {
        return el.replace(/.*(>|\|)\.*/g, '').trim();
      });
    },
    getViewInterval() {
      return this.viewInterval;
    }
  },
  methods: {
    scroll(category) {
      this.isShowMoreCategories = false;
      document
        .querySelector(this.getAnchorLink(category))
        .scrollIntoView({ behavior: 'smooth' });
    },
    toggleShowMoreCategories() {
      this.isShowMoreCategories = !this.isShowMoreCategories;
    },
    constructCategotiesNavbar() {
      const navEl = this.$refs['categories-navbar'].$el;
      const navWidth = navEl.getBoundingClientRect().width;
      const categories = [...navEl.children];
      let sumWidthCategories = 0;
      for (let i = 0; i < categories.length; i++) {
        sumWidthCategories += categories[i].getBoundingClientRect().width;
        if (sumWidthCategories > navWidth) {
          this.isShowMoreBtn = true;
          this.viewInterval = i - 1;
          return;
        }
      }
    },
    getAnchorLink(category) {
      // tmp solution
      return `#${category
        .replace(/.*(>|\|)\.*/g, '')
        .trim()
        .replace(/\s+/g, '-')}`;
    }
  },
  watch: {
    categories(value) {
      if (value.length > 0) {
        setTimeout(this.constructCategotiesNavbar, 0);
      }
    }
  },
  props: {
    categories: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data: () => ({
    isShowMoreBtn: false,
    isShowMoreCategories: false,
    viewInterval: 0,
    viewCategories: [],
    moreCategories: []
  }),
  name: 'CategoriesNavbar',
  components: {}
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
    font-weight: 100;
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
  &__more-wrapper {
    flex: 0 0 auto;
    display: flex;
    margin-left: 32px;
    justify-content: flex-end;
    position: relative;
    &:hover {
      > .list-options {
        visibility: visible;
        opacity: 1;
      }
    }
  }
  &__more {
    cursor: pointer;
    display: flex;
    user-select: none;
  }
  &__more-text {
    overflow: hidden;
    white-space: nowrap;
    line-height: 70px;
    text-overflow: ellipsis;
    font-weight: 100;
  }
  &__more-icon {
    width: 6px;
    height: 6px;
    margin: 34px 5px 30px 10px;
    transform: rotate(135deg);
    border-top: solid 1px #000000;
    border-right: solid 1px #000000;
    transition: transform 0.2s linear;
    transform-origin: 70% 30%;
  }
}
.list-options {
  width: 320px;
  padding: 7px 0;
  max-height: 368px;
  overflow-y: auto;
  // box-sizing: content-box;
  position: absolute;
  // right: 0;
  left: 50%;
  transform: translateX(-50%);
  top: 75px;
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
  &::first-letter {
    text-transform: uppercase;
  }
  &:hover {
    background: #e6e6e6;
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
