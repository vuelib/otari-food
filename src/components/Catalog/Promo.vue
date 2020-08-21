<template>
  <div class="promo" :style="{ backgroundImage: bg }">
    <div class="promo__content">
      <ul class="promo-list">
        <li class="promo-list__item">
          <a href="#" class="promo-list__link">
            <span>Faem.Delivery</span>
          </a>
        </li>
        <li class="promo-list__item">
          <a href="#" class="promo-list__link">
            <span>Владикавказ</span>
          </a>
        </li>
      </ul>
      <div class="promo-text">
        <h1 class="promo__title">
          Быстрая доставка еды <br />
          Во Владикавказе
        </h1>
        <div class="promo__address-block address-block">
          <div class="address-block__input-wrapper">
            <div class="address-input">
              <div class="address-input__container">
                <input
                  type="text"
                  value
                  autocomplete="off"
                  aria-autocomplete="list"
                  aria-controls="react-autowhatever-1"
                  class="address-input__input"
                  placeholder="Укажите адрес доставки..."
                  autofocus
                />
                <div
                  id="react-autowhatever-1"
                  role="listbox"
                  class="react-autosuggest__suggestions-container"
                ></div>
              </div>
              <div class="address-input__image-locate"></div>
            </div>
          </div>
          <div class="address-block__button-wrapper">
            <button class="address-block__button button button--yellow">
              Показать рестораны
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    bg() {
      return `url(${require('@/assets/default.png')})`;
    }
  },
  name: 'Promo'
};
</script>

<style lang="scss">
.promo {
  padding: 50px 80px 55px;
  z-index: 5;
  position: relative;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  transition: opacity 200ms;
  background-size: cover;
  background-position: center;
  &::after {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    display: block;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  &__title {
    margin: 0;
    font-size: 50px;
    max-width: 1000px;
    line-height: 1.2;
    font-weight: 400;
    padding-right: 10%;
  }
}
.promo-list {
  margin: 0 0 5px 3px;
  z-index: 1;
  position: relative;
  &__item {
    display: inline;
    &:not(:last-child):after {
      color: white;
      content: ' · ';
      opacity: 0.8;
    }
  }
  &__link {
    color: white;
    opacity: 0.8;
  }
}
.promo-text {
  color: white;
  z-index: 1;
  position: relative;
  font-weight: bold;
}

.address-block {
  color: black;
  display: flex;
  position: relative;
  max-width: 870px;
  margin-top: 30px;
  font-weight: lighter;
  &__input-wrapper {
    flex: 1 1 auto;
    width: 70%;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    height: 56px;
    display: block;
  }
  &__button-wrapper {
    flex: 0 0 220px;
  }
  &__button {
    min-height: 44px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
.address-input {
  height: 100%;
  &__container {
    height: 100%;
  }
  &__input {
    border: none;
    font-size: 18px;
    box-shadow: none;
    padding: 0 36px;
    height: 100%;
    border-radius: 4px 0 0 4px;
  }
  &__image-locate {
    top: 50%;
    left: 11px;
    width: 18px;
    cursor: pointer;
    height: 18px;
    opacity: 0.7;
    position: absolute;
    margin-top: -8px;
    background-image: url('~@/assets/svg/locate-icon.svg');
    &:hover {
      opacity: 1;
    }
  }
}
</style>
