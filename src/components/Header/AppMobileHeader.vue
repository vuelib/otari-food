<template>
  <div>
    <div class="MobileCatalogPageNavigationBar">
      <div
        @click="showSidebar"
        class="MobileCatalogPageNavigationBar__icon MobileCatalogPageNavigationBar__burger"
      ></div>
      <router-link to="/" aria-label="На главную">
        <img class="MobileLogo" :src="getLogo" alt="FaemDelivery" />
      </router-link>
      <div class="MobileCatalogPageNavigationBar__icon">
        <!-- <div @click="openLoginModal" v-if="!isAuthUser" class="header__button">
          <svg
            id="Capa_1"
            enable-background="new 0 0 512 512"
            height="30"
            viewBox="0 0 512 512"
            width="30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m485.904 81.727h-27.993v-18.785c0-34.707-28.235-62.942-62.942-62.942s-62.942 28.235-62.942 62.942v18.784h-27.993v62.337c-25.497-12.386-54.096-19.348-84.295-19.348-106.775 0-193.643 86.868-193.643 193.643s86.867 193.642 193.642 193.642c106.774 0 193.642-86.867 193.642-193.642 0-24.368-4.538-47.693-12.793-69.189h85.318v-167.442zm-123.878-18.785c0-18.164 14.778-32.942 32.942-32.942s32.942 14.778 32.942 32.942v18.784h-65.885v-18.784zm-222.227 398.158v-40.628c0-32.757 26.649-59.406 59.405-59.406h41.067c32.756 0 59.405 26.649 59.405 59.406v40.628c-23.655 13.3-50.924 20.9-79.938 20.9-29.015 0-56.284-7.601-79.939-20.9zm79.939-130.035c-20.17 0-36.579-16.409-36.579-36.578s16.409-36.578 36.579-36.578c20.169 0 36.578 16.409 36.578 36.578s-16.409 36.578-36.578 36.578zm163.642-12.707c0 47.952-20.732 91.152-53.703 121.109v-18.996c0-38.41-24.348-71.238-58.419-83.867 9.405-11.483 15.059-26.151 15.059-42.118 0-36.711-29.867-66.578-66.578-66.578-36.712 0-66.579 29.867-66.579 66.578 0 15.966 5.654 30.635 15.059 42.118-34.071 12.629-58.419 45.457-58.419 83.867v18.996c-32.972-29.957-53.704-73.157-53.704-121.109 0-90.232 73.41-163.643 163.643-163.643 30.814 0 59.659 8.569 84.295 23.439v71.014h63.98c9.854 21.027 15.366 44.476 15.366 69.19zm72.524-99.189h-45.936v-68.723h-30v68.723h-45.936v-107.442h121.871v107.442z"
            />
          </svg>
        </div>
        <button v-else class="header__button header__profile">
          <span>Профиль</span>
          <ul class="cabinet-menu">
            <li @click="showMyOrders" class="cabinet-item">
              <i class="icon-user"></i>Мои заказы
            </li>
            <li @click="openLoginModal" class="cabinet-item">
              <i class="icon-user"></i>Выйти
            </li>
          </ul>
        </button> -->
      </div>
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
