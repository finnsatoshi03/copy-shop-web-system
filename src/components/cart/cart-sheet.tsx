/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import CheckoutForm from "@/components/cart/checkout-form";
import TipDialog from "./tip-dialog";
import CartView from "./cart-view";
import { Form } from "@/components/ui/form";
import { useCartLogic } from "./useCartLogic";
import ThanksDialog from "../thank-you-dialog";

export function CartSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  const {
    cartItems,
    subtotal,
    totalAmount,
    tipPercentage,
    setTipDialogOpen,
    isCheckout,
    setIsCheckout,
    isEditing,
    handleEditToggle,
    handleIncrement,
    handleDecrement,
    handleRemove,
    orderType,
    selectedMethod,
    setSelectedMethod,
    handleOrderTypeChange,
    form,
    onSubmit,
    isTipDialogOpen,
    setTipPercentage,
  } = useCartLogic();

  const [isThankYouDialogOpen, setThankYouDialogOpen] = useState(false);

  const handleOpenChange = () => {
    onOpenChange(!open);
  };

  const handleOrderSubmit = (data: any) => {
    onSubmit(data);
    setThankYouDialogOpen(true);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent className="overflow-y-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOrderSubmit)} // Modified to handle the thank you dialog
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
                  onSheet
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

      <ThanksDialog
        open={isThankYouDialogOpen}
        onClose={() => setThankYouDialogOpen(false)}
      />
    </>
  );
}
