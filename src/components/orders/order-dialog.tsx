import { useState, useEffect } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Beverage } from "@/lib/types";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

export function OrderDialog({
  isOpen,
  onClose,
  orderDetails,
}: {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: Beverage;
}) {
  const [selectedSize, setSelectedSize] = useState<string>("small");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSugarLevel, setSelectedSugarLevel] = useState<number>(0); // Default to 100%

  useEffect(() => {
    if (isOpen && orderDetails) {
      setSelectedSize(orderDetails.price?.small ? "small" : "medium");
      setQuantity(1);
      setSelectedSugarLevel(0);
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

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  const handleSugarLevelChange = (value: number[]) => {
    setSelectedSugarLevel(value[0]);
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
      <DialogContent className="overflow-y-auto overflow-x-hidden">
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
              <button onClick={decrementQuantity}>
                <Minus size={16} />
              </button>
              <p className="font-bold">{quantity}</p>
              <button onClick={incrementQuantity}>
                <Plus size={16} />
              </button>
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

            <h2 className="mt-4 font-label font-bold">Sugar Level</h2>
            <div className="mt-1 flex flex-col">
              <Slider
                defaultValue={[0]}
                max={100}
                min={0}
                step={25}
                value={[selectedSugarLevel]}
                onValueChange={handleSugarLevelChange}
                // formatLabel={(value) => `${value}%`}
              />
              <div className="mt-2 flex justify-between text-xs font-bold">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
          <div className="mb-4 mt-6 flex w-full justify-between px-8">
            <div className="flex flex-col justify-between">
              <h2 className="text-xs font-medium opacity-60">Total Price:</h2>
              <p className="flex items-end gap-1 text-2xl font-bold">
                {orderDetails.price?.[selectedSize] ? (
                  <>
                    <span className="text-base text-yellow-500">₱</span>
                    {(orderDetails.price[selectedSize] * quantity).toFixed(2)}
                  </>
                ) : (
                  "N/A"
                )}
              </p>
            </div>
            <Button className="flex gap-2 rounded-full rounded-tl-none p-6">
              <ShoppingCart size={16} fill="white" />
              Add to cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
