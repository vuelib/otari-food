<template>
  <div class="modal-wrapper">
    <div class="modal modal-menu-item-options">
      <div class="menu-item-options">
        <div class="modal__header menu-item-options__header">
          Выберите опции
        </div>
        <div class="modal__body menu-item-options__body">
          <div class="options-group">
            <!--  -->
            <div class="options-group__top-line-wrapper">
              <div class="options-group__top-line">
                <div class="options-group__name">Дополнительно</div>
                <!-- <div class="options-group__description">Дополнительно</div> -->
              </div>
            </div>
            <!--  -->
            <div class="options-group__options">
              <div
                v-for="variant in optionProduct.variants"
                :key="variant.uuid"
                class="options-group__option"
              >
                <div class="options-item">
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
              </div>
            </div>
            <!--  -->
            <div class="options-group__options">
              <div
                v-for="option in optionProduct.toppings"
                :key="option.uuid"
                class="options-group__option"
              >
                <div class="options-item">
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
              </div>
            </div>
            <!--  -->
          </div>
        </div>
        <div class="modal__footer menu-item-options__footer">
          <button
            @click="sendOptionOrder"
            :disabled="isDisabled"
            class="menu-item-options__button button button--yellow"
          >
            Добавить
          </button>
          <div class="menu-item-options__counter">
            <span class="counter">
              <div
                @click="decrementLocalQuantity"
                class="counter__decrement counter-btn"
              >
                -
              </div>
              <div class="counter__value">{{ scopedQuantity }}</div>
              <div
                @click="incrementLocalQuantity"
                class="counter__increnent counter-btn"
              >
                +
              </div>
            </span>
          </div>
          <div class="menu-item-options__total">
            <div class="menu-item-options__total-title">Сумма</div>
            <div class="menu-item-options__total-value">
              {{ getLocalTotalPrice }} ₽
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('cart');

export default {
  mounted() {
    if (this.isDisabled) {
      this.scopedVariant = this.optionProduct.variants.find(
        ({ standard }) => standard
      );
    }
  },
  computed: {
    getOptionPrice() {
      return price => (price < 0 ? price : `+${price}`);
    },
    isDisabled() {
      return this.optionProduct.variants && !this.scopedVariant;
    },
    getLocalTotalPrice() {
      // Toppings sum
      const totalToppings = this.scopedToppings.reduce((total, { price }) => {
        total += price;
        return total;
      }, 0);

      // Variant sum
      const totalVariant = this.scopedVariant ? this.scopedVariant.price : 0;

      // Total sum
      return (
        (totalVariant + totalToppings + this.optionProduct.price) *
        this.scopedQuantity
      );
    }
  },
  methods: {
    sendOptionOrder() {
      if (this.isDisabled) return;

      // construct options
      const mergeOptions = [...this.scopedToppings];
      this.scopedVariant ? mergeOptions.push(this.scopedVariant) : false;
      // console.log(mergeOptions);
      const cartItem = {
        menuItem: this.optionProduct,
        extra: mergeOptions,
        quantity: this.scopedQuantity
      };
      this.$emit('pushProductToCart', cartItem);
      // this.$emit('pushProductToCart', {
      //   ...this.optionProduct,
      //   options: mergeOptions,
      //   quantity: this.scopedQuantity,
      //   priceWithOptions: this.getLocalTotalPrice
      // });
      // this.$emit('closePopup');
    },
    incrementLocalQuantity() {
      this.scopedQuantity++;
    },
    decrementLocalQuantity() {
      if (this.scopedQuantity > 1) this.scopedQuantity--;
    },
    ...mapActions(['pushProductToCartWithOptions'])
  },
  data: () => ({
    scopedToppings: [],
    scopedVariant: null,
    scopedQuantity: 1
  }),
  props: {
    optionProduct: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  name: 'MenuItemOptions'
};
</script>

<style lang="scss">
.modal {
  &__header {
    margin: 5px;
    padding: 10px 20px;
    font-size: 24px;
    font-weight: bold;
    white-space: pre-line;
    line-height: 36px;
    margin-right: 66px;
  }
  &__body {
    max-height: 555px;
    overflow-x: hidden;
    overflow-y: auto;
    border-top: solid 1px #f5f5f5;
    padding: 10px 20px;
    background-color: #fafafa;
  }
  &__footer {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    > button {
      width: auto;
      margin: 0 8px;
    }
  }
}

.modal-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  vertical-align: middle;
}
.modal {
  display: flex;
  max-height: 100%;
  flex-direction: column;
}
.modal-menu-item-options {
  width: 672px;
}
.menu-item-options {
  &__counter {
    margin: 0 8px;
    border: solid 1px #e0e0e0;
    padding: 11px;
    border-radius: 4px;
  }
  &__total {
    margin: 8px;
    text-align: right;
    margin-left: auto;
  }
  &__total-title {
    color: #b0b0b0;
    font-size: 12px;
    margin-bottom: 3px;
  }
  &__total-title-value {
    font-size: 16px;
  }
  &__button {
    width: auto;
  }
}
.counter {
  display: flex;
  text-align: center;
  align-items: center;
  line-height: 23px;
  &__decrement {
    cursor: default;
    &:disabled {
      opacity: 0.2;
    }
  }
  &__value {
    margin: 0 12px;
    min-width: 24px;
    font-size: 16px;
    line-height: 24px;
  }
}
.counter-btn {
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 22px;
  line-height: 24px;
  font-weight: bold;
  user-select: none;
}
.options-group {
  &__top-line-wrapper {
    color: #b0b0b0;
    height: 35px;
    margin-bottom: 15px;
    position: relative;
    font-size: 14px;
  }
  &__top-line {
    width: 100%;
    bottom: 0;
    position: absolute;
  }
  &__name {
    text-transform: uppercase;
  }
  &__description {
    margin-top: 2px;
  }
  &__options {
    margin: 0 -22px;
    display: flex;
    overflow: hidden;
    flex-wrap: wrap;
  }
  &__option {
    top: 1px;
    width: 50%;
    position: relative;
    &::after {
      right: 0;
      width: calc(100% - 50px);
      bottom: 0;
      height: 1px;
      content: '';
      opacity: 0.5;
      position: absolute;
      background-color: #e0e0e0;
    }
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
</style>
