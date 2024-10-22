import { motion, AnimatePresence } from "framer-motion";
import { FilterItem } from "./filter-item";
import { Coffee, UtensilsCrossed } from "lucide-react";
import { Beverage } from "@/lib/types";

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
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  subfilters: string[];
  setSubfilters: React.Dispatch<React.SetStateAction<string[]>>;
  beveragesData: Beverage[];
}

interface CategoryData {
  icon: JSX.Element;
  label: string;
  subfilters: string[];
}

const getCategoryIcon = (category: string) => {
  switch (category.toUpperCase()) {
    case "BEVERAGE":
      return <Coffee size={14} />;
    default:
      return <UtensilsCrossed size={14} />;
  }
};

export default function Filters({
  showFilters,
  activeFilter,
  setActiveFilter,
  subfilters,
  setSubfilters,
  beveragesData,
}: FiltersProps) {
  // Generate dynamic filter items based on beveragesData
  const generateFilterItems = (): CategoryData[] => {
    // Create "All" category first
    const allSubCategories = new Set<string>();
    beveragesData.forEach((beverage) => {
      if (Array.isArray(beverage.subCategories)) {
        beverage.subCategories.forEach((subCategory) => {
          allSubCategories.add(subCategory);
        });
      }
    });

    const filterItems: CategoryData[] = [
      {
        icon: <UtensilsCrossed size={14} />,
        label: "All",
        subfilters: Array.from(allSubCategories),
      },
    ];

    // Get unique categories
    const categories = new Set(
      beveragesData.map((beverage) =>
        beverage.category.toString().toUpperCase(),
      ),
    );

    // For each category, collect its subcategories
    categories.forEach((category) => {
      const categorySubfilters = new Set<string>();

      beveragesData
        .filter(
          (beverage) => beverage.category.toString().toUpperCase() === category,
        )
        .forEach((beverage) => {
          if (Array.isArray(beverage.subCategories)) {
            beverage.subCategories.forEach((subCategory) => {
              categorySubfilters.add(subCategory);
            });
          }
        });

      filterItems.push({
        icon: getCategoryIcon(category),
        label: category,
        subfilters: Array.from(categorySubfilters),
      });
    });

    return filterItems;
  };

  const filterItems = generateFilterItems();

  const handleFilterClick = (label: string) => {
    setSubfilters([]);
    setActiveFilter(activeFilter === label ? "" : label);
  };

  const handleSubfilterClick = (subfilter: string) => {
    setSubfilters((prevSubfilters: string[]) => {
      if (prevSubfilters.includes(subfilter)) {
        return prevSubfilters.filter((s) => s !== subfilter);
      } else {
        return [...prevSubfilters, subfilter];
      }
    });
  };

  return (
    <div>
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
              icon={item.icon}
              label={item.label}
              onClick={() => handleFilterClick(item.label)}
              isActive={activeFilter === item.label}
            />
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {activeFilter && activeFilter !== "" && (
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
                <motion.div
                  key={subIndex}
                  variants={subfilterVariants}
                  onClick={() => handleSubfilterClick(subfilter)}
                  className={`flex cursor-pointer items-center gap-1 rounded-lg border px-3 py-1 text-sm ${
                    subfilters.includes(subfilter)
                      ? "bg-zinc-600 text-white"
                      : "bg-white"
                  }`}
                >
                  {subfilter}
                </motion.div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
