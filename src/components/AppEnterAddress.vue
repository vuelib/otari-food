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
              v-if="!isSelectAddressNotNull"
              @input="debounceInput"
              v-model="enterAddress"
              class="enter-address__address-input"
              autocomplete="off"
              placeholder="Или указать..."
              type="text"
              autofocus
              ref="enter-address-input"
            />
            <ul
              v-if="enterAddress.length && !isSelectAddressNotNull"
              class="suggestions-list"
            >
              <li
                v-for="suggestion in suggestionsAddresses"
                @click="selectAddress(suggestion)"
                :key="suggestion.uuid"
                class="suggestion"
              >
                <span class="suggestion__item">
                  {{ suggestion.unrestricted_value }}
                  <div class="suggestion__item-label">
                    Россия, Владикавказ
                  </div>
                </span>
              </li>
            </ul>
            <div
              @click="clearEnterAddress"
              v-if="isSelectAddressNotNull"
              class="enter-address__content"
            >
              <div class="enter-address__content-address">
                <span>{{ selectedAddress.unrestricted_value }}</span>
              </div>
              <div class="enter-address__content-remove"></div>
            </div>
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 44"
              v-if="enterAddress.length || isSelectAddressNotNull"
              @click="clearEnterAddress"
              class="enter-address__content-remove"
              :class="{
                'enter-address__content-remove-active': isSelectAddressNotNull
              }"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.5 28.4L13.1 22l6.4-6.3-1.1-1.1-6.4 6.3-6.4-6.3-1.1 1.1 6.4 6.3-6.4 6.4 1.1 1.1 6.4-6.4 6.4 6.4z"
              />
            </svg>
          </div>
          <button
            @click="setAddress"
            :disabled="!isSelectAddressNotNull"
            class="enter-address__ok button button--yellow"
          >
            Ок
          </button>
        </div>
        <div class="map-wrapper">
          <div id="enter-address-map" class="enter-address__map"></div>
          <img src="../assets/marker.png" class="map-point" />
        </div>
        <!-- <div class="modal__body"></div> -->
        <!-- <div class="modal__footer"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'debounce';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken =
  'pk.eyJ1IjoiZmFlbXRheGkiLCJhIjoiY2pyYXNqZ3RhMHQxNTQ5bjBxMWlvcWF6eSJ9.ISSgNBMdG7idL3ljb2ILTg';

import { createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('location');
export default {
  mounted() {
    this.map = new mapboxgl.Map({
      container: 'enter-address-map',
      style: 'mapbox://styles/faemtaxi/ck0fcruqn1p9o1cnzazi3pli9',
      center: [44.66778, 43.03667],
      zoom: 14
    });
    this.map.on('move', this.moveSetAddress);
    // this.marker = new mapboxgl.Marker()
    //   .setLngLat([44.66778, 43.03667])
    //   .addTo(this.map);
    // this.map.addControl(new mapboxgl.NavigationControl());
  },
  methods: {
    setAddress() {
      this.setCurrentLocation(this.selectedAddress);
      this.$emit('closePopup');
    },
    // Select address
    selectAddress(address) {
      this.selectedAddress = address;
      this.map.flyTo({
        center: [address.lon, address.lat],
        zoom: 17
      });
      // this.marker.setLngLat([address.lon, address.lat]);
    },
    // Debounce move set address
    moveSetAddress: debounce(async function() {
      if (this.isDetectLocation) return (this.isDetectLocation = false);
      this.findAddress({
        lat: this.map.getCenter().lat,
        long: this.map.getCenter().lng
      }).then(data => (this.selectedAddress = data));
    }, 100),
    // Debounce enter address
    debounceInput: debounce(async function({ target }) {
      const data = await this.getAutocompleteAddresses(target.value);
      this.suggestionsAddresses = data;
    }, 350),
    delectLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.map.flyTo({
              center: [position.coords.longitude, position.coords.latitude]
            });

            // center: [Math.random() * 50, Math.random() * 50]
            this.findAddress({
              lat: position.coords.latitude,
              long: position.coords.longitude
            }).then(data => {
              this.selectedAddress = data;
              this.isDetectLocation = true;
            });
          },
          function() {
            console.log('Not');
          }
        );
      } else {
        // Browser doesn't support Geolocation
        console.log('Browser does not support Geolocation');
      }
    },
    clearEnterAddress() {
      if (this.selectedAddress) {
        this.enterAddress = this.selectedAddress.unrestricted_value;
        this.selectedAddress = null;
        setTimeout(() => this.$refs['enter-address-input'].focus(), 0);
      } else {
        this.enterAddress = '';
      }
    },
    ...mapActions([
      'getAutocompleteAddresses',
      'setCurrentLocation',
      'findAddress'
    ])
  },
  computed: {
    isEnterAddressNotNull() {
      return this.enterAddress !== '';
    },
    isSelectAddressNotNull() {
      return this.selectedAddress !== null;
    }
  },
  data: () => ({
    map: null,
    marker: null,
    enterAddress: '',
    selectedAddress: null,
    suggestionsAddresses: [],
    isShowSuggestions: false,
    isDetectLocation: false
  }),
  name: 'AppEnterAddress'
};
</script>

<style lang="scss">
.map-wrapper {
  position: relative;
}
.map-point {
  position: absolute;
  top: calc(50% - 15px);
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.modal {
  &__header {
    margin: 5px;
    padding: 10px 20px;
    font-size: 24px;
    font-weight: bold;
    white-space: pre-line;
    line-height: 36px;
    margin-right: 66px;
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
  &__header {
    padding-left: 0;
  }
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
    position: relative;
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
    border: 1px solid #ccc;
    font-size: 1.125rem;
    box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    padding: 0px 30px 0 10px;
  }
  &__map {
    // flex: 1 0 auto;
    width: 100%;
    height: 400px;
    position: relative;
  }
  &__content {
    position: relative;
    height: 44px;
    display: flex;
    font-size: 17px;
    background: $theme-mainColor;
    padding-top: 2px;
    align-items: center;
    font-weight: bold;
    border-radius: 4px;
    color: $theme-textColor;
  }
  &__content-address {
    flex: 1 1 auto;
    padding-left: 30px;
    padding-right: 30px;
  }
  &__content-remove {
    top: 0;
    right: 6px;
    height: 100%;
    cursor: pointer;
    opacity: 1;
    position: absolute;
    fill: #a9a9a9;
  }
  &__content-remove-active {
    fill: #fff;
  }
}
.mapboxgl-ctrl-bottom-left,
.mapboxgl-ctrl-bottom-right {
  display: none;
}
.suggestions-list {
  display: flex;
  background: white;
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.15);
  flex-direction: column;
  cursor: pointer;
  max-height: 358px;
  overflow-y: auto;
}
.suggestion {
  flex: 0 0 auto;
  color: gray;
  display: -webkit-box;
  padding: 6px 12px;
  overflow: hidden;
  max-height: 106px;
  line-height: 22px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  transition: background-color 0.15s;
  &:hover {
    background-color: #eeeeee;
  }
  &__item {
    color: #000;
    font-weight: 100;
  }
  &__item-label {
    color: #aaa;
    font-size: 14px;
  }
}
</style>
