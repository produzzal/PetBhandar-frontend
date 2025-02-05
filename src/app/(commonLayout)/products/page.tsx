import Image from "next/image";
import ProductFilter from "../utils/ProductFilter";
import Link from "next/link";

const ProductsPage = async ({ searchParams }: { searchParams: any }) => {
  const category = searchParams?.category || "all";
  const searchQuery = searchParams?.search || "";
  const page = parseInt(searchParams?.page) || 1; // Default to page 1 if not provided
  const limit = 40; // Number of products per page

  let apiUrl = `http://localhost:5000/api/products`;
  const queryParams = new URLSearchParams();

  if (category !== "all") queryParams.append("category", category);
  if (searchQuery) queryParams.append("search", searchQuery);

  if (queryParams.toString()) {
    apiUrl += `?${queryParams.toString()}`;
  }

  const response = await fetch(apiUrl);
  const data = await response.json();
  const allProducts = data.data || []; // Get all products
  const totalProducts = allProducts.length; // Total number of products
  const totalPages = Math.ceil(totalProducts / limit); // Calculate total pages

  // Paginate products based on current page
  const startIndex = (page - 1) * limit;
  const currentPageProducts = allProducts.slice(startIndex, startIndex + limit);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center my-8 text-gray-800">
        Discover the Best Pet Products - Only at PetBhandar!
      </h2>

      <ProductFilter />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-16">
        {currentPageProducts.length > 0 ? (
          currentPageProducts.map((product) => (
            <div
              key={product.id}
              className="product-card bg-white w-full p-6 rounded-2xl shadow-lg transition-all duration-300 flex flex-col justify-between h-full cursor-pointer"
            >
              {/* Image with Hover Effect */}
              <div className="w-full h-52 relative mb-4 hover:bg-gray-100 transition-all duration-300">
                <Image
                  src={product.productImages[0]}
                  alt={product.name}
                  width={600} // Set width for the image
                  height={208} // Set height to fix the image size
                  unoptimized
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col flex-grow text-justify">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                  {product.name} {/* Truncate name to 1 line */}
                </h3>
                <p className="text-gray-600 font-semibold mb-4 line-clamp-3">
                  {product.description} {/* Truncate description to 3 lines */}
                </p>
              </div>

              {/* Price and Add to Cart Button */}
              <div className="flex justify-between items-center mt-auto">
                <span className="text-lg mt-7 font-bold">
                  BDT {product.price}
                </span>
                <button className="mt-6 rounded border-2 border-blue-700 px-4 py-2 text-blue-700 hover:bg-blue-700 hover:text-white transition-all duration-200">
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        {/* Previous Button */}
        <Link
          href={`/products?category=${category}&search=${searchQuery}&page=${
            page - 1
          }`}
          className={`px-4 py-2 bg-blue-600 text-white rounded-l-lg ${
            page === 1 ? "cursor-not-allowed opacity-50" : ""
          }`}
          passHref
        >
          Previous
        </Link>

        {/* Current Page */}
        <span className="px-4 py-2">
          {page} / {totalPages}
        </span>

        {/* Next Button */}
        <Link
          href={`/products?category=${category}&search=${searchQuery}&page=${
            page + 1
          }`}
          className={`px-4 py-2 bg-blue-600 text-white rounded-r-lg ${
            page === totalPages ? "cursor-not-allowed opacity-50" : ""
          }`}
          passHref
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default ProductsPage;
