"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// Dummy data for the products (replace with actual data)
const products = [
  {
    id: 1,
    name: "Product 1",
    description: "Description of Product 1",
    price: "$10",
    category: "Category 1",
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description of Product 2",
    price: "$20",
    category: "Category 2",
  },
  {
    id: 3,
    name: "Product 3",
    description: "Description of Product 3",
    price: "$30",
    category: "Category 3",
  },
  {
    id: 4,
    name: "Product 4",
    description: "Description of Product 4",
    price: "$40",
    category: "Category 1",
  },
  {
    id: 5,
    name: "Product 5",
    description: "Description of Product 5",
    price: "$50",
    category: "Category 2",
  },
  {
    id: 6,
    name: "Product 6",
    description: "Description of Product 6",
    price: "$60",
    category: "Category 3",
  },
  {
    id: 7,
    name: "Product 7",
    description: "Description of Product 7",
    price: "$70",
    category: "Category 1",
  },
  {
    id: 8,
    name: "Product 8",
    description: "Description of Product 8",
    price: "$80",
    category: "Category 2",
  },
  {
    id: 9,
    name: "Product 9",
    description: "Description of Product 9",
    price: "$90",
    category: "Category 3",
  },
  {
    id: 10,
    name: "Product 10",
    description: "Description of Product 10",
    price: "$100",
    category: "Category 1",
  },
];

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageChanged, setPageChanged] = useState(false); // To track page change by pagination
  const itemsPerPage = 6;

  // Create a reference for the section
  const sectionRef = useRef<HTMLDivElement>(null);

  // Pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setPageChanged(true); // Set pageChanged to true when pagination button is clicked
    setCurrentPage(page);
  };

  // Scroll to the top of the section after page change
  useEffect(() => {
    if (pageChanged && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setPageChanged(false); // Reset pageChanged after scrolling
    }
  }, [currentPage, pageChanged]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title */}
      <h2 className="text-xl md:text-3xl font-bold text-center mb-8 text-gray-800">
        For Every Pet, a Perfect Choice - Browse Our Complete Range!
      </h2>

      {/* Search and Category Filter Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between mb-8">
        {/* Search Bar */}
        <div className="flex items-center w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search Products..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Filter Dropdown */}
        <div className="flex items-center w-full sm:w-1/3">
          <select
            id="category"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="Category 1">Category 1</option>
            <option value="Category 2">Category 2</option>
            <option value="Category 3">Category 3</option>
          </select>
        </div>
      </div>

      {/* Product Cards Section */}
      <div
        ref={sectionRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8"
      >
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="product-card bg-white w-full p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-blue-50 relative overflow-hidden"
          >
            {/* Image */}
            <div className="w-full h-60 relative mb-4">
              <Image
                src="/assets/banner.jpg"
                alt={product.name}
                width={600}
                height={400}
                className="object-cover w-full h-full rounded-xl transition-all duration-300 transform hover:scale-110"
              />
            </div>
            {/* Product Details */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {product.name}
            </h3>
            <p className="text-gray-600 mb-4">{product.description}</p>

            {/* Price and View Details Button */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-green-500 mt-1">
                {product.price}
              </span>
              <Link
                href={`/product/${product.id}`}
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

      {/* Pagination */}
      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
