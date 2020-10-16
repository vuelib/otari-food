import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('stores');

export default {
  created() {
    if (!this.isSpecialStores) {
      if (!this.getStores.length) this.showMore();
    } else {
      if (!this.getStores.length)
        this.getSpecialStores(this.getSpecialStoresData.urls);
    }
  },
  computed: {
    filteredStories() {
      if (!this.filteredCategory || this.filteredCategory === 'все') {
        return this.getStores;
      }
      return this.getStores.filter(({ product_category }) => {
        if (!product_category) return;
        return product_category
          .map(el => el.replace(/.*(>|\|)\.*/g, '').trim())
          .includes(this.filteredCategory);
      });
    },
    isShowMore() {
      return this.getStoresCount - this.getStores.length > 0;
    },
    checkStoreOnOpened() {
      return workSchedule => {
        const { day_off, work_beginning, work_ending } = this.detectWeekDay(
          workSchedule
        );
        const curTime = new Date().getHours() * 60 + new Date().getMinutes();
        return !day_off && work_beginning < curTime && curTime < work_ending;
      };
    },
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
    ...mapGetters([
      'getStores',
      'getStoresCount',
      'findStoreByUUID',
      'isSpecialStores',
      'getSpecialStoresData'
    ]),
    ...mapGetters(['isAuthUser'])
  },
  methods: {
    pushToStore({ target }) {
      // Delegating events
      const storeContainer = target.closest('article');
      if (
        !storeContainer &&
        !this.$refs['places-list-container'].contains(storeContainer)
      ) {
        return;
      }
      // Push to store
      const store = this.findStoreByUUID(storeContainer.dataset.store);
      // check on closed
      if (!this.checkStoreOnOpened(store.work_schedule)) return;
      this.$router.push({
        name: 'RestaurantPage',
        params: {
          id: storeContainer.dataset.store,
          store
        }
      });
    },
    detectWeekDay(workSchedule) {
      const currentWeekDay = new Date().getDay();
      for (const day of workSchedule) {
        if (currentWeekDay === 0 && day.week_day === 7) return day;
        if (day.week_day === currentWeekDay) return day;
      }
    },
    constructTime(min) {
      const h = Math.floor(min / 60);
      const m = Math.floor(min % 60);
      return `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}`;
    },
    async showMore() {
      await this.getStoresByFilter({ page: this.page, limit: this.limit });
      this.page++;
    },
    openLoginModal() {
      this.isModalVisible = true;
    },
    closeLoginModal() {
      this.isModalVisible = false;
    },
    ...mapActions(['getStoresByFilter', 'getSpecialStores'])
  },
  data: () => ({
    isModalVisible: false,
    page: 1,
    limit: 30
  })
};
