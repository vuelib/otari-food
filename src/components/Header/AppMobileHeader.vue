<template>
  <div>
    <div class="MobileCatalogPageNavigationBar">
      <div
        @click="showSidebar"
        class="MobileCatalogPageNavigationBar__icon MobileCatalogPageNavigationBar__burger"
      ></div>
      <router-link
        to="/"
        :class="{ disabled: isSpecialStores }"
        class="MobileLinkLogo"
        aria-label="На главную"
      >
        <img class="MobileLogo" :src="getLogo" alt="FaemDelivery" />
      </router-link>
      <div class="MobileCatalogPageNavigationBar__icon"></div>
    </div>
    <app-popup
      v-show="isModalVisible && !isAuthUser"
      @closePopup="closeLoginModal"
    >
      <AppLogin />
    </app-popup>
  </div>
</template>

<script>
import AppPopup from '../AppPopup';
import AppLogin from '../AppLogin';
import auth from '@/mixins/auth.js';
import special from '@/mixins/special.js';
import header from './header.js';
export default {
  mixins: [auth, header, special],
  methods: {
    showSidebar() {
      this.$emit('showSidebar');
      this.$parent.$emit('showSidebar');
    }
  },
  name: 'AppMobileHeader',
  components: {
    AppPopup,
    AppLogin
  }
};
</script>

<style lang="scss" scoped>
.MobileLogo {
  width: 125px;
  display: inline-block;
}
.MobileLinkLogo.disabled {
  pointer-events: none;
  cursor: default;
}
.MobileCatalogPageNavigationBar {
  display: flex;
  z-index: 1;
  position: relative;
  flex-wrap: nowrap;
  min-height: 65px;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.05);
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background-color: #ffffff;
  &__icon {
    width: 65px;
    height: 65px;
    display: inline-block;
    background-size: 24px 24px;
    background-repeat: no-repeat;
    background-position: center;
  }
  &__burger {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiLz48ZyBmaWxsPSIjMDAwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzIDQpIj48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMiIgcng9IjEiLz48cmVjdCB3aWR0aD0iMTMiIGhlaWdodD0iMiIgeT0iMTQiIHJ4PSIxIi8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjIiIHk9IjciIHJ4PSIxIi8+PC9nPjwvZz48L3N2Zz4=);
  }
}
</style>
