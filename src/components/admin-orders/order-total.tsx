import React from "react";

interface OrderTotalProps {
  total: number;
}

const OrderTotal: React.FC<OrderTotalProps> = ({ total }) => {
  return (
    <div className="flex justify-between">
      <h1 className="text-sm font-semibold">Total</h1>
      <p className="font-bold">₱{total}</p>
    </div>
  );
};

export default OrderTotal;
