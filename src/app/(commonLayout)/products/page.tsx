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

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
        {currentPageProducts.length > 0 ? (
          currentPageProducts.map((product) => (
            <Link href={`/products/${product._id}`} key={product.id}>
              <div
                key={product._id}
                className="product-card bg-white w-full p-3 md:p-6 rounded-2xl shadow-lg hover:shadow-neutral-400 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer"
              >
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
                  <button className="mt-4 sm:mt-6 md:mt-7 rounded border-2 border-blue-700 px-2 sm:px-4 py-1 md:py-2 text-blue-700 hover:bg-blue-700 hover:text-white transition-all duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
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
