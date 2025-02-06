import Image from "next/image";
import nexiosInstance from "@/config/nexios.config";
import Link from "next/link";
import DeleteButton from "../../utils/CategoryDeleteButton";
import {
  ApiResponse,
  TCategory,
} from "../../utils/interface/category.interface";

const CategoryManagement = async () => {
  const response = await nexiosInstance.get<ApiResponse>("/categories");
  const categories: TCategory[] = response.data.data;

  return (
    <div className="container mx-auto px-4 mb-10">
      {/* Title */}
      <h2 className="text-3xl font-bold my-8 text-gray-800">
        Category Management
      </h2>

      {/* Add Category Button */}
      <div className=" mb-6">
        <Link href="/admin/category-management/add-category">
          <button className="bg-pink-500 text-white px-32 w-full py-3 rounded-lg shadow-md hover:bg-pink-600 transition">
            Add Category
          </button>
        </Link>
      </div>

      {/* Category List */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category._id}
              className="bg-white w-full p-3 md:p-6 rounded-2xl shadow-lg hover:shadow-neutral-400 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer"
            >
              {/* Category Image with Zoom Effect */}
              <div className="w-full h-40 sm:h-52 md:h-52 relative mb-4 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={600}
                  height={208}
                  unoptimized
                  className="object-cover w-full h-full rounded-xl transition-transform duration-300 transform hover:scale-110"
                />
              </div>

              {/* Category Details */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#0A101A] mb-2 ">
                  {category.name}
                </h3>
                <p className="text-gray-700 text-xs sm:text-sm md:text-base font-medium mb-2 truncate">
                  {category.description}
                </p>
              </div>

              {/* Update and Delete Buttons */}
              <div className="flex justify-between mt-4">
                <Link
                  href={`/admin/category-management/update-category/${category._id}`}
                >
                  <button className="bg-green-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-green-600 transition-all duration-200">
                    Update
                  </button>
                </Link>
                <DeleteButton categoryId={category._id} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No categories found.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;
