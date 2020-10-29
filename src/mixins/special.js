import { createNamespacedHelpers } from 'vuex';
export default {
  computed: {
    getLogo() {
      return this.isSpecialStores
        ? require(`../assets/${this.getSpecialStoresData.logo}`)
        : require('../assets/logo.png');
    },
    ...createNamespacedHelpers('stores').mapGetters([
      'isSpecialStores',
      'getSpecialStoresData'
    ])
  }
};
