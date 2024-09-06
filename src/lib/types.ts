export type Beverage = {
  id: number;
  name: string;
  description: string;
  sugarLevel?: string[];
  price: {
    small: number;
    medium: number;
    large: number;
    [key: string]: number | undefined;
  };
  calories: {
    small: number;
    medium: number;
    large: number;
  };
  image: string;
  isPopular: boolean;
  isFeatured: boolean;
  category: string[];
};

export type CartItem = {
  beverage_id: string;
  image: string;
  name: string;
  size: string;
  sugar_level: number;
  price: number;
  quantity: number;
  total: number;
};
