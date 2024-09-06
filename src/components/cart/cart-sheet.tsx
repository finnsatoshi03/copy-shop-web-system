/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useMemo, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Form } from "@/components/ui/form";
import CartView from "@/pages/Cart";
import CheckoutForm from "./checkout-form";

import { useCart } from "@/contexts/CartProvider";
import TipDialog from "./tip-dialog";

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
  const [isCheckout, setIsCheckout] = useState<boolean>(false);

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
    return parseFloat((subtotal + (subtotal * tipPercentage) / 100).toFixed(2));
  }, [subtotal, tipPercentage]);

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    const sanitizedCartItems = cartItems.map(({ image, ...item }) => item);

    const submittedValues = {
      order: {
        customer_name: values.customer_name,
        customer_msg: values.customer_msg,
        total_amt: values.total_amt,
        order_type: orderType,
        payment_type: selectedMethod,
      },
      order_items: sanitizedCartItems,
    };

    console.log(submittedValues);
  }

  useEffect(() => {
    form.setValue("total_amt", totalAmount);
  }, [totalAmount, form]);

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="overflow-y-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col justify-between"
          >
            {!isCheckout ? (
              <CartView
                cartItems={cartItems}
                subtotal={subtotal}
                tipPercentage={tipPercentage}
                totalAmount={totalAmount}
                handleEditToggle={handleEditToggle}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                handleRemove={handleRemove}
                setIsCheckout={setIsCheckout}
                setTipDialogOpen={setTipDialogOpen}
                isEditing={isEditing}
                orderType={orderType}
                handleOrderTypeChange={handleOrderTypeChange}
              />
            ) : (
              <CheckoutForm
                subtotal={subtotal}
                tipPercentage={tipPercentage}
                totalAmount={totalAmount}
                form={form}
                setIsCheckout={setIsCheckout}
                selectedMethod={selectedMethod}
                setSelectedMethod={setSelectedMethod}
                setTipDialogOpen={setTipDialogOpen}
              />
            )}
          </form>
        </Form>
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
