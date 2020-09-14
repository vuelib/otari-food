import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('auth');
const { mapActions } = createNamespacedHelpers('auth');

export default {
  computed: {
    ...mapGetters(['isAuthUser'])
  },
  methods: {
    ...mapActions(['logout'])
  }
};
