import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials, formatDateTime, formatTime } from "@/lib/helpers";

import { Separator } from "@/components/ui/separator";
import { Order } from "@/lib/types";
import OrderStatus from "./order-status";
import OrderItems from "./order-items";
import OrderTotal from "./order-total";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updatePaymentStatus } from "@/services/apiOrder";
import { Loader2 } from "lucide-react";

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const queryClient = useQueryClient();
  const { mutate: mutateUpdatePaymentStatus, isPending: isUpdatingPayment } =
    useMutation({
      mutationFn: (id: number) => updatePaymentStatus(id),
      onSuccess: () => {
        toast.success("Payment status updated");
        queryClient.invalidateQueries({
          queryKey: ["orders"],
        });
      },
      onError: () => {
        toast.error("Failed to update payment status");
      },
    });

  const handlePaymentStatusUpdate = () => {
    mutateUpdatePaymentStatus(order.payment_id);
  };

  const isLoading = isUpdatingPayment;

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-4">
      <div className="grid grid-cols-1 justify-between gap-2 lg:grid-cols-[1fr_auto] lg:gap-0">
        <div className="flex h-full gap-2">
          <Avatar>
            <AvatarFallback>{getInitials(order.customer_name)}</AvatarFallback>
          </Avatar>
          <div className="flex h-full flex-col justify-between">
            <h1 className="font-bold">{order.customer_name}</h1>
            <div className="flex gap-2 font-label text-xs opacity-40">
              <p>Order #{order.reference_code}</p> / <p>{order.order_type}</p>
            </div>
          </div>
        </div>
        <OrderStatus status={order.order_status} />
      </div>
      <div className="flex justify-between font-label text-sm">
        <p>{formatDateTime(order.created_time)}</p>
        <p>{formatTime(order.created_time)}</p>
      </div>
      <Separator />
      <OrderItems items={order.items} />
      <Separator />
      <OrderTotal total={order.total_amt} />
      {order.order_status.toLowerCase() === "preparing" ? (
        <>
          {order.customer_msg && (
            <div className="rounded-lg bg-gray-200 px-4 py-3">
              <h1 className="text-sm font-bold text-green-700">
                Customers Request:
              </h1>
              <p className="font-mono text-xs">{order.customer_msg}</p>
            </div>
          )}
        </>
      ) : order.payment_status.toLowerCase() !== "paid" ? (
        <Button
          className="h-fit bg-yellow-500 py-3 font-semibold text-black hover:bg-yellow-600"
          onClick={handlePaymentStatusUpdate}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Paying..
            </>
          ) : (
            "Mark Paid"
          )}
        </Button>
      ) : (
        <Button
          className="h-fit bg-green-500 py-3 font-semibold text-black hover:bg-green-600"
          disabled
        >
          {order.payment_status}
        </Button>
      )}
    </div>
  );
};

export default OrderCard;
