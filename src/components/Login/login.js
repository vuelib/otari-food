import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('auth');

export default {
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
    async sendVerificationCode(event) {
      event.preventDefault();
      try {
        await this.checkToEqualVerificationCode({
          code: +this.user.code,
          device_id: this.user.device_id
        });
        this.isVerificationCodeWrong = false;
        this.$emit('closeLoginModal');
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
  })
};
