/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Beverage } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createBeverage,
  updateBeverage,
  uploadBeverageImage,
} from "@/services/apiBeverage";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  price: z.number().optional(),
  beverageImg: z
    .string()
    .nullable()
    .refine(
      (value) =>
        value === null ||
        value === "" ||
        z.string().url().safeParse(value).success ||
        z.string().min(1).safeParse(value).success,
      { message: "Invalid image value." },
    ),
  category: z.array(
    z.string().min(1, { message: "At least one category is required." }),
  ),
  isSmallAvailable: z.boolean().default(false),
  isMediumAvailable: z.boolean().default(false),
  isLargeAvailable: z.boolean().default(false),
  smallSize: z.number().optional(),
  mediumSize: z.number().optional(),
  largeSize: z.number().optional(),
  hasCalories: z.boolean().default(false),
  calories: z.number().optional(),
  noSugar: z.boolean().default(false),
});

type FormSchema = z.infer<typeof formSchema>;

interface CreateNewItemFormProps {
  beverageData?: Beverage;
  onClose?: () => void;
}

const CreateNewItemForm: React.FC<CreateNewItemFormProps> = ({
  beverageData,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const [isEditMode] = useState(!!beverageData);
  const [imagePreview, setImagePreview] = useState<string | null>(
    beverageData?.beverageImg || null,
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: beverageData
      ? {
          name: beverageData.name,
          description: beverageData.description,
          price:
            beverageData.price.medium ||
            beverageData.price.small ||
            beverageData.price.large,
          beverageImg: beverageData.beverageImg,
          category: beverageData.category,
          isSmallAvailable: !!beverageData.price.small,
          isMediumAvailable: !!beverageData.price.medium,
          isLargeAvailable: !!beverageData.price.large,
          smallSize: beverageData.price.small || undefined,
          mediumSize: beverageData.price.medium || undefined,
          largeSize: beverageData.price.large || undefined,
          hasCalories: !!beverageData.calories,
          calories:
            typeof beverageData.calories === "number"
              ? beverageData.calories
              : beverageData.calories?.medium ||
                beverageData.calories?.small ||
                beverageData.calories?.large,
          noSugar: beverageData.sugarLevel?.[0] === 0,
        }
      : {
          name: "",
          description: "",
          price: 0,
          beverageImg: "",
          category: [""],
          isSmallAvailable: false,
          isMediumAvailable: false,
          isLargeAvailable: false,
          hasCalories: false,
          noSugar: false,
        },
  });

  // const handleImageHolderClick = () => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //   }
  // };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("beverageImg", file);

      mutateUploadImage(formData, {
        onSuccess: (response: { imageUrl: string }) => {
          const imageUrl = response.imageUrl;

          if (imageUrl) {
            form.setValue("beverageImg", imageUrl);
            setImagePreview(imageUrl);
          }
        },
        onError: (error) => {
          toast.error("Image upload failed. Please try again.");
          console.error("Image upload failed:", error);
        },
      });
    }
  };

  const { mutate: mutateCreateBeverage, isPending: isCreating } = useMutation({
    mutationFn: (beverage: Partial<Beverage>) => createBeverage(beverage),
    onSuccess: () => {
      toast.success("Beverage created successfully!");
      queryClient.invalidateQueries({ queryKey: ["beverages"] });
      form.reset();
      setImagePreview(null);
      onClose?.();
    },
    onError: (error) => {
      console.error("Beverage creation failed:", error);
      toast.error("Beverage creation failed. Please try again.");
    },
  });

  const { mutate: mutateEditBeverage, isPending: isEditing } = useMutation({
    mutationFn: ({ id, beverage }: { id: number; beverage: Beverage }) => {
      if (beverageData) {
        return updateBeverage(id, beverage);
      }
      throw new Error("Beverage data is undefined");
    },
    onSuccess: () => {
      toast.success("Beverage edited successfully!");
      queryClient.invalidateQueries({ queryKey: ["beverages"] });
      onClose?.();
    },
    onError: (error) => {
      console.error("Beverage edit failed:", error);
      toast.error("Beverage edit failed. Please try again.");
    },
  });

  const { mutate: mutateUploadImage, isPending: isUploading } = useMutation({
    mutationFn: (formData: FormData) => uploadBeverageImage(formData),
    onSuccess: () => {
      toast.success("Image uploaded successfully!");
    },
    onError: () => {
      toast.error("Image upload failed. Please try again.");
    },
  });

  const onSubmit = (data: FormSchema) => {
    const eitherSizeAvailable =
      data.isSmallAvailable || data.isMediumAvailable || data.isLargeAvailable;
    if (!eitherSizeAvailable) form.resetField("price");

    const finalData = {
      name: data.name,
      description: data.description,
      price: {
        small: data.isSmallAvailable ? data.smallSize : 0,
        medium: data.isMediumAvailable ? data.mediumSize : data.price || 0,
        large: data.isLargeAvailable ? data.largeSize : 0,
      },
      calories: data.hasCalories
        ? {
            small: data.isSmallAvailable ? data.calories : 0,
            medium: data.isMediumAvailable ? data.calories : 0,
            large: data.isLargeAvailable ? data.calories : 0,
          }
        : 0,
      beverageImg: data.beverageImg || "",
      category: data.category,
      sugarLevel: data.noSugar ? [0] : [0, 25, 50, 75, 100],
      isPopular: beverageData?.isPopular || false,
      isFeatured: beverageData?.isFeatured || false,
      isAvailable: true,
    };

    // Ensure at least one size is available and set price/calories
    if (
      !data.isSmallAvailable &&
      !data.isMediumAvailable &&
      !data.isLargeAvailable
    ) {
      finalData.price.medium = data.price;
      if (data.hasCalories && typeof finalData.calories !== "number") {
        if (finalData.calories) {
          finalData.calories.medium = data.calories;
        }
      }
    }

    // Remove undefined values
    (
      Object.keys(finalData.price) as Array<keyof typeof finalData.price>
    ).forEach(
      (key) =>
        finalData.price[key] === undefined && delete finalData.price[key],
    );
    if (finalData.calories) {
      (
        Object.keys(finalData.calories) as Array<
          keyof typeof finalData.calories
        >
      ).forEach(
        (key) =>
          finalData.calories &&
          finalData.calories[key] === undefined &&
          delete finalData.calories[key],
      );
    }

    if (isEditMode) {
      // console.log(finalData);
      mutateEditBeverage({
        id: beverageData!.id,
        beverage: { ...finalData, id: beverageData!.id },
      });
    } else {
      // console.log(finalData);
      mutateCreateBeverage(finalData);
    }
  };

  const [hasChanges, setHasChanges] = useState(false);
  const watchedValues = useWatch({ control: form.control });

  const filterRelevantFields = (data: any) => {
    const { name, description, price, calories, beverageImg, category } = data;
    return { name, description, price, calories, beverageImg, category };
  };

  useEffect(() => {
    if (beverageData) {
      const filteredDefaultValues = filterRelevantFields(beverageData);
      const formValues = { ...watchedValues };

      const isDifferent =
        JSON.stringify(filteredDefaultValues) !== JSON.stringify(formValues);
      setHasChanges(isDifferent);
    }
  }, [watchedValues, beverageData]);

  const isLoading = isCreating || isEditing || isUploading;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="grid grid-cols-2 gap-4 space-y-4 md:grid-cols-3"
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
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer"
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview || "images/placeholder.jpg"}
                          alt="Preview"
                          className="h-32 w-32 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-32 w-32 items-center justify-center rounded-full border border-dashed border-gray-300">
                          <span className="text-gray-500">Upload image</span>
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
            {!(
              form.watch("isSmallAvailable") ||
              form.watch("isMediumAvailable") ||
              form.watch("isLargeAvailable")
            ) && (
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="4.5"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="mt-4 space-y-2">
              <FormField
                control={form.control}
                name="isSmallAvailable"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Small Size Available</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isMediumAvailable"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Medium Size Available</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isLargeAvailable"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Large Size Available</FormLabel>
                  </FormItem>
                )}
              />
            </div>
            {/* Conditional Size Inputs */}
            {form.watch("isSmallAvailable") && (
              <FormField
                control={form.control}
                name="smallSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Small Size (oz)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="8"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {form.watch("isMediumAvailable") && (
              <FormField
                control={form.control}
                name="mediumSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medium Size (oz)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="12"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {form.watch("isLargeAvailable") && (
              <FormField
                control={form.control}
                name="largeSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Large Size (oz)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="16"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>

        {/* Calories Fields */}
        <div>
          <FormField
            control={form.control}
            name="noSugar"
            render={({ field }) => (
              <FormItem className="mb-2 flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>No Sugar</FormLabel>
              </FormItem>
            )}
          />

          {/* Calories Checkbox and Input */}
          <FormField
            control={form.control}
            name="hasCalories"
            render={({ field }) => (
              <FormItem className="mb-4 flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Has Calories Information</FormLabel>
              </FormItem>
            )}
          />

          {form.watch("hasCalories") && (
            <FormField
              control={form.control}
              name="calories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Calories</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="200"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
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
          <div className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button
              type="submit"
              disabled={(beverageData && !hasChanges) || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditMode ? "Editing.." : "Saving.."}
                </>
              ) : isEditMode ? (
                "Edit Item"
              ) : (
                "Save Item"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateNewItemForm;
