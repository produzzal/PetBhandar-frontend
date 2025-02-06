import Image from "next/image";
import ProductFilter from "../utils/ProductFilter";
import Link from "next/link";
import { TProduct } from "../utils/interface/product.interface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <h2 className="text-xl md:text-3xl font-bold text-center my-8 text-gray-800">
        Discover the Best Pet Products - Only at PetBhandar!
      </h2>

      <ProductFilter />

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
        {currentPageProducts.length > 0 ? (
          currentPageProducts.map((product: TProduct) => (
            <Link href={`/products/${product._id}`} key={product._id}>
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
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#0A101A] mb-2 truncate">
                    {product.name}
                  </h3>
                </div>

                {/* Price and Add to Cart Button */}

                <div className="text-md md:text-xl mt-3 font-bold font-[#1F2937]">
                  <span className="font-extrabold">৳</span>
                  {product.price}
                </div>
                <button className="w-full mt-4 rounded border-1 border-pink-600 px-2 sm:px-4 py-2 md:py-3 text-pink-600 hover:bg-pink-600 hover:text-white transition-all duration-200">
                  Add to Cart
                </button>
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
