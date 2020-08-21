<template>
  <div class="info-header">
    <div
      class="info-header__image"
      role="img"
      aria-label="Пицца итальяно"
      :style="{ backgroundImage: `url('${store.image}')` }"
    >
      <div class="info-header__image-backdrop">
        <div class="info-header__wrapper">
          <div class="info-header__content">
            <span class="info-header__icon rating-badge">5.0</span>
            <ul class="promo-list info-header__promo-list">
              <li class="promo-list__item">
                <a href="#" class="promo-list__link">
                  <span>Доставка еды</span>
                </a>
              </li>
              <li class="promo-list__item">
                <a href="#" class="promo-list__link">
                  <span>Владикавказ</span>
                </a>
              </li>
            </ul>
            <div class="info-header__name">{{ store.name }}</div>
            <div class="info-header__divider"></div>
            <div class="info-header__meta">
              <div class="info-header__delivery">
                <div class="info-header__delivery-by-us"></div>
                <div class="info-header__delivery-content">
                  <div class="info-header__delivery-title">
                    Доставка Faem.Delivery
                  </div>
                  <div class="info-header__delivery-description">
                    Доставка 29–99 ₽. Бесплатно при заказе от 1500 ₽
                  </div>
                </div>
              </div>
              <div class="info-header__min-order">
                <div class="info-header__min-order-title">Заказ от</div>
                <div class="info-header__min-order-value">0 ₽</div>
              </div>
              <div class="info-header__info">
                <h3 class="info-header__info-title">
                  Информация о ресторане
                </h3>
                <div class="info-header__info-icon"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    store: {
      type: Object,
      defaul: () => {},
      required: true
    }
  },
  name: 'InfoHeader'
};
</script>

<style lang="scss" scoped>
.info-header {
  flex: 1 0 100%;
  color: #ffffff;
  height: 398px;
  overflow: hidden;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  &__image {
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
  }
  &__image-backdrop {
    height: 100%;
    background-image: linear-gradient(
      to bottom,
      rgba(61, 26, 22, 0),
      rgba(61, 26, 22, 0.6)
    );
  }
  &__wrapper {
    height: 100%;
    margin: 0 80px;
    position: relative;
  }
  &__content {
    width: 100%;
    bottom: 0;
    padding: 28px 0;
    position: absolute;
  }
  &__icon {
    padding: 4px 16px;
  }
  &__promo-list {
    margin: 15px 0 0 3px;
  }
  &__name {
    color: #fff;
    margin: 8px 0;
    font-size: 60px;
    font-weight: bold;
    line-height: 1.08;
  }
  &__divider {
    height: 1px;
    opacity: 0.2;
    margin-top: 20px;
    margin-bottom: 8px;
    background-color: #ffffff;
  }
  &__meta {
    font-weight: 100;
    margin: 0 -20px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    line-height: 21px;
    justify-content: space-between;
  }
  &__delivery {
    flex: 0 0 auto;
    margin: 0 4px;
    display: flex;
    padding: 11px 16px;
    position: relative;
    user-select: none;
    border-radius: 12px;
  }
  &__delivery-title,
  &__min-order-title {
    font-size: 14px;
  }
  &__delivery-description,
  &__min-order-value {
    font-size: 16px;
    padding-top: 7px;
  }
  &__min-order {
    margin: 0 4px;
    padding: 11px 16px;
    margin-right: auto;
  }
  &__info {
    margin: 4px 4px;
    cursor: pointer;
    display: flex;
    padding: 11px 16px;
    user-select: none;
    border-radius: 12px;
    &:hover,
    &:focus {
      background: rgba(255, 255, 255, 0.1);
    }
  }
  &__info-title {
    width: 87px;
    font-size: 14px;
    line-height: 17px;
    font-weight: 100;
  }
  &__info-icon {
    width: 35px;
    height: 35px;
    margin-left: 17px;
    background-size: 100%;
    background-image: url('~@/assets/svg/info-icon.svg');
    background-position: center;
  }
}
</style>
