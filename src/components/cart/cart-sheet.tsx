/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useMemo, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft, ArrowRight, FilePenLine } from "lucide-react";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { useCart } from "@/contexts/CartProvider";

import { CartItem } from "./cart-item";
import { OrderTypeSelector } from "./order-type-selector";
import { TransactionMethodSelector } from "./transaction-method-selector";
import TipDialog from "./tip-dialog";

const formSchema = z.object({
  customer_name: z
    .string()
    .min(2, { message: "Customer name must be at least 2 characters." }),
  customer_msg: z.string().optional(),
  total_amount: z.number().min(1),
  order_type: z.enum(["dine-in", "take-out"]),
  payment_method: z.string(),
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
      total_amount: totalAmount,
      order_type: orderType,
      payment_method: selectedMethod,
      order_items: cartItems,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const sanitizedCartItems = cartItems.map(({ image, ...item }) => item);

    const submittedValues = {
      order: {
        customer_name: values.customer_name,
        customer_msg: values.customer_msg,
        total_amount: values.total_amount,
        order_type: values.order_type,
        payment_method: values.payment_method,
      },
      order_items: sanitizedCartItems,
    };

    console.log(submittedValues);
  }

  useEffect(() => {
    form.setValue("total_amount", totalAmount);
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
              // Cart view before checkout
              <>
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
                        <p className="text-lg font-semibold">
                          Your cart is empty.
                        </p>
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
                          type="button"
                          variant={"link"}
                          className="h-fit p-0"
                          onClick={() => setTipDialogOpen(true)}
                        >
                          {tipPercentage > 0
                            ? `${tipPercentage}%`
                            : "Select Tip"}
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
                        Proceed to Checkout <ArrowRight size={14} />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              // Checkout form
              <>
                <div>
                  <SheetHeader>
                    <div className="flex items-center space-x-4">
                      <ArrowLeft
                        className="cursor-pointer"
                        onClick={() => setIsCheckout(false)}
                      />
                      <SheetTitle className="font-label text-2xl font-light leading-6">
                        <span className="font-black">Order</span>
                        <br />
                        Details
                      </SheetTitle>
                    </div>
                  </SheetHeader>
                  <Separator className="-px-8 my-4" />
                  <div className="flex flex-col gap-4">
                    <TransactionMethodSelector
                      selectedMethod={selectedMethod}
                      onSelectMethod={setSelectedMethod}
                    />
                    <FormField
                      control={form.control}
                      name="customer_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Customer Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Your name will appear on the order.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customer_msg"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Leave a message (optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              // placeholder="Leave a message"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
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

                  <div className="mt-4">
                    <Button
                      type="submit"
                      className="w-full bg-yellow-500 py-6 font-bold text-neutral-900 hover:bg-yellow-300"
                    >
                      Confirm Order
                    </Button>
                  </div>
                </div>
              </>
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
