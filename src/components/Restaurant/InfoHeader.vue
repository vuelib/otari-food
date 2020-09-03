<template>
  <div class="info-header">
    <div
      class="info-header__image"
      role="img"
      aria-label="Пицца итальяно"
      :style="{ backgroundImage: `url('${store.image}')` }"
    >
      <div class="info-header__image-backdrop">
        <div class="info-header__wrapper">
          <div class="info-header__content">
            <div class="info-header-rating">
              <div class="info-header-rating__icon"></div>
              <div class="info-header-rating__value">5.0</div>
            </div>
            <ul class="promo-list info-header__promo-list">
              <li class="promo-list__item">
                <a class="promo-list__link">
                  <span>Доставка еды</span>
                </a>
              </li>
              <li class="promo-list__item">
                <a class="promo-list__link">
                  <span>Владикавказ</span>
                </a>
              </li>
            </ul>
            <div class="info-header__name">{{ store.name }}</div>
            <div class="info-header__divider"></div>
            <div class="info-header__meta">
              <div class="info-header__delivery">
                <!-- if none own delivery -->
                <div
                  v-if="!store.own_delivery"
                  class="info-header__delivery-by-us"
                >
                  <div class="delivery-content">
                    <div class="delivery__icon"></div>
                    <div class="delivery__triangle"></div>
                  </div>
                </div>
                <div class="info-header__delivery-content">
                  <div class="info-header__delivery-title">
                    <span v-if="store.own_delivery">Доставка ресторана</span>
                    <span v-else>Доставка Faem.Delivery</span>
                  </div>
                  <div class="info-header__delivery-description">
                    <span v-if="store.own_delivery">Доставка от 99 ₽.</span>
                    <span v-else>Доставка от 80 ₽.</span>
                  </div>
                </div>
              </div>
              <!-- <div class="info-header__min-order">
                <div class="info-header__min-order-title">Заказ от</div>
                <div class="info-header__min-order-value">0 ₽</div>
              </div> -->
              <div class="info-header__info-wrapper">
                <div @click="toggleShowInfo" class="info-header__info">
                  <h3 class="info-header__info-title">
                    Информация о ресторане
                  </h3>
                  <div class="info-header__info-icon"></div>
                </div>
                <!--  -->
                <transition name="info-fade">
                  <div
                    v-show="isShowInfo"
                    class="info-header__info-popup info-popup"
                  >
                    <h3 class="info-popup__title">{{ store.name }}</h3>
                    <p class="info-popup__meta">
                      <span class="info-popup__address">
                        {{ fullStreetStore }}
                      </span>
                      <span class="info-popup__divider"></span>
                      <span class="info-popup__open-time">
                        Доставка до
                        {{ getHoursWork(store.work_schedule).work_ending }}
                      </span>
                    </p>
                    <p class="info-popup__legal">
                      <span class="info-popup__phone">
                        Тел. {{ store.phone }}
                      </span>
                      <br />
                      <span>
                        Режим работы: с
                        {{ getHoursWork(store.work_schedule).work_beginning }}
                        до {{ getHoursWork(store.work_schedule).work_ending }}
                      </span>
                    </p>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.store);
  },
  computed: {
    getHoursWork() {
      return workSchedule => {
        const { work_beginning, work_ending } = this.detectWeekDay(
          workSchedule
        );
        return {
          work_beginning: this.constructTime(work_beginning),
          work_ending: this.constructTime(work_ending)
        };
      };
    },
    fullStreetStore() {
      return this.store.destination_points[0].unrestricted_value;
    }
  },
  methods: {
    detectWeekDay(workSchedule) {
      const currentWeekDay = new Date().getDay();
      for (const day of workSchedule) {
        if (day.week_day === currentWeekDay) return day;
      }
    },
    constructTime(min) {
      const h = Math.floor(min / 60);
      const m = Math.floor(min % 60);
      return `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}`;
    },
    toggleShowInfo() {
      this.isShowInfo = !this.isShowInfo;
    }
  },
  props: {
    store: {
      type: Object,
      defaul: () => {},
      required: true
    }
  },
  data: () => ({
    isShowInfo: false
  }),
  name: 'InfoHeader'
};
</script>

<style lang="scss" scoped>
.info-header {
  flex: 1 0 100%;
  color: #ffffff;
  height: 398px;
  // overflow: hidden;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  &__image {
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
  }
  &__image-backdrop {
    height: 100%;
    background-image: linear-gradient(
      to bottom,
      rgba(61, 26, 22, 0),
      rgba(61, 26, 22, 0.6)
    );
  }
  &__wrapper {
    height: 100%;
    margin: 0 80px;
    position: relative;
  }
  &__content {
    width: 100%;
    bottom: 0;
    padding: 28px 0;
    position: absolute;
  }
  &__icon {
    padding: 4px 16px;
  }
  &__promo-list {
    margin: 15px 0 0 3px;
  }
  &__name {
    color: #fff;
    margin: 8px 0;
    font-size: 60px;
    font-weight: bold;
    line-height: 1.08;
  }
  &__divider {
    height: 1px;
    opacity: 0.2;
    margin-top: 20px;
    margin-bottom: 8px;
    background-color: #ffffff;
  }
  &__meta {
    font-weight: 100;
    margin: 0 -20px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    line-height: 21px;
    justify-content: space-between;
  }
  &__delivery {
    align-items: center;
    flex: 0 0 auto;
    margin: 0 4px;
    display: flex;
    padding: 11px 16px;
    position: relative;
    user-select: none;
    border-radius: 12px;
  }
  &__delivery-by-us {
    width: 37px;
    height: 42px;
    position: relative;
    flex: 0 0 auto;
    margin-right: 13px;
  }
  &__delivery-title,
  &__min-order-title {
    font-size: 14px;
  }
  &__delivery-description,
  &__min-order-value {
    font-size: 16px;
    padding-top: 7px;
  }
  &__min-order {
    margin: 0 4px;
    padding: 11px 16px;
    margin-right: auto;
  }
  &__info-wrapper {
    position: relative;
  }
  &__info {
    position: relative;
    margin: 4px 4px;
    cursor: pointer;
    display: flex;
    padding: 11px 16px;
    user-select: none;
    border-radius: 12px;
    &:hover,
    &:focus {
      background: rgba(255, 255, 255, 0.1);
    }
  }
  &__info-title {
    width: 87px;
    font-size: 14px;
    line-height: 17px;
    font-weight: 100;
  }
  &__info-icon {
    width: 35px;
    height: 35px;
    margin-left: 17px;
    background-size: 100%;
    background-image: url('~@/assets/svg/info-icon.svg');
    background-position: center;
  }
}
.info-header-rating {
  padding: 4px 16px;
  background-color: $theme-mainColor;
  display: inline-flex;
  border-radius: 18px;
  &__icon {
    margin-left: -7px;
    margin-right: 2px;
    width: 24px;
    height: 24px;
    background-size: 100%;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHBhdGggaWQ9ImIiIGQ9Ik0xOS4wNTkgNi4zNTNoLTYuMzUzTDkuNTI5IDAgNi4zNTMgNi4zNTNIMGw1LjI5NCA1LjI5NEwzLjE3NiAxOGw2LjM1My0zLjE3NkwxNS44ODIgMThsLTIuMTE3LTYuMzUzeiIvPjxmaWx0ZXIgaWQ9ImEiIHdpZHRoPSIxMjElIiBoZWlnaHQ9IjEyMi4yJSIgeD0iLTEwLjUlIiB5PSItNS42JSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij48ZmVPZmZzZXQgZHk9IjEiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiLz48ZmVHYXVzc2lhbkJsdXIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIiBzdGREZXZpYXRpb249Ii41Ii8+PGZlQ29sb3JNYXRyaXggaW49InNoYWRvd0JsdXJPdXRlcjEiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4xIDAiLz48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0ibm9uZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAzKSI+PHVzZSBmaWxsPSIjMDAwIiBmaWx0ZXI9InVybCgjYSkiIHhsaW5rOmhyZWY9IiNiIi8+PHVzZSBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHhsaW5rOmhyZWY9IiNiIi8+PC9nPjwvc3ZnPg==);
    background-position: center;
  }
  &__value {
    color: $theme-textColor;
    font-size: 16px;
    line-height: 26px;
  }
}
.delivery-content {
  width: 28px;
  background-color: $theme-mainColor;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.delivery {
  &__icon {
    width: 24px;
    height: 24px;
    padding: 9px 0;
    z-index: 2;
    position: relative;
    box-sizing: content-box;
    margin-left: 5px;
    background-size: 100%;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoMjB2MjBIMHoiLz48ZyBzdHJva2U9IiMwMDAiPjxwYXRoIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik04Ljg1NyA5LjE0M2MwIC43Ni0xLjE0MyAxLjQ1NS0xLjE0MyAyLjU0NyAwIC42Mi40OTkuODEgMS4xNDMuODFIMTBjMS4xMjYgMCA2LjA4LTQuNTQyIDUuMTQyLTYuOTkiLz48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik0xNi4xODkgMTMuNDFhMS43MTQgMS43MTQgMCAxIDEtMy4xODkuODc1YzAtLjE4Mi4xMzItLjYxNy4zMzMtLjc5OCIvPjxwYXRoIGQ9Ik0xMy4wMTUgNC4wMDVjMi43NzQuMDM1IDQuODI1IDcuNDg5IDQuODI1IDkuMDgxIDAgLjI5Ni0uMTg4LjU3NC0uNTYzLjgzNS0uNjcyLS42MTQtLjg3My0uNTA5LTEuMTYyLS41MDltLTMuMS42OTRjLS4yODIuNDYyLTIuODI1LjM5My0zLjI1Mi4zOTRNOC42ODYgOS42MDVMNC40NSA5LjQ4N2EuNzM2LjczNiAwIDAgMS0uNzM3LS43MzZ2LS4xOTRjMC0uNDI1LjM5LTEuMTA2LjgxNC0xLjA4bDMuOTY5LjU1MWMuMzg4LjAyNS40NzcuMzguNDc3Ljc3IDAgLjQwNy4xMTkuODA3LS4yODguODA3eiIvPjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTMuNTI1IDEyLjcyOWMtLjA5MS4wNS0uMjEyLjE0NC0uMzYuMjgyLS4xNi4xNjItLjI0OC4yNTQtLjI2My4yNzZhMS42OCAxLjY4IDAgMCAwLS4zMy45OTkgMS43MTQgMS43MTQgMCAxIDAgMy40MjggMCIvPjxwYXRoIGQ9Ik00LjI4NiA5LjE0M0M0LjI4NiAxMC4yODYgMiAxMC43OSAyIDEyLjc5OGMwIDAgLjQyOC4yOTIuOTQ2LjUybTMuMDY2Ljk3N2MuNTM4LjEyNSAxLjA2Ny4yMDUgMS41NDIuMjA1aDMuMjA1TTEzLjA0MyA0SDExIi8+PC9nPjwvZz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-position: center;
  }
  &__triangle {
    top: 6px;
    right: -6px;
    width: 30px;
    height: 30px;
    z-index: 1;
    position: absolute;
    transform: scaleX(0.4) rotate(45deg);
    background-color: $theme-mainColor;
    border-top-right-radius: 4px;
  }
}
.info-popup {
  position: absolute;
  z-index: 10;
  // top: 60px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 460px;
  padding: 20px;
  overflow: auto;
  font-size: 10px;
  background: #fff;
  box-sizing: border-box;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  &__title {
    font-size: 20px;
    font-weight: bold;
    line-height: 1.1;
    margin-bottom: 8px;
    color: #000;
  }
  &__meta {
    color: #b0b0b0;
    font-size: 14px;
  }

  &__divider {
    &::before {
      width: 4px;
      height: 4px;
      margin: 2px 8px;
      display: inline-block;
      content: '';
      border-radius: 50%;
      background-color: #d8d8d8;
    }
  }
  &__legal {
    margin-top: 12px;
    color: #b0b0b0;
    font-size: 14px;
  }
}
.info-fade-enter,
.info-fade-leave-active {
  opacity: 0;
  transform: translate(-50%, 25px);
}

.info-fade-enter-active,
.info-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.2s ease;
}
</style>
