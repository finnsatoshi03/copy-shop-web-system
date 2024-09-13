import React, { useEffect } from "react";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { OrderSubmission } from "@/lib/types";
import { useBeverages } from "@/hooks/beverages/useBeverages";
import { convertSubmissionToOrder } from "@/lib/orderMapper";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const orderFormSchema = z.object({
  order: z.object({
    payment_type: z.string().min(1, "Payment type is required"),
    customer_name: z.string().min(1, "Customer name is required"),
    customer_msg: z.string().optional(),
    total_amt: z.number().min(1),
    order_type: z.string().min(1, "Order type is required"),
  }),
  order_items: z.array(
    z.object({
      beverage_id: z.string(),
      sugar_level: z
        .number()
        .min(0)
        .max(100, "Sugar level must be between 0 and 100"),
      size: z.string(),
      price: z.number().positive(),
      quantity: z.number().positive(),
      total: z.number().positive(),
    }),
  ),
});

type OrderFormSchema = z.infer<typeof orderFormSchema>;

interface EditOrderFormProps {
  orderData: OrderSubmission;
  onClose?: () => void;
}

const EditOrderForm: React.FC<EditOrderFormProps> = ({
  orderData,
  onClose,
}) => {
  const { beverages, isLoading: isLoadingBeverages } = useBeverages();

  const form = useForm<OrderFormSchema>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: orderData,
  });

  const { isDirty } = form.formState;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "order_items",
  });

  const onSubmit = (data: OrderFormSchema) => {
    const orderToSend = convertSubmissionToOrder({
      ...data,
      id: orderData.id,
      order: {
        ...data.order,
        customer_msg: data.order.customer_msg ?? "",
      },
    });
    console.log("Submitting Order:", orderToSend);
    onClose?.();
  };

  const calculateTotalAmount = () => {
    const totalAmount = form
      .getValues("order_items")
      .reduce((acc, item) => acc + item.total, 0);
    form.setValue("order.total_amt", totalAmount);
  };

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name && name.startsWith("order_items")) {
        calculateTotalAmount();
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  if (isLoadingBeverages) return <Loader2 className="animate-spin" />;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="custom-scrollbar h-[70vh] space-y-4 overflow-y-auto pr-2"
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="order.customer_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Customer Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="order.payment_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Credit/Debit Card">
                        Credit/Debit Card
                      </SelectItem>
                      <SelectItem value="GCash">GCash</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="order.order_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select order type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dine-in">Dine-In</SelectItem>
                      <SelectItem value="take-out">Take-Out</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="order.total_amt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Total Amount"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="order.customer_msg"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Message</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Customer Message" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <>
          <h2 className="font-bold">Order Items</h2>
          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`order_items.${index}.beverage_id`}
                    render={() => (
                      <FormItem>
                        <FormLabel>Beverage</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                className="w-full justify-between overflow-hidden overflow-ellipsis"
                              >
                                {form.watch(`order_items.${index}.beverage_id`)
                                  ? (beverages ?? []).find(
                                      (bev) =>
                                        bev.id.toString() ===
                                        form.watch(
                                          `order_items.${index}.beverage_id`,
                                        ),
                                    )?.name
                                  : "Select beverage..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="popover-content-width-same-as-its-trigger w-full p-0">
                              <Command>
                                <CommandInput placeholder="Search beverage..." />
                                <CommandList>
                                  <CommandEmpty>
                                    No beverage found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {(beverages ?? []).map((bev) => (
                                      <CommandItem
                                        key={bev.id}
                                        onSelect={() => {
                                          const selectedBeverage = (
                                            beverages ?? []
                                          ).find(
                                            (bev) =>
                                              bev.id.toString() ===
                                              bev.id.toString(),
                                          );
                                          form.setValue(
                                            `order_items.${index}.beverage_id`,
                                            bev.id.toString(),
                                          );
                                          form.setValue(
                                            `order_items.${index}.price`,
                                            selectedBeverage?.price.medium || 0,
                                          );
                                          form.setValue(
                                            `order_items.${index}.quantity`,
                                            1,
                                          );
                                          form.setValue(
                                            `order_items.${index}.total`,
                                            (selectedBeverage?.price.medium ||
                                              0) * 1,
                                          );
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            bev.id.toString() ===
                                              form.watch(
                                                `order_items.${index}.beverage_id`,
                                              )
                                              ? "opacity-100"
                                              : "opacity-0",
                                          )}
                                        />
                                        {bev.name}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Size */}
                  <FormField
                    control={form.control}
                    name={`order_items.${index}.size`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="small">Small</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="large">Large</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`order_items.${index}.sugar_level`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sugar Level</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          placeholder="Sugar Level"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`order_items.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          placeholder="Quantity"
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`order_items.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          placeholder="Price"
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`order_items.${index}.total`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          placeholder="Total"
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Remove Item Button */}
              <Button
                type="button"
                variant="secondary"
                onClick={() => remove(index)}
              >
                Remove Item
              </Button>
            </React.Fragment>
          ))}

          {/* Add New Item Button */}
          <Button
            type="button"
            className={`${orderData.order_items.length > 0 && "mt-2 bg-yellow-500 text-black hover:bg-yellow-600"} flex`}
            onClick={() =>
              append({
                beverage_id: "",
                sugar_level: 0,
                size: "",
                price: 0,
                quantity: 0,
                total: 0,
              })
            }
          >
            Add Item
          </Button>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={!isDirty}>
            Update Order
          </Button>
        </>
        {/* </div> */}
      </form>
    </Form>
  );
};

export default EditOrderForm;
