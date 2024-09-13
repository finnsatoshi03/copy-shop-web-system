import { useState } from "react";
import { Beverage } from "@/lib/types";
import {
  EllipsisVertical,
  Loader2,
  Trash2,
  XCircle,
  CheckCircle,
} from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import CreateNewItemForm from "@/components/admin-menu/create-new-item-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteBeverage,
  markBeverageAsUnavailable,
  markBeverageAsAvailable,
} from "@/services/apiBeverage";
import toast from "react-hot-toast";

export default function AdminMenuItem({ data }: { data: Beverage }) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: mutateDeleteBeverage, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteBeverage(id),
    onSuccess: () => {
      toast.success("Item deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["beverages"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    },
  });

  const { mutate: mutateMarkUnavailable, isPending: isMarkingUnavailable } =
    useMutation({
      mutationFn: (id: number) => markBeverageAsUnavailable(id),
      onSuccess: () => {
        toast.success("Item marked as unavailable successfully");
        queryClient.invalidateQueries({ queryKey: ["beverages"] });
      },
      onError: (error) => {
        console.error(error);
        toast.error("An error occurred. Please try again later.");
      },
    });

  const { mutate: mutateMarkAvailable, isPending: isMarkingAvailable } =
    useMutation({
      mutationFn: (id: number) => markBeverageAsAvailable(id),
      onSuccess: () => {
        toast.success("Item marked as available successfully");
        queryClient.invalidateQueries({ queryKey: ["beverages"] });
      },
      onError: (error) => {
        console.error(error);
        toast.error("An error occurred. Please try again later.");
      },
    });

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutateDeleteBeverage(data.id);
  };

  const handleMarkUnavailable = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutateMarkUnavailable(data.id);
  };

  const handleMarkAvailable = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutateMarkAvailable(data.id);
  };

  const isLoading = isDeleting || isMarkingUnavailable || isMarkingAvailable;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className={`flex cursor-pointer items-center justify-between pr-4 ${!data.isAvailable && "grayscale"}`}
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
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting..
                    </>
                  ) : (
                    <>
                      <Trash2 size={14} />
                      Delete
                    </>
                  )}
                </Button>
                {data.isAvailable ? (
                  <Button
                    variant="link"
                    className="flex h-fit items-center justify-start gap-2 p-0 text-xs"
                    onClick={handleMarkUnavailable}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Removing on List..
                      </>
                    ) : (
                      <>
                        <XCircle size={14} />
                        Mark Unavailable
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="link"
                    className="flex h-fit items-center justify-start gap-2 p-0 text-xs"
                    onClick={handleMarkAvailable}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding to List..
                      </>
                    ) : (
                      <>
                        <CheckCircle size={14} />
                        Mark Available
                      </>
                    )}
                  </Button>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </DialogTrigger>
      <DialogContent className="w-2/3 sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogDescription>
            Edit the details for this item and click save when you're done
          </DialogDescription>
        </DialogHeader>
        <CreateNewItemForm
          beverageData={data}
          onClose={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
