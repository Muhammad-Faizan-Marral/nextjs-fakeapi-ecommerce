import { categorieSelection } from "./api";
import { Categories } from "./types";

export const getCategories = async (): Promise<Categories[]> => {
  const res = await fetch(categorieSelection.allCategories);
  if (!res.ok) {
    const err = await res.json();
    console.log("API ERROR 👉", err);
    throw new Error(err.message || "User creation failed");
  }
  return res.json();
};
