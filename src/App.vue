<template>
  <div id="app">
    <!-- App Header -->
    <AppHeader />
    <!-- Router View -->
    <div class="layout">
      <div class="container">
        <router-view
          @showEnterAddressModal="showEnterAddressModal"
          :key="$route.fullPath"
        />
      </div>
    </div>
    <!-- Enter Address Modal -->
    <app-popup @closePopup="closeEnterAddressModal" v-if="isShowEnterAddress">
      <AppEnterAddress @closePopup="closeEnterAddressModal" />
    </app-popup>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader';
import AppEnterAddress from './components/AppEnterAddress';
export default {
  methods: {
    showEnterAddressModal() {
      this.isShowEnterAddress = true;
    },
    closeEnterAddressModal() {
      this.isShowEnterAddress = false;
    }
  },
  data: () => ({
    isShowEnterAddress: false,
    isShowAuth: false
  }),
  name: 'App',
  components: {
    AppHeader,
    AppEnterAddress
  }
};
</script>

<style lang="scss">
@import './scss/basic.scss';
@import url('https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css');
.layout {
  margin: 90px 40px 10px 40px;
  z-index: 1;
}
</style>
