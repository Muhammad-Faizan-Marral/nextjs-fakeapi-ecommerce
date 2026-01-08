"use client";

import { FilteredPrice } from "@/app/(public)/categorie/[categorie]/page";
import Button from "@/app/components/ui/Button";
import { addToCart } from "@/app/features/cart/slice";
import { Product } from "@/app/features/products/type";
import { useGetAllProducts, useCategoryBySlug } from "@/app/features/products/hook";
import { toggleLike } from "@/app/features/wishlist/wishlistSlice";
import { RootState } from "@/app/lib/redux/store";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaStar, FaRegEye, FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Bounce, toast, ToastContainer } from "react-toastify";

export interface ShowButton {
  showButton?: boolean;
  onlyWishlist?: boolean;
  categorySlug?: string;
  priceFilter?: FilteredPrice;
  searchResults?: Product[];
}

const ProductList = ({
  showButton = false,
  onlyWishlist = false,
  categorySlug,
  priceFilter,
  searchResults,
}: ShowButton) => {
  const dispatch = useDispatch();

  const { cartsByUserId, activeUserId } = useSelector((state: RootState) => state.cart);
  const likedByUserId = useSelector((state: RootState) => state.wishlist.likedByUserId);

  const likedIds = useMemo<number[]>(() => {
    if (!activeUserId) return [];
    return likedByUserId?.[activeUserId] ?? [];
  }, [activeUserId, likedByUserId]);

  const [limit, setLimit] = useState(16);
  const {
    data: allProducts,
    isLoading: allLoading,
    error: allError,
    isPlaceholderData,
  } = useGetAllProducts({ limit, offset: 0 });

  const {
    data: categoryProducts,
    isLoading: categoryLoading,
    error: categoryError,
  } = useCategoryBySlug({
    slug: categorySlug,
    minPrice: priceFilter?.minPrice,
    maxPrice: priceFilter?.maxPrice,
  });

  const productsSource: Product[] = useMemo(() => {
    if (searchResults) return searchResults;

    return categorySlug ? (categoryProducts ?? []) : (allProducts ?? []);
  }, [searchResults, categorySlug, categoryProducts, allProducts]);

  /* ---------------- FILTERED PRODUCTS ---------------- */
  const filteredProducts = useMemo(() => {
    if (!onlyWishlist) return productsSource;
    return productsSource.filter((item) => likedIds.includes(item.id));
  }, [productsSource, onlyWishlist, likedIds]);

  const isLoading = categorySlug ? categoryLoading : allLoading;
  const isError = categorySlug ? categoryError : allError;

  /* ---------------- LOADING STATE ---------------- */
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  /* ---------------- ERROR STATE ---------------- */
  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-center text-red-500">Error loading products. Please try again.</p>
      </div>
    );
  }

  /* ---------------- EMPTY STATE ---------------- */
  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
        <FaHeart className="text-gray-600 text-6xl" />
        <p className="text-center text-gray-400 text-lg">
          {onlyWishlist ? "No items in your wishlist yet" : "No products found"}
        </p>
        {onlyWishlist && (
          <Link href="/">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
              Browse Products
            </button>
          </Link>
        )}
      </div>
    );
  }

  /* ---------------- HANDLERS ---------------- */
  const handleWishlist = (productId: number) => {
    if (!activeUserId) {
      toast.error("Please login first");
      return;
    }

    dispatch(toggleLike({ userId: activeUserId, productId }));

    const isCurrentlyLiked = likedIds.includes(productId);
    toast.success(isCurrentlyLiked ? "Removed from wishlist" : "Added to wishlist", {
      transition: Bounce,
    });
  };

  const handleAddToCart = (item: Product) => {
    if (!activeUserId) {
      toast.error("Please login first");
      return;
    }

    const exists = cartsByUserId[activeUserId]?.some((cart) => cart.id === item.id);

    if (exists) {
      toast.info("Already in cart");
      return;
    }

    dispatch(addToCart(item));
    toast.success("Added to cart", {
      transition: Bounce,
    });
  };

  return (
    <>
      <ToastContainer theme="dark" transition={Bounce} position="top-right" autoClose={2000} />

      <div className="flex flex-wrap justify-center gap-4 p-4">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="group bg-[#121212] border border-gray-800 rounded-xl p-4
            transition-all duration-300 hover:scale-[1.04]
            hover:border-purple-500 hover:shadow-[0_0_15px_#9b5de5]
            cursor-pointer w-full md:w-[275px] h-[420px]
            flex flex-col justify-between"
          >
            {/* IMAGE */}
            <div className="relative h-52 rounded-xl overflow-hidden bg-black/20 flex items-center justify-center">
              <Image
                src={item.images?.[0] || "https://via.placeholder.com/300"}
                alt={item.title}
                width={300}
                height={300}
                className="object-contain w-full h-full transition-all duration-300 group-hover:scale-110"
              />

              {/* ACTION BUTTONS */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-3 lg:opacity-0  group-hover:opacity-100 transition-all">
                <Link href={`/productdetailsection/${item.id}`}>
                  <button className="bg-black/80 hover:bg-black p-2 rounded-full border border-gray-600 hover:border-purple-500 transition-all">
                    <FaRegEye className="text-white" />
                  </button>
                </Link>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWishlist(item.id);
                  }}
                  className="bg-black/80 hover:bg-black p-2 rounded-full border border-gray-600 hover:border-purple-500 transition-all"
                >
                  {likedIds.includes(item.id) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* CONTENT */}
            <div className="mt-3 flex flex-col flex-1">
              <div className="flex justify-between gap-2 items-start">
                <p className="text-white font-semibold text-sm line-clamp-2 flex-1">{item.title}</p>
                <p className="text-[#9569D3] font-bold text-lg whitespace-nowrap">${item.price}</p>
              </div>

              <div className="flex items-center gap-1 mt-2">
                <FaStar className="text-yellow-400 text-sm" />
                <span className="text-gray-400 text-sm">4.3 (128)</span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(item);
                }}
                className="mt-auto w-full bg-purple-700 hover:bg-purple-800
                text-white py-2.5 rounded-lg flex items-center
                justify-center gap-2 transition-all font-medium"
              >
                <MdOutlineAddShoppingCart className="text-lg" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {showButton && !onlyWishlist && (
        <div className="flex justify-center mt-8">
          <Button onLoadMore={() => setLimit((prev) => prev + 16)} disabled={isPlaceholderData} />
        </div>
      )}
    </>
  );
};

export default ProductList;
