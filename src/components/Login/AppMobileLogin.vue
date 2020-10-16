<template>
  <div style="position: fixed; z-index: 100003;">
    <div class="mobile-fullscreen-modal">
      <div class="mobile-fullscreen-modal-layout">
        <div class="mobile-fullscreen-modal__header">
          <div class="mobile-fullscreen-modal__control-container">
            <div class="mobile-fullscreen-modal__control">
              <div
                v-if="enterPhone"
                @click="handleCloseLogin"
                class="mobile-fullscreen-modal__control-close"
              ></div>
              <div
                @click="enterPhone = false"
                v-else
                class="mobile-fullscreen-modal__control-back"
              ></div>
            </div>
          </div>
          <div class="mobile-fullscreen-modal__content-container">
            <div class="mobile-fullscreen-modal__content">
              <img
                :src="getLogo"
                class="mobile-fullscreen-modal__logo"
                alt="FaemDelivery"
              />
            </div>
          </div>
          <div class="mobile-fullscreen-modal__control-container">
            <div class="mobile-fullscreen-modal__control"></div>
          </div>
        </div>
        <div class="mobile-fullscreen-modal__body">
          <div class="mobile-fullscreen-modal__body-content">
            <form class="mobile-phone-base-modal__container">
              <div v-if="enterPhone" class="mobile-phone-base-modal__title">
                Введите номер телефона
              </div>
              <template v-else>
                <div class="mobile-phone-base-modal__title">
                  Подтверждение
                </div>
                <div class="mobile-phone-base-modal__description">
                  Код подтверждения был отправлен на Ваш номер
                </div>
              </template>
              <div class="mobile-phone-base-modal__input">
                <TheMask
                  v-if="enterPhone"
                  v-model="user.phone"
                  :mask="['+7 (###) ###-##-##']"
                  class="mobile-phone-base-modal__phone-input"
                />
                <TheMask
                  v-else
                  v-model="user.code"
                  :mask="['####']"
                  class="mobile-phone-base-modal__code-input"
                  placeholder="Код подтверждения"
                />
              </div>
              <button
                v-if="enterPhone"
                @click="getCode"
                :disabled="isDisabledGetCode"
                class="mobile-phone-base-modal__button"
              >
                <span class="mobile-phone-base-modal__button-content">
                  Далее
                </span>
              </button>
              <button
                v-else
                @click="sendVerificationCode"
                :disabled="isDisabledSubmit"
                class="mobile-phone-base-modal__button"
              >
                <span class="mobile-phone-base-modal__button-content">
                  Готово
                </span>
              </button>
              <div
                v-if="isVerificationCodeWrong"
                class="mobile-phone-base-modal__error"
              >
                Неверный код подтверждения
              </div>
              <div
                v-if="enterPhone"
                class="mobile-phone-base-modal__disclaimer"
              >
                Нажимая кнопку «Далее», Вы принимаете условия
                <a target="_blank" href="#">пользовательского соглашения</a>
              </div>
              <div v-else class="mobile-phone-base-modal__repeat">
                <span v-if="isTimerNotNull">
                  Отправить код повторно ({{ getTimerTime }})
                </span>
                <span
                  @click="getCode"
                  v-else
                  :class="{
                    'mobile-phone-base-modal__can-repeat': !isTimerNotNull
                  }"
                >
                  Отправить код повторно
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TheMask } from 'vue-the-mask';
import login from './login.js';
import special from '@/mixins/special.js';
export default {
  mixins: [login, special],
  methods: {
    async getCode(e) {
      e.preventDefault();
      this.sendingGetCode = true;
      try {
        const { next_request_time } = await this.getCodeFromPhoneNumber({
          phone: `+7${this.user.phone}`,
          device_id: this.user.device_id
        });
        this.enterPhone = false;
        this.createTimer(next_request_time - Math.floor(Date.now() / 1000));
      } finally {
        this.sendingGetCode = false;
      }
    },
    handleCloseLogin() {
      this.$emit('closeLoginModal');
    }
  },
  data: () => ({
    sendingGetCode: false,
    isVerificationCodeWrong: false,
    min: 0,
    sec: 0,
    timer: null,
    user: {
      phone: '+7',
      code: '',
      device_id: ''
    },
    enterPhone: true,
    error: ''
  }),
  components: {
    TheMask
  },
  name: 'AppMobileLogin'
};
</script>

<style lang="scss">
.mobile-fullscreen-modal {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  overflow: hidden;
  transform: scale(0.9) translateY(30px);
  transition: all 200ms;
  background: #ffffff;

  opacity: 1;
  transform: scale(1) translateY(0);
  &__header {
    flex: 0 0 auto;
    width: 100%;
    height: 65px;
    display: flex;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.05);
  }
  &__control-container {
    flex: 0 0 auto;
    width: 65px;
    height: 65px;
    position: relative;
  }
  &__control {
    transition: all 200ms;
    align-items: center;
    justify-content: center;
    display: flex;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
  }
  &__control-back {
    width: 100%;
    height: 100%;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xMS40ODUzIDVMMTIuODk5NSA2LjQxNDIyTDcuODI4NDMgMTEuNDg1M0gyMC41VjEzLjQ4NTNINy44Mjg0M0wxMi44OTk1IDE4LjU1NjNMMTEuNDg1MyAxOS45NzA2TDQgMTIuNDg1M0wxMS40ODUzIDVaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K);
    display: inline-block;
    background-size: 24px 24px;
    background-repeat: no-repeat;
    background-position: center;
  }
  &__control-close {
    width: 100%;
    height: 100%;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIvPgogICAgICAgIDxnIGZpbGw9IiMwMDAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQgNCkiPgogICAgICAgICAgICA8cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMiIgeD0iLTIiIHk9IjciIHJ4PSIxIiB0cmFuc2Zvcm09InJvdGF0ZSg0NSA4IDgpIi8+CiAgICAgICAgICAgIDxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyIiB4PSItMiIgeT0iNyIgcng9IjEiIHRyYW5zZm9ybT0icm90YXRlKDEzNSA4IDgpIi8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K);
    display: inline-block;
    background-size: 24px 24px;
    background-repeat: no-repeat;
    background-position: center;
  }
  &__content-container {
    flex: 1 0 auto;
    position: relative;
  }
  &__content {
    font-size: 16px;
    transition: all 200ms;
    align-items: center;
    font-weight: bold;
    justify-content: center;
    display: flex;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
  }
  &__logo {
    width: 125px;
    display: inline-block;
  }
  &__body {
    flex: 1 0 auto;
    position: relative;
    margin-top: 20px;
  }
  &__body-content {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    position: absolute;
    overflow: auto;
    transition: all 400ms;
    line-height: initial;
    white-space: initial;
    transform: translateX(0);
  }
}
.mobile-phone-base-modal {
  &__container {
    padding: 20px;
    text-align: center;
  }
  &__title {
    font-size: 16px;
    font-weight: bold;
  }
  &__input {
    width: 100%;
    height: 53px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    margin: 0 auto;
    display: block;
    max-width: 335px;
    font-size: 16px;
    text-align: center;
    box-shadow: none;
    margin-top: 30px;
    line-height: 16px;
    border-radius: 16px 16px 0 0 !important;
    letter-spacing: 1px;
    border-bottom-width: 0;
  }
  &__phone-input {
    text-align: center;
    border-radius: 16px 16px 0 0;
    width: 100%;
    height: 100%;
    border: none;
    border-bottom: 1px solid rgba(63, 59, 59, 0.05);
  }
  &__code-input {
    text-align: center;
    border-radius: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
  &__button {
    width: 100%;
    margin: 0 auto;
    display: block;
    max-width: 335px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 0 0 16px 16px !important;
    height: 56px;
    border: 0;
    padding: 0 20px;
    position: relative;
    overflow: hidden;
    transition: background 200ms;
    background-color: $theme-mainColor;
    color: $theme-textColor;
    &:disabled {
      opacity: 0.7;
    }
  }
  &__button-content {
    width: 100%;
    display: inline-block;
    overflow: hidden;
    transition: all 150ms;
    text-align: center;
    line-height: 56px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__error {
    color: #ec5858;
    font-size: 12px;
    margin-top: 10px;
  }
  &__disclaimer {
    color: #b0b0b0;
    font-size: 12px;
    margin-top: 12px;
    line-height: 1.4;
  }
  &__description {
    margin: 12px auto 0;
    max-width: 236px;
    font-size: 14px;
    line-height: 1.4;
  }
  &__repeat {
    color: #b0b0b0;
    padding: 20px;
    display: inline-block;
    font-size: 12px;
  }
  &__can-repeat {
    color: #496dea;
  }
}

.mobile-fullscreen-modal-layout {
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  max-height: 100%;
  flex-direction: column;
}
</style>
