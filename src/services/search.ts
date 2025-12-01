import {BaseProduct} from "../types/definitions";

/**
 * Знаходить товар за його ID
 * @param products - масив товарів для пошуку
 * @param id - унікальний ідентифікатор товару
 * @returns знайдений товар або undefined
 */
export const findProduct = <T extends BaseProduct>(
  products: T[],
  id: number
): T | undefined => {
  // Перевірка коректності вхідних даних
  if (!Array.isArray(products) || typeof id !== 'number') {
    console.error('Некоректні вхідні дані для findProduct');
    return undefined;
  }

  return products.find(product => product.id === id);
};

/**
 * Фільтрує товари за максимальною ціною
 * @param products - масив товарів для фільтрації
 * @param maxPrice - максимальна ціна товару
 * @returns відфільтрований масив товарів
 */
export const filterByPrice = <T extends BaseProduct>(
  products: T[],
  maxPrice: number
): T[] => {
  // Перевірка коректності вхідних даних
  if (!Array.isArray(products) || typeof maxPrice !== 'number' || maxPrice < 0) {
    console.error('Некоректні вхідні дані для filterByPrice');
    return [];
  }

  return products.filter(product => product.price <= maxPrice);
};

/**
 * Фільтрує товари, які є в наявності
 * @param products - масив товарів
 * @returns товари, які є в наявності
 */
export const filterInStock = <T extends BaseProduct>(products: T[]): T[] => {
  if (!Array.isArray(products)) {
    console.error('Некоректні вхідні дані для filterInStock');
    return [];
  }

  return products.filter(product => product.inStock);
};

/**
 * Шукає товари за назвою (часткове співпадіння)
 * @param products - масив товарів
 * @param searchTerm - пошуковий запит
 * @returns знайдені товари
 */
export const searchByName = <T extends BaseProduct>(
  products: T[],
  searchTerm: string
): T[] => {
  if (!Array.isArray(products) || typeof searchTerm !== 'string') {
    console.error('Некоректні вхідні дані для searchByName');
    return [];
  }

  const lowerSearchTerm = searchTerm.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowerSearchTerm)
  );
};