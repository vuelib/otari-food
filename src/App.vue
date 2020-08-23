<template>
  <div id="app">
    <!-- App Header -->
    <AppHeader />
    <!-- Router View -->
    <div class="layout">
      <div class="container">
        <router-view :key="$route.fullPath" />
      </div>
    </div>
    <!-- Enter Address Modal -->
    <app-popup v-if="isShowEnterAddress">
      <AppEnterAddress />
    </app-popup>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader';
import AppEnterAddress from './components/AppEnterAddress';
export default {
  methods: {
    closeEnterAddressModa() {
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
