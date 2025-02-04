"use client";
import nexiosInstance from "@/config/nexios.config";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const UpdateProductForm: React.FC = ({ params }) => {
  const { productId } = React.use(params);
  const [categoryNames, setCategoryNames] = useState<string[]>([]);
  const [product, setProduct] = useState<any>(null); // Use 'any' or define a type for product
  console.log(productId);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await nexiosInstance.get("/categories", {
          next: {
            revalidate: 30,
          },
        });
        // Extract only the names and store them in an array
        const names = response.data.data.map(
          (category: { name: string }) => category.name
        );
        setCategoryNames(names);
      } catch (err) {
        console.log("Failed to load categories.");
      }
    };

    const fetchProduct = async () => {
      try {
        const response = await nexiosInstance.get(`/products/${productId}`);
        setProduct(response.data.data); // Set the fetched product data
      } catch (error) {
        console.log("Error fetching product data:", error);
      }
    };

    fetchCategories();
    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const imageLinks = (formData.get("images") as string)
      .split(",") // Split by commas for multiple image links
      .map((link) => link.trim()); // Trim spaces

    const productData = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price") as string),
      stockQuantity: parseInt(formData.get("stockQuantity") as string, 10),
      category: formData.get("category"),
      productImages: imageLinks,
    };

    try {
      const response = await nexiosInstance.put(
        `/products/${productId}`,
        productData
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.href = "/admin/product-management";
        }, 1000);
      } else {
        toast.error(response.data.message || "Product update failed");
      }
    } catch (error) {
      toast.error("Error updating product");
    }
  };

  // Render form if product data is loaded
  if (!product) {
    return <div>Loading...</div>; // Loading state until the product is fetched
  }

  return (
    <div className="max-w-2xl mt-16 mx-auto px-6 py-10 bg-white rounded-lg shadow-xl border border-gray-200">
      <h2 className="text-xl md:text-3xl font-bold text-center mb-8 text-gray-800">
        Update Product Page
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-lg font-semibold text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={product.name}
            className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300 hover:border-blue-500"
          />
        </div>

        {/* Product Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-lg font-semibold text-gray-700"
          >
            Product Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={product.description}
            className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300 hover:border-blue-500"
            rows={4}
          />
        </div>

        {/* Product Price */}
        <div>
          <label
            htmlFor="price"
            className="block text-lg font-semibold text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            defaultValue={product.price}
            className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300 hover:border-blue-500"
            min={0}
          />
        </div>

        {/* Stock Quantity */}
        <div>
          <label
            htmlFor="stockQuantity"
            className="block text-lg font-semibold text-gray-700"
          >
            Stock Quantity
          </label>
          <input
            type="number"
            id="stockQuantity"
            name="stockQuantity"
            defaultValue={product.stockQuantity}
            className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300 hover:border-blue-500"
            min={0}
          />
        </div>

        {/* Product Category (Dynamic Dropdown) */}
        <div>
          <label
            htmlFor="category"
            className="block text-lg font-semibold text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            defaultValue={product.category}
            className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300 hover:border-blue-500"
          >
            {categoryNames.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Image URLs (Text Input for Multiple Image Links) */}
        <div>
          <label
            htmlFor="images"
            className="block text-lg font-semibold text-gray-700"
          >
            Product Image URLs (separate with commas)
          </label>
          <input
            type="text"
            id="images"
            name="images"
            defaultValue={product.productImages?.join(",")}
            className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300 hover:border-blue-500"
            placeholder="Paste image URLs here, separated by commas"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
        >
          Update Product
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateProductForm;
