import { motion, AnimatePresence } from "framer-motion";
import { FilterItem } from "./filter-item";
import { Coffee, Sandwich, UtensilsCrossed } from "lucide-react";

const filterContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const filterItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const subfilterVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

interface FiltersProps {
  showFilters: boolean;
  activeFilter: string | null;
  setActiveFilter: (filter: string | null) => void;
}

const filterItems = [
  {
    icon: <UtensilsCrossed size={14} />,
    label: "All",
    subfilters: [
      "Electric Elixirs",
      "Brewed Brilliance",
      "Chill-Out Classics",
      "Refreshed Revivals",
      "Frosted Fusions",
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
      "Electric Elixirs",
      "Brewed Brilliance",
      "Chill-Out Classics",
      "Refreshed Revivals",
      "Frosted Fusions",
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
        variants={filterContainerVariants}
        initial="hidden"
        animate={showFilters ? "visible" : "hidden"}
        exit="exit"
      >
        {filterItems.map((item, index) => (
          <motion.div key={index} variants={filterItemVariants}>
            <FilterItem
              icon={item.icon} // Pass icon as prop
              label={item.label}
              onClick={() => handleFilterClick(item.label)}
              isActive={activeFilter === item.label}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Subfilters in a separate row */}
      <AnimatePresence>
        {activeFilter && (
          <motion.div
            className="my-2 flex flex-wrap gap-2"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={filterContainerVariants}
          >
            {filterItems
              .find((item) => item.label === activeFilter)
              ?.subfilters.map((subfilter, subIndex) => (
                <motion.div key={subIndex} variants={subfilterVariants}>
                  <div className="flex items-center gap-1 rounded-lg border px-3 py-1 text-sm">
                    {subfilter}
                  </div>
                </motion.div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
