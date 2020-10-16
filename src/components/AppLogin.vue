<template>
  <div class="auth">
    <div class="auth__logo">
      <img class="auth__logo-img" :src="getLogo" alt="logo" />
    </div>
    <form @submit.prevent="sendVerificationCode" class="auth-form">
      <div class="auth-form__header">
        <span v-if="!timer">
          Пожалуйста, укажите <br />
          свой телефон
        </span>
        <span v-else>
          Пожалуйста, введите <br />
          код из СМС
        </span>
        <p class="auth-form__error">{{ error }}</p>
      </div>
      <!-- Phone group -->
      <div class="phone-group">
        <div class="phone-field form-group">
          <TheMask
            v-model="user.phone"
            :mask="['(###) ###-##-##']"
            class="phone-field__input form-group__input"
            type="tel"
            autocomplete="tel"
            placeholder="номер телефона"
          />
          <div class="phone-field__phantom">+7</div>
        </div>
        <button
          @click.prevent="getCode"
          :disabled="isDisabledGetCode"
          class="phone-button button button--yellow"
        >
          <span v-if="isTimerNotNull">
            <i class="icon-agree"></i>
            {{ getTimerTime }}
          </span>
          <span v-else>
            Получить код
          </span>
        </button>
      </div>
      <!-- Code group -->
      <div class="code-group form-group">
        <TheMask
          v-model="user.code"
          :mask="['####']"
          :class="{ 'code-group__error-input': isVerificationCodeWrong }"
          class="code-group__input form-group__input"
          type="tel"
          placeholder="Код из СМС"
        />
        <!-- Code Error -->
        <div v-if="isVerificationCodeWrong" class="code-group__error">
          Неверный формат
        </div>
      </div>
      <button
        @click="sendVerificationCode"
        :disabled="isDisabledSubmit"
        class="form-submit button button--yellow"
      >
        Далее
      </button>
      <div class="auth-form__license">
        Нажимая кнопку "Далее", вы принимаете условия
        <a class="auth-form__license-link" href="#">
          Пользовательского соглашения
        </a>
      </div>
    </form>
  </div>
</template>

<script>
import special from '@/mixins/special.js';
import { TheMask } from 'vue-the-mask';
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('auth');

export default {
  mixins: [special],
  created() {
    this.user.device_id = this.tmpDeviceId();
  },
  computed: {
    isDisabledSubmit() {
      const { phone, code } = this.user;
      return phone.trim() === '' || code.trim() === '';
    },
    isDisabledGetCode() {
      return this.user.phone.length !== 10 || this.isTimerNotNull;
    },
    getTimerTime() {
      return `${this.min}:${this.sec < 10 ? `0${this.sec}` : this.sec}`;
    },
    isTimerNotNull() {
      return this.timer !== null;
    }
  },
  methods: {
    // Send for get code
    async getCode() {
      this.sendingGetCode = true;
      try {
        const { next_request_time } = await this.getCodeFromPhoneNumber({
          phone: `+7${this.user.phone}`,
          device_id: this.user.device_id
        });
        this.createTimer(next_request_time - Math.floor(Date.now() / 1000));
      } finally {
        this.sendingGetCode = false;
      }
    },
    // Send Verification Code
    async sendVerificationCode() {
      try {
        await this.checkToEqualVerificationCode({
          code: +this.user.code,
          device_id: this.user.device_id
        });
        this.isVerificationCodeWrong = false;
      } catch (e) {
        this.isVerificationCodeWrong = true;
      }
    },
    // Timer
    createTimer(seconds) {
      this.min = (seconds / 60) | 0;
      this.sec = seconds % 60;
      this.timer = setInterval(() => {
        this.sec--;
        if (this.sec < 0) {
          this.min--;
          if (this.min < 0) this.clearTimer();
          else this.sec = 59;
        }
      }, 1000);
    },
    // Clear Timer
    clearTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    // Generate tmp device id
    tmpDeviceId() {
      return [
        ...Math.random()
          .toString()
          .substr(-8)
      ]
        .map(el => String.fromCharCode(65 + +el))
        .join('');
    },
    ...mapActions(['getCodeFromPhoneNumber', 'checkToEqualVerificationCode'])
  },
  data: () => ({
    sendingGetCode: false,
    isVerificationCodeWrong: false,
    min: 0,
    sec: 0,
    timer: null,
    user: {
      phone: '',
      code: '',
      device_id: ''
    },
    error: ''
  }),
  name: 'AppLogin',
  components: {
    TheMask
  }
};
</script>

<style lang="scss" scoped>
.auth {
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 40px 40px;
  &__logo {
    text-align: center;
    padding-bottom: 15px;
  }
  &__logo-img {
    height: 50px;
  }
}
.auth-form {
  &__header {
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &__license {
    font-size: 16px;
    padding-top: 10px;
    font-weight: 100;
  }
  &__license-link {
    text-decoration: underline;
  }
  &__error {
    margin-top: 5px;
    color: $danger-color;
  }
}
.form-submit {
  cursor: pointer;
}
.phone-group {
  margin-top: 30px;
}
.code-group {
  margin: 15px 0;
}
.phone-field {
  position: relative;
  width: 65%;
  height: 34px;
  border: 1px solid #cccccc;
  display: inline-flex;
  font-size: 15px;
  box-shadow: inset 1px 1px 4px 0 rgba(0, 0, 0, 0.15);
  align-items: center;
  padding-left: 10px;
  border-right: none;
  border-radius: 3px 0 0 3px;
  &__input {
    border: none;
    height: 100%;
    padding: 0;
    display: inline-block;
    box-shadow: none;
    background: transparent;
    line-height: 32px;
    padding-left: 20px;
    outline: none;
  }
  &__phantom {
    top: 0;
    left: 10px;
    width: 100%;
    right: 0;
    height: 100%;
    bottom: 0;
    display: flex;
    position: absolute;
    align-items: center;
    line-height: 1.2;
    pointer-events: none;
  }
}
.phone-button {
  width: 35%;
  cursor: pointer;
  border: none;
  min-height: 34px;
  height: 34px;
  font-size: 17px;
  font-weight: bold;
  border-radius: 0 3px 3px 0;
  vertical-align: top;
  padding: 0 5px;
}
.code-group {
  &__input {
    padding: 5px 11px;
    font-size: 15px;
    width: 100%;
    height: 34px;
    border: 1px solid #cccccc;
    box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    text-overflow: ellipsis;
  }
  &__error-input {
    color: $danger-color;
    border-color: $danger-color;
  }
  &__error {
    color: $danger-color;
    font-size: 13px;
    font-weight: bold;
  }
}
// Icon
.icon-agree:before {
  speak: none;
  width: 1em;
  display: inline-block;
  content: '\e800';
  font-style: normal;
  text-align: center;
  font-family: foodfox-icons;
  font-weight: normal;
  line-height: 1em;
  margin-left: 0.2em;
  margin-right: 0.2em;
  font-variant: normal;
  text-transform: none;
  text-decoration: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
