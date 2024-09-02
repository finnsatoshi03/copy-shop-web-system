import { motion, AnimatePresence } from "framer-motion";
import { FilterItem } from "./filter-item";
import { Coffee, Sandwich, UtensilsCrossed } from "lucide-react"; // Import icons from Lucide

const filterVariants = {
  hidden: { opacity: 0, height: 0, overflow: "hidden" },
  visible: {
    opacity: 1,
    height: "auto",
    overflow: "hidden",
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    height: 0,
    overflow: "hidden",
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

interface FiltersProps {
  showFilters: boolean;
  activeFilter: string | null;
  setActiveFilter: (filter: string | null) => void;
}

const filterItems = [
  {
    icon: <UtensilsCrossed size={14} />, // Use Lucide icon components
    label: "All",
    subfilters: [
      "Iced Energy",
      "Hot Coffees",
      "Cold Coffees",
      "Starbucks Refreshers® Beverages",
      "Frappuccino® Blended Beverages",
      "Iced Tea & Lemonade",
      "Hot Teas",
      "Milk, Juice & More",
      "Bottled Beverages",
      "Hot Breakfast",
      "Oatmeal & Yogurt",
      "Bakery",
      "Lunch",
      "Snacks & Sweets",
    ],
  },
  {
    icon: <Coffee size={14} />,
    label: "Coffee",
    subfilters: [
      "Iced Energy",
      "Hot Coffees",
      "Cold Coffees",
      "Starbucks Refreshers® Beverages",
      "Frappuccino® Blended Beverages",
      "Iced Tea & Lemonade",
      "Hot Teas",
      "Milk, Juice & More",
      "Bottled Beverages",
    ],
  },
  {
    icon: <Sandwich size={14} />,
    label: "Food",
    subfilters: [
      "Hot Breakfast",
      "Oatmeal & Yogurt",
      "Bakery",
      "Lunch",
      "Snacks & Sweets",
    ],
  },
];

export default function Filters({
  showFilters,
  activeFilter,
  setActiveFilter,
}: FiltersProps) {
  const handleFilterClick = (label: string) => {
    setActiveFilter(activeFilter === label ? null : label);
  };

  return (
    <div>
      {/* Main Filters */}
      <motion.div
        className="my-2 flex flex-wrap gap-2"
        variants={filterVariants}
        initial="hidden"
        animate={showFilters ? "visible" : "hidden"}
        exit="exit"
      >
        {filterItems.map((item, index) => (
          <FilterItem
            key={index}
            icon={item.icon} // Pass icon as prop
            label={item.label}
            onClick={() => handleFilterClick(item.label)}
            isActive={activeFilter === item.label}
          />
        ))}
      </motion.div>

      {/* Subfilters in a separate row */}
      <AnimatePresence>
        {activeFilter && (
          <motion.div
            className="mt-2 flex flex-wrap gap-2"
            initial={{ opacity: 0, height: 0, overflow: "hidden" }}
            animate={{ opacity: 1, height: "auto", overflow: "hidden" }}
            exit={{ opacity: 0, height: 0, overflow: "hidden" }}
          >
            {filterItems
              .find((item) => item.label === activeFilter)
              ?.subfilters.map((subfilter, subIndex) => (
                <div
                  key={subIndex}
                  className="flex items-center gap-1 rounded-lg border px-3 py-1 text-sm"
                >
                  {subfilter}
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
