import { getBeverages } from "@/services/apiBeverage";
import { useQuery } from "@tanstack/react-query";

export function useBeverages() {
  const {
    data: beverages,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["beverages"],
    queryFn: getBeverages,
  });

  return { beverages, isLoading, error };
}
