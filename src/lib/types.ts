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
