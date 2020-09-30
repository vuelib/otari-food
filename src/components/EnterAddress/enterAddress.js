import debounce from 'debounce';
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('location');
export default {
  methods: {
    // Debounce enter address
    debounceInput: debounce(async function({ target }) {
      const data = await this.getAutocompleteAddresses(target.value);
      this.suggestionsAddresses = data;
    }, 350),
    ...mapActions([
      'getAutocompleteAddresses',
      'setCurrentLocation',
      'findAddress'
    ])
  },
  computed: {
    isEnterAddressNotNull() {
      return this.enterAddress !== '';
    },
    isSelectAddressNotNull() {
      return this.selectedAddress !== null;
    }
  },
  data: () => ({
    map: null,
    marker: null,
    enterAddress: '',
    selectedAddress: null,
    suggestionsAddresses: [],
    isShowSuggestions: false
  })
};
