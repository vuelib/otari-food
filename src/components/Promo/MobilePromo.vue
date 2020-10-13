<template>
  <div class="mobile-catalog-page-welcome">
    <ul class="breadcrumbs mobile-catalog-page-welcome__breadcrumbs">
      <li class="breadcrumbs__item">FaemEda</li>
      <li class="breadcrumbs__item">Владикавказ</li>
    </ul>
    <h1 class="mobile-catalog-page-welcome__title">
      Доставка еды Во Владикавказе
    </h1>
    <p class="mobile-catalog-page-welcome__text">
      Укажите ваше местоположение, чтобы мы смогли предложить вам список
      доступных ресторанов
    </p>
    <div class="mobile-catalog-page-welcome__button-wrap">
      <button
        @click="setAddress"
        class="mobile-button mobile-catalog-page__address-btn"
      >
        Укажите адрес
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    setAddress() {
      this.$emit('setAddress');
    }
  }
};
</script>

<style lang="scss" scoped>
.mobile-catalog-page-welcome {
  padding: 20px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  background-size: auto 250px;
  background-repeat: no-repeat;
  background-position: top right;
  background-image: url(https://yastatic.net/s3/eda-front/www/assets/default-b51928a28b24c9a5605a9542e1c5c46f.jpg);
  @media (min-width: 650px) {
    text-align: center;
  }
  &__title {
    display: flex;
    font-size: 24px;
    font-weight: 100;
    max-width: 220px;
    min-height: 60px;
    line-height: 1.26;
    align-items: center;
    margin-right: 115px;
    @media (min-width: 650px) {
      margin: 0 auto;
      max-width: 360px;
      justify-content: center;
    }
  }
  &__text {
    color: #b0b0b0;
    font-size: 12px;
    max-width: 231px;
    margin-top: 18px;
    line-height: 1.67;
    margin-right: 139px;
    @media (min-width: 650px) {
      margin: 18px auto 0;
      max-width: 360px;
    }
  }
  &__button-wrap {
    display: flex;
    margin-top: 20px;
    justify-content: center;
  }
  &__address-btn {
    flex: 0 1 250px;
    color: #443c0f;
    transform: translate3d(0, 0, 0);
    @media (min-width: 650px) {
      flex-basis: 300px;
    }
  }
}

.breadcrumbs {
  padding-bottom: 6px;
  &__item {
    color: #b0b0b0;
    display: inline;
    font-size: 12px;
    &:not(:last-child):after {
      content: ' · ';
    }
  }
}
</style>
