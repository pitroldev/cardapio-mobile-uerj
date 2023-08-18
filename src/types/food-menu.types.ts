export type FoodItem = {
  name: string;
  category: string;
  allergens: string[];
};

export type FoodMenuDay = {
  date: Date;
  dateString: string;
  menu: FoodItem[];
};
