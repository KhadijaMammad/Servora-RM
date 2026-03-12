export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  preparationTime: number;
  categoryId: string;
  imageUrl: string;
  ingredients: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
}