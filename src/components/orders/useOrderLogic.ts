/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Beverage } from "@/lib/types";
import { useCart } from "@/contexts/CartProvider";
import toast from "react-hot-toast";

const orderSchema = z.object({
  beverage_id: z.string(),
  sugar_level: z.number().min(0).max(100),
  price: z.number().min(0),
  quantity: z.number().min(1, { message: "Quantity must be at least 1." }),
  total: z.number().min(0),
  image: z.string().url().optional(),
});

export const useOrderLogic = (
  orderDetails: Beverage | null,
  onClose?: () => void,
) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("small");
  const [calories, setCalories] = useState<number>(0);

  const { handleSubmit, setValue, reset, watch } = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      beverage_id: orderDetails?.id ? String(orderDetails.id) : "",
      sugar_level: 0,
      price: orderDetails?.price?.small || 0,
      size: selectedSize,
      quantity: 1,
      total: 0,
      image: orderDetails?.beverageImg || "",
    },
  } as any);

  const quantity = watch("quantity");
  const sugar_level = watch("sugar_level");

  useEffect(() => {
    if (orderDetails) {
      setSelectedSize(orderDetails.price?.small ? "small" : "medium");
      reset({
        beverage_id: String(orderDetails.id),
        sugar_level: 0,
        price: orderDetails.price?.small || 0,
        quantity: 1,
        total: orderDetails.price?.small || 0,
      });
      setCalories(orderDetails.calories?.small || 0);
    }
  }, [orderDetails, reset]);

  useEffect(() => {
    if (orderDetails) {
      const price = orderDetails?.price?.[selectedSize] || 0;
      setValue("total", price * quantity);
      setCalories(
        orderDetails.calories?.[
          selectedSize as keyof typeof orderDetails.calories
        ] || 0,
      );
    }
  }, [quantity, selectedSize, orderDetails, setValue]);

  const handleSizeSelect = (sizeKey: string) => {
    if (orderDetails?.price?.[sizeKey]) {
      setSelectedSize(sizeKey);
      setValue("price", orderDetails.price[sizeKey]);
      setCalories(
        orderDetails.calories?.[
          sizeKey as keyof typeof orderDetails.calories
        ] || 0,
      );
    }
  };

  const incrementQuantity = () => setValue("quantity", quantity + 1);
  const decrementQuantity = () =>
    setValue("quantity", Math.max(1, quantity - 1));

  const handleSugarLevelChange = (value: number[]) =>
    setValue("sugar_level", value[0]);

  const onSubmit = (data: z.infer<typeof orderSchema>) => {
    const cartItem = {
      beverage_id: data.beverage_id,
      name: orderDetails?.name || "Unnamed Beverage",
      price: data.price,
      size: selectedSize,
      sugar_level: sugar_level,
      quantity: data.quantity,
      total: data.total,
      image: orderDetails?.beverageImg || "",
    };

    addToCart(cartItem);
    if (onClose) {
      onClose();
      toast.success(`${orderDetails?.name} added to cart.`);
    }
  };

  return {
    handleSubmit,
    quantity,
    sugar_level,
    selectedSize,
    calories,
    incrementQuantity,
    decrementQuantity,
    handleSizeSelect,
    handleSugarLevelChange,
    onSubmit,
  };
};
