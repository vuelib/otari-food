<template>
  <div id="app" :class="{ mobile: isMobileDevice, desktop: !isMobileDevice }">
    <!-- App Banner -->
    <AppMobileBanner v-if="isMobileDevice && !isSpecialStores" />
    <!-- App Header -->
    <app-device-component
      v-if="!isMobileDevice"
      @showEnterAddressModal="showEnterAddressModal"
      desktop-component-path="components/Header/AppHeader"
      mobile-component-path="components/Header/AppMobileHeader"
    ></app-device-component>
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
    <!-- <app-device-component
      desktop-component-path="components/Header/AppHeader"
      mobile-component-path="components/Header/AppMobileHeader"
    >
    </app-device-component> -->
    <app-popup @closePopup="closeEnterAddressModal" v-if="isShowEnterAddress">
      <AppEnterAddress @closePopup="closeEnterAddressModal" />
    </app-popup>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import deviceType from '@/mixins/deviceType';
export default {
  mixins: [deviceType],
  computed: {
    ...createNamespacedHelpers('stores').mapGetters(['isSpecialStores'])
  },
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
    AppEnterAddress: () => import('./components/AppEnterAddress'),
    AppMobileBanner: () => import('./components/Banner/MobileBanner')
  }
};
</script>

<style lang="scss">
@import './scss/basic.scss';
#app.mobile {
  overflow-x: hidden;
}
#app.mobile ~ .swal2-container {
  z-index: 999999;
}
#app.mobile ~ .swal2-container .swal2-modal .swal2-header .swal2-title {
  font-size: 20px;
}
#app.mobile ~ .swal2-container .swal2-modal .swal2-header .swal2-icon {
  display: flex;
  margin: 10px;
  // width: 55px;
  // height: 55px;
}
#app.mobile
  ~ .swal2-container
  .swal2-modal
  .swal2-content
  .swal2-html-container {
  font-size: 14px;
}
#app.mobile ~ .swal2-container .swal2-modal .swal2-actions .swal2-styled {
  font-size: 14px;
}
.mobile {
  *:not(input):not(textarea) {
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  // .swal2-title {
  //   font-size: 1em !important;
  // }
  // .swal2-content {
  //   font-size: 0.8em !important;
  // }
}
.desktop {
  @import url('https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css');
  .layout {
    margin: 90px 40px 10px 40px;
    z-index: 1;
    min-width: 1024px;
  }
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }
  ::-webkit-scrollbar-thumb {
    background: #646464;
    border: 0px none #fff;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #696969;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #e6e6e6;
  }
  ::-webkit-scrollbar-track {
    background: #ededed;
    border: 9px none #fff;
  }
  ::-webkit-scrollbar-track:hover {
    background: #e0e0e0;
  }
  ::-webkit-scrollbar-track:active {
    background: #707070;
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
}
</style>
