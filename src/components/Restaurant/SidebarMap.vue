<template>
  <aside class="sidebar-map">
    <div class="sidebar-map-location">
      <div class="sidebar-map-location__map-wrapper">
        <!-- <div id="map" class="sidebar-map-location__map"></div> -->
        <!-- <div
          v-for="point in destinationPoints"
          :key="point.uuid"
          class="sidebar-map-location__map"
          :style="{
            backgroundImage: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.337798,37.810550,9.67,0.00,0.00/1000x600@2x?access_token=access_token=pk.eyJ1IjoiZmFlbXRheGkiLCJhIjoiY2pyYXNqZ3RhMHQxNTQ5bjBxMWlvcWF6eSJ9.ISSgNBMdG7idL3ljb2ILTg`
          }"
        ></div> -->
        <img class="sidebar-map-location__map" :src="getSrcMap" />
        <div class="sidebar-map-location__pin"></div>
      </div>
      <div class="sidebar-map-location__button">
        <button @click="showEnterAddressModal" class="button button--yellow">
          <span class="arrow-icon"></span>
          <span>Указать свой адрес</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script>
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken =
  'pk.eyJ1IjoiZmFlbXRheGkiLCJhIjoiY2pyYXNqZ3RhMHQxNTQ5bjBxMWlvcWF6eSJ9.ISSgNBMdG7idL3ljb2ILTg';
export default {
  created() {
    console.log(this.getLocation);
  },
  // mounted() {
  //   this.map = new mapboxgl.Map({
  //     container: 'map',
  //     style: 'mapbox://styles/faemtaxi/ck0fcruqn1p9o1cnzazi3pli9',
  //     center: [this.getLocation.lon, this.getLocation.lat],
  //     zoom: 16,
  //     interactive: false
  //   });
  //   new mapboxgl.Marker()
  //     .setLngLat([this.getLocation.lon, this.getLocation.lat])
  //     .addTo(this.map);
  // },
  computed: {
    getSrcMap() {
      return `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/${this.getLocation.lon},${this.getLocation.lat},16,0.00,0.00/1000x600@2x?access_token=pk.eyJ1IjoiZmFlbXRheGkiLCJhIjoiY2pyYXNqZ3RhMHQxNTQ5bjBxMWlvcWF6eSJ9.ISSgNBMdG7idL3ljb2ILTg`;
      // return 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/44.6547,43.0355,16,0.00,0.00/1000x600@2x?access_token=pk.eyJ1IjoiZmFlbXRheGkiLCJhIjoiY2pyYXNqZ3RhMHQxNTQ5bjBxMWlvcWF6eSJ9.ISSgNBMdG7idL3ljb2ILTg';
    },
    getLocation() {
      return this.destinationPoints[0];
    }
  },
  methods: {
    showEnterAddressModal() {
      console.log('asdasd');
      this.$parent.$emit('showEnterAddressModal');
    }
  },
  data: () => ({
    map: {}
  }),
  props: {
    destinationPoints: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  name: 'SidebarMap'
};
</script>

<style lang="scss">
.sidebar-map {
  position: fixed;
  top: 0px;
  width: 310px;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  padding-bottom: 0px;
  margin-top: 90px;
  transform: translateZ(0px);
}
.sidebar-map-location {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  &__map-wrapper {
    flex: 1 1 auto;
    display: flex;
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    flex-direction: column;
    background-color: #f2f2f2;
    &::before {
      content: '';
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      position: absolute;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.3) 0%,
        rgba(0, 0, 0, 0) 49%,
        rgba(0, 0, 0, 0.3) 100%
      );
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
      border-radius: 4px;
      pointer-events: none;
    }
  }
  &__map {
    width: 100%;
    height: 100%;
    z-index: 1;
    position: absolute;
    background-size: cover;
    background-position: center;
    object-fit: cover;
  }
  &__pin {
    top: 50%;
    left: 50%;
    width: 35px;
    height: 35px;
    z-index: 3;
    position: absolute;
    transform: translate(-50%, -100%);
    background-size: contain;
    background-image: url('~@/assets/svg/black-pin.svg');
    background-position: center;
  }
  &__button {
    margin-top: 10px;
  }
}
.arrow-icon {
  width: 18px;
  height: 18px;
  display: inline-block;
  margin-right: 8px;
  vertical-align: middle;
  background-size: 100%;
  background-image: url('~@/assets/svg/locate-icon.svg');
  background-repeat: no-repeat;
  background-position: center;
}
.mapboxgl-ctrl-bottom-left,
.mapboxgl-ctrl-bottom-right {
  display: none;
}
</style>
