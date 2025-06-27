import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [perfumes, setPerfumes] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [featuredPerfumes, setFeaturedPerfumes] = useState([]);
  const carouselImages = [
    {
      src: "/img/perfume01/corousel-04.jpg",
      title: "Exquisite ",
      description: "Discover the scent of elegance.",
    },
    {
      src: "/img/perfume01/corousel-02.jpg",
      title: "Luxury ",
      description: "Feel the luxury in every spray.",
    },
    {
      src: "/img/perfume01/corousel-03.jpg",
      title: "Signature",
      description: "Define your personality.",
    },
  ];

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
      }
    };

    const fetchPerfumes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}perfume`);
        const data = await response.json();
        if (data.success) {
          setPerfumes(data.data);
          // Select 3 random perfumes for featured section
          const featured = [...data.data]
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
          setFeaturedPerfumes(featured);
        }
      } catch (error) {
        console.error("Error fetching perfumes:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    fetchPerfumes();
  }, [navigate]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 mt-[64px]">
        {/* Hero Carousel Section */}
        <div className="relative h-[500px] overflow-hidden">
          <div
            className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className="min-w-full h-full relative bg-gray-100"
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <h2 className="text-4xl font-bold mb-2">{image.title}</h2>
                    <p className="text-xl mb-4">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-dark-blue text-white p-2 rounded-full shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-dark-blue text-white p-2 rounded-full shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Featured Products Section */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Fragrances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPerfumes.map((perfume) => (
              <div
                key={perfume._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={perfume.imgSrc || "/api/placeholder/400/300"}
                  alt={perfume.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{perfume.name}</h3>
                  <p className="text-gray-600 mb-2">{perfume.brand}</p>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(perfume.ratings)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      ({perfume.ratings}/5)
                    </span>
                  </div>
                  <p className="text-md font-bold text-black-500">
                    ₹{perfume.price}
                  </p>
                  <button
                    onClick={() => navigate(`/products`)}
                    className="mt-4 w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Shop by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Floral", "Woody", "Oriental", "Fresh"].map((category) => (
                <div
                  key={category}
                  className="bg-white rounded-lg p-6 text-center cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() =>
                    navigate(`/category/${category.toLowerCase()}`)
                  }
                >
                  <h3 className="text-xl font-semibold">{category}</h3>
                  <p className="text-gray-600 mt-2">
                    Discover {category} Fragrances
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
