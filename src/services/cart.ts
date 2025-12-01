import { BaseProduct, CartItem } from "../types/definitions";

/**
 * Додає товар до кошика або збільшує його кількість
 * @param cart - поточний кошик
 * @param product - товар для додавання
 * @param quantity - кількість товару
 * @returns оновлений кошик
 */
export const addToCart = <T extends BaseProduct>(
  cart: CartItem<T>[],
  product: T,
  quantity: number
): CartItem<T>[] => {
  // Перевірка коректності вхідних даних
  if (!Array.isArray(cart) || !product || typeof quantity !== 'number' || quantity <= 0) {
    console.error('Некоректні вхідні дані для addToCart');
    return cart;
  }

  // Перевірка наявності товару на складі
  if (!product.inStock) {
    console.warn(`Товар "${product.name}" відсутній на складі`);
    return cart;
  }

  // Створюємо копію кошика
  const newCart = [...cart];

  // Шукаємо товар у кошику
  const existingItemIndex = newCart.findIndex(
    item => item.product.id === product.id
  );

  if (existingItemIndex !== -1) {
    // Якщо товар вже є в кошику - збільшуємо кількість
    newCart[existingItemIndex] = {
      ...newCart[existingItemIndex],
      quantity: newCart[existingItemIndex].quantity + quantity
    };
  } else {
    // Якщо товару немає - додаємо новий елемент
    newCart.push({ product, quantity });
  }

  return newCart;
};

/**
 * Видаляє товар з кошика
 * @param cart - поточний кошик
 * @param productId - ID товару для видалення
 * @returns оновлений кошик
 */
export const removeFromCart = <T extends BaseProduct>(
  cart: CartItem<T>[],
  productId: number
): CartItem<T>[] => {
  if (!Array.isArray(cart) || typeof productId !== 'number') {
    console.error('Некоректні вхідні дані для removeFromCart');
    return cart;
  }

  return cart.filter(item => item.product.id !== productId);
};

/**
 * Оновлює кількість товару в кошику
 * @param cart - поточний кошик
 * @param productId - ID товару
 * @param quantity - нова кількість
 * @returns оновлений кошик
 */
export const updateCartQuantity = <T extends BaseProduct>(
  cart: CartItem<T>[],
  productId: number,
  quantity: number
): CartItem<T>[] => {
  if (!Array.isArray(cart) || typeof productId !== 'number' || typeof quantity !== 'number') {
    console.error('Некоректні вхідні дані для updateCartQuantity');
    return cart;
  }

  if (quantity <= 0) {
    return removeFromCart(cart, productId);
  }

  return cart.map(item =>
    item.product.id === productId
      ? { ...item, quantity }
      : item
  );
};

/**
 * Підраховує загальну вартість товарів у кошику
 * @param cart - кошик з товарами
 * @returns загальна сума
 */
export const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
  if (!Array.isArray(cart)) {
    console.error('Некоректні вхідні дані для calculateTotal');
    return 0;
  }

  return cart.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
};

/**
 * Підраховує кількість товарів у кошику
 * @param cart - кошик з товарами
 * @returns загальна кількість товарів
 */
export const getCartItemsCount = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
  if (!Array.isArray(cart)) {
    return 0;
  }

  return cart.reduce((count, item) => count + item.quantity, 0);
};