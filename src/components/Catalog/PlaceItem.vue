<template>
  <article>
    <a class="places-list__item place-item">
      <div
        class="place-item__image-container"
        role="img"
        :aria-label="store.name"
        :style="{
          backgroundImage: `url('${getStoreBG}')`
        }"
      ></div>
      <div class="place-item__place-info place-info">
        <h3 class="place-info__name" :title="store.name">
          {{ store.name }}
        </h3>
        <div class="place-item__details place-details">
          <div
            v-if="!store.own_delivery"
            class="place-details__icon faem-delivery-icon"
          ></div>
          <div class="place-details__icon rating-badge">5.0</div>
          <!-- <div class="place-details__icon price-category">
            <span class="price-category__main-category">₽₽</span>
            <span class="price-category__category">₽</span>
          </div> -->
        </div>
      </div>
    </a>
  </article>
</template>

<script>
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
  },
  props: {
    store: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  name: 'PlaceItem'
};
</script>

<style lang="scss">
.place-item {
  height: 100%;
  display: block;
  box-shadow: 0px 4px 40px rgb(230, 230, 230);
  transition: transform 0.1s linear;
  border-radius: 8px;
  color: #000;

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

  &__image-wrapper {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 100%;
  }
}
.place-item:hover,
.place-item:focus {
  transform: scale(1.03);
}
/* Place Info */
.place-info {
  padding: 16px 20px 20px;
  &__name {
    position: relative;
    overflow: hidden;
    font-size: 20px;
    line-height: 1.2;
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
/* Place Details */
.place-details {
  padding: 7px 0 0;
  display: flex;
  flex-wrap: nowrap;
  font-size: 14px;
  align-items: center;
}
.place-details > * {
  margin-right: 7px;
  margin-bottom: 7px;
}
.faem-delivery-icon {
  width: 32px;
  height: 22px;
  display: inline-block;
  background-size: 100%;
  background-image: url('~@/assets/svg/delivery-icon.svg');
  background-position: center;
}
.rating-badge {
  height: 22px;
  padding: 3px 10px 3px 22px;
  background: $theme-mainColor;
  color: $theme-textColor;
  margin-right: 10px;
  border-radius: 100px;
  background-image: url('~@/assets/svg/rating-badge.svg');
  background-repeat: no-repeat;
  background-position: left;
}
.price-category {
  min-width: 50px;
  line-height: 22px;
  padding-left: 22px;
  background-size: 20px 20px;
  background-image: url('~@/assets/svg/wallet-icon.svg');
  background-repeat: no-repeat;
  background-position: left;
  background-position-y: 1px;
  &__main-category {
    color: #000000;
  }
  &__category {
    color: #b0b0b0;
  }
}
</style>
