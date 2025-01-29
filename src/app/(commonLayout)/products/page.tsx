import Image from "next/image";
import Link from "next/link";
import ProductFilter from "../utils/ProductFilter";

const ProductsPage = async ({ searchParams }: { searchParams: any }) => {
  const category = searchParams?.category || "all";
  const searchQuery = searchParams?.search || "";

  let apiUrl = `http://localhost:5000/api/products`;
  const queryParams = new URLSearchParams();

  if (category !== "all") queryParams.append("category", category);
  if (searchQuery) queryParams.append("search", searchQuery);

  if (queryParams.toString()) {
    apiUrl += `?${queryParams.toString()}`;
  }

  const response = await fetch(apiUrl, { cache: "no-store" });
  const data = await response.json();
  const products = data.data || [];

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center my-8 text-gray-800">
        Discover the Best Pet Products - Only at PetBhandar!
      </h2>

      <ProductFilter />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-16">
        {products.length > 0 ? (
          products.map((product: any) => (
            <div
              key={product.id}
              className="product-card bg-white w-full p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-blue-50 relative overflow-hidden"
            >
              <div className="w-full h-60 relative mb-4">
                <Image
                  src={product.productImages[0]}
                  alt={product.name}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full rounded-xl transition-all duration-300 transform hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-500">
                  ${product.price}
                </span>
                <Link
                  href=""
                  className="mt-6 rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-500 cursor-pointer"
                >
                  View Details
                </Link>
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

export default ProductsPage;
