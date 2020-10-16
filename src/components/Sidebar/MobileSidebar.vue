<template>
  <div v-show="show" class="mobile-sidebar">
    <transition name="overlay">
      <div
        @click="closeSidebar"
        class="mobile-sidebar__backdrop mobile-sidebar__child-container"
      ></div>
    </transition>
    <transition name="slide">
      <div class="mobile-sidebar__container mobile-sidebar__child-container">
        <div class="mobile-sidebar-menu">
          <div class="mobile-sidebar-menu__header">
            <div @click="closeSidebar" class="mobile-sidebar-menu__close"></div>
            <div class="mobile-sidebar-menu__logo-container">
              <img class="MobileLogo" :src="getLogo" alt="FaemDelivery" />
            </div>
          </div>
          <div class="mobile-sidebar-menu__body">
            <div class="mobile-sidebar-menu__list-wrap">
              <div class="mobile-sidebar-menu__list">
                <div @click="closeSidebar" class="mobile-sidebar-menu__item">
                  <div
                    class="mobile-sidebar-menu__item-icon mobile-sidebar-menu__dish-icon"
                  ></div>
                  <div class="mobile-sidebar-menu__item-title">Рестораны</div>
                </div>
                <div
                  v-if="!isAuthUser"
                  @click="showLogin"
                  class="mobile-sidebar-menu__item"
                >
                  <div
                    class="mobile-sidebar-menu__item-icon mobile-sidebar-menu__person-icon"
                  ></div>
                  <div class="mobile-sidebar-menu__item-title">Войти</div>
                </div>
                <template v-if="isAuthUser">
                  <div
                    @click="showOrderHistory"
                    class="mobile-sidebar-menu__item"
                  >
                    <div
                      class="mobile-sidebar-menu__item-icon mobile-sidebar-menu__bag-icon"
                    ></div>
                    <div class="mobile-sidebar-menu__item-title">
                      Мои заказы
                    </div>
                  </div>
                  <div @click="logout" class="mobile-sidebar-menu__item">
                    <div
                      class="mobile-sidebar-menu__item-icon mobile-sidebar-menu__exit-icon"
                    ></div>
                    <div class="mobile-sidebar-menu__item-title">Выйти</div>
                  </div>
                </template>
                <div class="mobile-sidebar-menu__item">
                  <!-- <div
                    class="mobile-sidebar-menu__item-icon mobile-sidebar-menu__dish-icon"
                  ></div> -->
                  <a
                    href="https://faem.ru/eda/partners"
                    class="mobile-sidebar-menu__item-title"
                  >
                    Партнерам
                  </a>
                </div>
                <div class="mobile-sidebar-menu__item">
                  <!-- <div
                    class="mobile-sidebar-menu__item-icon mobile-sidebar-menu__dish-icon"
                  ></div> -->
                  <a
                    href="https://faem.ru/eda/contacts"
                    class="mobile-sidebar-menu__item-title"
                  >
                    Контакты
                  </a>
                </div>
                <div class="mobile-sidebar-menu__item">
                  <!-- <div
                    class="mobile-sidebar-menu__item-icon mobile-sidebar-menu__dish-icon"
                  ></div> -->
                  <a
                    href="tel:+79284889828"
                    class="mobile-sidebar-menu__item-title"
                  >
                    +7 (928) 488-98-28
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import auth from '@/mixins/auth.js';
import special from '@/mixins/special.js';
export default {
  mixins: [auth, special],
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  name: 'MobileSidebar',
  methods: {
    closeSidebar() {
      this.$emit('closeSidebar');
    },
    showLogin() {
      this.closeSidebar();
      this.$emit('showLogin');
    },
    showOrderHistory() {
      this.closeSidebar();
      this.$emit('showOrderHistory');
    }
  }
};
</script>

<style lang="scss" scoped>
.mobile-sidebar {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: 80000;
  &__backdrop {
    z-index: 1;
    background: rgba(0, 0, 0, 0.5);
    transition: opacity 250ms;
  }
  &__child-container {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
  }
  &__container {
    opacity: 1;
    transform: translateX(0);
    transition-delay: 350ms;
    right: auto;
    width: 312px;
    z-index: 2;
    max-width: 90%;
    background: #ffffff;
    transition: 350ms linear;
    overflow-x: hidden;
    overflow-y: auto;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
    transition-property: transform, opacity;
  }
}

.mobile-sidebar-menu {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  position: absolute;
  flex-wrap: nowrap;
  max-height: 100%;
  background: #f5f5f5;
  flex-direction: column;
  &__header {
    flex: 0 0 auto;
    width: 100%;
    height: 65px;
    display: flex;
    background: #ffffff;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    flex-direction: row;
  }
  &__close {
    width: 65px;
    height: 65px;
    display: inline-block;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIvPgogICAgICAgIDxnIGZpbGw9IiMwMDAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQgNCkiPgogICAgICAgICAgICA8cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMiIgeD0iLTIiIHk9IjciIHJ4PSIxIiB0cmFuc2Zvcm09InJvdGF0ZSg0NSA4IDgpIi8+CiAgICAgICAgICAgIDxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyIiB4PSItMiIgeT0iNyIgcng9IjEiIHRyYW5zZm9ybT0icm90YXRlKDEzNSA4IDgpIi8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K);
    background-size: 24px 24px;
    background-repeat: no-repeat;
    background-position: center;
  }
  &__logo-container {
    flex: 1 0 auto;
    text-align: center;
    line-height: 0;
    padding-right: 65px;
    > img {
      width: 125px;
      display: inline-block;
    }
  }
  &__body {
    width: 100%;
    display: flex;
    min-height: 0;
    position: relative;
  }
  &__list-wrap {
    width: 100%;
    z-index: 1;
    overflow-y: auto;
    overflow-x: auto;
  }
  &__list {
    background: #ffffff;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    margin-top: 8px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    margin-bottom: 8px;
  }
  &__item {
    color: #000000;
    padding: 20px;
    display: flex;
    font-size: 14px;
    transition: background 200ms;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  &__item-icon {
    margin-right: 10px;
    width: 24px;
    height: 24px;
    display: inline-block;
    background-size: 24px 24px;
    background-repeat: no-repeat;
    background-position: center;
  }
  &__bag-icon {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyIj48cGF0aCBkPSJNNS44OSA1aDEyLjIyYTEgMSAwIDAgMSAuOTk0Ljg4M2wxLjc2NSAxNUExIDEgMCAwIDEgMTkuODc1IDIySDQuMTI1YTEgMSAwIDAgMS0uOTk0LTEuMTE3bDEuNzY1LTE1QTEgMSAwIDAgMSA1Ljg5IDV6Ii8+PHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNMTUgOC4xNDlWNGEzIDMgMCAwIDAtNiAwdjQuMTQ5Ii8+PC9nPjwvc3ZnPg==);
  }
  &__exit-icon {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTUgMjBINWExIDEgMCAwIDEtMS0xVjVhMSAxIDAgMCAxIDEtMWgxMG0yLjUgNC41bDMuNTM2IDMuNTM2TDE3LjUgMTUuNTdNMjAuMzUzIDEySDkuNDUiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==);
  }
  &__person-icon {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoMzR2MzRIMHoiLz48cGF0aCBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik04LjA5NCAxMi44MTNDNC41MjcgMTQuMzQyIDIgMTcuODgzIDIgMjJjLjIxMy41MjkuNTU2Ljc5MyAxLjAyOC43OTMuNDczIDAgLjc5Ny0uMjY0Ljk3Mi0uNzkzYTcuOTggNy45OCAwIDAgMSAzLjgxMy02LjgxM0E0LjUzNyA0LjUzNyAwIDAgMCAxMiAxOGE0LjUzNyA0LjUzNyAwIDAgMCA0LjE4OC0yLjgxM0E3Ljk4IDcuOTggMCAwIDEgMjAgMjJjLjE0OC41MjkuNDguNzkzLjk5Ni43OTMuNTE3IDAgLjg1MS0uMjY0IDEuMDA0LS43OTMgMC00LjExNy0yLjUyNy03LjY1Ni02LjA5NC05LjE4OC0yLjEyMy0uOTE4LTUuODIyLS44MzYtNy44MTIgMHpNMTIgMTRjLjgyIDAgMS42MDIuMTE3IDIuMzQ0LjM0NGEyLjQ4NSAyLjQ4NSAwIDAgMS00LjY4OCAwQTcuOTg1IDcuOTg1IDAgMCAxIDEyIDE0eiIvPjxwYXRoIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNMTIgM2MxLjgzNSAwIDMgLjk1NCAzIDMuMTExUzEzLjQ3MyAxMCAxMiAxMCA5IDguMjY4IDkgNi4xMTEgMTAuMTY1IDMgMTIgM3oiLz48L2c+PC9zdmc+);
  }
  &__dish-icon {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMSAyMS4wMWgyMlYyMUgxek0yMyAxOEgxdi0yQzEgMTAuNDc3IDUuNDc3IDYgMTEgNmgyYzUuNTIyIDAgMTAgNC40NzcgMTAgMTB2MnpNMTIgNWEyIDIgMCAwIDEtMi0yaDRhMiAyIDAgMCAxLTIgMnoiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==);
  }
}

// .sidebar-fade-enter,
// .sidebar-fade-leave-active {
//   transform: translateX(-312px);
// }

// .sidebar-fade-enter-active,
// .sidebar-fade-leave-active {
//   transition: transform 0.3s ease;
// }
.slide {
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease-out;
  }

  &-enter,
  &-leave-to {
    transform: translateX(-100%);
  }
}

.overlay {
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease-out;
  }

  &-enter,
  &-leave-to {
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
