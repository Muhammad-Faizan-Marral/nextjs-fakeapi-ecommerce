import { filterProducts } from "./api";

export const filterCategorie = async (category: string) => {
  
  const res = await fetch(
    `${filterProducts.PriceRangewithPagination}/?price_min=${0}&price_max=${1000}&limit=${10}&offset=${0}`,
  );
  if (!res.ok) {
    const err = await res.json();
    console.log("API ERROR 👉", err);
    throw new Error(err.message || "Search By Categorie failed");
  }
  return res.json();
};
