<template>
  <div class="mobile-enter-address-fullscreen">
    <div class="mobile-input-panel">
      <div class="mobile-input-panel__inner">
        <input
          @input="debounceInput"
          v-model="enterAddress"
          type="text"
          class="mobile-input-panel__input"
          placeholder="Укажите адрес доставки..."
        />
        <div
          @click="clearEnterAddress"
          v-if="enterAddress.length"
          class="mobile-input-panel__clear-button"
        />
        <div class="mobile-input-panel__divider" />
        <button
          @click="closeSetAddress"
          class="mobile-input-panel__cancel-button"
        >
          Отменить
        </button>
      </div>
    </div>
    <ul class="mobile-address-suggests-list">
      <li
        v-for="suggestion in suggestionsAddresses"
        @click="setAddress(suggestion)"
        :key="suggestion.uuid"
      >
        <div class="mobile-address-suggests-item">
          <div class="mobile-address-suggests-item__border">
            <div class="mobile-address-suggests-item__hint">
              {{ suggestion.unrestricted_value }}
            </div>
            <div class="mobile-address-suggests-item__subhint">
              Россия, Республика Северная Осетия — Алания, Владикавказ
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import enterAddress from './enterAddress.js';
export default {
  mixins: [enterAddress],
  methods: {
    setAddress(selectedAddress) {
      this.setCurrentLocation(selectedAddress);
      this.$emit('closePopup');
    },
    clearEnterAddress() {
      this.enterAddress = '';
    },
    closeSetAddress() {
      this.$emit('closePopup');
    }
  }
};
</script>

<style lang="scss" scoped>
.mobile-enter-address-fullscreen {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 1;
  position: fixed;
  overflow: hidden;
  padding-bottom: 0;
  background: #ffffff;
  z-index: 100001;
}
.mobile-input-panel {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  &__inner {
    display: flex;
    align-items: center;
  }
  &__input {
    flex: 1;
    border: none;
    min-width: 0;
    font-size: 14px;
    padding-top: 14px;
    line-height: 1.7142857142857142;
    padding-left: 22px;
    padding-right: 0;
    padding-bottom: 14px;
  }
  &__divider {
    width: 1px;
    height: 24px;
    background-color: rgba(0, 0, 0, 0.05);
  }
  &__cancel-button {
    width: 105px;
    height: 100%;
    border: none;
    font-size: 14px;
    padding-top: 18px;
    padding-left: 19px;
    padding-right: 20px;
    padding-bottom: 18px;
    background-color: #ffffff;
  }
  &__clear-button {
    width: 36px;
    margin-right: 8px;
    background-size: 24px;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiAxMC41ODZsLTEuNDE0LTEuNDE0YTEgMSAwIDEgMC0xLjQxNCAxLjQxNEwxMC41ODYgMTJsLTEuNDE0IDEuNDE0YTEgMSAwIDEgMCAxLjQxNCAxLjQxNEwxMiAxMy40MTRsMS40MTQgMS40MTRhMSAxIDAgMSAwIDEuNDE0LTEuNDE0TDEzLjQxNCAxMmwxLjQxNC0xLjQxNGExIDEgMCAxIDAtMS40MTQtMS40MTRMMTIgMTAuNTg2ek0xMiAxOWE3IDcgMCAxIDEgMC0xNCA3IDcgMCAwIDEgMCAxNHoiIG9wYWNpdHk9Ii4zIi8+PC9zdmc+);
    height: 24px;
    display: inline-block;
  }
}
.mobile-address-suggests-list {
  width: 100%;
  margin-top: 8px;
  overflow-y: auto;
}
.mobile-address-suggests-item {
  font-weight: 100;
  width: 100%;
  &__border {
    max-width: 100%;
    margin-left: 16px;
    padding-top: 9px;
    padding-left: 4px;
    padding-right: 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding-bottom: 13px;
  }
  &__hint {
    color: #000000;
    font-size: 16px;
  }
  &__subhint {
    color: #b0b0b0;
    font-size: 14px;
  }
}
</style>
