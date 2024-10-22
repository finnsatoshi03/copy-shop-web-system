import { Beverage } from "./types";

export const filterBeverages = (
  beveragesData: Beverage[],
  activeFilter: string,
  subfilters: string[],
  searchQuery: string,
) => {
  return beveragesData.filter((beverage) => {
    // Check if the beverage matches the main category filter
    const matchesMainFilter =
      activeFilter === "" ||
      activeFilter === "All" ||
      beverage.category.toString().toUpperCase() === activeFilter;

    // Check if the beverage matches any of the selected subfilters
    const matchesSubfilter =
      subfilters.length === 0 ||
      subfilters.some((subfilter) =>
        beverage.subCategories?.some(
          (subCategory) =>
            subCategory.toLowerCase() === subfilter.toLowerCase(),
        ),
      );

    // Check if the beverage matches the search query
    const matchesSearchQuery =
      searchQuery === "" ||
      beverage.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beverage.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beverage.subCategories?.some((subCategory) =>
        subCategory.toLowerCase().includes(searchQuery.toLowerCase()),
      ) ||
      beverage.category
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesMainFilter && matchesSubfilter && matchesSearchQuery;
  });
};

// Helper function to clean category names if needed
export const cleanCategory = (category: string): string => {
  // Remove any special characters and standardize the format
  return category
    .replace(/[^\w\s]/gi, "")
    .trim()
    .toUpperCase();
};

// Helper function to get unique categories from beverages data
export const getUniqueCategories = (beveragesData: Beverage[]): string[] => {
  const categories = new Set(
    beveragesData.map((beverage) => beverage.category.toString().toUpperCase()),
  );
  return Array.from(categories);
};

// Helper function to get unique subcategories for a specific category
export const getSubcategoriesForCategory = (
  beveragesData: Beverage[],
  category: string,
): string[] => {
  const subcategories = new Set<string>();

  beveragesData
    .filter(
      (beverage) =>
        category === "All" ||
        beverage.category.toString().toUpperCase() === category,
    )
    .forEach((beverage) => {
      if (Array.isArray(beverage.subCategories)) {
        beverage.subCategories.forEach((subCategory) => {
          subcategories.add(subCategory);
        });
      }
    });

  return Array.from(subcategories);
};

export const getInitials = (name: string): string => {
  const nameParts = name.split(" ");
  if (nameParts.length > 1) {
    return `${nameParts[0][0]}${nameParts[1][0]}`;
  }
  return nameParts[0].substring(0, 2);
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};
