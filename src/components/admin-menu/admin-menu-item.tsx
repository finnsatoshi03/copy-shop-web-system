import { useState } from "react";
import { Beverage } from "@/lib/types";
import CreateNewItemDialog from "@/components/admin-menu/create-new-dialog";
import { EllipsisVertical, Trash2, XCircle } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function AdminMenuItem({ data }: { data: Beverage }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log(`Deleting item: ${data.name}`);
  };

  const handleMarkUnavailable = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log(`Marking as unavailable: ${data.name}`);
  };

  const handleDialogClose = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <div
      className="flex cursor-pointer items-center justify-between pr-2"
      onClick={() => setIsOpen(true)}
    >
      <div className="flex gap-2">
        <img src={data.beverageImg} className="size-16 rounded-md" />
        <div>
          <h1 className="line-clamp-1 max-w-xl font-bold leading-none">
            {data.name}
          </h1>
          <p className="line-clamp-2 max-w-xl text-sm opacity-60">
            {data.description}
          </p>
        </div>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <EllipsisVertical
            size={16}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </PopoverTrigger>
        <PopoverContent className="w-fit" side="left">
          <div className="flex flex-col gap-2">
            <Button
              variant="link"
              className="flex h-fit items-center justify-start gap-2 p-0 text-xs text-red-600"
              onClick={handleDelete}
            >
              <Trash2 size={14} />
              Delete
            </Button>
            <Button
              variant="link"
              className="flex h-fit items-center justify-start gap-2 p-0 text-xs"
              onClick={handleMarkUnavailable}
            >
              <XCircle size={14} />
              Mark Unavailable
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <CreateNewItemDialog
        beverageData={data}
        open={isOpen}
        onOpenChange={handleDialogClose}
      />
    </div>
  );
}
