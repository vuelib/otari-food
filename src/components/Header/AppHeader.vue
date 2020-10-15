<template>
  <div>
    <header class="header">
      <div class="header-container container">
        <div class="header-logo">
          <router-link to="/" aria-label="На главную">
            <img
              class="header-logo__img"
              src="../../assets/logo.png"
              alt="logo"
            />
          </router-link>
        </div>
        <div class="header-menu">
          <a
            aria-label="Партнерам"
            rel="nofollow"
            href="https://faem.ru/eda/partners"
            class="header-menu__link"
            target="_blank"
          >
            Партнерам
          </a>
          <a
            aria-label="Контакты"
            rel="nofollow"
            href="https://faem.ru/eda/contacts"
            class="header-menu__link"
            target="_blank"
          >
            Контакты
          </a>
          <a
            aria-label="Тел."
            rel="nofollow"
            href="#"
            class="header-menu__link"
          >
            +7 (928) 488-98-28
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
        <button
          @click="openLoginModal"
          v-if="!isAuthUser"
          class="header__button"
        >
          <span class="header__login">Войти</span>
        </button>
        <button v-else class="header__button header__profile">
          <span>Профиль</span>
          <ul class="cabinet-menu">
            <!-- <li class="cabinet-item"><i class="icon-user"></i>Мои данные</li>
            <li class="cabinet-item"><i class="icon-user"></i>Мои адреса</li> -->
            <li @click="showMyOrders" class="cabinet-item">
              <i class="icon-user"></i>Мои заказы
            </li>
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
    <app-popup v-show="isShowMyOrders" @closePopup="closeMyOrdersModal">
      <AppOrderHistory ref="my-orders" @closePopup="closeMyOrdersModal" />
    </app-popup>
  </div>
</template>

<script>
import AppPopup from '../AppPopup';
import AppLogin from '../AppLogin';
import AppOrderHistory from '../AppOrderHistory';
import auth from '@/mixins/auth.js';
import header from './header';

export default {
  mixins: [auth, header],
  name: 'AppHeader',
  components: {
    AppPopup,
    AppLogin,
    AppOrderHistory
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
  z-index: 2;
  width: 200px;
  padding: 7px 0;
  overflow-y: auto;
  position: absolute;
  right: 0;
  top: 55px;
  line-height: 20px;
  // font-size: 10px;
  background: #fff;
  box-sizing: border-box;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.15);
  border-radius: 4px;

  visibility: hidden;
  opacity: 0;
  transition: 0.2s;
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
.cabinet-item {
  cursor: pointer;
  padding: 8px 0 8px 0px;
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
.cabinet-item:not(:first-child)::before {
  content: '';
  top: 0;
  left: 0;
  right: 0;
  display: block;
  position: absolute;
  border-top: 1px solid #f4f4f4;
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
