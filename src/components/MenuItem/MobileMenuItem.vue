<template>
  <article class="mobile-menu-item-content">
    <div class="mobile-menu-item-content__img">
      <img :src="getMenuItemBG" :alt="menuItem.name" />
    </div>
    <div class="mobile-menu-item-content__name-wrap">
      <h3 class="mobile-menu-item-content__name">
        {{ menuItem.name }}
      </h3>
    </div>
    <div class="mobile-menu-item-content__meta">
      <span v-if="isInCart">
        <span>{{ menuItem.price }} ₽</span>
        <span class="mobile-menu-item-content__dot-divider">.</span>
      </span>
      <span>{{ menuItem.weight }} {{ menuItem.weight_measure }}</span>
    </div>
    <div class="mobile-menu-item-content__controls">
      <!-- Add Btn -->
      <!-- <template v-if="isInCart">
        <div
          class="mobile-menu-item-content__minus mobile-menu-item-content__icon-btn mobile-menu-item-content__btn"
        ></div>
        <div class="mobile-menu-item-content__count">
          {{ menuItem.quantity }}
        </div>
        <div
          class="mobile-menu-item-content__plus mobile-menu-item-content__icon-btn mobile-menu-item-content__btn"
        ></div>
      </template> -->
      <div
        v-if="isInCart"
        class="mobile-menu-item-content__add-btn mobile-menu-item-content__btn"
      >
        <div class="mobile-menu-item-content__price">
          В корзине
        </div>
      </div>
      <div
        v-else
        class="mobile-menu-item-content__add-btn mobile-menu-item-content__btn"
      >
        <div class="mobile-menu-item-content__price">
          {{ menuItem.price }} ₽
        </div>
      </div>
    </div>
  </article>
</template>

<script>
/* eslint no-unused-vars: */
import { createNamespacedHelpers } from 'vuex';
import menuItem from './menuItem.js';
export default {
  mixins: [menuItem],
  props: {
    menuItem: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  name: 'MobileMenuItem'
};
</script>

<style lang="scss">
// mobile-menu-item-content
.mobile-menu-item-content {
  flex: 0 1 calc(50% - 11px * 1.5);
  height: 296px;
  margin: 11px 0 0 11px;
  display: block;
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  box-shadow: 0px 8px 20px rgba(117, 115, 111, 0.2);
  border-radius: 24px;
  &__img {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 167px;
    > img {
      width: 100%;
      height: auto;
    }
  }
  &__name-wrap {
    height: 38px;
    margin: 8px 0 2px;
    padding: 0 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__name {
    color: #21201f;
    display: -webkit-box;
    overflow: hidden;
    font-size: 16px;
    text-align: center;
    word-break: break-word;
    line-height: 19px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-weight: 100;
  }
  &__meta {
    color: #9e9b98;
    font-size: 13px;
    text-align: center;
    line-height: 15px;
    margin-bottom: 8px;
  }
  &__controls {
    padding: 0 9px 8px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
  }
  &__btn {
    height: 48px;
    display: flex;
    transition: opacity, background-color 100ms;
    align-items: center;
    border-radius: 16px;
    align-content: center;
    justify-content: center;
    background-color: #f1f0ed;
  }
  &__add-btn {
    flex: 1 0 auto;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
  }
  &__price {
    width: 100%;
  }
  &__minus {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zIDEyLjVDMyAxMi43NzYxIDMuMjIzODYgMTMgMy41IDEzSDIwLjVDMjAuNzc2MSAxMyAyMSAxMi43NzYxIDIxIDEyLjVWMTEuNUMyMSAxMS4yMjM5IDIwLjc3NjEgMTEgMjAuNSAxMUgzLjVDMy4yMjM4NiAxMSAzIDExLjIyMzkgMyAxMS41VjEyLjVaIiBmaWxsPSIjMjEyMDFGIi8+Cjwvc3ZnPgo=);
  }
  &__plus {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS41IDNDMTEuMjIzOSAzIDExIDMuMjIzODYgMTEgMy41VjExSDMuNUMzLjIyMzg2IDExIDMgMTEuMjIzOSAzIDExLjVWMTIuNUMzIDEyLjc3NjEgMy4yMjM4NiAxMyAzLjUgMTNIMTFWMjAuNUMxMSAyMC43NzYxIDExLjIyMzkgMjEgMTEuNSAyMUgxMi41QzEyLjc3NjEgMjEgMTMgMjAuNzc2MSAxMyAyMC41VjEzSDIwLjVDMjAuNzc2MSAxMyAyMSAxMi43NzYxIDIxIDEyLjVWMTEuNUMyMSAxMS4yMjM5IDIwLjc3NjEgMTEgMjAuNSAxMUgxM1YzLjVDMTMgMy4yMjM4NiAxMi43NzYxIDMgMTIuNSAzSDExLjVaIiBmaWxsPSIjMjEyMDFGIi8+Cjwvc3ZnPgo=);
  }
  &__icon-btn {
    width: 48px;
    background-size: 24px;
    background-repeat: no-repeat;
    background-position: center;
  }
  &__dot-divider {
    padding: 0 7px;
  }
}
</style>
