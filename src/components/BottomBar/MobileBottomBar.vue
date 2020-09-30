<template>
  <div class="mobile-bottom-bar-wrap">
    <div class="mobile-bottom-bar">
      <div class="cart-bar-layout">
        <button @click="handleBottomBarClick" class="mobile-cart-button">
          <span class="mobile-cart-button__content">
            <div class="mobile-cart-button-content">
              <div class="mobile-cart-button-content__wrapper">
                {{ restaurantName }}
              </div>
            </div>
            <div class="mobile-cart-button-bubble">{{ price }} ₽</div>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleBottomBarClick() {
      this.$emit('BottomBarClick');
    }
  },
  props: {
    restaurantName: {
      type: String,
      default: 'Корзина'
    },
    price: {
      type: Number,
      required: true
    }
  },
  name: 'MobileBottomBar'
};
</script>

<style lang="scss" scoped>
.mobile-bottom-bar-wrap {
  position: fixed;
  z-index: 50000;
  left: 0;
  width: 100%;
  bottom: 0;
}
.mobile-bottom-bar {
  left: 0;
  width: 100%;
  bottom: 0;
  position: absolute;
}
.cart-bar-layout {
  width: 100%;
  height: 100%;
  opacity: 0;
  padding: 8px;
  overflow: hidden;
  transform: translateY(100%);
  box-shadow: 0 -4px 8px 0 rgba(0, 0, 0, 0.05);
  transition: all 200ms ease-in;
  background-color: #ffffff;

  opacity: 1;
  transform: translateY(0);
}
.mobile-cart-button {
  background-color: $theme-mainColor;
  width: 100%;
  display: block;
  padding: 0 11px;
  border-radius: 16px;

  color: $theme-textColor;
  height: 56px;
  border: 0;
  padding: 0 20px;
  position: relative;
  overflow: hidden;
  font-size: 16px;
  transition: background 200ms;
  font-weight: 400;
  user-select: none;
  &__content {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    flex-wrap: nowrap;
    align-items: center;
    line-height: normal;
    overflow: hidden;
    transition: all 150ms;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.mobile-cart-button-content {
  padding: 0 8px;
  overflow: hidden;
  margin-right: auto;
  &__wrapper {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.mobile-cart-button-bubble {
  flex: 0 0 auto;
  padding: 7px 10px;
  font-size: 14px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.03);
}
</style>
