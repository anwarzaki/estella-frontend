import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import PerfumeCard from "../components/PerfumeCard";
import Footer from "../components/Footer";
import PerfumeFilters from "../components/PerfumeFilters";
import EditPerfumeForm from "../components/EditPerfumeForm";

const Products = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPerfume, setEditingPerfume] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    brand: "",
  });

  useEffect(() => {
    fetchPerfumes();
  }, []);

  const fetchPerfumes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}perfume`);

      if (!response.ok) {
        throw new Error("Failed to fetch perfumes");
      }

      const data = await response.json();
      setPerfumes(data.data);
    } catch (error) {
      console.error("Error fetching perfumes:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (perfume) => {
    setEditingPerfume(perfume);
  };

  const handleUpdate = (updatedPerfume) => {
    setPerfumes((prev) =>
      prev.map((p) => (p._id === updatedPerfume._id ? updatedPerfume : p))
    );
  };

  const handleDelete = async (perfume) => {
    if (window.confirm("Are you sure you want to delete this perfume?")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}perfume/${perfume._id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete perfume");
        }

        setPerfumes((prev) => prev.filter((p) => p._id !== perfume._id));
      } catch (error) {
        console.error("Error deleting perfume:", error);
        alert("Failed to delete perfume");
      }
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredPerfumes = perfumes.filter((perfume) => {
    return (
      perfume.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      (!filters.category || perfume.category === filters.category) &&
      (!filters.brand || perfume.brand === filters.brand) &&
      (!filters.minPrice || perfume.price >= Number(filters.minPrice)) &&
      (!filters.maxPrice || perfume.price <= Number(filters.maxPrice))
    );
  });

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="mt-[64px] flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="mt-[64px] text-center p-4 text-red-600">
          Error: {error}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="mt-[64px] container mx-auto px-4">
        <PerfumeFilters onFilterChange={handleFilterChange} />
        <PerfumeCard
          perfumes={filteredPerfumes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        {editingPerfume && (
          <EditPerfumeForm
            perfume={editingPerfume}
            onClose={() => setEditingPerfume(null)}
            onUpdate={handleUpdate}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Products;
