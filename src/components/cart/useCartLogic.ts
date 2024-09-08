/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCart } from "@/contexts/CartProvider";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  customer_name: z
    .string()
    .min(2, { message: "Customer name must be at least 2 characters." }),
  customer_msg: z.string().optional(),
  total_amt: z.number().min(1),
  order_type: z.enum(["dine-in", "take-out"]),
  payment_type: z.string(),
  order_items: z.array(
    z.object({
      beverage_id: z.string(),
      name: z.string(),
      size: z.string(),
      sugar_level: z.number(),
      price: z.number(),
      quantity: z.number(),
      total: z.number(),
    }),
  ),
});

export function useCartLogic() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const [orderType, setOrderType] = useState<"dine-in" | "take-out">("dine-in");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>("Cash");
  const [tipPercentage, setTipPercentage] = useState<number>(0);
  const [isTipDialogOpen, setTipDialogOpen] = useState<boolean>(false);
  const [isCheckout, setIsCheckout] = useState<boolean>(false);
  const [submittedValues, setSubmittedValues] = useState<any | null>(null);
  const [pdfGenerated, setPdfGenerated] = useState<boolean>(false);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const totalAmount = useMemo(() => {
    return parseFloat((subtotal + (subtotal * tipPercentage) / 100).toFixed(2));
  }, [subtotal, tipPercentage]);

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

  const handleOrderTypeChange = (type: "dine-in" | "take-out") => {
    setOrderType(type);
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_name: "",
      customer_msg: "",
      total_amt: totalAmount,
      order_type: orderType,
      payment_type: selectedMethod,
      order_items: cartItems,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const sanitizedCartItems = cartItems.map(({ image, ...item }) => item);

    const orderDetails = {
      order: {
        customer_name: values.customer_name,
        customer_msg: values.customer_msg,
        total_amt: values.total_amt,
        order_type: orderType,
        payment_type: selectedMethod,
      },
      order_items: sanitizedCartItems,
    };

    setSubmittedValues(orderDetails);
    setPdfGenerated(false);

    navigate("/");
    clearCart();
  };

  useEffect(() => {
    form.setValue("total_amt", totalAmount);
  }, [totalAmount, form]);

  return {
    cartItems,
    subtotal,
    totalAmount,
    tipPercentage,
    setTipPercentage,
    isEditing,
    setIsEditing,
    isCheckout,
    setIsCheckout,
    orderType,
    setOrderType,
    selectedMethod,
    setSelectedMethod,
    isTipDialogOpen,
    setTipDialogOpen,
    handleIncrement,
    handleDecrement,
    handleRemove: removeFromCart,
    handleOrderTypeChange,
    handleEditToggle,
    form,
    onSubmit,
    submittedValues,
    pdfGenerated,
    setPdfGenerated,
  };
}
