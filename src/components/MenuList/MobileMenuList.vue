<template>
  <div>
    <div>
      <div
        ref="mobile-restaurant-page-menu-panel"
        class="mobile-restaurant-page-menu-panel"
      >
        <scrollactive
          active-class="active"
          class="mobile-categoru-menu"
          ref="mobile-categoru-menu"
        >
          <li
            v-for="(category, key) of Object.keys(categories)"
            :key="key"
            class="mobile-categoru-menu__item"
          >
            <a :href="getAnchorLink(category)" class="scrollactive-item active">
              {{ category.replace(/.*(>|\|)\.*/g, '').trim() }}
            </a>
          </li>
        </scrollactive>
      </div>
    </div>
    <ul
      @click="handlerPushToCart"
      ref="menu-list"
      class="mobile-restaurant-components-category-list"
    >
      <li
        v-for="([name, category], key) of Object.entries(categories)"
        :key="key"
        class="mobile-restaurant-components-category-list__category"
      >
        <MobileMenu :category-name="name" :category="category" />
      </li>
      <!-- MobileMenuItemOptions -->
      <MobileMenuItemOptions
        :option-product="optionProduct"
        v-show="isShowOptions"
        @pushProductToCart="checkEqualStore"
        @closePopup="closeMenuItemOption"
        ref="menu-item-options"
      />
      <!-- MobileEnterAddress -->
      <MobileEnterAddress
        @closePopup="isShowEnterAddress = toggleViewAndScrollBody(false)"
        v-if="isShowEnterAddress"
      />

      <app-bottom-sheet
        @closePopup="isConfirmSetAddress = toggleViewAndScrollBody(false)"
        v-if="isConfirmSetAddress"
        :header="true"
      >
        <div slot="header">Укажите ваш адрес</div>
        <div slot="body" class="mobile-confirm-set-address-body">
          <p class="mobile-confirm-set-address__description">
            Укажите адрес доставки, чтобы мы могли показать вам список доступных
            мест
          </p>
          <button
            @click="
              (isShowEnterAddress = toggleViewAndScrollBody(true)),
                (isConfirmSetAddress = toggleViewAndScrollBody(false))
            "
            class="mobile-confirm-set-address__button"
          >
            <span class="mobile-confirm-set-address__button-content">
              Указать адрес
            </span>
          </button>
        </div>
      </app-bottom-sheet>
    </ul>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import MobileMenu from '../Menu/MobileMenu';
import menuList from './menuList.js';
import { toggleViewAndScrollBody } from '@/mixins/common.js';
export default {
  mixins: [menuList],
  updated() {
    // window.scrollTo(0, 1);
  },
  mounted() {
    // document.addEventListener('scroll', () => {
    //   const panel = this.$refs['mobile-restaurant-page-menu-panel'];
    //   const { top } = panel.getBoundingClientRect();
    //   if (top <= 0) panel.classList.add('fixed');
    //   else panel.classList.remove('fixed');
    // });
  },
  methods: {
    checkEqualStore(product) {
      const cartItem = !product.extra
        ? {
            menuItem: product,
            extra: [],
            quantity: 1
          }
        : product;
      const { menuItem } = cartItem;
      if (
        !this.checkOnEqualActiveStoreUUID(menuItem.store_uuid) &&
        !this.isCartEmpty
      ) {
        Swal.fire({
          title: 'Оформить заказ из другого ресторана',
          text: 'Все ранее добавленные блюда будут удалены из корзины',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#fc5b58',
          confirmButtonText: 'Подтвердить',
          cancelButtonText: 'Отмена'
        }).then(result => {
          if (result.value) {
            this.clearCartOfProducts();
            this.pushToCart(cartItem);
          }
        });
      } else this.pushToCart(cartItem);
    },
    handlerPushToCart({ target }) {
      // Delegating events
      const productContainer = target.closest('article');
      if (
        !productContainer &&
        !this.$refs['menu-list'].contains(productContainer)
      ) {
        return;
      }
      const product = this.findStoreProductByUUID(
        productContainer.dataset.product
      );
      // Check current location
      if (this.isCurrentLocationNull) {
        // this.$parent.$emit('showEnterAddressModal');
        // this.isShowEnterAddress = true;
        this.isConfirmSetAddress = this.toggleViewAndScrollBody(true);
        return;
      }
      // Product have variants or toppings

      this.$refs['menu-item-options'].resetOptions();
      this.optionProduct = product;
      this.isShowOptions = this.toggleViewAndScrollBody(true);
    },
    closeMenuItemOption() {
      this.isShowOptions = this.toggleViewAndScrollBody(false);
    },
    onItemChanged(event, currentItem) {
      if (!currentItem) return;
      // let prev = 0;
      // let offset = 0;
      this.$refs['mobile-categoru-menu'].$el.scrollBy({
        top: 0,
        left: -this.offset,
        behavior: 'smooth'
      });
      for (const item of this.$refs['mobile-categoru-menu'].$el.children) {
        if (currentItem.isEqualNode(item.childNodes[0])) break;
        // console.log(item);
        this.offset += item.offsetWidth;
      }
      // const offset = [
      //   ...this.$refs['mobile-categoru-menu'].$el.children
      // ].reduce((acc, item) => {
      //   if (!currentItem) return;

      //   if (currentItem.isEqualNode(item.childNodes[0])) return acc;
      //   acc += item.offsetWidth;
      //   return acc;
      // }, 0);
      this.$refs['mobile-categoru-menu'].$el.scrollBy({
        top: 0,
        left: this.offset - this.prev,
        behavior: 'smooth'
      });
      this.prev = this.offset;
      console.log(
        'offset',
        this.offset,
        'prev',
        this.prev,
        'LEFT',
        this.offset - this.prev
      );
      // console.log(event, currentItem);
      // }, 0);
    },
    getAnchorLink(category) {
      // tmp solution
      return `#${category
        .replace(/.*(>|\|)\.*/g, '')
        .trim()
        .replace(/\s+/g, '-')}`;
    },
    toggleViewAndScrollBody
  },
  data: () => ({
    optionProduct: {},
    isShowOptions: false,
    isConfirmSetAddress: false,
    isShowEnterAddress: false,
    prev: 0,
    offset: 0
  }),
  props: {
    categories: {
      type: Object,
      default: () => {},
      reuired: true
    }
  },
  components: {
    MobileMenu,
    MobileMenuItemOptions: () =>
      import('../MenuItemOptions/MobileMenuItemOptions.vue'),
    MobileEnterAddress: () => import('../EnterAddress/MobileEnterAddress.vue'),
    AppBottomSheet: () => import('../BottomSheet/AppBottomSheet.vue')
  }
};
</script>

<style lang="scss" scoped>
.mobile-restaurant-components-category-list {
  background-color: #ffffff;
}

.mobile-confirm-set-address {
  &__description {
    color: #b0b0b0;
    font-size: 14px;
    text-align: center;
    line-height: 1.57;
  }
  &__button {
    height: 56px;
    border: 0;
    display: inline-block;
    padding: 0 20px;
    position: relative;
    overflow: hidden;
    transition: background 200ms;
    font-weight: 400;
    user-select: none;
    border-radius: 16px;
    color: $theme-textColor;
    background-color: $theme-mainColor;
    width: 100%;
    font-size: 14px;
    margin-top: 24px;
  }
  &__button-content {
    width: 100%;
    overflow: hidden;
    transition: all 150ms;
    text-align: center;
    line-height: 56px;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
}
.mobile-confirm-set-address-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
}
.scrollactive-item {
  opacity: 0.4;
  padding: 0 14px;
  color: #21201f;
  &::first-letter {
    text-transform: uppercase;
  }
}
.scrollactive-item.active {
  color: $theme-textColor;
  border-radius: 16px;
  opacity: 1;
  background-color: $theme-mainColor;
}
.mobile-categoru-menu {
  display: flex;
  overflow-x: auto;
  &__item {
    height: 36px;
    display: flex;
    font-size: 15px;
    max-width: 80vw;
    box-sizing: border-box;
    line-height: 36px;
    white-space: nowrap;
    align-items: center;
    // ====
  }
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.mobile-restaurant-page-menu-panel {
  width: 100%;
  display: flex;
  z-index: 1;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: center;
  background-color: #ffffff;
  &.fixed {
    position: fixed;
    top: 0;
    z-index: 9999;
  }
}
</style>
