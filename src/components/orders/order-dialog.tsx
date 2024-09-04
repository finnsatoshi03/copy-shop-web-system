/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";

export function OrderDialog({
  isOpen,
  onClose,
  orderDetails,
}: {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: any;
}) {
  // Initialize selectedSize outside of any conditions
  const [selectedSize, setSelectedSize] = useState<string>("small");

  useEffect(() => {
    // Set default size only when the dialog is opened and orderDetails are available
    if (isOpen && orderDetails) {
      setSelectedSize(orderDetails.price?.small ? "small" : "medium");
    }
  }, [isOpen, orderDetails]);

  if (!orderDetails) return null;

  const sizes: { [key: string]: string } = {
    small: "S",
    medium: "M",
    large: "L",
  };

  const handleSizeSelect = (sizeKey: string) => {
    if (orderDetails.price?.[sizeKey]) {
      setSelectedSize(sizeKey);
    }
  };

  const sizeButtons = Object.keys(sizes).map((sizeKey) => {
    const isAvailable = orderDetails.price?.[sizeKey];
    const isSelected = selectedSize === sizeKey;

    return (
      <button
        key={sizeKey}
        onClick={() => handleSizeSelect(sizeKey)}
        disabled={!isAvailable}
        className={`rounded-lg px-5 py-3 font-label text-sm font-bold ${
          isAvailable
            ? isSelected
              ? "bg-yellow-500 text-white"
              : "bg-yellow-100 text-black"
            : "cursor-not-allowed bg-gray-100 text-gray-400 opacity-50"
        }`}
      >
        {sizes[sizeKey]}
      </button>
    );
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden">
        <div className="-mx-[1.6rem] -mt-8">
          <div className="relative h-2/3">
            <img
              src={orderDetails.image}
              className="h-full w-full object-cover"
              alt={orderDetails.name}
              style={{
                objectPosition: "50% 25%",
              }}
            />
            <div className="absolute -bottom-4 right-4 inline-flex items-center gap-1 rounded-full bg-yellow-500 px-2 py-2 font-label text-sm">
              <Minus size={16} />
              <p className="font-bold">#</p>
              <Plus size={16} />
            </div>
          </div>
          <div className="mt-8 px-8">
            <h1 className="w-2/3 font-label text-xl font-bold">
              {orderDetails.name}
            </h1>
            <p className="font-label text-xs opacity-60">
              {orderDetails.description}
            </p>
            <h2 className="mt-4 font-label font-bold">Sizes for you</h2>
            <div className="mt-1 flex items-center gap-2">{sizeButtons}</div>
            <div className="mt-4 text-lg font-bold">
              {orderDetails.price?.[selectedSize]
                ? `$${orderDetails.price[selectedSize]}`
                : "N/A"}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
