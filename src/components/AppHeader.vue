<template>
  <div>
    <header class="header">
      <div class="header-container container">
        <div class="header-logo">
          <router-link to="/" aria-label="На главную">
            <img class="header-logo__img" src="../assets/logo.png" alt="logo" />
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
        <button
          v-if="!isCurrentLocationNull"
          @click="enterAddress"
          :class="{ 'header__address-button': !isCartEmpty }"
          class=" header__button"
        >
          <i class="icon-place"></i>
          {{ getCurrentLocation.value }}
        </button>
        <button
          @click="goToCart"
          v-if="!isCartEmpty"
          class="header__cart-button header__button"
        >
          <i class="icon-cart"></i>
          {{ getTotalPrice }}
          ₽
        </button>
        <button class="header__city header__button">
          {{ city }}
        </button>
        <button v-if="!isAuthUser" class="header__button">
          <span @click="openLoginModal" class="header__login">Войти</span>
        </button>
        <button v-else class="header__button header__profile">
          <span>Профиль</span>
          <ul class="cabinet-menu">
            <li class="cabinet-item"><i class="icon-user"></i>Мои данные</li>
            <li class="cabinet-item"><i class="icon-user"></i>Мои адреса</li>
            <li class="cabinet-item"><i class="icon-user"></i>Мои заказы</li>
            <li @click="openLoginModal" class="cabinet-item">
              <i class="icon-user"></i>Выйти
            </li>
          </ul>
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

import { createNamespacedHelpers } from 'vuex';

export default {
  methods: {
    goToCart() {
      if (
        this.$route.name === 'RestaurantPage' &&
        this.$route.params.id === this.getActiveStoreUUID
      )
        return;
      this.$router.push({
        name: 'RestaurantPage',
        params: {
          id: this.getActiveStoreUUID
        }
      });
    },
    enterAddress() {
      this.$emit('showEnterAddressModal');
    },
    openLoginModal() {
      if (this.isAuthUser) this.logout();
      // if (this.isAuthUser) console.log('logout');
      else this.isModalVisible = true;
    },
    closeLoginModal() {
      this.isModalVisible = false;
    }
  },
  computed: {
    ...createNamespacedHelpers('location').mapGetters([
      'isCurrentLocationNull',
      'getCurrentLocation'
    ]),
    ...createNamespacedHelpers('cart').mapGetters([
      'getTotalPrice',
      'isCartEmpty',
      'getActiveStoreUUID'
    ])
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
  &__city {
    position: relative;
    &:hover > .list-options {
      visibility: visible;
      opacity: 1;
    }
  }
  &__button {
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
  &__cart-button {
    margin-left: 0;
    padding-left: 10px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    color: $theme-textColor;
    background: $theme-mainColor;
    border-color: $theme-mainColor;
  }
  &__address-button {
    border-right: none;
    padding-right: 10px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  &__profile {
    position: relative;
    &:hover .cabinet-menu {
      visibility: visible;
      opacity: 1;
      top: 35px;
    }
  }
}
.cabinet-menu {
  position: absolute;
  top: 45px;
  right: 0px;
  color: #a0a0a0;
  z-index: 201;
  padding: 10px 15px 5px;
  font-size: 18px;
  background: white;
  text-align: left;
  box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);
  transition: 0.15s;
  visibility: hidden;
  opacity: 0;
}
.cabinet-item {
  cursor: pointer;
  padding-bottom: 10px;
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
    &:hover {
      color: $header-grey;
    }
  }
}
.icon-cart {
  &::before {
    speak: none;
    width: 1em;
    display: inline-block;
    content: '\e817';
    font-style: normal;
    text-align: center;
    font-family: foodfox-icons;
    font-weight: normal;
    line-height: 1em;
    margin-left: 0.2em;
    margin-right: 0.2em;
    font-variant: normal;
    text-transform: none;
    text-decoration: inherit;
    -webkit-font-smoothing: antialiased;
  }
}
.icon-place {
  &::before {
    speak: none;
    width: 1em;
    display: inline-block;
    content: '\e813';
    font-style: normal;
    text-align: center;
    font-family: foodfox-icons;
    font-weight: normal;
    line-height: 1em;
    margin-left: 0.2em;
    margin-right: 0.2em;
    font-variant: normal;
    text-transform: none;
    text-decoration: inherit;
    -webkit-font-smoothing: antialiased;
  }
}
</style>
