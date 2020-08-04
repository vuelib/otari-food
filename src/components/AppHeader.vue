<template>
  <header class="header">
    <div class="header-container container">
      <div class="header-logo">
        <a href="#">
          <img
            class="header-logo__img"
            src="../assets/svg/logo.svg"
            alt="logo"
          />
        </a>
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
      <div class="header__button">{{ city }}</div>
      <button class="header__button">
        <span>Войти</span>
        <!-- <span>Выйти</span> -->
      </button>
    </div>
  </header>
</template>

<script>
export default {
  data: () => ({
    city: 'Владикавказ'
  }),
  name: 'AppHeader'
};
</script>

<style lang="scss">
$header-grey: #ccc;
$header-bg: #fff;
$header-text: #000;

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
}
.header-logo__img {
  width: 160px;
}
.header-menu {
  flex: 1 0 auto;
  text-align: center;
  background: $header-bg;
}
.header-menu__link {
  padding: 0 20px;
  font-size: 16px;
}
.header-menu__link:hover {
  color: $header-grey;
}
.header__button {
  color: $header-text;
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
</style>
