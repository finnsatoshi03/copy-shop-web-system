import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { HandCoins } from "lucide-react";

interface TipDialogProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onSelectTip: (tip: number) => void;
}

interface Tip {
  percentage?: number;
  label: string;
}

const TipButton = ({
  tip,
  onSelectTip,
}: {
  tip: Tip;
  onSelectTip: (tip: number) => void;
}) => (
  <Button
    className={`flex flex-col items-center py-6 ${
      tip.percentage === undefined ? "col-span-2" : ""
    }`}
    onClick={() => onSelectTip(tip.percentage || 0)}
  >
    <span className="flex items-center gap-1">
      {tip.percentage !== undefined && (
        <>
          <HandCoins size={12} className="rotate-45" />
          {tip.percentage}%
        </>
      )}
    </span>
    <span className="flex items-center text-xs">
      {tip.label}{" "}
      <span className="text-base">
        {tip.label.toLowerCase() === "no tip" && "☹️"}
      </span>
    </span>
  </Button>
);

export default function TipDialog({
  open,
  onOpenChange,
  onSelectTip,
}: TipDialogProps) {
  const tips: Tip[] = [
    { percentage: 15, label: "Good" },
    { percentage: 18, label: "Great" },
    { percentage: 20, label: "Wow" },
    { percentage: 30, label: "Best Service Ever!" },
    { label: "No Tip" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[400px]">
        <DialogHeader className="items-center">
          <DialogTitle className="text-xl font-extrabold">
            Leave a Tip?
          </DialogTitle>
          <DialogDescription className="text-center text-xs">
            Choose a tip option for the customer from the available options
            below. These tips have been thoughtfully provided by our developers
            to enhance your shopping experience.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2">
          {tips.map((tip) => (
            <TipButton key={tip.label} tip={tip} onSelectTip={onSelectTip} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
