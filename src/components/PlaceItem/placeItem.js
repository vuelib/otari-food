export default {
  computed: {
    getStoreBG() {
      try {
        const parseImg = JSON.parse(this.store.image);
        return parseImg.full || parseImg.full_format;
      } catch {
        return this.store.image;
      }
    }
  }
};
