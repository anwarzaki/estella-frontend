// 2. Create components/PerfumeFilters.jsx
import React, { useState, useEffect } from "react";

const PerfumeFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    brand: "",
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Fetch categories and brands from your backend
    const fetchFilters = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/perfume");
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories);
          setBrands(data.brands);
        }
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <input
          type="text"
          name="search"
          placeholder="Search perfumes..."
          value={filters.search}
          onChange={handleChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Unisex">Unisex</option>
        </select>

        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="brand"
          value={filters.brand}
          onChange={handleChange}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Brands</option>
          <option value="Luxury Co.">Luxury Co.</option>
          <option value="Elite Perfumes">Elite Perfumes</option>
          <option value="Trendy Scents">Trendy Scents</option>
          <option value="Golden Touch">Golden Touch</option>
        </select>
      </div>
    </div>
  );
};

export default PerfumeFilters;

// import React, { useState, useEffect } from "react";
// import { Search, SlidersHorizontal, X } from "lucide-react";

// const PerfumeFilters = ({ onFilterChange }) => {
//   const [filters, setFilters] = useState({
//     search: "",
//     category: "",
//     minPrice: "",
//     maxPrice: "",
//     brand: "",
//     sortBy: "name",
//     sortOrder: "asc",
//     priceRange: "all",
//   });

//   const [showMobileFilters, setShowMobileFilters] = useState(false);
//   const [brands, setBrands] = useState([]);
//   const [activeFilters, setActiveFilters] = useState([]);

//   // Price range options
//   const priceRanges = [
//     { label: "All Prices", value: "all" },
//     { label: "Under ₹1,000", value: "under1000" },
//     { label: "₹1,000 - ₹5,000", value: "1000-5000" },
//     { label: "₹5,000 - ₹10,000", value: "5000-10000" },
//     { label: "Over ₹10,000", value: "over10000" },
//   ];

//   const categories = [
//     { label: "All Categories", value: "" },
//     { label: "Men's Fragrances", value: "Men" },
//     { label: "Women's Fragrances", value: "Women" },
//     { label: "Unisex Fragrances", value: "Unisex" },
//     { label: "Luxury Collection", value: "Luxury" },
//     { label: "Natural & Organic", value: "Natural" },
//   ];

//   const sortOptions = [
//     { label: "Name (A-Z)", value: "name-asc" },
//     { label: "Name (Z-A)", value: "name-desc" },
//     { label: "Price (Low to High)", value: "price-asc" },
//     { label: "Price (High to Low)", value: "price-desc" },
//     { label: "Newest First", value: "date-desc" },
//     { label: "Most Popular", value: "popularity-desc" },
//   ];

//   useEffect(() => {
//     // Fetch brands from your backend
//     const fetchBrands = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:5000/api/perfumes/brands"
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setBrands(data.brands);
//         }
//       } catch (error) {
//         console.error("Error fetching brands:", error);
//       }
//     };

//     fetchBrands();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const newFilters = { ...filters, [name]: value };

//     // Handle sort option change
//     if (name === "sort") {
//       const [sortBy, sortOrder] = value.split("-");
//       newFilters.sortBy = sortBy;
//       newFilters.sortOrder = sortOrder;
//     }

//     setFilters(newFilters);
//     updateActiveFilters(newFilters);
//     onFilterChange(newFilters);
//   };

//   const updateActiveFilters = (newFilters) => {
//     const active = Object.entries(newFilters)
//       .filter(
//         ([key, value]) => value && key !== "sortBy" && key !== "sortOrder"
//       )
//       .map(([key, value]) => ({
//         key,
//         label: getFilterLabel(key, value),
//         value,
//       }));
//     setActiveFilters(active);
//   };

//   const getFilterLabel = (key, value) => {
//     switch (key) {
//       case "search":
//         return `Search: ${value}`;
//       case "category":
//         return `Category: ${
//           categories.find((c) => c.value === value)?.label || value
//         }`;
//       case "priceRange":
//         return `Price: ${
//           priceRanges.find((p) => p.value === value)?.label || value
//         }`;
//       case "brand":
//         return `Brand: ${value}`;
//       default:
//         return `${key}: ${value}`;
//     }
//   };

//   const removeFilter = (filterKey) => {
//     const newFilters = { ...filters, [filterKey]: "" };
//     setFilters(newFilters);
//     updateActiveFilters(newFilters);
//     onFilterChange(newFilters);
//   };

//   const clearAllFilters = () => {
//     const clearedFilters = {
//       search: "",
//       category: "",
//       minPrice: "",
//       maxPrice: "",
//       brand: "",
//       sortBy: "name",
//       sortOrder: "asc",
//       priceRange: "all",
//     };
//     setFilters(clearedFilters);
//     setActiveFilters([]);
//     onFilterChange(clearedFilters);
//   };

//   return (
//     <div className="space-y-4">
//       {/* Mobile Filter Toggle */}
//       <button
//         className="md:hidden flex items-center gap-2 p-2 text-gray-600"
//         onClick={() => setShowMobileFilters(!showMobileFilters)}
//       >
//         <SlidersHorizontal className="h-5 w-5" />
//         Filters
//       </button>

//       {/* Main Filter Container */}
//       <div
//         className={`bg-white rounded-lg shadow p-4 ${
//           showMobileFilters ? "block" : "hidden md:block"
//         }`}
//       >
//         {/* Search Bar */}
//         <div className="relative mb-4">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//           <input
//             type="text"
//             name="search"
//             placeholder="Search perfumes by name, brand, or description..."
//             value={filters.search}
//             onChange={handleChange}
//             className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>

//         {/* Filter Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <select
//             name="category"
//             value={filters.category}
//             onChange={handleChange}
//             className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//           >
//             {categories.map((cat) => (
//               <option key={cat.value} value={cat.value}>
//                 {cat.label}
//               </option>
//             ))}
//           </select>

//           <select
//             name="priceRange"
//             value={filters.priceRange}
//             onChange={handleChange}
//             className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//           >
//             {priceRanges.map((range) => (
//               <option key={range.value} value={range.value}>
//                 {range.label}
//               </option>
//             ))}
//           </select>

//           <select
//             name="brand"
//             value={filters.brand}
//             onChange={handleChange}
//             className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">All Brands</option>
//             {brands.map((brand) => (
//               <option key={brand} value={brand}>
//                 {brand}
//               </option>
//             ))}
//           </select>

//           <select
//             name="sort"
//             value={`${filters.sortBy}-${filters.sortOrder}`}
//             onChange={handleChange}
//             className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//           >
//             {sortOptions.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Active Filters */}
//         {activeFilters.length > 0 && (
//           <div className="mt-4 flex flex-wrap gap-2">
//             {activeFilters.map((filter) => (
//               <span
//                 key={filter.key}
//                 className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
//               >
//                 {filter.label}
//                 <button
//                   onClick={() => removeFilter(filter.key)}
//                   className="ml-1 hover:text-blue-600"
//                 >
//                   <X className="h-4 w-4" />
//                 </button>
//               </span>
//             ))}
//             <button
//               onClick={clearAllFilters}
//               className="text-sm text-red-600 hover:text-red-800 ml-2"
//             >
//               Clear All
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PerfumeFilters;
