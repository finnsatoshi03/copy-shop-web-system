import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartProvider";
import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FilePenLine, Minus, Plus, Trash } from "lucide-react";

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

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-label text-2xl font-light leading-6">
            <span className="font-black">Your</span>
            <br />
            Cart List
          </SheetTitle>
          <div className="flex w-full items-end justify-between">
            <SheetDescription>
              Review your selected items before proceeding to checkout.
            </SheetDescription>
            <FilePenLine
              onClick={handleEditToggle}
              className="cursor-pointer"
            />
          </div>
        </SheetHeader>
        <Separator className="-px-8 my-4" />
        <div className="my-4 grid grid-cols-2 rounded-lg border bg-gray-100 text-center">
          <div
            className={`cursor-pointer py-2 lg:py-4 ${
              orderType === "dine-in"
                ? "rounded-lg bg-neutral-900 text-neutral-50"
                : ""
            }`}
            onClick={() => handleOrderTypeChange("dine-in")}
          >
            Dine-in
          </div>
          <div
            className={`cursor-pointer py-2 lg:py-4 ${
              orderType === "take-out"
                ? "rounded-lg bg-neutral-900 text-neutral-50"
                : ""
            }`}
            onClick={() => handleOrderTypeChange("take-out")}
          >
            Take Out
          </div>
        </div>
        <div className="grid gap-4 py-4">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[100px_1fr_auto] items-center gap-4"
              >
                <img src={item.image} className="rounded-xl" />
                <div className="h-[80%] w-[80%] font-label">
                  <h1 className="font-bold">{item.name}</h1>
                  <p className="flex items-end gap-2 font-bold">
                    <span className="font-medium">
                      ({item.size.charAt(0).toUpperCase()})
                    </span>{" "}
                    ₱{item.price}{" "}
                    <span className="font-normal opacity-60">
                      x{item.quantity}
                    </span>
                  </p>
                </div>
                <div
                  className={`flex ${isEditing ? "h-[80%]" : "h-full"} flex-col items-end justify-between`}
                >
                  {isEditing ? (
                    <button
                      onClick={() => handleRemove(item.beverage_id, item.size)}
                    >
                      <Trash size={16} className="text-red-500" />
                    </button>
                  ) : (
                    <div className="flex flex-col rounded-lg bg-neutral-900 text-white">
                      <button
                        onClick={() =>
                          handleIncrement(
                            item.beverage_id,
                            item.size,
                            item.quantity,
                          )
                        }
                      >
                        <Plus size={14} className="size-8 rounded-lg p-2" />
                      </button>
                      <button
                        onClick={() =>
                          handleDecrement(
                            item.beverage_id,
                            item.size,
                            item.quantity,
                          )
                        }
                      >
                        <Minus size={14} className="size-8 rounded-lg p-2" />
                      </button>
                    </div>
                  )}
                  <p className="font-bold">₱{item.total.toFixed(2)}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Proceed to Checkout</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
