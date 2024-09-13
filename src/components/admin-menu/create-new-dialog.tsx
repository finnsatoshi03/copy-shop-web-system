import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "../ui/label";
import { Beverage } from "@/lib/types";
import { Loader2, Plus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBeverage } from "@/services/apiBeverage";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  price: z.object({
    small: z.number().positive({ message: "Price must be a positive number." }),
    medium: z.number().positive(),
    large: z.number().positive(),
  }),
  calories: z.object({
    small: z.number().positive(),
    medium: z.number().positive(),
    large: z.number().positive(),
  }),
  beverageImg: z
    .string()
    .nullable()
    .refine(
      (value) =>
        value === null ||
        value === "" ||
        z.string().url().safeParse(value).success,
      { message: "Invalid image URL." },
    ),
  category: z.array(
    z.string().min(1, { message: "At least one category is required." }),
  ),
});

type FormSchema = z.infer<typeof formSchema>;

interface CreateNewItemDialogProps {
  beverageData?: Beverage;
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const CreateNewItemDialog: React.FC<CreateNewItemDialogProps> = ({
  beverageData,
  open,
  onOpenChange,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(open || false);
  useEffect(() => {
    if (open !== undefined) {
      setIsDialogOpen(open);
    }
  }, [open]);

  const closeDialog = () => {
    setIsDialogOpen(false);
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: beverageData
      ? {
          name: beverageData.name,
          description: beverageData.description,
          price: beverageData.price,
          calories: beverageData.calories,
          beverageImg: beverageData.beverageImg,
          category: beverageData.category,
        }
      : {
          name: "",
          description: "",
          price: { small: 0, medium: 0, large: 0 },
          calories: { small: 0, medium: 0, large: 0 },
          beverageImg: "",
          category: [""],
        },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(
    beverageData?.beverageImg || null,
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageHolderClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        form.setValue("beverageImg", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const { mutate: mutateCreateBeverage, isPending: isCreating } = useMutation({
    mutationFn: (beverage: Partial<Beverage>) => createBeverage(beverage),
    onSuccess: () => {
      toast.success("Beverage created successfully!");
      form.reset();
      closeDialog();
    },
    onError: (error) => {
      console.error("Beverage creation failed:", error);
      toast.error("Beverage creation failed. Please try again.");
    },
  });

  const onSubmit = (data: FormSchema) => {
    const finalData = {
      ...data,
      beverageImg: data.beverageImg || "",
      sugarLevel: beverageData?.sugarLevel || [0, 25, 50, 75, 100],
      isPopular: beverageData?.isPopular || false,
      isFeatured: beverageData?.isFeatured || false,
    };

    if (beverageData) {
      console.log("Editing Item:", finalData);
      // mutateCreateBeverage({ ...beverageData, ...finalData });
    } else {
      // console.log("Creating New Item:", finalData);
      mutateCreateBeverage(finalData);
    }
  };

  const isLoading = isCreating;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {!beverageData && (
        <DialogTrigger asChild>
          <Button className="flex h-fit w-full items-center gap-2 bg-yellow-500 py-3 uppercase text-black hover:bg-yellow-400">
            <Plus size={20} />
            Create New Item
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="w-2/3 sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {beverageData ? "Edit Item" : "Create New Item"}
          </DialogTitle>
          <DialogDescription>
            {beverageData
              ? "Edit the details for this item and click save when you're done."
              : "Fill in the details for the new item and click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4 space-y-4"
          >
            <div>
              {/* Image Upload */}
              <FormField
                control={form.control}
                name="beverageImg"
                render={() => (
                  <FormItem>
                    <FormLabel>Beverage Image</FormLabel>
                    <FormControl>
                      <div className="flex flex-col">
                        <div
                          onClick={handleImageHolderClick}
                          className="cursor-pointer"
                        >
                          {imagePreview ? (
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="h-32 w-32 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-32 w-32 items-center justify-center rounded-full border border-dashed border-gray-300">
                              <span className="text-gray-500">
                                Upload image
                              </span>
                            </div>
                          )}
                        </div>

                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          ref={fileInputRef}
                          className="hidden"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Chai Tea Latte" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A spicy blend of chai tea and steamed milk..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              {/* Price Fields */}
              <div>
                <Label className="leading-none">Price</Label>
                <div className="grid grid-cols-3 gap-2">
                  <FormField
                    control={form.control}
                    name="price.small"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs leading-none">
                          Small
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="4.5"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price.medium"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs leading-none">
                          Medium
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="5.0"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price.large"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs leading-none">
                          Large
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="5.5"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Calories Fields */}
              <div>
                <Label className="leading-none">Calories</Label>
                <div className="grid grid-cols-3 gap-2">
                  <FormField
                    control={form.control}
                    name="calories.small"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs leading-none">
                          Small
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="180"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="calories.medium"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs leading-none">
                          Medium
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="220"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="calories.large"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs leading-none">
                          Large
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="260"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Specialty Teas"
                        {...field}
                        onChange={(e) => field.onChange([e.target.value])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-4">
                <Button type="submit">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {beverageData ? "Editing.." : "Saving.."}
                    </>
                  ) : beverageData ? (
                    "Edit Item"
                  ) : (
                    "Save Item"
                  )}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewItemDialog;
