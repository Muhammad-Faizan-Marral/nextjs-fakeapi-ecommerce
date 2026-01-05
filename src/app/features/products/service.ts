import { Products } from "./api";
import { Product, ProductQueryParams } from "./type";

export const AllProducts = async ({ limit, offset, minPrice, maxPrice }: ProductQueryParams): Promise<Product[]> => {
  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });

  if (minPrice !== undefined) params.append("price_min", String(minPrice));
  if (maxPrice !== undefined) params.append("price_max", String(maxPrice));

  const res = await fetch(`${Products.allProducts}?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Fetching products failed");
  }

  return res.json();
};

export const getSingleProduct = async (id?: number): Promise<Product> => {
  const res = await fetch(`${Products.allProducts}/${id}`);
  if (!res.ok) {
    const err = await res.json();
    console.log("API ERROR 👉", err);
    throw new Error(err.message || "Fetching Producd failed");
  }
  return res.json();
};

export const getSlugCategory = async ({
  slug,
  minPrice,
  maxPrice,
}: {
  slug?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<Product[]> => {
  if (!slug) return [];

  const params = new URLSearchParams({
    categorySlug: slug,
  });

  if (minPrice !== undefined) params.append("price_min", String(minPrice));
  if (maxPrice !== undefined) params.append("price_max", String(maxPrice));

  const res = await fetch(`${Products.allProducts}?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Fetching category products failed");
  }

  return res.json();
};

export const searchProducts = async (query: string) => {
  if (!query.trim()) return [];

  const res = await fetch(`${Products.allProducts}/?title=${encodeURIComponent(query)}`);

  if (!res.ok) throw new Error("Search failed");

  return res.json();
};
