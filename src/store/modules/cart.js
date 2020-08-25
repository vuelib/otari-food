import Vue from 'vue';
import shortid from 'shortid';
/* eslint no-unused-vars: */
export default {
  namespaced: true,
  state: {
    cart_active_store_uuid: '',
    cart_products: {},
    delivery_price: 100
  },
  mutations: {
    SET_ACTIVE_STORE_UUID(state, select_uuid) {
      state.cart_active_store_uuid = select_uuid;
    },
    ADD_PRODUCT_TO_CART_WITH_OPTIONS(state, payload) {
      const {
        product,
        options,
        quantity,
        priceWithOptions,
        getTotalOptions,
        filterCartProduct
      } = payload;

      // Searh all products with equal uuid
      const cartsProductExist = filterCartProduct(product.uuid);

      // Create hash map from options
      const hashMap = options.reduce((map, { uuid }) => {
        map.set(uuid, uuid);
        return map;
      }, new Map());

      // Search cart product with equal options
      cartsProductExist.map(({ options }) => {
        options.every(({ uuid }) => {
          return hashMap.has(uuid) && options.length === hashMap.size;
        });
      });
      // <-- unfinished work ;(

      console.log(product.options);
      // tmp
      product.options = [...options];
      console.log(product.options);
      if (cartsProductExist.length) return product.quantity++;
      state.cart_products.push(product);
      Vue.set(product, 'quantity', quantity);
    },
    DELETE_PRODUCT_FROM_CART(state, product) {
      if (product.quantity > 1) return product.quantity--;

      state.cart_products = state.cart_products.filter(
        ({ uuid }) => uuid !== product.uuid
      );
      Vue.delete(product, 'quantity');
    },
    CLEAR_CART_OF_PRODUCTS(state) {
      // for (const [key, product] of Object.entries(state.cart_products)) {
      // }
      console.log('CLEAR_CART_OF_PRODUCTS');
    },
    // =======
    ADD_PRODUCT_TO_CART_tmp(state, { product, findCartProduct }) {
      // Find equal product
      const { cartProductExistKey, cartProductExist } = findCartProduct(
        product.menuItem.uuid
      );
      // console.log(cartProductExistKey, cartProductExist);
      // console.log('findCartProduct', cartProductExistKey, cartProductExist);
      // Add new product to cart
      if (!cartProductExistKey) {
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
          console.log(hashMap, cartProductExist.extra);
          // Search cart product with equal options
          const extraExist = cartProductExist.extra.every(({ uuid }) => {
            // console.log(uuid);
            return (
              hashMap.has(uuid) &&
              cartProductExist.extra.length === hashMap.size
            );
          });
          console.log('extraExist', extraExist);
          // If founded equal extra
          if (extraExist) {
            state.cart_products[cartProductExistKey].quantity +=
              product.quantity;
          } else {
            Vue.set(state.cart_products, shortid.generate(), product);
            Vue.set(product.menuItem, 'quantity', product.quantity);
          }
        } else {
          state.cart_products[cartProductExistKey].quantity += product.quantity;
        }
        product.menuItem.quantity += product.quantity;
      }
      console.log(state.cart_products);
    }
  },
  actions: {
    pushProductToCart({ commit, getters }, product) {
      commit('SET_ACTIVE_STORE_UUID', product.menuItem.store_uuid);
      // console.log(product);
      commit('ADD_PRODUCT_TO_CART_tmp', {
        product,
        findCartProduct: getters.findCartProductByUUID
      });
      // commit('SET_ACTIVE_STORE_UUID', product.store_uuid);
    },
    deleteProductFromCart({ commit }, product) {
      commit('DELETE_PRODUCT_FROM_CART', product);
    },
    clearCartOfProducts({ commit }) {
      commit('CLEAR_CART_OF_PRODUCTS');
    }
  },
  getters: {
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
          // console.log(findUUID, product.menuItem.uuid);
          if (findUUID === product.menuItem.uuid) {
            return { cartProductExistKey: key, cartProductExist: product };
          }
        }
        return {};
      };
    },
    filterCartProductByUUID(state) {
      return findUUID => {
        return state.cart_products.filter(({ uuid }) => uuid === findUUID);
      };
    },
    getActiveStoreUUID(state) {
      return state.cart_active_store_uuid;
    },
    checkOnEqualActiveStoreUUID(state, getters) {
      return selectStoreUUID => {
        return (
          state.cart_active_store_uuid === selectStoreUUID ||
          // getters.isCartEmpty
          state.cart_active_store_uuid === ''
        );
      };
    },
    isCartEmpty(state) {
      // return state.getActiveStoreUUID === '';
      // return state.cart_products.size === 0;
    }
  }
};
