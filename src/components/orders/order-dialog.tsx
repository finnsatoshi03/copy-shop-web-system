import { useState, useEffect } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Beverage } from "@/lib/types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { useCart } from "@/contexts/CartProvider";

// Schema for validation using zod
const orderSchema = z.object({
  beverage_id: z.string(), // Ensure beverage_id is a string
  sugar_level: z.number().min(0).max(100),
  price: z.number().min(0),
  quantity: z.number().min(1, { message: "Quantity must be at least 1." }),
  total: z.number().min(0),
});

export function OrderDialog({
  isOpen,
  onClose,
  orderDetails,
}: {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: Beverage | null;
}) {
  const { addToCart } = useCart();
  const { handleSubmit, setValue, reset, watch } = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      beverage_id: orderDetails?.id ? String(orderDetails.id) : "",
      sugar_level: 0,
      price: orderDetails?.price?.small || 0,
      quantity: 1,
      total: 0,
    },
  });

  const [selectedSize, setSelectedSize] = useState<string>("small");

  // Watch for form field changes
  const quantity = watch("quantity");
  const sugar_level = watch("sugar_level");

  useEffect(() => {
    if (isOpen && orderDetails) {
      setSelectedSize(orderDetails.price?.small ? "small" : "medium");
      reset({
        beverage_id: String(orderDetails.id), // Convert to string
        sugar_level: 0,
        price: orderDetails.price?.small || 0,
        quantity: 1,
        total: orderDetails.price?.small || 0,
      });
    }
  }, [isOpen, orderDetails, reset]);

  // Calculate total whenever quantity or selectedSize changes
  useEffect(() => {
    if (orderDetails) {
      const price = orderDetails?.price?.[selectedSize] || 0;
      setValue("total", price * quantity);
    }
  }, [quantity, selectedSize, orderDetails, setValue]);

  const handleSizeSelect = (sizeKey: string) => {
    if (orderDetails?.price?.[sizeKey]) {
      setSelectedSize(sizeKey);
      setValue("price", orderDetails.price[sizeKey]);
    }
  };

  const incrementQuantity = () => {
    setValue("quantity", quantity + 1);
  };

  const decrementQuantity = () => {
    setValue("quantity", Math.max(1, quantity - 1));
  };

  const handleSugarLevelChange = (value: number[]) => {
    setValue("sugar_level", value[0]);
  };

  const onSubmit = (data: z.infer<typeof orderSchema>) => {
    const cartItem = {
      beverage_id: data.beverage_id,
      name: orderDetails?.name || "Unnamed Beverage",
      price: data.price,
      quantity: data.quantity,
      total: data.total,
    };

    addToCart(cartItem);
  };

  if (!orderDetails) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="flex items-center justify-center">
          <p className="text-gray-500">No menu item selected.</p>
        </DialogContent>
      </Dialog>
    );
  }

  const sizes: { [key: string]: string } = {
    small: "S",
    medium: "M",
    large: "L",
  };

  const sizeButtons = Object.keys(sizes).map((sizeKey) => {
    const isAvailable = orderDetails?.price?.[sizeKey];
    const isSelected = selectedSize === sizeKey;

    return (
      <button
        type="button"
        key={sizeKey}
        onClick={() => handleSizeSelect(sizeKey)}
        disabled={!isAvailable}
        className={`rounded-lg px-5 py-3 font-label text-sm font-bold ${
          isAvailable
            ? isSelected
              ? "bg-yellow-500 text-white"
              : "bg-yellow-100 text-black"
            : "cursor-not-allowed bg-gray-100 text-gray-400 opacity-50"
        }`}
      >
        {sizes[sizeKey]}
      </button>
    );
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-y-auto overflow-x-hidden">
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="-mx-[1.6rem] -mt-8 h-fit">
            <div className="relative h-1/2">
              {orderDetails?.image ? (
                <img
                  src={orderDetails.image}
                  className="h-full w-full object-cover"
                  alt={orderDetails.name}
                  style={{
                    objectPosition: "50% 25%",
                  }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
              <div className="absolute -bottom-4 right-8 inline-flex items-center gap-4 rounded-full bg-yellow-500 px-2 py-2 font-label text-sm">
                <button type="button" onClick={decrementQuantity}>
                  <Minus size={16} />
                </button>
                <p className="font-bold">{quantity}</p>
                <button type="button" onClick={incrementQuantity}>
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="mt-8 px-8">
              <h1 className="w-2/3 font-label text-xl font-bold">
                {orderDetails.name || "Unnamed Beverage"}
              </h1>
              <p className="font-label text-xs opacity-60">
                {orderDetails.description || "No description available"}
              </p>

              <h2 className="mt-4 font-label font-bold">Sizes for you</h2>
              <div className="mt-1 flex items-center gap-2">{sizeButtons}</div>

              <h2 className="mt-4 font-label font-bold">Sugar Level</h2>
              <div className="mt-1 flex flex-col">
                <Slider
                  defaultValue={[0]}
                  max={100}
                  min={0}
                  step={25}
                  value={[sugar_level]}
                  onValueChange={handleSugarLevelChange}
                />
                <div className="mt-2 flex justify-between text-xs font-bold">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            <div className="mb-4 mt-6 flex w-full justify-between px-8">
              <div className="flex flex-col justify-between">
                <h2 className="text-xs font-medium opacity-60">Total Price:</h2>
                <p className="flex items-end gap-1 text-2xl font-bold">
                  {orderDetails.price?.[selectedSize] ? (
                    <>
                      <span className="text-base text-yellow-500">₱</span>
                      {(orderDetails.price[selectedSize] * quantity).toFixed(2)}
                    </>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
              <Button
                className="flex gap-2 rounded-full rounded-tl-none p-6"
                type="submit"
              >
                <ShoppingCart size={16} fill="white" />
                Add to cart
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
