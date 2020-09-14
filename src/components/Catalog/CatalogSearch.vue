<template>
  <div class="catalog-page-search">
    <div class="catalog-content__controls-wrapper">
      <div class="catalog-content__controls">
        <div class="catalog-search">
          <div class="catalog-search__wrapper">
            <input
              autocomplete="off"
              type="text"
              class="catalog-search__input"
              placeholder="Название, кухня или блюдо"
            />
          </div>
          <i class="icon-search catalog-search__icon-search"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.catalog-content {
  &__controls {
    display: flex;
    align-items: center;
  }
  &__controls-wrapper {
    padding: 20px 80px;
    border-bottom: 8px solid #fafafa;
  }
}
.catalog-search {
  flex: 1 1 auto;
  width: calc((100% - 60px) / 3 * 2);
  height: 46px;
  position: relative;
  align-items: center;
  border-radius: 4px;
  &__wrapper {
    height: 100%;
  }
  &__input {
    border: 1px solid #e8e8e8;
    height: 100%;
    padding: 0 35px 0 35px;
    box-shadow: none;
  }
  &__icon-search {
    top: 15px;
    left: 9px;
    color: gray;
    position: absolute;
    font-size: 16px;
    &::before {
      speak: none;
      width: 1em;
      display: inline-block;
      content: '\e801';
      font-style: normal;
      text-align: center;
      font-family: foodfox-icons;
      line-height: 1em;
      margin-left: 0.2em;
      margin-right: 0.2em;
    }
  }
}
</style>
