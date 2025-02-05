import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import nexiosInstance from "@/config/nexios.config";

const SimilarProducts = ({ category }: { category: string }) => {
  const [similarProducts, setSimilarProducts] = useState([]);
  console.log(category);
  console.log("products", similarProducts);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      if (!category) return; // Avoid fetching if category is not available

      try {
        const response = await nexiosInstance.get(
          `/products?category=${category}`
        );
        console.log(response);
        setSimilarProducts(response.data.data); // Update state with products
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    };

    fetchSimilarProducts();
  }, [category]);

  if (!similarProducts) return <p>No similar products available.</p>;

  return (
    <div className="similar-products-section my-8 mt-32">
      <h2 className="text-xl md:text-3xl font-bold text-left mb-8 text-gray-800">
        Similar Products
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {similarProducts.slice(0, 4).map((product) => (
          <Link href={`/products/${product._id}`} key={product.id}>
            <div className="product-card bg-white w-full p-3 md:p-6 rounded-2xl shadow-lg hover:shadow-neutral-400 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer">
              {/* Image with Zoom Effect */}
              <div className="w-full h-40 sm:h-52 md:h-52 relative mb-4 overflow-hidden">
                {" "}
                {/* Decreased height on mobile */}
                <Image
                  src={product.productImages[0]}
                  alt={product.name}
                  width={600}
                  height={208}
                  unoptimized
                  className="object-cover w-full h-full rounded-xl transition-transform duration-300 transform hover:scale-110"
                />
              </div>

              {/* Product Name */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 truncate">
                  {product.name}
                </h3>
              </div>

              {/* Price and Add to Cart Button */}
              <div className="flex justify-between items-center mt-auto">
                <span className="text-sm mt-5 sm:text-base md:text-lg font-bold">
                  BDT {product.price}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(product._id);
                  }}
                  className="mt-4 sm:mt-6 md:mt-7 rounded border-2 border-blue-700 px-2 sm:px-4 py-1 md:py-2 text-blue-700 hover:bg-blue-700 hover:text-white transition-all duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
