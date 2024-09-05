import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartProvider";
import { Separator } from "../ui/separator";
import { useState } from "react";

export function CartSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  const { cartItems } = useCart();
  const [orderType, setOrderType] = useState<"dine-in" | "take-out">("dine-in");

  const handleOpenChange = () => {
    onOpenChange(!open);
  };

  const handleOrderTypeChange = (type: "dine-in" | "take-out") => {
    setOrderType(type);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <span />
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader>
          <SheetTitle className="font-label text-2xl font-light leading-6">
            <span className="font-black">Your</span>
            <br />
            Cart List
          </SheetTitle>
          <SheetDescription>
            Review your selected items before proceeding to checkout.
          </SheetDescription>
        </SheetHeader>
        <Separator className="-px-8 my-4" />
        <div className="my-4 grid grid-cols-2 rounded-lg border bg-gray-100 text-center">
          <div
            className={`cursor-pointer py-4 ${
              orderType === "dine-in"
                ? "rounded-lg bg-neutral-900 text-neutral-50"
                : ""
            }`}
            onClick={() => handleOrderTypeChange("dine-in")}
          >
            Dine-in
          </div>
          <div
            className={`cursor-pointer py-4 ${
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
                className="grid grid-cols-[100px_1fr_auto] gap-4"
              >
                <img src={item.image} className="rounded-full" />
                <div>
                  <p>
                    {item.name} (x{item.quantity})
                  </p>
                </div>
                <p>₱{item.total.toFixed(2)}</p>
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
