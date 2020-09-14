module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/scss/_fonts.scss";
          @import "~@/scss/_common.scss";
        `
      }
    }
  }
};
