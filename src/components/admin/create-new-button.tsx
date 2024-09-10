import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const CreateNewItemButton: React.FC = () => (
  <Button className="flex h-fit w-full items-center gap-2 bg-yellow-500 py-3 uppercase text-black hover:bg-yellow-300">
    <Plus size={20} />
    Create New Item
  </Button>
);

export default CreateNewItemButton;
