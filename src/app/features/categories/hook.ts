import { useQuery } from "@tanstack/react-query";
import { getCategories } from "./service";
import { Categories } from "./types";

export const useGetCategories = () => {
  return useQuery<Categories[], Error>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
