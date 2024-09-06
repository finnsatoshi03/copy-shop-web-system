import { useState, useMemo } from "react";
import { FilePenLine } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartProvider";
import { Separator } from "../ui/separator";
import { CartItem } from "./cart-item";
import { OrderTypeSelector } from "./order-type-selector";
import { TransactionMethodSelector } from "./transaction-method-selector";
import TipDialog from "./tip-dialog";

export function CartSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [orderType, setOrderType] = useState<"dine-in" | "take-out">("dine-in");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>("Cash");
  const [tipPercentage, setTipPercentage] = useState<number>(0);
  const [isTipDialogOpen, setTipDialogOpen] = useState<boolean>(false);

  const handleOpenChange = () => {
    onOpenChange(!open);
  };

  const handleOrderTypeChange = (type: "dine-in" | "take-out") => {
    setOrderType(type);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleRemove = (beverage_id: string, size: string) => {
    removeFromCart(beverage_id, size);
  };

  const handleIncrement = (
    beverage_id: string,
    size: string,
    quantity: number,
  ) => {
    updateQuantity(beverage_id, size, quantity + 1);
  };

  const handleDecrement = (
    beverage_id: string,
    size: string,
    quantity: number,
  ) => {
    if (quantity > 1) {
      updateQuantity(beverage_id, size, quantity - 1);
    }
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const totalAmount = useMemo(() => {
    return subtotal + (subtotal * tipPercentage) / 100;
  }, [subtotal, tipPercentage]);

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="overflow-y-auto">
        <div className="flex h-full flex-col justify-between">
          <div>
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
            <Separator className="-px-8 my-4" />

            {cartItems.length > 0 && (
              <OrderTypeSelector
                orderType={orderType}
                onOrderTypeChange={handleOrderTypeChange}
              />
            )}

            <div className="grid gap-4 py-4">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
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
            <div>
              <div className="my-4 rounded-xl bg-gray-100 px-6 py-5 font-label text-sm">
                <div className="flex justify-between">
                  <p>Sub Total</p>
                  <p>₱{subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Tip</p>
                  <Button
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

              <TransactionMethodSelector
                selectedMethod={selectedMethod}
                onSelectMethod={setSelectedMethod}
              />

              <SheetFooter className={`${cartItems.length > 1 && "mb-8"}`}>
                <SheetClose asChild>
                  <Button
                    className="w-full bg-yellow-500 py-6 text-neutral-900"
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </SheetClose>
              </SheetFooter>
            </div>
          )}
        </div>
      </SheetContent>

      <TipDialog
        open={isTipDialogOpen}
        onOpenChange={setTipDialogOpen}
        onSelectTip={(tip) => {
          setTipPercentage(tip);
          setTipDialogOpen(false);
        }}
      />
    </Sheet>
  );
}
