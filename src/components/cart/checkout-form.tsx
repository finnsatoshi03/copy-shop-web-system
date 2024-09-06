import { ArrowLeft } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { TransactionMethodSelector } from "./transaction-method-selector";
import { Button } from "@/components/ui/button";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "../ui/separator";
import { UseFormReturn } from "react-hook-form";
import { CartItem } from "@/lib/types";

interface FormData {
  customer_name: string;
  customer_msg: string;
  total_amt: number;
  order_type: "dine-in" | "take-out";
  payment_type: string;
  order_items: CartItem[];
}

interface CheckoutFormProps {
  subtotal: number;
  tipPercentage: number;
  totalAmount: number;
  form: UseFormReturn<FormData>;
  setIsCheckout: (checkout: boolean) => void;
  selectedMethod: string;
  setSelectedMethod: (method: string) => void;
  setTipDialogOpen: (open: boolean) => void;
}

function CheckoutForm({
  subtotal,
  tipPercentage,
  totalAmount,
  form,
  setIsCheckout,
  selectedMethod,
  setSelectedMethod,
  setTipDialogOpen,
}: CheckoutFormProps) {
  return (
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
                  <Textarea {...field} />
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
  );
}

export default CheckoutForm;
