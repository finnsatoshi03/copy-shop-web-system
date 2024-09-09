/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { Form } from "@/components/ui/form";

import CartView from "@/components/cart/cart-view";
import CheckoutForm from "@/components/cart/checkout-form";
import TipDialog from "@/components/cart/tip-dialog";
import ThanksDialog from "@/components/thank-you-dialog";

import { useCartLogic } from "@/components/cart/useCartLogic";

export default function Cart() {
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
    handleOrderTypeChange,
    selectedMethod,
    setSelectedMethod,
    form,
    onSubmit,
    isTipDialogOpen,
    setTipPercentage,
    submittedValues,
  } = useCartLogic();

  const [isThankYouDialogOpen, setThankYouDialogOpen] = useState(false);

  const handleOrderSubmit = (data: any) => {
    onSubmit(data);
    setThankYouDialogOpen(true);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOrderSubmit)}
          className="flex h-[calc(100dvh-6.5rem)] flex-col justify-between"
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

      {submittedValues && (
        <ThanksDialog
          open={isThankYouDialogOpen}
          onClose={() => setThankYouDialogOpen(false)}
        />
      )}

      <TipDialog
        open={isTipDialogOpen}
        onOpenChange={setTipDialogOpen}
        onSelectTip={(tip) => {
          setTipPercentage(tip);
          setTipDialogOpen(false);
        }}
      />
    </>
  );
}
