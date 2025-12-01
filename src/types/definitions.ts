// Базовий тип товару з усіма загальними полями
export type BaseProduct = {
  id: number;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
};

// Тип для електроніки з специфічними полями
export type Electronics = BaseProduct & {
  category: 'electronics';
  brand: string;
  warrantyMonths: number;
  powerConsumption?: string;
};

// Тип для одягу з специфічними полями
export type Clothing = BaseProduct & {
  category: 'clothing';
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  color: string;
  material: string;
};

// Тип для книг (додатковий тип для демонстрації гнучкості)
export type Book = BaseProduct & {
  category: 'books';
  author: string;
  pages: number;
  isbn: string;
};


// Тип для елемента кошика
export type CartItem<T extends BaseProduct> = {
  product: T;
  quantity: number;
};