import { CartItem } from "@/components/cart/cart-item";
import { OrderTypeSelector } from "@/components/cart/order-type-selector";
import { Button } from "@/components/ui/button";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CartItem as CartTypeItem } from "@/lib/types";
import { Separator } from "@radix-ui/react-separator";
import { FilePenLine } from "lucide-react";

interface CartViewProps {
  cartItems: CartTypeItem[];
  subtotal: number;
  tipPercentage: number;
  totalAmount: number;
  handleEditToggle: () => void;
  handleIncrement: (
    beverage_id: string,
    size: string,
    quantity: number,
  ) => void;
  handleDecrement: (
    beverage_id: string,
    size: string,
    quantity: number,
  ) => void;
  handleRemove: (beverage_id: string, size: string) => void;
  setIsCheckout: (checkout: boolean) => void;
  setTipDialogOpen: (open: boolean) => void;
  isEditing: boolean;
  orderType: "dine-in" | "take-out";
  handleOrderTypeChange: (type: "dine-in" | "take-out") => void;
  onSheet?: boolean;
}

function CartView({
  cartItems,
  subtotal,
  tipPercentage,
  totalAmount,
  handleEditToggle,
  handleIncrement,
  handleDecrement,
  handleRemove,
  setIsCheckout,
  setTipDialogOpen,
  isEditing,
  orderType,
  handleOrderTypeChange,
  onSheet,
}: CartViewProps) {
  return (
    <>
      <div className="px-8 md:px-0">
        {onSheet ? (
          <SheetHeader>
            <SheetTitle className="font-label text-2xl font-light leading-6">
              <span className="font-black">Your</span>
              <br />
              Cart List
            </SheetTitle>
            <div className="flex w-full items-end justify-between">
              <SheetDescription>
                {cartItems.length > 0
                  ? "Review your selected items before proceeding to checkout."
                  : "Your cart is currently empty. Start adding items to see them here."}
              </SheetDescription>

              {cartItems.length > 0 && (
                <FilePenLine
                  onClick={handleEditToggle}
                  className="cursor-pointer"
                />
              )}
            </div>
          </SheetHeader>
        ) : (
          <div className="flex w-full items-end justify-between">
            <h1 className="font-label text-2xl font-light leading-6">
              <span className="font-black">Your</span>
              <br />
              Cart List
            </h1>
            <div>
              {cartItems.length > 0 && (
                <FilePenLine
                  onClick={handleEditToggle}
                  className="cursor-pointer"
                />
              )}
            </div>
          </div>
        )}
        <Separator className="-px-8 my-4" />

        {cartItems.length > 0 && (
          <OrderTypeSelector
            orderType={orderType}
            onOrderTypeChange={handleOrderTypeChange}
          />
        )}

        <div className="grid gap-4 py-4">
          {cartItems.length > 0 ? (
            cartItems.map((item: CartTypeItem, index: number) => (
              <CartItem
                key={index}
                item={item}
                isEditing={isEditing}
                handleRemove={handleRemove}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
              />
            ))
          ) : (
            <div className="flex h-[50vh] flex-col items-center justify-center text-center">
              <p className="text-lg font-semibold">Your cart is empty.</p>
              <p className="text-sm text-gray-500">
                Add items to your cart to see them here.
              </p>
            </div>
          )}
        </div>
      </div>
      {cartItems.length > 0 && (
        <div className="px-8 md:px-0">
          <div className="my-4 rounded-xl bg-gray-100 px-6 py-5 font-label text-sm">
            <div className="flex justify-between">
              <p>Sub Total</p>
              <p>₱{subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Tip</p>
              <Button
                type="button"
                variant={"link"}
                className="h-fit p-0"
                onClick={() => setTipDialogOpen(true)}
              >
                {tipPercentage > 0 ? `${tipPercentage}%` : "Select Tip"}
              </Button>
            </div>
            <div className="my-3 h-[2px] w-full border border-dashed border-gray-400"></div>
            <div className="flex justify-between text-base font-bold">
              <p>Total Amount</p>
              <p>₱{totalAmount.toFixed(2)}</p>
            </div>
          </div>

          <div>
            <Button
              type="button"
              className="flex w-full gap-2 bg-yellow-500 py-6 font-bold text-neutral-900 hover:bg-yellow-300"
              onClick={(e) => {
                setIsCheckout(true);
                e.preventDefault();
              }}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default CartView;
