<template>
  <div class="auth">
    <div class="auth__logo">
      <img class="auth__logo-img" src="@/assets/logo.png" alt="logo" />
    </div>
    <form @submit.prevent="submitLoginForm" class="auth-form">
      <div class="auth-form__header">
        Пожалуйста, укажите <br />
        логин и пароль
        <p class="auth-form__error">{{ error }}</p>
      </div>
      <div class="form-group">
        <input
          v-model="user.login"
          class="form-group__input"
          type="text"
          autofocus="autofocus"
          placeholder="Логин"
        />
        <div class="form-group__error"></div>
      </div>
      <div class="form-group">
        <input
          v-model="user.password"
          class="form-group__input"
          type="password"
          placeholder="Пароль"
        />
        <div class="form-group__error"></div>
      </div>
      <button
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
import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('auth');

export default {
  computed: {
    isDisabledSubmit() {
      const { login, password } = this.user;
      return login.trim() === '' || password.trim() === '';
    }
  },
  methods: {
    submitLoginForm() {
      console.log(this.user);
      // 4:39 am - want to sleep so much
      this.loginUser(this.user).catch(() => {
        this.error = 'Неверный логин или пароль';
      });
    },
    ...mapActions(['loginUser'])
  },
  data: () => ({
    user: {
      login: 'www',
      password: 'wwwwww'
    },
    error: ''
  }),
  name: 'AppLogin',
  components: {
    // AppPopup
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
.form-group {
  margin-bottom: 15px;
  &__input {
    height: 34px;
    border: 1px solid #cccccc;
    font-size: 15px;
    box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    appearance: none;
    padding-left: 14px;
    padding-right: 14px;
    border-radius: 4px;
  }
}
.form-submit {
  cursor: pointer;
}
</style>
