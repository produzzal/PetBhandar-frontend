import ProductFilter from "@/app/(commonLayout)/utils/ProductFilter";
import Image from "next/image";
import Link from "next/link";

const ProductManagement = async ({ searchParams }: { searchParams: any }) => {
  const category = searchParams?.category || "all";
  const searchQuery = searchParams?.search || "";

  let apiUrl = `http://localhost:5000/api/products`;
  const queryParams = new URLSearchParams();

  if (category !== "all") queryParams.append("category", category);
  if (searchQuery) queryParams.append("search", searchQuery);

  if (queryParams.toString()) {
    apiUrl += `?${queryParams.toString()}`;
  }

  const response = await fetch(apiUrl);
  const data = await response.json();
  const products = data.data || [];

  return (
    <div className="container mx-auto px-4">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center my-8 text-gray-800">
        Products Management
      </h2>
      <ProductFilter />

      {/* Add Product Button */}
      <div className="flex justify-center mb-6">
        <Link href="/admin/product-management/add-product">
          <button className="bg-blue-500 text-white px-32 md:px-64 py-3 rounded-lg shadow-md hover:bg-blue-600 transition">
            Add Product
          </button>
        </Link>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="product-card bg-white w-full p-3 md:p-6 rounded-2xl shadow-lg hover:shadow-neutral-400 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer"
            >
              {/* Image with Zoom Effect */}
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

              {/* Product Details */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-2 truncate">
                  {product.name}
                </h3>
                <p className="text-gray-800 text-xs sm:text-sm md:text-base font-medium mb-2">
                  <span className="font-bold">Category:</span>{" "}
                  {product.category}
                </p>
                <p className="text-gray-700 text-xs sm:text-sm md:text-base font-medium mb-2 truncate">
                  <span className="font-semibold">Description:</span>{" "}
                  {product.description}
                </p>
                <p className="text-sm sm:text-base md:text-md font-bold">
                  Stock: {product.stockQuantity}
                </p>
                <p className="text-sm mt-2 sm:text-base md:text-lg font-bold">
                  Price: BDT {product.price}
                </p>
              </div>

              {/* Update and Delete Buttons */}
              <div className="flex justify-between mt-4">
                <Link
                  href={`/admin/product-management/update-product/${product._id}`}
                >
                  <button className="bg-yellow-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-yellow-600 transition-all duration-200">
                    Update
                  </button>
                </Link>
                <button className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-red-600 transition-all duration-200">
                  Delete
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
    </div>
  );
};
export default ProductManagement;
