<template>
  <transition name="modal-fade">
    <div @click="handlerClosePopup" class="popup-backdrop" data-close="true">
      <div class="popup">
        <div class="popup__close-icon">
          <img
            class="clear-icon"
            src="../assets/svg/clear-icon.svg"
            alt="clear-icon"
            data-close="true"
          />
        </div>
        <div class="popup__body">
          <slot name="body" />
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    handlerClosePopup({ target }) {
      if (!target.dataset.close) return;
      this.$emit('closePopup');
      console.log('close');
    }
  },
  name: 'AppPopup'
};
</script>

<style lang="scss">
.popup-backdrop {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 40px;
  z-index: 300;
  overflow: auto;
  position: fixed;
  background: rgba(65, 65, 65, 0.65);
  text-align: center;
  &::after {
    width: 0;
    height: 100%;
    content: '';
    display: inline-block;
    vertical-align: middle;
  }
}
.popup {
  display: inline-block;
  position: relative;
  text-align: initial;
  vertical-align: middle;
  border: 1px solid gray;
  background: white;
  border-radius: 4px;
  &__close-icon {
    top: 0;
    right: 20px;
    width: 20px;
    cursor: pointer;
    height: 20px;
    position: absolute;
    font-size: 32px;
    line-height: 20px;
    font-weight: normal;
  }
  &__body {
    padding: 20px 0px;
    font-size: 18px;
    line-height: 1.4;
  }
}
.clear-icon {
  width: 30px;
  opacity: 0.7;
  :hover {
    opacity: 1;
  }
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
  transform: scale(1.1);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.2s ease;
}
</style>
