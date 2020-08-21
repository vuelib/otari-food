<template>
  <a :href="href" @click.prevent="scroll">
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true
    }
  },
  methods: {
    scroll() {
      // smoot scroll includes in vue-scrollactive package
      // document.querySelector(this.href).scrollIntoView({ behavior: 'smooth' });
    }
  }
};
</script>
