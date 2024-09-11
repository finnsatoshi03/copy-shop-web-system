import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials, formatDateTime, formatTime } from "@/lib/helpers";

import { Separator } from "@/components/ui/separator";
import { Order } from "@/lib/types";
import OrderStatus from "./order-status";
import OrderItems from "./order-items";
import OrderTotal from "./order-total";
import { Button } from "../ui/button";

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-4">
      <div className="grid grid-cols-[1fr_auto] justify-between">
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
      {order.payment_status.toLowerCase() === "pending" ? (
        <div className="rounded-lg bg-gray-200 px-4 py-3">
          <h1 className="text-sm font-bold text-green-700">
            Customers Request:
          </h1>
          <p className="font-mono text-xs">{order.customer_msg}</p>
        </div>
      ) : (
        <Button className="h-fit bg-yellow-500 py-3 font-semibold text-black hover:bg-yellow-600">
          Mark Paid
        </Button>
      )}
    </div>
  );
};

export default OrderCard;
