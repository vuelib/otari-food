import Vue from 'vue';
import shortid from 'shortid';
import { getTariffsService } from '@/services/tariff.js';
import {
  createOrderService,
  cancelOrderService,
  getMyOrdersService,
  confirmOrderToMessengerService
} from '@/services/stores.js';
import {
  addProductAnalytics,
  purchaseAnalytics,
  removeProductAnalytics
} from '../../mixins/analytics';
/* eslint no-unused-vars: */
export default {
  namespaced: true,
  state: {
    cart_active_store_uuid: '',
    cart_products: {},
    delivery_price: 0,
    delivery_service_uuid: '',
    without_delivery: false,
    user_from_messenger: null
  },
  mutations: {
    SET_DELIVERY_PRICE(state, { total_price, service_uuid }) {
      state.delivery_price = total_price;
      state.delivery_service_uuid = service_uuid;
    },
    SET_WITHOUT_DELIVERY(state, value) {
      state.without_delivery = value;
    },
    SET_ACTIVE_STORE_UUID(state, select_uuid) {
      state.cart_active_store_uuid = select_uuid;
    },
    INCREMENT_PRODUCT_FROM_CART(
      state,
      { keyIndex, getStoreProducts, getActiveStore }
    ) {
      state.cart_products[keyIndex].quantity++;
      state.cart_products[keyIndex].menuItem.quantity++;
      const product = getStoreProducts.find(
        ({ uuid }) => uuid === state.cart_products[keyIndex].menuItem.uuid
      );
      product.quantity++;
      // Add Product Analytics
      addProductAnalytics({
        ...state.cart_products[keyIndex].menuItem,
        brand: getActiveStore.name
      });
    },
    DELETE_PRODUCT_FROM_CART(
      state,
      { keyIndex, getStoreProducts, getActiveStore }
    ) {
      const product = getStoreProducts.find(
        ({ uuid }) => uuid === state.cart_products[keyIndex].menuItem.uuid
      );
      console.log(product, state.cart_products[keyIndex]);
      if (product.quantity > 1) {
        product.quantity--;
      } else {
        Vue.delete(product, 'quantity');
      }
      if (state.cart_products[keyIndex].quantity > 1) {
        state.cart_products[keyIndex].quantity--;
        product.quantity--;
      } else {
        Vue.delete(state.cart_products, keyIndex);
      }
      // Remove Product Analytics
      removeProductAnalytics({
        ...state.cart_products[keyIndex].menuItem,
        quantity: 1,
        brand: getActiveStore.name
      });
    },
    CLEAR_CART_OF_PRODUCTS(state, { getStoreProducts, getActiveStore }) {
      for (const [key, product] of Object.entries(state.cart_products)) {
        // Remove Product Analytics
        removeProductAnalytics({
          ...product.menuItem,
          quantity: product.quantity,
          brand: getActiveStore.name
        });

        Vue.delete(product.menuItem, 'quantity');
        Vue.delete(state.cart_products, key);
        getStoreProducts.map(product => Vue.delete(product, 'quantity'));
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
    },
    SET_USER_DATA_FROM_MESSENGER(state, { userId, storeId }) {
      state.user_from_messenger = { userId, storeId };
    }
  },
  actions: {
    pushProductToCart({ commit, getters }, product) {
      // Add Product Analytics
      addProductAnalytics({
        ...product.menuItem,
        brand: getters.getActiveStore.name
      });
      commit('SET_ACTIVE_STORE_UUID', product.menuItem.store_uuid);
      commit('ADD_PRODUCT_TO_CART', {
        product,
        findCartProduct: getters.findCartProductByUUID,
        filterCartProduct: getters.filterCartProductByUUID
      });
    },
    incrementProductFromCart({ commit, getters }, keyIndex) {
      commit('INCREMENT_PRODUCT_FROM_CART', {
        keyIndex,
        getStoreProducts: getters.getStoreProducts,
        getActiveStore: getters.getActiveStore
      });
    },
    deleteProductFromCart({ commit, getters }, keyIndex) {
      commit('DELETE_PRODUCT_FROM_CART', {
        keyIndex,
        getStoreProducts: getters.getStoreProducts,
        getActiveStore: getters.getActiveStore
      });
    },
    clearCartOfProducts({ commit, getters }) {
      commit('CLEAR_CART_OF_PRODUCTS', {
        getStoreProducts: getters.getStoreProducts,
        getActiveStore: getters.getActiveStore
      });
      commit('SET_ACTIVE_STORE_UUID', '');
    },
    async changeWithoutDeliveryState({ state, commit, dispatch }) {
      if (!state.without_delivery)
        commit('SET_DELIVERY_PRICE', {
          total_price: 0,
          service_uuid: state.delivery_service_uuid
        });
      commit('SET_WITHOUT_DELIVERY', !state.without_delivery);
    },
    async getTariffToDelivery({ commit }, { routeFrom, routeTo, serviceUUID }) {
      const tariffs = await getTariffsService({
        routeFrom,
        routeTo,
        serviceUUID
      });
      const { total_price, service_uuid } = tariffs.find(
        ({ product_delivery }) => product_delivery
      );
      commit('SET_DELIVERY_PRICE', { total_price, service_uuid });
    },
    async createOrder({ commit, state }, { routeFrom, routeTo }) {
      let productsInput = [];
      for (const [key, { extra, menuItem, quantity }] of Object.entries(
        state.cart_products
      )) {
        const options = extra.reduce((acc, option) => {
          // Set variant
          if ('standard' in option) {
            acc.variant_uuid = option.uuid;
            return acc;
          }
          // Set toppings
          acc.toppings_uuid
            ? acc.toppings_uuid.push(option.uuid)
            : (acc.toppings_uuid = [option.uuid]);
          return acc;
        }, {});
        const product = {
          uuid: menuItem.uuid,
          number: quantity,
          ...options
        };
        productsInput.push(product);
      }

      const data = await createOrderService({
        routes: [routeFrom, routeTo],
        productsInput,
        serviceUUID: state.delivery_service_uuid,
        withoutDelivery: state.without_delivery
      });
      console.log(data);
      const productsData = data.products_data.products.reduce(
        (acc, product) => {
          acc.push({
            name: product.name, //Название товара
            id: product.uuid, //Id товар или артикул
            price: product.price, //Стоимость единицы товара
            brand: data.products_data.store.name, //Название ресторана
            quantity: product.number //Количество
          });
          return acc;
        },
        []
      );

      purchaseAnalytics({
        uuid: data.uuid,
        productsPrice: data.tariff.products_price,
        totalPrice: data.tariff.total_price,
        productsData
      });
      return data;
    },
    async repeatOrder(
      { commit, state },
      { routes, productsInput, serviceUUID }
    ) {
      return await createOrderService({
        routes,
        productsInput,
        serviceUUID: state.delivery_service_uuid,
        withoutDelivery: state.without_delivery
      });
    },
    async cancelOrder({ commit }, { order_uuid }) {
      return await cancelOrderService({ order_uuid });
    },
    async getMyOrders() {
      return await getMyOrdersService();
    },
    async confirmOrderToMessenger({ commit }, { userId, orderId }) {
      return await confirmOrderToMessengerService({ userId, orderId });
    },
    setUserDataFromMessenger({ commit }, { userId, storeId }) {
      commit('SET_USER_DATA_FROM_MESSENGER', { userId, storeId });
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
    },
    isWithoutDelivery(state) {
      return state.without_delivery;
    },
    getStoreProducts(state, getters, rootState) {
      return rootState.stores.store_products;
    },
    getActiveStore(state, getters, rootState) {
      return rootState.stores.active_store;
    },
    isUserFromMessenger(state) {
      return state.user_from_messenger !== null;
    },
    getUserDataFromMessenger(state) {
      return state.user_from_messenger;
    }
  }
};
