import { useQuery } from "@tanstack/react-query";
import { filterCategorie } from "./service";

export const useFilterProduct = (category: string) => {
  return useQuery({
    queryKey: ["filterProduct"],
    queryFn: () => filterCategorie(category),
  });
};
