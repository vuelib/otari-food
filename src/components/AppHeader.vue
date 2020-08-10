<template>
  <div>
    <header class="header">
      <div class="header-container container">
        <div class="header-logo">
          <router-link to="/" aria-label="На главную">
            <img
              class="header-logo__img"
              src="../assets/svg/logo.svg"
              alt="logo"
            />
          </router-link>
        </div>
        <div class="header-menu">
          <a
            aria-label="Ресторанам"
            rel="nofollow"
            href="#"
            class="header-menu__link"
          >
            Ресторанам
          </a>
          <a
            aria-label="Курьерам"
            rel="nofollow"
            href="#"
            class="header-menu__link"
          >
            Курьерам
          </a>
          <a
            aria-label="Компаниям"
            rel="nofollow"
            href="#"
            class="header-menu__link"
          >
            Компаниям
          </a>
        </div>
        <button class="header__button">{{ city }}</button>
        <button @click="openLoginModal" class="header__button">
          <span v-if="!isAuthUser">Войти</span>
          <span v-else>Выйти</span>
        </button>
      </div>
    </header>
    <app-popup
      v-show="isModalVisible && !isAuthUser"
      @closePopup="closeLoginModal"
    >
      <AppLogin />
    </app-popup>
    <!-- <AppLogin /> -->
  </div>
</template>

<script>
import AppPopup from './AppPopup';
import AppLogin from './AppLogin';
import auth from '@/mixins/auth.js';

export default {
  methods: {
    openLoginModal() {
      if (this.isAuthUser) this.logout();
      else this.isModalVisible = true;
    },
    closeLoginModal() {
      this.isModalVisible = false;
    }
  },
  data: () => ({
    isModalVisible: false,
    city: 'Владикавказ'
  }),
  mixins: [auth],
  name: 'AppHeader',
  components: {
    AppPopup,
    AppLogin
  }
};
</script>

<style lang="scss">
$header-grey: #ccc;
$header-bg: #fff;

.header {
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  position: fixed;
  background: $header-bg;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  transition: left 0.2s ease-in-out;
  will-change: transform;
  font-weight: 100;
  &__button {
    color: $theme-textColor;
    height: 32px;
    border: 1px solid $header-grey;
    cursor: pointer;
    padding: 7px 16px;
    display: inline-block;
    font-size: 15px;
    background: transparent;
    box-shadow: none;
    line-height: 16px;
    margin-left: 20px;
    white-space: nowrap;
    border-radius: 100px;
  }
}
.header-container {
  height: 80px;
  padding: 0 40px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row;
}
.header-logo {
  flex: 0 0 auto;
  padding: 0 20px 0 0;
  &__img {
    width: 160px;
  }
}
.header-menu {
  flex: 1 0 auto;
  text-align: center;
  background: $header-bg;
  &__link {
    padding: 0 20px;
    font-size: 16px;
    color: $theme-textColor;
    &:hover {
      color: $header-grey;
    }
  }
}
</style>
