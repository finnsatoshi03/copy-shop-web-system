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
  beverageImg: string;
  isPopular: boolean;
  isFeatured: boolean;
  category: string[];
};

export type CartItem = {
  beverage_id: string;
  beverageImg: string;
  name: string;
  size: string;
  sugar_level: number;
  price: number;
  quantity: number;
  total: number;
};

export interface Item {
  "Beverage ID": string;
  Name: string;
  Description: string;
  "Sugar Level": string;
  Price: string;
  Quantity: string;
  "Total Price": string;
}

export interface Order {
  order_id: number;
  payment_id: number;
  customer_name: string;
  customer_msg: string;
  total_amt: number;
  order_type: string;
  order_status: string;
  created_time: string;
  last_modified: string;
  isVoid: number;
  reference_code: string;
  admin_id: number;
  modified_time: string | null;
  payment_type: string;
  payment_status: string;
  receipt_url: string | null;
  items: Item[];
}
