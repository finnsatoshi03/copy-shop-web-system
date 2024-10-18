import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import Confetti from "react-confetti";
import { Check, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartProvider";

interface ThanksDialogProps {
  open: boolean;
  onClose: () => void;
}

const ThanksDialog: React.FC<ThanksDialogProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        clearCart();
        navigate("/");
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [open, navigate, onClose, clearCart]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[300px] md:w-[450px]">
        {open && (
          <Confetti numberOfPieces={300} recycle={false} className="w-full" />
        )}
        <DialogHeader className="items-center">
          <Check className="mb-1 size-10 rounded-full bg-green-500 p-2 text-white md:mb-2" />
          <DialogTitle>Thank You!</DialogTitle>
          <DialogDescription className="items-center text-center">
            <p>Thank you for using CopyShop!</p>
            <p>
              We appreciate your business and hope you had a great experience.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex w-full items-center justify-center gap-2 text-xs leading-none opacity-50">
            <Loader2 className="animate-spin" size={14} />
            <p>Redirecting in 5 seconds...</p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ThanksDialog;
