<template>
  <div v-if="showBanner" class="mobile-banner">
    <div @click="showBanner = false" class="mobile-banner__close">×</div>
    <img src="../../assets/app-banner.png" class="mobile-banner__logo" />
    <div class="mobile-banner__info">
      <div class="mobile-banner__title">Приложение</div>
      <div class="mobile-banner__app-name">Faem</div>
    </div>
    <a
      href="https://faem.page.link/s2qh"
      class="mobile-button mobile-banner__install"
      target="_blank"
    >
      Установить
    </a>
  </div>
</template>

<script>
export default {
  data: () => ({
    showBanner: true
  })
};
</script>

<style lang="scss" scoped>
.mobile-banner {
  z-index: 2;
  position: relative;
  width: 100%;
  height: 74px;
  display: flex;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  align-items: center;
  background-color: #f5f5f5;
  &__close {
    color: #b0b0b0;
    display: flex;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: center;
  }
  &__logo {
    width: 42px;
    height: 42px;
  }
  &__info {
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 8px;
  }
  &__title {
    color: #000000;
    font-size: 12px;
  }
  &__app-name {
    color: #000000;
    font-size: 12px;
    font-weight: 500;
  }
  &__install {
    margin-left: auto;
    margin-right: 10px;
  }
}
</style>
