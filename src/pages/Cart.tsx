import CartView from "@/components/cart/cart-view";
import CheckoutForm from "@/components/cart/checkout-form";
import ReceiptPrinter from "@/components/cart/e-receipt-print";
import TipDialog from "@/components/cart/tip-dialog";
import { useCartLogic } from "@/components/cart/useCartLogic";
import { Form } from "@/components/ui/form";

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
    pdfGenerated,
    setPdfGenerated,
  } = useCartLogic();

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
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
        <ReceiptPrinter
          order={submittedValues.order}
          orderItems={submittedValues.order_items}
          pdfGenerated={pdfGenerated}
          setPdfGenerated={setPdfGenerated}
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
