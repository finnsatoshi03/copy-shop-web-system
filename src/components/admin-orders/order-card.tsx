import React, { useEffect, useState } from "react";
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
import { deleteOrder, updatePaymentStatus } from "@/services/apiOrder";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import EditOrderForm from "./edit-order-form";
import { convertOrderToSubmission } from "@/lib/orderMapper";

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [rememberChoice, setRememberChoice] = useState(false);

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

  const { mutate: mutateDeleteOrder, isPending: isDeletingOrder } = useMutation(
    {
      mutationFn: (id: number) => deleteOrder(id),
      onSuccess: () => {
        toast.success("Order deleted");
        queryClient.invalidateQueries({
          queryKey: ["orders"],
        });
      },
      onError: () => {
        toast.error("Failed to delete order");
      },
    },
  );

  const handlePaymentStatusUpdate = () => {
    mutateUpdatePaymentStatus(order.payment_id);
  };

  const handleEditOrder = () => {};

  const handleVoidOrder = () => {
    const skipDeleteConfirmation = localStorage.getItem(
      "skipDeleteConfirmation",
    );

    if (skipDeleteConfirmation === "true") {
      mutateDeleteOrder(order.order_id);
    } else {
      setShowConfirmationDialog(true);
    }
  };

  const confirmDelete = () => {
    if (rememberChoice) {
      localStorage.setItem("skipDeleteConfirmation", "true");
    }
    mutateDeleteOrder(order.order_id);
    setShowConfirmationDialog(false);
  };

  const isLoading = isUpdatingPayment || isDeletingOrder;

  useEffect(() => {
    const savedChoice = localStorage.getItem("skipDeleteConfirmation");
    if (savedChoice === "true") {
      setRememberChoice(true);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col gap-3 rounded-lg bg-white p-4">
        <div className="grid grid-cols-1 justify-between gap-2 lg:grid-cols-[1fr_auto] lg:gap-0">
          <div className="flex h-full gap-2">
            <Avatar>
              <AvatarFallback>
                {getInitials(order.customer_name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex h-full flex-col justify-between">
              <h1 className="font-bold">{order.customer_name}</h1>
              <div className="flex gap-2 font-label text-xs opacity-40">
                <p>Order #{order.reference_code}</p> / <p>{order.order_type}</p>
              </div>
            </div>
          </div>
          <OrderStatus status={order.order_status} orderId={order.order_id} />
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
            <div className="flex w-full justify-between gap-2">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="h-fit w-full bg-gray-200 py-3 font-semibold text-green-700 hover:bg-gray-300"
                    onClick={handleEditOrder}
                  >
                    Edit Order
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Edit Order #{order.reference_code}
                    </DialogTitle>
                    <DialogDescription>
                      Make changes to the order details here. Click save when
                      you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <EditOrderForm orderData={convertOrderToSubmission(order)} />
                </DialogContent>
              </Dialog>
              <Button
                className="h-fit w-full bg-red-500 py-3 font-semibold text-white hover:bg-red-600"
                onClick={handleVoidOrder}
              >
                Void Order
              </Button>
            </div>
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

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmationDialog}
        onOpenChange={setShowConfirmationDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this order? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center text-xs">
            <input
              type="checkbox"
              id="rememberChoice"
              checked={rememberChoice}
              onChange={(e) => setRememberChoice(e.target.checked)}
            />
            <label htmlFor="rememberChoice" className="ml-2">
              Remember my choice
            </label>
          </div>
          <DialogFooter className="mt-4">
            <Button
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={confirmDelete}
            >
              Confirm Delete
            </Button>
            <Button
              className="ml-4 bg-gray-300 text-black hover:bg-gray-400"
              onClick={() => setShowConfirmationDialog(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderCard;
