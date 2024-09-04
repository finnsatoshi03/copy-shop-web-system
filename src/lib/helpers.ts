export const filterBeverages = (
  beveragesData: any[],
  activeFilter: string,
  subfilters: string[],
  searchQuery: string,
) => {
  return beveragesData.filter((beverage) => {
    const matchesMainFilter =
      activeFilter === "All" ||
      (activeFilter === "Coffee" && beverage.category.includes("coffee")) ||
      (activeFilter === "Food" && beverage.category.includes("Food"));

    const matchesSubfilter =
      subfilters.length === 0 ||
      subfilters.some((subfilter) => beverage.category.includes(subfilter));

    const matchesSearchQuery =
      beverage.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beverage.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesMainFilter && matchesSubfilter && matchesSearchQuery;
  });
};
