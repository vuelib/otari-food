<template>
  <div class="modal-wrapper">
    <div class="modal modal-enter-address">
      <div class="enter-address">
        <div class="modal__header enter-address__header">
          Укажите адрес доставки
        </div>
        <div class="enter-address__bar">
          <button @click="delectLocation" class="enter-address__detect">
            <span><i class="icon-place"></i>Определить</span>
          </button>
          <div class="enter-address__address">
            <input
              class="enter-address__address-input"
              autocomplete="off"
              placeholder="Или указать..."
              type="text"
            />
            <!-- <div class="enter-address__lists">
              <div class="enter-address__list-item">asd</div>
              <div class="enter-address__list-item">asd</div>
              <div class="enter-address__list-item">asd</div>
              <div class="enter-address__list-item">asd</div>
              <div class="enter-address__list-item">asd</div>
            </div> -->
          </div>
          <button class="enter-address__ok button button--yellow">Ок</button>
        </div>
        <div id="enter-address-map" class="enter-address__map"></div>
        <!-- <div class="modal__body"></div> -->
        <!-- <div class="modal__footer"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken =
  'pk.eyJ1IjoiZmFlbXRheGkiLCJhIjoiY2pyYXNqZ3RhMHQxNTQ5bjBxMWlvcWF6eSJ9.ISSgNBMdG7idL3ljb2ILTg';
export default {
  mounted() {
    this.map = new mapboxgl.Map({
      container: 'enter-address-map',
      style: 'mapbox://styles/faemtaxi/ck0fcruqn1p9o1cnzazi3pli9',
      center: [44.665976, 43.025234],
      zoom: 12
    });
    this.map.addControl(new mapboxgl.NavigationControl());
  },
  methods: {
    delectLocation() {
      console.log('detect');
    }
  },
  name: 'AppEnterAddress'
};
</script>

<style lang="scss">
.modal {
  &__header {
    flex: 0 0 auto;
    width: 100%;
    height: 45px;
    position: relative;
    font-size: 29px;
    font-weight: 100;
  }
  &__body {
    max-height: 555px;
    overflow-x: hidden;
    overflow-y: auto;
    border-top: solid 1px #f5f5f5;
    padding: 10px 20px;
    background-color: #fafafa;
  }
  &__footer {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    > button {
      width: auto;
      margin: 0 8px;
    }
  }
}

.modal-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  vertical-align: middle;
}
.modal {
  display: flex;
  max-height: 100%;
  flex-direction: column;
}
// ====
.enter-address {
  min-width: 800px;
  padding: 20px 40px;
  &__bar {
    flex: 0 0 auto;
    width: 100%;
    height: 44px;
    z-index: 100;
    display: flex;
    position: relative;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  &__detect {
    cursor: pointer;
    flex: 0 0 auto;
    left: 3px;
    border: 1px solid $theme-mainColor;
    height: 100%;
    z-index: 1;
    position: relative;
    min-width: 150px;
    background: white;
    font-weight: bold;
    border-radius: 4px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  &__address {
    flex: 1 1 auto;
    height: 100%;
    min-width: 500px;
    max-width: 500px;
    margin-right: 10px;
  }
  &__ok {
    min-width: 100px;
    font-weight: bold;
    text-transform: uppercase;
  }
  &__address-input {
    border-radius: 0 4px 4px 0;
    height: 100%;
    border: 1px solid #cccccc;
    font-size: 1.125rem;
    box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    padding: 0px 30px 0 10px;
  }
  &__map {
    flex: 1 0 auto;
    width: 100%;
    height: 400px;
    position: relative;
  }
}
.mapboxgl-ctrl-bottom-left,
.mapboxgl-ctrl-bottom-right {
  display: none;
}
</style>
