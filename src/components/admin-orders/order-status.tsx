import React from "react";
import { CheckCircle, Check, Timer, AlertCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import { updateOrderStatus } from "@/services/apiOrder";

const statusConfig: {
  [key: string]: {
    bgColor: string;
    textColor: string;
    description: string;
    icon: JSX.Element;
  };
} = {
  "Ready for Pickup": {
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
  Served: {
    bgColor: "bg-blue-200",
    textColor: "text-blue-800",
    description: "Order completed",
    icon: <Check size={12} />,
  },
  Unknown: {
    bgColor: "bg-gray-200",
    textColor: "text-gray-800",
    description: "Status unknown",
    icon: <AlertCircle size={12} />,
  },
};

interface OrderStatusProps {
  status: string | null;
  orderId: number;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ status, orderId }) => {
  const queryClient = useQueryClient();
  const config = status ? statusConfig[status] : statusConfig["Unknown"];
  const isBelowLg = useMediaQuery({ query: "(max-width: 1024px)" });

  const { mutate: updateStatus, isPending: isUpdating } = useMutation({
    mutationFn: ({
      newStatus,
      orderId,
    }: {
      newStatus: string;
      orderId: number;
    }) => updateOrderStatus(newStatus, orderId),
    onSuccess: () => {
      toast.success("Order status updated");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => {
      toast.error("Failed to update order status");
    },
  });

  const handleStatusUpdate = (newStatus: string) => {
    if (newStatus !== status && status !== "Served") {
      updateStatus({ newStatus, orderId });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer space-y-1 text-right">
          <div
            className={`flex items-center gap-1 text-xs ${config.bgColor} h-fit rounded-md px-3 py-1`}
          >
            {config.icon}
            <span>{status || "Unknown"}</span>
          </div>
          <p className="flex items-center justify-end gap-1 font-label text-xs">
            <span className={`${config.textColor}`}>•</span>{" "}
            <span className="opacity-40">{config.description}</span>
          </p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={isBelowLg ? "bottom" : "left"}
        align={isBelowLg ? "end" : "start"}
        sideOffset={isBelowLg ? -10 : 0}
      >
        <DropdownMenuLabel>Update Order Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {["Preparing", "Ready for Pickup"].map((item) => (
          <DropdownMenuItem
            key={item}
            className={`cursor-pointer ${item === status ? "opacity-50" : ""}`}
            onSelect={() => handleStatusUpdate(item)}
            disabled={item === status || status === "Served" || isUpdating}
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderStatus;
