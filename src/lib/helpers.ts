import { Beverage } from "./types";

export const filterBeverages = (
  beveragesData: Beverage[],
  activeFilter: string,
  subfilters: string[],
  searchQuery: string,
) => {
  return beveragesData.filter((beverage) => {
    const matchesMainFilter =
      activeFilter === "All" ||
      (activeFilter === "Coffee" &&
        beverage.category.some((cat) =>
          cat.toLowerCase().includes("coffee"),
        )) ||
      (activeFilter === "Food" &&
        beverage.category.some((cat) => cat.toLowerCase().includes("food")));

    const matchesSubfilter =
      subfilters.length === 0 ||
      subfilters.some((subfilter) =>
        beverage.category.some((cat) =>
          cat.toLowerCase().includes(subfilter.toLowerCase()),
        ),
      );

    const matchesSearchQuery =
      searchQuery === "" ||
      beverage.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beverage.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beverage.category.some((cat) =>
        cat.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return matchesMainFilter && matchesSubfilter && matchesSearchQuery;
  });
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
