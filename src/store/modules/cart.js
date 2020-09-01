import Vue from 'vue';
import shortid from 'shortid';
import { getTariffService } from '@/services/tariff';
/* eslint no-unused-vars: */
export default {
  namespaced: true,
  state: {
    cart_active_store_uuid: '',
    cart_products: {},
    delivery_price: 100
  },
  mutations: {
    SET_DELIVERY_PRICE(state, delivery_price) {
      state.delivery_price = delivery_price;
    },
    SET_ACTIVE_STORE_UUID(state, select_uuid) {
      state.cart_active_store_uuid = select_uuid;
    },
    INCREMENT_PRODUCT_FROM_CART(state, keyIndex) {
      state.cart_products[keyIndex].quantity++;
      state.cart_products[keyIndex].menuItem.quantity++;
    },
    DELETE_PRODUCT_FROM_CART(state, keyIndex) {
      if (state.cart_products[keyIndex].menuItem.quantity > 1) {
        state.cart_products[keyIndex].menuItem.quantity--;
      } else {
        Vue.delete(state.cart_products[keyIndex].menuItem, 'quantity');
      }
      if (state.cart_products[keyIndex].quantity > 1) {
        state.cart_products[keyIndex].quantity--;
      } else {
        Vue.delete(state.cart_products, keyIndex);
      }
    },
    CLEAR_CART_OF_PRODUCTS(state) {
      for (const [key, product] of Object.entries(state.cart_products)) {
        Vue.delete(product.menuItem, 'quantity');
        Vue.delete(state.cart_products, key);
      }
    },
    ADD_PRODUCT_TO_CART(state, { product, filterCartProduct }) {
      // Find equal product
      const cartProductExist = filterCartProduct(product.menuItem.uuid);
      // Add new product to cart
      if (!cartProductExist.length) {
        Vue.set(state.cart_products, shortid.generate(), product);
        Vue.set(product.menuItem, 'quantity', product.quantity);
      } else {
        // Check product extra to equal
        if (product.extra.length > 0) {
          // Create hash map from produt extra
          const hashMap = product.extra.reduce((map, { uuid }) => {
            map.set(uuid, uuid);
            return map;
          }, new Map());

          // Search cart product with equal options
          let productExtraExist = null;
          for (const [key, product] of cartProductExist) {
            const extraExist = product.extra.every(({ uuid }) => {
              return hashMap.has(uuid) && product.extra.length === hashMap.size;
            });
            if (extraExist) productExtraExist = { key, product };
          }
          // If founded equal extra
          if (productExtraExist) {
            state.cart_products[productExtraExist.key].quantity +=
              product.quantity;
          } else {
            Vue.set(state.cart_products, shortid.generate(), product);
          }
        } else {
          state.cart_products[cartProductExist[0][0]].quantity +=
            product.quantity;
        }
        product.menuItem.quantity += product.quantity;
      }
    }
  },
  actions: {
    pushProductToCart({ commit, getters }, product) {
      commit('SET_ACTIVE_STORE_UUID', product.menuItem.store_uuid);
      commit('ADD_PRODUCT_TO_CART', {
        product,
        findCartProduct: getters.findCartProductByUUID,
        filterCartProduct: getters.filterCartProductByUUID
      });
    },
    incrementProductFromCart({ commit }, keyIndex) {
      commit('INCREMENT_PRODUCT_FROM_CART', keyIndex);
    },
    deleteProductFromCart({ commit }, keyIndex) {
      commit('DELETE_PRODUCT_FROM_CART', keyIndex);
    },
    clearCartOfProducts({ commit }) {
      commit('CLEAR_CART_OF_PRODUCTS');
      commit('SET_ACTIVE_STORE_UUID', '');
    },
    async getTariffToDelivery(
      { commit },
      { clientUUID, routeFrom, routeTo, serviceUUID }
    ) {
      const { total_price } = await getTariffService({
        clientUUID,
        routeFrom,
        routeTo,
        serviceUUID
      });
      commit('SET_DELIVERY_PRICE', total_price);
    }
  },
  getters: {
    getDeliveryPrice(state) {
      return state.delivery_price;
    },
    getCartProducts(state) {
      return state.cart_products;
    },
    getTotalPrice(state, getters) {
      if (getters.isCartEmpty) return 0;

      return Object.values(state.cart_products).reduce(
        (total, { menuItem, extra, quantity }) => {
          total +=
            extra.reduce((sum, { price }) => sum + price, menuItem.price) *
            quantity;
          return total;
        },
        state.delivery_price
      );
    },
    findCartProductByUUID(state) {
      return findUUID => {
        for (const [key, product] of Object.entries(state.cart_products)) {
          if (findUUID === product.menuItem.uuid) {
            return { cartProductExistKey: key, cartProductExist: product };
          }
        }
        return {};
      };
    },
    filterCartProductByUUID(state) {
      return findUUID => {
        return Object.entries(state.cart_products).filter(
          ([key, { menuItem }]) => menuItem.uuid === findUUID
        );
      };
    },
    getActiveStoreUUID(state) {
      return state.cart_active_store_uuid;
    },
    checkOnEqualActiveStoreUUID(state, getters) {
      return selectStoreUUID => {
        return state.cart_active_store_uuid === selectStoreUUID;
      };
    },
    isCartEmpty(state) {
      return Object.values(state.cart_products).length === 0;
    }
  }
};
