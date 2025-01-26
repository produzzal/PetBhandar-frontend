import Image from "next/image";
import Link from "next/link";
import React from "react";

const FeaturedProducts = () => {
  // Array of featured products
  const products = [
    {
      id: 1,
      name: "Product 1",
      description: "Short product description goes here.",
      price: "$199.99",
      image: "/assets/banner.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Short product description goes here.",
      price: "$149.99",
      image: "/assets/banner.jpg",
    },
    {
      id: 3,
      name: "Product 3",
      description: "Short product description goes here.",
      price: "$249.99",
      image: "/assets/banner.jpg",
    },

    // Add more products as needed
  ];

  return (
    <section className="featured-products py-16 bg-gray-100">
      <div className="container mx-auto px-0 sm:px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Featured Products
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card bg-white w-full p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-blue-50 relative overflow-hidden"
            >
              {/* Image */}
              <div className="w-full h-60 relative mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600} // Set width for the image
                  height={400} // Set height for the image
                  className="object-cover w-full h-full rounded-xl transition-all duration-300 transform hover:scale-110"
                />
              </div>
              {/* Product Details */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-4">{product.description}</p>

              {/* Price and Add to Cart Button */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-500">
                  {product.price}
                </span>
                <Link
                  href={""}
                  className="mt-6 rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-500 cursor-pointer"
                >
                  View Details
                </Link>
              </div>

              {/* Card Hover Animation */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500 opacity-0 hover:opacity-1 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* See More Products Button */}
        <div className="text-center mt-8">
          <Link
            href="/products" //
            className="rounded bg-blue-700 px-6 py-3 text-white hover:bg-blue-600 transition-all duration-200 cursor-pointer"
          >
            See More Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
