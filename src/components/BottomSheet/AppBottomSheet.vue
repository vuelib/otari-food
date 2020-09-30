<template>
  <transition name="sheet-fade">
    <div
      style="position: fixed;
    z-index: 100013;"
    >
      <div class="mobile-bottom-sheet">
        <div
          @click="handleBottomSheetClose"
          class="mobile-bottom-sheet__backdrop mobile-bottom-sheet__child-container"
        ></div>
        <div
          class="mobile-bottom-sheet__base-container mobile-bottom-sheet__child-container"
        >
          <div
            @click="handleBottomSheetClose"
            class="mobile-bottom-sheet__cross"
          ></div>
          <div
            class="mobile-bottom-sheet-layout"
            :style="{ maxHeight: `${deviceHeight}px` }"
          >
            <div v-if="header" class="mobile-bottom-sheet-header">
              <slot name="header"></slot>
            </div>
            <div class="mobile-bottom-sheet-body">
              <slot name="body"></slot>
            </div>
            <div @click="handleBottomSheetClose">
              <slot name="close"></slot>
            </div>
            <div class="mobile-bottom-sheet-footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
const body = document.body,
  html = document.documentElement;
export default {
  methods: {
    handleBottomSheetClose() {
      this.$parent.$emit('closePopup');
      this.$emit('closePopup');
    }
  },
  props: {
    header: {
      type: Boolean
    }
  },
  data: () => ({
    deviceHeight:
      Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      ) - 20
  })
};
</script>

<style lang="scss" scoped>
.mobile-bottom-sheet {
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  overflow: hidden;
  &__child-container {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
  }
  &__backdrop {
    opacity: 1;
    z-index: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  &__base-container {
    padding-bottom: 0;
    top: auto;
    z-index: 2;
    overflow: hidden;
    transform: translate3d(0, 100%, 0);
    background: #ffffff;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
    min-height: 64px;
    border-radius: 12px 12px 0 0;
    padding-bottom: var(--safe-area-inset-bottom, 0);

    transform: translate3d(0px, 0%, 0px);
  }
  &__cross {
    top: 0;
    right: 0;
    width: 64px;
    height: 64px;
    position: absolute;
    display: inline-block;
    background-size: 24px 24px;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIvPgogICAgICAgIDxnIGZpbGw9IiMwMDAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQgNCkiPgogICAgICAgICAgICA8cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMiIgeD0iLTIiIHk9IjciIHJ4PSIxIiB0cmFuc2Zvcm09InJvdGF0ZSg0NSA4IDgpIi8+CiAgICAgICAgICAgIDxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyIiB4PSItMiIgeT0iNyIgcng9IjEiIHRyYW5zZm9ybT0icm90YXRlKDEzNSA4IDgpIi8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K);
  }
}

.mobile-bottom-sheet-layout {
  display: flex;
  flex-wrap: nowrap;
  max-height: 100%;
  flex-direction: column;

  // max-height: 686px;
}

// mobile-bottom-sheet-header
.mobile-bottom-sheet-header {
  flex: 0 0 auto;
  padding: 20px 16px;
  font-size: 20px;
  min-height: 24px;
  box-sizing: content-box;
  line-height: 24px;
  font-weight: bold;
  padding-right: 80px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
// /mobile-bottom-sheet-body
.mobile-bottom-sheet-body {
  flex: 0 1 auto;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  min-height: 65px;
  background-color: #fafafa;
  min-height: 64px;
}

// mobile-bottom-sheet-footer
.mobile-bottom-sheet-footer {
  flex: 0 0 auto;
  width: 100%;
  padding: 16px;
  z-index: 5;
  background: white;
}
.sheet-fade-enter,
.sheet-fade-leave-active {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}

.sheet-fade-enter-active,
.sheet-fade-leave-active {
}
</style>
