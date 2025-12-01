import { Electronics, Clothing, Book } from "../types/definitions";

// Тестові дані: Електроніка
export const electronics: Electronics[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    price: 45000,
    description: 'Новітній смартфон від Apple з титановим корпусом',
    inStock: true,
    category: 'electronics',
    brand: 'Apple',
    warrantyMonths: 12,
    powerConsumption: '20W'
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24',
    price: 38000,
    description: 'Флагманський смартфон Samsung з AI функціями',
    inStock: true,
    category: 'electronics',
    brand: 'Samsung',
    warrantyMonths: 24,
    powerConsumption: '25W'
  },
  {
    id: 3,
    name: 'MacBook Air M3',
    price: 55000,
    description: 'Ультрабук з новим процесором M3',
    inStock: false,
    category: 'electronics',
    brand: 'Apple',
    warrantyMonths: 12,
    powerConsumption: '65W'
  }
];

// Тестові дані: Одяг
export const clothing: Clothing[] = [
  {
    id: 4,
    name: 'Джинси Levi\'s 501',
    price: 3500,
    description: 'Класичні джинси прямого крою',
    inStock: true,
    category: 'clothing',
    size: 'M',
    color: 'Синій',
    material: 'Бавовна 100%'
  },
  {
    id: 5,
    name: 'Светр Zara',
    price: 1800,
    description: 'М\'який вовняний светр',
    inStock: true,
    category: 'clothing',
    size: 'L',
    color: 'Сірий',
    material: 'Вовна 70%, Акрил 30%'
  }
];

// Тестові дані: Книги
export const books: Book[] = [
  {
    id: 6,
    name: 'TypeScript Handbook',
    price: 850,
    description: 'Повний посібник по TypeScript',
    inStock: true,
    category: 'books',
    author: 'Microsoft Team',
    pages: 450,
    isbn: '978-1234567890'
  }
];