import React from "react";
import { Order } from "@/lib/types";
import OrderCard from "./order-card";

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {orders.map((order) => (
        <OrderCard key={order.order_id} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
