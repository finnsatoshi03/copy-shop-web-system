import { CartItem } from "@/lib/types";
import { createContext, ReactNode, useContext, useState } from "react";

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (beverage_id: string, size: string) => void;
  updateQuantity: (beverage_id: string, size: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) =>
          cartItem.beverage_id === item.beverage_id &&
          cartItem.size === item.size &&
          cartItem.sugar_level === item.sugar_level,
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        updatedItems[existingItemIndex].total += item.total;
        return updatedItems;
      }

      return [...prevItems, item];
    });
  };

  const removeFromCart = (beverage_id: string, size: string) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.beverage_id === beverage_id && item.size === size),
      ),
    );
  };

  const updateQuantity = (
    beverage_id: string,
    size: string,
    quantity: number,
  ) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex(
        (item) => item.beverage_id === beverage_id && item.size === size,
      );
      if (itemIndex !== -1) {
        const updatedItems = [...prevItems];
        const item = updatedItems[itemIndex];
        item.quantity = quantity;
        item.total = item.price * quantity;
        return updatedItems;
      }
      return prevItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
