"use client";

import React, { useMemo, useState } from "react";
import { Star, Heart, ShoppingCart, Truck, Shield } from "lucide-react";
import { useGetSingleProduct } from "@/app/features/products/useGetAllProducts";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { addToCart } from "@/app/features/cart/cartSlice";
import { toggleLike } from "@/app/features/wishlist/wishlistSlice";
import { toast, ToastContainer, Bounce } from "react-toastify";

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState(0);

  const dispatch = useDispatch();

  /* ---------------- API ---------------- */
  const { data: product, isLoading, error } = useGetSingleProduct(productId);

  /* ---------------- REDUX ---------------- */
  const activeUserId = useSelector((state: RootState) => state.cart.activeUserId);
  const cartsByUserId = useSelector((state: RootState) => state.cart.cartsByUserId);
  const likedByUserId = useSelector((state: RootState) => state.wishlist.likedByUserId);

  /* ---------------- USER-SPECIFIC WISHLIST ---------------- */
  const wishlistIds = useMemo<number[]>(() => {
    if (!activeUserId) return [];
    return likedByUserId?.[activeUserId] ?? [];
  }, [activeUserId, likedByUserId]);

  const isFavorite = useMemo(() => {
    return product ? wishlistIds.includes(product.id) : false;
  }, [product, wishlistIds]);

  /* ---------------- HANDLERS ---------------- */
  const handleWishlistToggle = () => {
    if (!activeUserId) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    if (product) {
      dispatch(toggleLike({ userId: activeUserId, productId: product.id }));
      
      const isCurrentlyLiked = wishlistIds.includes(product.id);
      toast.success(
        isCurrentlyLiked ? "Removed from wishlist" : "Added to wishlist",
        { transition: Bounce }
      );
    }
  };

  const handleAddToCart = () => {
    if (!activeUserId) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    if (!product) return;

    const exists = cartsByUserId[activeUserId]?.some((item) => item.id === product.id);

    if (exists) {
      toast.info("Already in cart");
      return;
    }

    dispatch(addToCart(product));
    toast.success("Added to cart successfully!", {
      transition: Bounce,
    });
  };

  /* ---------------- LOADING STATE ---------------- */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
          <p className="text-gray-400">Loading product...</p>
        </div>
      </div>
    );
  }

  /* ---------------- ERROR STATE ---------------- */
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">Error loading product</p>
          <button
            onClick={() => router.back()}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const productImages = Array.isArray(product.images) ? product.images : [product.images];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 text-white">
      <ToastContainer 
        theme="dark" 
        transition={Bounce}
        position="top-right"
        autoClose={2000}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* IMAGE SECTION */}
          <div className="space-y-6">
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-purple-500/20 bg-slate-900/50">
              <button
                onClick={handleWishlistToggle}
                className="absolute top-6 right-6 z-10 h-12 w-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-all border border-gray-700 hover:border-purple-500"
                aria-label="Add to wishlist"
              >
                <Heart 
                  className={`w-5 h-5 transition-all ${
                    isFavorite 
                      ? "fill-red-500 text-red-500 scale-110" 
                      : "text-white"
                  }`} 
                />
              </button>

              <img 
                src={productImages[selectedImage] || "https://via.placeholder.com/600"} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx 
                        ? "ring-2 ring-purple-500 border-purple-500" 
                        : "border-slate-700 opacity-70 hover:opacity-100 hover:border-purple-400"
                    }`}
                  >
                    <img 
                      src={img || "https://via.placeholder.com/150"} 
                      alt={`${product.title} ${idx + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFO SECTION */}
          <div className="space-y-8">
            <div className="border-b border-slate-800 pb-6">
              {product.category && (
                <span className="inline-block text-xs text-purple-400 uppercase tracking-wider bg-purple-500/10 px-3 py-1 rounded-full">
                  {product.category.name}
                </span>
              )}

              <h1 className="text-4xl font-bold mt-4 leading-tight">{product.title}</h1>

              <div className="flex items-baseline gap-3 mt-4">
                <p className="text-4xl text-purple-400 font-bold">${product.price}</p>
                <span className="text-sm text-slate-500 line-through">$699.99</span>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-slate-600"}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-400">(124 reviews)</span>
                <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded">In Stock</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-slate-300 leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-purple-500/50"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>

              <button
                onClick={handleWishlistToggle}
                className="w-full flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 py-4 rounded-xl font-semibold transition-all border border-slate-700 hover:border-purple-500"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                {isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Feature icon={<Truck />} title="Free Shipping" value="2-3 Days" />
              <Feature icon={<Shield />} title="Warranty" value="2 Years" />
            </div>

            {/* Additional Info */}
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-sm font-semibold mb-3 text-purple-400">Product Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Product ID:</span>
                  <span className="text-white font-medium">#{product.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Category:</span>
                  <span className="text-white font-medium">{product.category?.name || "Uncategorized"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Availability:</span>
                  <span className="text-green-400 font-medium">In Stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Feature = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) => (
  <div className="flex items-center gap-4 p-4 bg-slate-900/80 rounded-xl border border-slate-800 hover:border-purple-500/50 transition-all">
    <div className="text-purple-400 bg-purple-500/10 p-3 rounded-lg">{icon}</div>
    <div>
      <p className="text-xs text-slate-400 uppercase tracking-wider">{title}</p>
      <p className="text-sm font-semibold mt-1">{value}</p>
    </div>
  </div>
);

export default Page;