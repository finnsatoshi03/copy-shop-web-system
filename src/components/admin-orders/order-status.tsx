import React from "react";
import { CheckCircle, Check, Timer } from "lucide-react";

// Status configuration with colors, description, and icons
const statusConfig: {
  [key: string]: {
    bgColor: string;
    textColor: string;
    description: string;
    icon: JSX.Element;
  };
} = {
  Ready: {
    bgColor: "bg-green-200",
    textColor: "text-green-800",
    description: "Ready to be served",
    icon: <CheckCircle size={12} />,
  },
  Preparing: {
    bgColor: "bg-orange-200",
    textColor: "text-orange-800",
    description: "Being brewed",
    icon: <Timer size={12} />,
  },
  Completed: {
    bgColor: "bg-blue-200",
    textColor: "text-blue-800",
    description: "Order completed",
    icon: <Check size={12} />,
  },
};

interface OrderStatusProps {
  status: string;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
  const config = statusConfig[status];
  return (
    <div className="space-y-1 text-right">
      <div
        className={`flex items-center gap-1 text-xs ${config.bgColor} h-fit rounded-md px-3 py-1`}
      >
        {config.icon}
        <span>{status}</span>
      </div>
      <p className="flex items-center justify-end gap-1 font-label text-xs">
        <span className={`${config.textColor}`}>•</span>{" "}
        <span className="opacity-40">{config.description}</span>
      </p>
    </div>
  );
};

export default OrderStatus;
