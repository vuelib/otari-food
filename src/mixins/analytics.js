const hostname = window.location.hostname;

export function addProductAnalytics({ name, uuid, price, category, brand }) {
  window.dataLayer.push({
    event: 'add',
    ecommerce: {
      currencyCode: 'RUB',
      add: {
        products: [
          {
            name: name, //Название товара
            id: uuid, //Id товар или артикул
            price: price, //Стоимость единицы товара
            category: category, //Раздел меню
            brand: brand, //Название ресторана
            quantity: 1, //Количество (всегда 1)
            variant: hostname //Имя хоста
          }
        ]
      }
    }
  });
}
export function removeProductAnalytics({
  name,
  id,
  price,
  category,
  brand,
  quantity = 1
}) {
  window.dataLayer.push({
    event: 'remove',
    ecommerce: {
      currencyCode: 'RUB',
      remove: {
        products: [
          {
            name: name, //Название товара
            id: id, //Id товар или артикул
            price: price, //Стоимость единицы товара
            category: category, //Раздел меню
            brand: brand, //Название ресторана
            quantity: quantity, //Количество
            variant: hostname //Имя хоста
          }
        ]
      }
    }
  });
}
export function purchaseAnalytics({
  uuid,
  productsPrice,
  totalPrice,
  productsData
}) {
  window.dataLayer.push({
    event: 'purchase',
    ecommerce: {
      currencyCode: 'RUB',
      purchase: {
        actionField: {
          id: uuid, //Id заказа
          revenue: productsPrice, //Cумма транзакции
          shipping: totalPrice //Cумма доставки
        },
        products: [...productsData],
        variant: hostname //Имя хоста
      }
    }
  });
}
