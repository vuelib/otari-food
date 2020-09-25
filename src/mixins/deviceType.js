const mobileDevices = ['smartphone', 'tablet'];
export default {
  computed: {
    isMobileDevice() {
      return mobileDevices.includes(window.appDevice);
    }
  }
};
