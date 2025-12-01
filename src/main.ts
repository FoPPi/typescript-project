import { Electronics, Clothing, Book, CartItem } from "./types/definitions";

import * as icart from "./services/cart";
import * as search from "./services/search";

import * as mdata from "./data/test";

console.log('=== ІНТЕРНЕТ-МАГАЗИН З GENERIC ТИПАМИ ===\n');

// 1. Пошук товару за ID
console.log('1. ПОШУК ТОВАРУ ЗА ID:');
const phone = search.findProduct(mdata.electronics, 1);
console.log(`Знайдено: ${phone?.name} - ${phone?.price} грн`);

// 2. Фільтрація за ціною
console.log('\n2. ФІЛЬТРАЦІЯ ЗА ЦІНОЮ (до 40000 грн):');
const affordableElectronics = search.filterByPrice(mdata.electronics, 40000);
affordableElectronics.forEach(item => {
  console.log(`- ${item.name}: ${item.price} грн`);
});

// 3. Пошук за назвою
console.log('\n3. ПОШУК ЗА НАЗВОЮ (запит: "Samsung"):');
const samsungProducts = search.searchByName(mdata.electronics, 'Samsung');
samsungProducts.forEach(item => {
  console.log(`- ${item.name} (${item.brand})`);
});

// 4. Товари в наявності
console.log('\n4. ТОВАРИ В НАЯВНОСТІ (електроніка):');
const availableElectronics = search.filterInStock(mdata.electronics);
availableElectronics.forEach(item => {
  console.log(`- ${item.name}: в наявності`);
});

// 5. Робота з кошиком
console.log('\n5. РОБОТА З КОШИКОМ:');
let cart: CartItem<Electronics | Clothing | Book>[] = [];

// Додаємо товари
if (phone) {
  cart = icart.addToCart(cart, phone, 1);
  console.log(`Додано: ${phone.name} x1`);
}

const jeans = search.findProduct(mdata.clothing, 4);
if (jeans) {
  cart = icart.addToCart(cart, jeans, 2);
  console.log(`Додано: ${jeans.name} x2`);
}

const book = search.findProduct(mdata.books, 6);
if (book) {
  cart = icart.addToCart(cart, book, 3);
  console.log(`Додано: ${book.name} x3`);
}

// 6. Підрахунок загальної суми
console.log('\n6. ВМІСТ КОШИКА:');
cart.forEach(item => {
  const subtotal = item.product.price * item.quantity;
  console.log(`- ${item.product.name} x${item.quantity} = ${subtotal} грн`);
});

const total = icart.calculateTotal(cart);
const itemsCount = icart.getCartItemsCount(cart);
console.log(`\nЗагальна кількість товарів: ${itemsCount}`);
console.log(`Загальна сума: ${total} грн`);

// 7. Оновлення кількості
console.log('\n7. ОНОВЛЕННЯ КІЛЬКОСТІ:');
if (jeans) {
  cart = icart.updateCartQuantity(cart, jeans.id, 1);
  console.log(`Оновлено кількість "${jeans.name}" до 1 шт`);
  console.log(`Нова сума: ${icart.calculateTotal(cart)} грн`);
}

// 8. Видалення товару
console.log('\n8. ВИДАЛЕННЯ ТОВАРУ:');
if (book) {
  cart = icart.removeFromCart(cart, book.id);
  console.log(`Видалено: ${book.name}`);
  console.log(`Залишилось товарів: ${icart.getCartItemsCount(cart)}`);
  console.log(`Нова сума: ${icart.calculateTotal(cart)} грн`);
}

console.log('\n=== ЗАВЕРШЕННЯ ДЕМОНСТРАЦІЇ ===');