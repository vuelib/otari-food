export default {
  methods: {
    // tmp solution
    getAnchorLink(string) {
      return string
        .replace(/.*(>|\|)\.*/g, '')
        .trim()
        .replace(/\s+/g, '-');
    }
  }
};
