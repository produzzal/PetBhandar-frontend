"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ProductFilter from "../utils/ProductFilter";
import Link from "next/link";
import { TProduct } from "../utils/interface/product.interface";
import AddToCartPopup from "../utils/AddToCartPopupPage";
import { useSearchParams } from "next/navigation";

const ProductsPage = () => {
  const searchParams = useSearchParams(); // ✅ Correct way to access URL params in a Client Component
  const category = searchParams.get("category") || "all";
  const searchQuery = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 40;

  const [products, setProducts] = useState<TProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        let apiUrl = `http://localhost:5000/api/products`;
        const queryParams = new URLSearchParams();

        if (category !== "all") queryParams.append("category", category);
        if (searchQuery) queryParams.append("search", searchQuery);

        if (queryParams.toString()) {
          apiUrl += `?${queryParams.toString()}`;
        }

        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        const allProducts = data.data || [];

        setTotalPages(Math.ceil(allProducts.length / limit));
        setProducts(allProducts.slice((page - 1) * limit, page * limit));
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, searchQuery, page]);

  const handleAddToCartClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: TProduct
  ) => {
    e.stopPropagation(); // Prevent navigation
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-xl md:text-3xl font-bold text-center my-8 text-gray-800">
        Discover the Best Pet Products - Only at PetBhandar!
      </h2>

      <ProductFilter />

      {loading ? (
        <p className="text-center text-gray-500 mt-6">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-6">{error}</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
          {products.map((product) => {
            const price = product.price;
            const discount = product.discount || 0;
            const final =
              discount > 0 ? price - (price * discount) / 100 : price;
            const finalPrice = Math.floor(final);

            return (
              <div
                key={product._id}
                className="product-card bg-white w-full p-3 md:p-6 rounded-2xl shadow-lg hover:shadow-neutral-400 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer"
              >
                <Link href={`/products/${product._id}`}>
                  <div>
                    <div className="w-full h-40 sm:h-52 md:h-52 relative mb-4 overflow-hidden">
                      <Image
                        src={product.productImages[0]}
                        alt={product.name}
                        width={600}
                        height={208}
                        unoptimized
                        className="object-cover w-full h-full rounded-xl transition-transform duration-300 transform hover:scale-110"
                      />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#0A101A] mb-2 truncate">
                      {product.name}
                    </h3>
                  </div>
                </Link>

                {/* Price with Discount Logic */}
                <div className="mt-3">
                  {discount > 0 ? (
                    <p className="text-md md:text-xl mt-3 font-bold font-[#1F2937]">
                      <span className="font-extrabold text-[#1F2937]">৳</span>
                      {finalPrice}
                      <span className="line-through mx-1 md:mx-2 text-gray-400">
                        <span className="font-extrabold ml-1 md:ml-2">৳</span>
                        {price}
                      </span>
                      <span className="text-white font-normal text-sm bg-yellow-500 p-1 rounded">
                        {discount}% OFF
                      </span>
                    </p>
                  ) : (
                    <p className="text-md md:text-xl mt-3 font-bold text-[#1F2937]">
                      <span className="font-extrabold">৳</span>
                      {price}
                    </p>
                  )}
                </div>

                <button
                  onClick={(e) => handleAddToCartClick(e, product)}
                  className="w-full mt-4 rounded border-1 border-pink-600 px-2 sm:px-4 py-2 md:py-3 text-pink-600 hover:bg-pink-600 hover:text-white transition-all duration-200"
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 col-span-full">
          No products found.
        </p>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          {page > 1 ? (
            <Link
              href={`/products?category=${category}&search=${searchQuery}&page=${
                page - 1
              }`}
              className="px-4 py-2 bg-blue-600 text-white rounded-l-lg"
            >
              Previous
            </Link>
          ) : (
            <span className="px-4 py-2 bg-gray-300 text-gray-600 rounded-l-lg cursor-not-allowed">
              Previous
            </span>
          )}

          <span className="px-4 py-2">
            {page} / {totalPages}
          </span>

          {page < totalPages ? (
            <Link
              href={`/products?category=${category}&search=${searchQuery}&page=${
                page + 1
              }`}
              className="px-4 py-2 bg-blue-600 text-white rounded-r-lg"
            >
              Next
            </Link>
          ) : (
            <span className="px-4 py-2 bg-gray-300 text-gray-600 rounded-r-lg cursor-not-allowed">
              Next
            </span>
          )}
        </div>
      )}
      {/* Full-Screen Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[100] backdrop-blur-sm">
          {/* Modal Content */}
          <div className="relative bg-white p-6 rounded-lg w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
            >
              ✕
            </button>

            {/* Add to Cart Popup */}
            <AddToCartPopup product={selectedProduct} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
