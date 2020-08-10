import Vue from 'vue';
/* eslint no-unused-vars: */
export default {
  namespaced: true,
  state: {
    cart_products: [],
    delivery_price: 100
  },
  mutations: {
    ADD_PRODUCT_TO_CART(state, { product, findCartProduct }) {
      const cartProductExist = findCartProduct(product.uuid);
      if (cartProductExist) return cartProductExist.quantity++;

      Vue.set(product, 'quantity', 1);
      state.cart_products.push(product);
    },
    ADD_PRODUCT_TO_CART_WITH_OPTIONS(state, payload) {
      const { product, options, quantity, filterCartProduct } = payload;

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

      // tmp
      product.options = [...options];

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
    }
  },
  actions: {
    pushProductToCart({ commit, getters }, product) {
      commit('ADD_PRODUCT_TO_CART', {
        product,
        findCartProduct: getters.findCartProductByUUID
      });
    },
    pushProductToCartWithOptions(
      { commit, getters },
      { product, options, quantity }
    ) {
      commit('ADD_PRODUCT_TO_CART_WITH_OPTIONS', {
        product,
        options,
        quantity,
        filterCartProduct: getters.filterCartProductByUUID
      });
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

      return state.cart_products.reduce(
        (total, { price, quantity, options }) => {
          const totalOptions = getters.getTotalOptions(options);
          total += (price + totalOptions) * quantity;
          return total;
        },
        state.delivery_price
      );
    },
    getTotalOptions(state) {
      return options => {
        if (!options) return 0;
        return options.reduce((total, { price }) => total + price, 0);
      };
    },
    findCartProductByUUID(state) {
      return findUUID => {
        return state.cart_products.find(({ uuid }) => uuid === findUUID);
      };
    },
    filterCartProductByUUID(state) {
      return findUUID => {
        return state.cart_products.filter(({ uuid }) => uuid === findUUID);
      };
    },
    isCartEmpty(state) {
      return state.cart_products.length === 0;
    }
  }
};
