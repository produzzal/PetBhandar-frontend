/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductFilter from "@/app/(commonLayout)/utils/ProductFilter";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "../../utils/ProductDeleteButton";
import { TProduct } from "../../utils/interface/product.interface";

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
  const products: TProduct[] = data.data || [];

  return (
    <div className="container mx-auto px-4 mb-10">
      {/* Title */}
      <h2 className="text-3xl font-bold  my-8 text-gray-800">
        Products Management
      </h2>

      {/* Add Product Button */}
      <div className="w-full mb-6">
        <Link href="/admin/product-management/add-product">
          <button className="bg-pink-600 w-full text-white px-36 md:px-96 py-3 rounded-lg shadow-md hover:bg-pink-700 transition">
            Add Product
          </button>
        </Link>
      </div>
      <ProductFilter />
      {/* Product List */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-10">
        {products.length > 0 ? (
          products.map((product: TProduct) => (
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
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#0A101A] mb-2 truncate">
                  {product.name}
                </h3>
                <p className="text-md my-2  text-gray-700">
                  Category:{" "}
                  <span className="text-pink-500">{product.category}</span>
                </p>
                <p className="text-lg text-gray-700 ">
                  <span>Stock: </span>
                  <span className="text-pink-500">{product.stockQuantity}</span>
                </p>

                <p className="text-md md:text-xl mt-3 font-bold font-[#1F2937]">
                  <span className="font-extrabold">৳</span>
                  {product.price}
                </p>
              </div>

              {/* Update and Delete Buttons */}
              <div className="flex justify-between mt-4">
                <Link
                  href={`/admin/product-management/update-product/${product._id}`}
                >
                  <button className="bg-green-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-green-600 transition-all duration-200">
                    Update
                  </button>
                </Link>
                <DeleteButton productId={product._id} />
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
