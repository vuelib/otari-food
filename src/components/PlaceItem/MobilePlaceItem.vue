<template>
  <article class="mobile-place-item">
    <a class="mobile-place-item__container">
      <div class="mobile-place-item__thum">
        <div class="mobile-place-item__image">
          <div class="mobile-place-item__magical"></div>
          <img
            :src="getStoreBG"
            class="mobile-place-item__magical-image"
            alt=""
          />
        </div>
      </div>
      <h3 class="mobile-place-item__title" :title="store.name">
        {{ store.name }}
      </h3>
      <div class="mobile-place-item__meta">
        <div class="mobile-place-item__rating">
          <svg
            width="16"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="rgb(252, 224, 0)"
              d="M7.552.908a.5.5 0 0 1 .896 0l2.08 4.216a.5.5 0 0 0 .377.273l4.652.676a.5.5 0 0 1 .277.853l-3.366 3.281a.5.5 0 0 0-.144.443l.795 4.633a.5.5 0 0 1-.726.527l-4.16-2.188a.5.5 0 0 0-.466 0l-4.16 2.188a.5.5 0 0 1-.726-.527l.795-4.633a.5.5 0 0 0-.144-.443L.166 6.926a.5.5 0 0 1 .277-.853l4.652-.676a.5.5 0 0 0 .376-.273L7.551.908z"
            ></path>
          </svg>
          <span
            class="mobile-place-item__rating-block"
            style="color: rgb(252, 224, 0);"
            >5.0</span
          >
        </div>
      </div>
      <div class="mobile-place-item__actions"></div>
    </a>
  </article>
</template>

<script>
import placeItem from './placeItem';
export default {
  mixins: [placeItem],
  props: {
    store: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  name: 'MobilePlaceItem'
};
</script>

<style lang="scss" scoped>
.mobile-place-item {
  height: 268px;
  flex: 0 0 auto;
  display: inline-block;
  background: #fff;
  padding-right: 16px;
  padding-bottom: 24px;
  width: 100%;
  @media (min-width: 650px) {
    width: 50%;
  }
  @media (min-width: 1024px) {
    width: calc(100% / 3);
  }
  &__title {
    margin: 3px 0 1px 0;
    overflow: hidden;
    font-size: 24px;
    line-height: 32px;
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__actions {
    display: flex;
    overflow: hidden;
    margin-top: 8px;
    align-items: flex-start;
    padding-bottom: 6px;
  }
  &__container {
    display: block;
  }
  &__thum {
    height: 188px;
    position: relative;
  }
  &__image {
    height: 100%;
    transform: translate3d(0, 0, 0);
    border-radius: 16px;
    width: 100%;
    position: relative;
    overflow: hidden;
  }
  &__magical {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 1;
    position: absolute;
    transition: opacity 0ms 1000ms;
    background-size: 200px;
    background-image: url(https://yastatic.net/s3/eda-front/www/assets/fallback-pattern-9d2103a….svg);
    background-color: #f5f5f5;
    background-position: center;
  }
  &__magical-image {
    top: 50%;
    left: 50%;
    opacity: 1;
    position: absolute;
    transform: translate(-50%, -50%);
    transition: opacity 200ms;
    width: 100%;
    height: auto;
  }
  &__image-container {
    width: 100%;
    position: relative;
    padding-top: 57.5%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  &__rating-block {
    padding-left: 5px;
  }
}
</style>
