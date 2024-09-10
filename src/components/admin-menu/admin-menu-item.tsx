import { useState } from "react";
import { Beverage } from "@/lib/types";
import CreateNewItemDialog from "@/components/admin-menu/create-new-dialog";

export default function AdminMenuItem({ data }: { data: Beverage }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex cursor-pointer gap-2" onClick={() => setIsOpen(true)}>
      <img src={data.image} className="size-16 rounded-md" />
      <div>
        <h1 className="line-clamp-1 max-w-xl font-bold leading-none">
          {data.name}
        </h1>
        <p className="line-clamp-2 max-w-xl text-sm opacity-60">
          {data.description}
        </p>
      </div>

      <CreateNewItemDialog
        beverageData={data}
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </div>
  );
}
