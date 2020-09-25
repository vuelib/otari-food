<template>
  <component :is="deviceComponent"></component>
</template>

<script>
import deviceType from '@/mixins/deviceType';
export default {
  mixins: [deviceType],
  computed: {
    deviceComponent() {
      return () => {
        return this.isMobileDevice
          ? import(`@/${this.mobileComponentPath}`)
          : import(`@/${this.desktopComponentPath}`);
      };
    }
  },
  props: {
    desktopComponentPath: {
      type: String,
      required: true
    },
    mobileComponentPath: {
      type: String,
      required: true
    }
  },
  name: 'AppDeviceComponent'
};
</script>

<style lang="scss" scoped></style>
