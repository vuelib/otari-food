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
  </div>
</template>

<script>
import AppHeader from './components/AppHeader';

export default {
  name: 'App',
  components: {
    AppHeader
  }
};
</script>

<style lang="scss">
@import './scss/basic.scss';

.layout {
  margin: 90px 40px 10px 40px;
  z-index: 1;
}
</style>
