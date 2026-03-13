export interface MenuItem {
  id: string;
  Name: string;            // name -> Name
  Description: string;     // description -> Description
  Price: number;           // price -> Price
  PreparationTime: number; // preparationTime -> PreparationTime
  CategoryId: string;      // categoryId -> CategoryId
  ImageUrl: string;        // imageUrl -> ImageUrl
  Ingredients: string[];   // ingredients -> Ingredients
}

export interface Category {
  id: string;
  name: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
}