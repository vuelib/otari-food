import Vue from 'vue';
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
    ADD_PRODUCT_TO_CART(state, { product, findCartProduct }) {
      const cartProductExist = findCartProduct(product.uuid);
      if (cartProductExist) return cartProductExist.quantity++;

      Vue.set(product, 'quantity', 1);
      state.cart_products.push(product);
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
      state.cart_products.map(product => {
        Vue.delete(product, 'quantity');
      });
      state.cart_products = [];
    },
    // =======
    ADD_PRODUCT_TO_CART_tmp(state, { product, findCartProduct }) {
      // console.log('one', state.cart_products);
      // Find equal product
      const cartProductExistKey = findCartProduct(product.menuItem.uuid);
      // Add new product to cart
      if (!cartProductExistKey) {
        // const cartItem = {
        //   menuItem: product.menuItem,
        //   extra: product.extra
        // };
        // Vue.set(cartItem, 'quantity', product.quantity);
        // state.cart_products['sd'] = product;
        Vue.set(state.cart_products, 'sd', product);
        Vue.set(product.menuItem, 'quantity', product.quantity);
      } else {
        // Check product extra to equal
        state.cart_products[cartProductExistKey].quantity += product.quantity;
        product.menuItem.quantity += product.quantity;
      }
      // console.log('cartProductExist', cartProductExist);
      // state.cart_products.set('sd', product);
      console.log(state.cart_products);
    }
  },
  actions: {
    pushProductToCart({ commit, getters }, product) {
      commit('SET_ACTIVE_STORE_UUID', product.menuItem.store_uuid);
      console.log(product);

      commit('ADD_PRODUCT_TO_CART_tmp', {
        product,
        findCartProduct: getters.findCartProductByUUID
      });
      // commit('SET_ACTIVE_STORE_UUID', product.store_uuid);
    },

    pushProductToCartWithOptions(
      { commit, getters },
      { product, options, quantity, priceWithOptions }
    ) {
      commit('ADD_PRODUCT_TO_CART_WITH_OPTIONS', {
        product,
        options,
        quantity,
        priceWithOptions,
        filterCartProduct: getters.filterCartProductByUUID,
        getTotalOptions: getters.getTotalOptions
      });
      commit('SET_ACTIVE_STORE_UUID', product.store_uuid);
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
      return 500;
      // return state.cart_products.reduce(
      //   (total, { price, quantity, options }) => {
      //     const totalOptions = getters.getTotalOptions(options);
      //     total += (price + totalOptions) * quantity;
      //     return total;
      //   },
      //   state.delivery_price
      // );
    },
    getTotalOptions(state) {
      return options => {
        if (!options) return 0;
        return options.reduce((total, { price }) => total + price, 0);
      };
    },
    findCartProductByUUID(state) {
      return findUUID => {
        for (const [key, { menuItem }] of Object.entries(state.cart_products)) {
          if (findUUID === menuItem.uuid) {
            return key;
          }
        }
        // return state.cart_products.find(({ uuid }) => uuid === findUUID);
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
