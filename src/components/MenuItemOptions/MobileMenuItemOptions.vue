<template>
  <app-bottom-sheet>
    <div slot="body" class="mobile-shadowable-scrollbox">
      <div class="mobile-shadowable-scrollbox__shadow"></div>
      <div class="mobile-shadowable-scrollbox__content">
        <div class="mobile-add-to-cart-options__image-wrapper">
          <div class="mobile-add-to-cart-options__image-root">
            <div
              :style="{ backgroundImage: `url(${getMenuItemBG})` }"
              class="mobile-add-to-cart-options__restaurant-image"
            ></div>
          </div>
        </div>
        <div class="mobile-add-to-cart-options__description">
          {{ optionProduct.comment }}
        </div>
        <ul
          v-if="optionProduct.variants || optionProduct.toppings"
          class="mobile-add-to-cart-options-group-list"
        >
          <h2
            class="mobile-add-to-cart-options-group__title mobile-add-to-cart-options-group__common"
          >
            Дополнительно
          </h2>
          <li class="mobile-add-to-cart-options-group">
            <ul class="mobile-add-to-cart-options-list">
              <div
                v-for="variant in optionProduct.variants"
                :key="variant.uuid"
                class="options-item"
              >
                <label class="options-item__container">
                  <div class="options-item__control">
                    <input
                      :value="variant"
                      v-model="scopedVariant"
                      type="radio"
                    />
                    <span class="checkmark checkradio"></span>
                  </div>
                  <div class="options-item__name-wrapper">
                    <span class="options-item__name">{{ variant.name }}</span>
                    <span class="options-item__price">
                      {{ getOptionPrice(variant.price) }} ₽
                    </span>
                  </div>
                </label>
              </div>
            </ul>
          </li>
          <li class="mobile-add-to-cart-options__divider"></li>
          <li class="mobile-add-to-cart-options-group">
            <ul class="mobile-add-to-cart-options-list">
              <div
                v-for="option in optionProduct.toppings"
                :key="option.uuid"
                class="options-item"
              >
                <label class="options-item__container">
                  <div class="options-item__control">
                    <input
                      :value="option"
                      v-model="scopedToppings"
                      type="checkbox"
                    />
                    <span class="checkmark checkbox"></span>
                  </div>
                  <div class="options-item__name-wrapper">
                    <span class="options-item__name">{{ option.name }}</span>
                    <span class="options-item__price">
                      {{ getOptionPrice(option.price) }} ₽
                    </span>
                  </div>
                </label>
              </div>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div slot="close" class="mobile-add-to-cart-options__close"></div>
    <div slot="footer" class="menu-item-count-edit">
      <div class="menu-item-count-edit__row">
        <h2 class="menu-item-count-edit__title">
          {{ optionProduct.name }}
        </h2>
        <div class="menu-item-count-edit__price">
          {{ getLocalTotalPrice }} ₽
        </div>
      </div>
      <div class="menu-item-count-edit__counter menu-item-count-edit__row">
        <div
          class="menu-item-count-edit__counter-container menu-item-count-edit__common"
        >
          <span class="mobile-counter">
            <div
              @click="decrementLocalQuantity"
              class="mobile-counter__decrement mobile-counter__icons mobile-counter__button"
            >
              -
            </div>
            <div class="mobile-counter__value">{{ scopedQuantity }}</div>
            <div
              @click="incrementLocalQuantity"
              class="mobile-counter__increment mobile-counter__icons mobile-counter__button"
            >
              +
            </div>
          </span>
        </div>
        <button
          @click="sendOptionOrder"
          :disabled="isDisabled"
          class="menu-item-count-edit__confirm menu-item-count-edit__common"
        >
          <span class="menu-item-count-edit__confirm-content">Добавить</span>
        </button>
      </div>
    </div>
  </app-bottom-sheet>
</template>

<script>
import AppBottomSheet from '../BottomSheet/AppBottomSheet.vue';
import menuItemOptions from './menuItemOptions.js';
export default {
  mixins: [menuItemOptions],
  computed: {
    getMenuItemBG() {
      try {
        const parseImg = JSON.parse(this.optionProduct.image);
        return parseImg.full || parseImg.full_format;
      } catch {
        return this.optionProduct.image;
      }
    }
  },
  props: {
    optionProduct: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  components: {
    AppBottomSheet
  },
  name: 'MobileMenuItemOptions'
};
</script>

<style lang="scss" scoped>
// mobile-shadowable-scrollbox
.mobile-shadowable-scrollbox {
  position: relative;
  flex: 1;
  display: flex;
  &__shadow {
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px inset,
      rgba(0, 0, 0, 0.05) 0px -8px 8px -4px inset,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px inset,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px inset;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    position: absolute;
    pointer-events: none;
    background-image: linear-gradient(
      to bottom,
      rgba(250, 250, 250, 0) calc(100% - 30px),
      #fafafa
    );
  }
  &__content {
    width: 100%;
    z-index: 1;
    overflow-y: auto;
    overflow-x: auto;
  }
}

// mobile-add-to-cart-options
.mobile-add-to-cart-options {
  &__divider {
    height: 1px;
    margin: 10px 20px;
    background-color: #e3e3e3;
  }
  &__image-wrapper {
    width: 100%;
    height: 0;
    position: relative;
    padding-top: calc(280 / 375 * 100%);
  }
  &__image-root {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    background-size: cover;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMTEiIGhlaWdodD0iMTExIj48cGF0aCBmaWxsPSIjRjVGNUY1IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02Mi44NjkgNDkuNTFhMi4zOCAyLjM4IDAgMCAwLS4xMjUtLjM0IDYuMDI3IDYuMDI3IDAgMCAwLS40ODItMS4wMjMgNi40NjggNi40NjggMCAwIDAtMS4yNDYtMS40MzcgNi44ODkgNi44ODkgMCAwIDAtMS42OTUtMS4wMzggNy40NDUgNy40NDUgMCAwIDAtMi4wMS0uNTA3IDcuODYyIDcuODYyIDAgMCAwLTIuMTY5LjEwOCA4LjE1MSA4LjE1MSAwIDAgMC0yLjE1MS43NDggOS4wOTkgOS4wOTkgMCAwIDAtMS45MzYgMS4zODcgOS41NzMgOS41NzMgMCAwIDAtMS41MzcgMS45NiA5LjQ3NiA5LjQ3NiAwIDAgMC0uOTggMi40MTggMTAuMjggMTAuMjggMCAwIDAtLjI5MSAyLjY5MmMuMDMzLjk1NS4xOTEgMS45Mi40NzMgMi43OTEuMy45NDguNzMyIDEuODYxIDEuMjU1IDIuNjU5YTExLjQ5NyAxMS40OTcgMCAwIDAgMi4wMSAyLjMxOCAxMi4wMiAxMi4wMiAwIDAgMCAyLjY1IDEuNzUzYy45OTguNDczIDIuMDc4LjgyMiAzLjEzMyAxLjAxMyAxLjEyMS4yIDIuMzAxLjI1IDMuNDA2LjE1IDEuMTgtLjExNiAyLjM2OC0uMzkgMy40NC0uNzk4YTEzLjkwOCAxMy45MDggMCAwIDAgMy4yMTUtMS43MjggMTQuNDU4IDE0LjQ1OCAwIDAgMCAyLjcxNi0yLjYwOCAxNC41NTEgMTQuNTUxIDAgMCAwIDIuMDAzLTMuMzMyYy41MjMtMS4yMy44OTctMi41NjcgMS4wOC0zLjg1NS4xOS0xLjM4Ny4xOTktMi43NzUuMDI0LTQuMTI5YTE2LjI2NSAxNi4yNjUgMCAwIDAtMS4wOTYtNC4xMDQgMTYuODM2IDE2LjgzNiAwIDAgMC0yLjE5My0zLjc3MiAxNy4xMiAxNy4xMiAwIDAgMC0zLjE5OS0zLjE0OCAxNy40IDE3LjQgMCAwIDAtNC4wMTMtMi4yNTIgMTcuODg2IDE3Ljg4NiAwIDAgMC00LjU4Ni0xLjE2MyAxOC41MSAxOC41MSAwIDAgMC00Ljg0My4wOTIgMTguOTgzIDE4Ljk4MyAwIDAgMC00Ljc2OSAxLjM4NyAxOS43NDYgMTkuNzQ2IDAgMCAwLTQuMzQ1IDIuNjUgMjAuMzIgMjAuMzIgMCAwIDAtMy41OCAzLjc4OSAxOS44NTkgMTkuODU5IDAgMCAwLTIuNTE4IDQuNjk0IDIwLjIwNSAyMC4yMDUgMCAwIDAtMS4yMzggNS4zMDggMjEuMTEzIDIxLjExMyAwIDAgMCAuMTkxIDUuNTY3IDIxLjc4IDIxLjc4IDAgMCAwIDEuNjc4IDUuNDQxIDIyLjQyNyAyMi40MjcgMCAwIDAgMy4xMDggNC45MSAyMi43NDggMjIuNzQ4IDAgMCAwIDQuMzcgNC4wMjEgMjIuOTc2IDIyLjk3NiAwIDAgMCA1LjM3NSAyLjc5MiAyMy40MDcgMjMuNDA3IDAgMCAwIDYuMDMxIDEuMzIgMjQuMDkgMjQuMDkgMCAwIDAgMTIuMzk2LTIuMjY3IDI0LjUxIDI0LjUxIDAgMCAwIDUuNDkxLTMuNTU2IDI1LjE1IDI1LjE1IDAgMCAwIDQuNDUzLTQuOTUyIDI1Ljc0NCAyNS43NDQgMCAwIDAgMy4wNjYtNi4wNDggMjYuMTY3IDI2LjE2NyAwIDAgMCAxLjQxMi02Ljc2MmMuMTc1LTIuMzYuMDQyLTQuNzItLjM5OS03LjAxMmEyNy4yMDggMjcuMjA4IDAgMCAwLTIuMjUxLTYuNzggMjguMDEzIDI4LjAxMyAwIDAgMC00LjAwNC02LjA2NCAyOC40MjcgMjguNDI3IDAgMCAwLTUuNTQyLTQuOTAyIDI4LjcyNSAyOC43MjUgMCAwIDAtNi43My0zLjM0IDI5LjA1OSAyOS4wNTkgMCAwIDAtNy40ODUtMS40OTUgMjkuNzEgMjkuNzEgMCAwIDAtNy43MzQuNDk4IDMwLjE0IDMwLjE0IDAgMCAwLTcuNDUyIDIuNTQzIDMwLjM4NiAzMC4zODYgMCAwIDAtNi42NDcgNC40NTMgMzAuODY2IDMwLjg2NiAwIDAgMC01LjMzMyA2LjEyMiAzMS4zNDEgMzEuMzQxIDAgMCAwLTMuNjE0IDcuNDAzIDMyLjEyNyAzMi4xMjcgMCAwIDAtMS41OTUgOC4yMDhjLS4xNjcgMi44NS4wMzMgNS43LjYwNiA4LjQ1N2EzMy4zMyAzMy4zMyAwIDAgMCAyLjgxNiA4LjEzNCAzMy42NDQgMzMuNjQ0IDAgMCAwIDQuOTEgNy4yMiAzNC4wNSAzNC4wNSAwIDAgMCA2LjY5NyA1Ljc3MyAzNC41MTcgMzQuNTE3IDAgMCAwIDguMDgzIDMuODk3IDM1LjEwMyAzNS4xMDMgMCAwIDAgOC45MzEgMS42NzhjLjY0OC4wMzMgMS4yODguMDUgMS45MjguMDUgMi40NSAwIDQuODg1LS4yNSA3LjI2LS43NDhhMzYuMTU1IDM2LjE1NSAwIDAgMCA4LjgwNy0zLjEwNyAzNi4zMzUgMzYuMzM1IDAgMCAwIDcuNzkzLTUuMzVsLTMuNzM5LTQuMTU0YTMwLjYzNiAzMC42MzYgMCAwIDEtNi41OTYgNC41MiAyOS45NTQgMjkuOTU0IDAgMCAxLTcuNDIgMi42MTYgMjkuNjUgMjkuNjUgMCAwIDEtNy43MjYuNTkgMjguNzA3IDI4LjcwNyAwIDAgMS03LjQ5My0xLjQxMkEyOC40OSAyOC40OSAwIDAgMSA0NC4xNSA3Ny4yYTI4LjAzOCAyOC4wMzggMCAwIDEtNS41OTEtNC44MTkgMjcuMzk4IDI3LjM5OCAwIDAgMS00LjA4LTYuMDE0IDI2LjkzNyAyNi45MzcgMCAwIDEtMi4zNDItNi43NDYgMjYuNTk0IDI2LjU5NCAwIDAgMS0uNDk5LTYuOTk2IDI2LjQ3NSAyNi40NzUgMCAwIDEgMS4zMTMtNi43NyAyNi4wMSAyNi4wMSAwIDAgMSAyLjk3NC02LjA5IDI1LjU5OCAyNS41OTggMCAwIDEgNC4zNzktNS4wMTggMjQuOTYgMjQuOTYgMCAwIDEgNS40MjUtMy42MyAyNC4zMjYgMjQuMzI2IDAgMCAxIDYuMDY0LTIuMDcgMjQgMjQgMCAwIDEgNi4yODEtLjQwN2MyLjAzNi4xMzMgNC4wNzEuNTQgNi4wNCAxLjIxM2EyMy4wNSAyMy4wNSAwIDAgMSA1LjQxNyAyLjY5MiAyMi42IDIyLjYgMCAwIDEgNC40MzYgMy45MyAyMi4yMDEgMjIuMjAxIDAgMCAxIDMuMTk5IDQuODM1IDIxLjg2OCAyMS44NjggMCAwIDEgMS43ODYgNS4zOTIgMjAuOTc3IDIwLjk3NyAwIDAgMS0uNzk4IDEwLjg3NSAyMC4xNjcgMjAuMTY3IDAgMCAxLTIuNCA0LjczNSAyMC4xMTggMjAuMTE4IDAgMCAxLTMuNDczIDMuODYzIDE5LjUyMyAxOS41MjMgMCAwIDEtNC4yNjIgMi43NTkgMTkuMDMyIDE5LjAzMiAwIDAgMS00LjcxIDEuNTEyYy0xLjU3MS4yOS0zLjE5MS4zNjUtNC44MjguMjMyYTE4LjIyNyAxOC4yMjcgMCAwIDEtNC41OTQtMS4wMTMgMTcuNzYzIDE3Ljc2MyAwIDAgMS00LjA3LTIuMTE5IDE3LjEwMiAxNy4xMDIgMCAwIDEtMy4yODItMy4wMjQgMTYuNTQ2IDE2LjU0NiAwIDAgMS0yLjMxOC0zLjY3MiAxNi4wOTYgMTYuMDk2IDAgMCAxLTEuMjM4LTQuMDMgMTUuNjU4IDE1LjY1OCAwIDAgMS0uMTUtNC4wOTVjLjEyNS0xLjMwNC40MzItMi42MDkuOTA2LTMuODcxYTE0Ljc4NCAxNC43ODQgMCAwIDEgMS44MjctMy4zOTggMTQuMTY4IDE0LjE2OCAwIDAgMSAyLjU3Ni0yLjcwOSAxMy44MDMgMTMuODAzIDAgMCAxIDMuMDgyLTEuODg2IDEzLjI5NiAxMy4yOTYgMCAwIDEgMy4zNDgtLjk3MiAxMy4wNjMgMTMuMDYzIDAgMCAxIDMuMzczLS4wNThjMS4wNDcuMTE2IDIuMTM1LjM5OSAzLjE0OS43OTguOTM5LjM3NCAxLjg3OC45MDUgMi43MjUgMS41MzdhMTEuNjU2IDExLjY1NiAwIDAgMSAyLjEzNSAyLjExIDEwLjg2MyAxMC44NjMgMCAwIDEgMS40NDYgMi40OTJjLjM0LjgyMy41OSAxLjc0NS43MDYgMi42NjdhOS43MSA5LjcxIDAgMCAxLS4wMTcgMi42NDIgOS41OCA5LjU4IDAgMCAxLS42ODEgMi40MThjLS4zLjcxNC0uNzMxIDEuNDItMS4yMyAyLjA2YTguNzU0IDguNzU0IDAgMCAxLTEuNjUzIDEuNTcgOC4xMDQgOC4xMDQgMCAwIDEtMS44OTQgMS4wMTQgNy43MTMgNy43MTMgMCAwIDEtMS45NzcuNDU3IDcuMDk1IDcuMDk1IDAgMCAxLTEuOTExLS4wOTIgNi45NTEgNi45NTEgMCAwIDEtMS42OTUtLjU0OCA2LjcxNCA2LjcxNCAwIDAgMS0xLjM4Ny0uOTIyIDUuNzQ3IDUuNzQ3IDAgMCAxLTEuMDA2LTEuMTcyIDUuNDk0IDUuNDk0IDAgMCAxLS42MDYtMS4yOCA0LjkwNyA0LjkwNyAwIDAgMS0uMjA4LTEuMjc5IDQuMzg1IDQuMzg1IDAgMCAxIC4xMjUtMS4xN2MuMDgzLS4zMDguMjMyLS42NzQuMzk5LS45NzMuMTQtLjIzMy4zNTctLjUxNS41ODEtLjcyM2EzLjE3IDMuMTcgMCAwIDEgLjY0OC0uNDY1Yy4xNS0uMDc1LjM3NC0uMTU4LjU2NS0uMmEzLjQ0IDMuNDQgMCAxIDAgNi43MjEtMS4yNTRsLS4wMDgtLjAwOCIvPjwvc3ZnPg==);
    background-color: white;
    background-position: center;
    background-image: none;
  }
  &__restaurant-image {
    background-repeat: no-repeat;
    background-position: center;
    // background-image: url('https://eda.yandex/images/1380298/3f282b87c3538d7ecfcef718f40b7a96-1080x812.jpeg');
    background-size: cover;
    width: 100%;
    height: 100%;
  }
  &__description {
    padding: 16px;
    font-size: 14px;
    background: #fafafa;
    line-height: 22px;
  }
  &__close {
    top: 12px;
    width: 40px;
    right: 12px;
    height: 40px;
    z-index: 6;
    position: absolute;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.07);
    border-radius: 50%;
    background-color: white;
    background-repeat: no-repeat;
    background-position: center;
    display: inline-block;
    background-size: 24px 24px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIvPgogICAgICAgIDxnIGZpbGw9IiMwMDAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQgNCkiPgogICAgICAgICAgICA8cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMiIgeD0iLTIiIHk9IjciIHJ4PSIxIiB0cmFuc2Zvcm09InJvdGF0ZSg0NSA4IDgpIi8+CiAgICAgICAgICAgIDxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyIiB4PSItMiIgeT0iNyIgcng9IjEiIHRyYW5zZm9ybT0icm90YXRlKDEzNSA4IDgpIi8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K);
  }
}

// mobile-add-to-cart-options-group-list
.mobile-add-to-cart-options-group-list {
  width: 100%;
  padding-top: 8px;
}
.mobile-add-to-cart-options-group {
  padding-top: 10px;
  &__common {
    color: #b0b0b0;
    font-size: 12px;
    margin-left: 16px;
    margin-right: 16px;
  }
  &__title {
    height: 12px;
    margin-bottom: 2px;
    text-transform: uppercase;
  }
  &__description {
    margin-top: 5px;
  }
}

.options-item {
  display: flex;
  padding: 0 12px 0 22px;
  font-size: 14px;
  &__container {
    flex: 1 1 auto;
    cursor: pointer;
    display: flex;
    padding: 13px 0;
  }
  &__control {
    position: relative;
    input {
      opacity: 0;
      cursor: pointer;
      width: 22px;
    }
  }
  &__name-wrapper {
    margin: 0 12px;
    line-height: 22px;
  }
  &__name {
    margin-right: 8px;
    text-transform: capitalize;
  }
  &__price {
    color: #b0b0b0;
    white-space: nowrap;
  }
}
// menu-item-count-edit
.menu-item-count-edit {
  &__counter-container {
    border: solid 1px #f5f5f5;
    display: flex;
    padding: 13px 20px;
    align-items: center;
    margin-right: 5px;
    justify-content: center;
    background-color: #ffffff;
  }
  &__row {
    width: 100%;
    display: flex;
  }
  &__common {
    border-radius: 16px;
  }
  &__title {
    flex: 0 1 auto;
    color: #000000;
    line-height: 1.25;
    margin-right: auto;
    font-weight: 100;
    font-size: 16px;
  }
  &__price {
    flex: 0 0 auto;
    color: #000000;
    align-self: center;
    line-height: 1.25;
    padding-left: 10px;
    font-size: 16px;
    font-weight: 100;
  }
  &__counter {
    margin-top: 16px;
  }
  &__confirm {
    flex: 1;
    margin-left: 5px;
    box-shadow: 0 4px 12px 0 rgba(226, 73, 106, 0.3),
      0 2px 4px 0 rgba(226, 73, 106, 0.3);
    height: 56px;
    border: 0;
    display: inline-block;
    padding: 0 20px;
    position: relative;
    overflow: hidden;
    font-size: 16px;
    transition: background 200ms;
    font-weight: 400;
    user-select: none;
    font-weight: 100;
    color: $theme-textColor;
    background-color: $theme-mainColor;
    &:disabled {
      opacity: 0.7;
    }
  }
  &__confirm-content {
    width: 100%;
    display: inline-block;
    overflow: hidden;
    transition: all 150ms;
    text-align: center;
    line-height: 56px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
// mobile-counter
.mobile-counter {
  display: flex;
  text-align: center;
  align-items: center;
  line-height: 23px;
  &__decrement {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiLz48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIxMiIgeD0iMTEiIHk9IjYiIGZpbGw9IiMwMDAiIHJ4PSIxIiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAgMTIgMTIpIi8+PC9nPjwvc3ZnPg==);
  }
  &__value {
    min-width: 24px;
    font-size: 16px;
    line-height: 24px;
  }
  &__increment {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiLz48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIxMiIgeD0iMTEiIHk9IjYiIGZpbGw9IiMwMDAiIHJ4PSIxIi8+PHJlY3Qgd2lkdGg9IjIiIGhlaWdodD0iMTIiIHg9IjExIiB5PSI2IiBmaWxsPSIjMDAwIiByeD0iMSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDEyIDEyKSIvPjwvZz48L3N2Zz4=);
  }
  &__disabled {
    cursor: default;
    opacity: 0.2;
  }
  &__button {
    width: 24px;
    height: 24px;
    cursor: pointer;
    font-size: 22px;
    line-height: 24px;
    font-weight: bold;
    user-select: none;
  }
  &__icons {
    font-size: 0;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
