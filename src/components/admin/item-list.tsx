import AdminMenuItem from "@/components/admin/admin-menu-item";
import { Beverage } from "@/lib/types";
import { useState } from "react";
import SearchInput from "./search-input";

interface ItemListProps {
  beveragesData: Beverage[];
}

const ItemList: React.FC<ItemListProps> = ({ beveragesData }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = beveragesData.filter((beverage) =>
    beverage.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-4 rounded-lg bg-white px-5 py-4">
      <h1 className="font-label text-lg font-bold">Item List</h1>
      <SearchInput onSearch={setSearchQuery} />
      <div className="h-[calc(100vh-16.5rem)] space-y-2 overflow-y-auto">
        {filteredItems.map((beverage, index) => (
          <AdminMenuItem data={beverage} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
