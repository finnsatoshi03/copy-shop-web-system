/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useMemo, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { useCart } from "@/contexts/CartProvider";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CartItem, OrderSubmission } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "@/services/apiOrder";
import toast from "react-hot-toast";

interface OrderDetails {
  customer_name: string;
  customer_msg?: string;
  total_amt: number;
  order_type: "dine-in" | "take-out";
  payment_type: string;
}

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
  const queryClient = useQueryClient();
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const { mutate: placeOrder } = useMutation({
    mutationFn: (order: OrderSubmission) => createOrder(order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
      toast.success("Your order is placed successfully!");
      // if (onClose) onClose();
    },
    onError: (error) => {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    },
  });

  const [orderType, setOrderType] = useState<"dine-in" | "take-out">("dine-in");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>("Cash");
  const [tipPercentage, setTipPercentage] = useState<number>(0);
  const [isTipDialogOpen, setTipDialogOpen] = useState<boolean>(false);
  const [isCheckout, setIsCheckout] = useState<boolean>(false);
  const [submittedValues, setSubmittedValues] = useState<{
    orderDetails: OrderDetails;
    cartItems: CartItem[];
  } | null>(null);
  const [pdfGenerated, setPdfGenerated] = useState<boolean>(false);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const totalAmount = useMemo(() => {
    return parseFloat((subtotal + (subtotal * tipPercentage) / 100).toFixed(2));
  }, [subtotal, tipPercentage]);

  const generatePDF = (
    order: OrderDetails,
    orderItems: CartItem[],
    reference_code: string,
  ) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [80, 160],
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const fontSize = 8;

    const headerLeading = 6;
    const bodyLeading = 4;
    const footerLeading = 6;

    doc.setFont("Courier", "bold");
    doc.setFontSize(fontSize);

    let currentY = 20;
    doc.text("E-Receipt", pageWidth / 2, currentY, { align: "center" });
    currentY += headerLeading;

    doc.setFontSize(14);
    doc.setFont("Courier", "bold");
    doc.text(`#${reference_code}`, pageWidth / 2, currentY, {
      align: "center",
    });
    currentY += headerLeading;

    doc.setFont("Courier", "normal");
    doc.setFontSize(fontSize);

    doc.text(`Customer: ${order.customer_name}`, 10, currentY);
    currentY += bodyLeading;

    if (order.customer_msg) {
      doc.text(`Message: ${order.customer_msg}`, 10, currentY);
      currentY += bodyLeading;
    }

    doc.text(`Order Type: ${order.order_type}`, 10, currentY);
    currentY += bodyLeading;

    doc.text(`Payment Type: ${order.payment_type}`, 10, currentY);
    currentY += bodyLeading;

    doc.text(`Total: ${order.total_amt.toFixed(2)}php`, 10, currentY);
    currentY += bodyLeading;

    doc.setLineWidth(0.5);
    doc.setLineDash([1, 0.5]);
    doc.line(10, currentY, pageWidth - 10, currentY);
    currentY += bodyLeading;

    const tableData = orderItems.map((item: CartItem) => [
      item.name +
        ` (${item.size.charAt(0).toUpperCase()})` +
        ` sugar: (${item.sugar_level}%)`,
      `${item.quantity}`,
      `${item.total.toFixed(2)}`,
    ]);

    autoTable(doc, {
      startY: currentY,
      head: [["Item", "Qty", "Total"]],
      body: tableData,
      theme: "plain",
      styles: {
        fontSize: fontSize,
        font: "Courier",
        cellPadding: 1,
        lineWidth: 0,
        halign: "left",
      },
      tableWidth: "auto",
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 10 },
        2: { cellWidth: 20 },
      },
      margin: { left: 10, right: 10 },
    });

    currentY = doc.lastAutoTable.finalY + bodyLeading;

    doc.line(10, currentY, pageWidth - 10, currentY);
    currentY += footerLeading;

    doc.text(`Total: ${order.total_amt.toFixed(2)}php`, 10, currentY);
    currentY += footerLeading;

    const footerMessage =
      "Order received. Please proceed to the counter to pay and process your order. Thank you!";
    doc.text(footerMessage, pageWidth / 2, currentY, {
      align: "center",
      maxWidth: pageWidth - 20,
    });

    setPdfGenerated(true);
    doc.save("copyshop-receipt.pdf");
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

  // console.log(cartItems);

  const onSubmit = (
    values: z.infer<typeof formSchema>,
    openThankYouDialog: () => void,
  ) => {
    const sanitizedCartItems = cartItems.map(({ beverageImg, ...item }) => ({
      ...item,
      beverageImg,
    }));

    const orderDetails = {
      customer_name: values.customer_name,
      customer_msg: values.customer_msg || "",
      total_amt: values.total_amt,
      order_type: orderType,
      payment_type: selectedMethod,
    };

    const orderPayload: OrderSubmission = {
      order: orderDetails,
      order_items: sanitizedCartItems,
      id: 1,
    };

    setSubmittedValues({ orderDetails, cartItems: sanitizedCartItems });

    placeOrder(orderPayload, {
      onSuccess: (response) => {
        generatePDF(orderDetails, sanitizedCartItems, response.reference_code);
        openThankYouDialog();
        // console.log(response);
      },
    });
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
