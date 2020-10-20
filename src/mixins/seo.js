export function setRestaurantPageTitle(name) {
  document.title = `Faem | Заказать доставку из ресторана ${name}: меню доставки с ценами | Владикавказ`;
}
export function setMainPageTitle() {
  document.title =
    'Быстрая доставка еды из ресторанов Во Владикавказе — FaemEda';
}
export function setSpecialPageTitle(title) {
  document.title = title;
}
export function setRestaurantPageDescription(name, category) {
  document.querySelector(
    'meta[name="description"]'
  ).content = `Заказать еду с доставкой на дом или в офис из ресторана ${name}. Быстрая круглосуточная доставка. Полное меню доставки с фотографиями и ценами: ${category[0]}, ${category[1]}, ${category[2]}.`;
}
export function setMainPageDescription() {
  document.querySelector('meta[name="description"]').content =
    'Заказать еду с доставкой на дом или в офис во Владикавказе. Быстрая круглосуточная доставка. Сделайте заказ на сайте.';
}
