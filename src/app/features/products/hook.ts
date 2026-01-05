import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Product } from "./type";
import { AllProducts, getSingleProduct, getSlugCategory, searchProducts } from "./service";

type UseProductsParams = {
  limit: number;
  offset: number;
  minPrice?: number;
  maxPrice?: number;
};

export const useGetAllProducts = ({ limit, offset, minPrice, maxPrice }: UseProductsParams) => {
  return useQuery<Product[], Error>({
    queryKey: ["products", limit, offset, minPrice, maxPrice],
    queryFn: () =>
      AllProducts({
        limit,
        offset,
        minPrice,
        maxPrice,
      }),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetSingleProduct = (id: number) =>
  useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: () => getSingleProduct(id),
    enabled: Number.isFinite(id),
    staleTime: 10 * 60 * 1000,
  });

export const useCategoryBySlug = ({
  slug,
  minPrice,
  maxPrice,
}: {
  slug?: string;
  minPrice?: number;
  maxPrice?: number;
}) =>
  useQuery<Product[], Error>({
    queryKey: ["category", slug, minPrice, maxPrice],
    queryFn: () =>
      getSlugCategory({
        slug,
        minPrice,
        maxPrice,
      }),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: ["products", "search", query],
    queryFn: () => searchProducts(query),
    enabled: query.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
