import React from "react";
import { Item } from "@/lib/types";

interface OrderItemsProps {
  items: Item[];
}

const OrderItems: React.FC<OrderItemsProps> = ({ items }) => {
  return (
    <div className="h-36 overflow-y-auto">
      <div className="grid h-fit grid-cols-[1fr_auto_auto_auto] gap-x-4 gap-y-1 text-xs">
        <div className="pb-1 font-semibold opacity-40">Items</div>
        <div className="pb-1 font-semibold opacity-40">Sugar</div>
        <div className="pb-1 text-center font-semibold opacity-40">Qty</div>
        <div className="pb-1 font-semibold opacity-40">Price</div>

        {items.map((item, index) => (
          <React.Fragment key={index}>
            <p className="py-1">{item.Name}</p>
            <p className="py-1 text-center">{item["Sugar Level"]}%</p>
            <p className="py-1 text-center">{item.Quantity}</p>
            <p className="py-1">₱{item["Total Price"]}</p>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default OrderItems;
