type Category = {
  label: string;
  subCategories: string[];
};

export const CATEGORIES: Record<string, Category> = {
  BEVERAGE: {
    label: "Beverage",
    subCategories: [
      "Electric Elixirs",
      "Brewed Brilliance",
      "Chill-Out Classics",
      "Refreshed Revivals",
      "Frosted Fusions",
      "Iced Tea & Lemonade",
      "Hot Teas",
      "Milk, Juice & More",
      "Bottled Beverages",
    ],
  },
  FOOD: {
    label: "Food",
    subCategories: [
      "Breakfast",
      "Lunch",
      "Pastries",
      "Snacks",
      "Desserts",
      "Sandwiches",
      "Salads",
    ],
  },
};
