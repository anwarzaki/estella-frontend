import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPerfumeForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    description: "",
    ratings: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" || name === "ratings"
          ? Number(value)
          : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      e.target.value = null;
      return;
    }

    if (file && !["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setError("Only JPEG, PNG and JPG files are allowed");
      e.target.value = null;
      return;
    }

    if (file) {
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      const imageFile = document.querySelector("input[name='image']").files[0];

      if (!imageFile) {
        throw new Error("Please select an image");
      }

      formDataToSend.append("image", imageFile);

      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      const response = await fetch("http://localhost:5000/api/perfume", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add perfume");
      }

      const data = await response.json();
      alert("Perfume added successfully!");
      navigate("/products");
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded shadow-md">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleImageChange}
            className="p-2 border rounded w-full"
            required
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 h-40 object-cover rounded"
            />
          )}
        </div>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="p-2 border rounded"
          required
          min="0"
          step="0.01"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => {
            const words = e.target.value.split(" ");
            const capitalizedFirstWord = words
              .map((word, index) =>
                index === 0
                  ? word.charAt(0).toUpperCase() + word.slice(1)
                  : word
              )
              .join(" ");

            handleChange({
              target: { name: "category", value: capitalizedFirstWord },
            });
          }}
          className="p-2 border rounded"
          required
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="p-2 border rounded"
          required
          min="0"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="p-2 border rounded col-span-2"
        />
        <input
          type="number"
          name="ratings"
          placeholder="Ratings (0-5)"
          value={formData.ratings}
          onChange={handleChange}
          className="p-2 border rounded"
          min="0"
          max="5"
          step="0.1"
        />
      </div>

      <div className="mt-4 flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Adding..." : "Add Perfume"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/products")}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          disabled={loading}
        >
          Back to Products
        </button>
      </div>
    </form>
  );
};

export default AddPerfumeForm;
