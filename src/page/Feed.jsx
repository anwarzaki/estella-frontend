import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import useUser from "../hooks/useUser";

const Feeds = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAdmin } = useUser();

  useEffect(() => {
    fetchFeeds();
  }, []);

  const fetchFeeds = async () => {
    setLoading(true);
    setError(null);
    // const token = localStorage.getItem("authToken");

    // if (!token) {
    //   setError("No authentication token found. Please log in.");
    //   setLoading(false);
    //   return;
    // }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}feeds`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch feeds: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.success) {
        setFeeds(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch feeds");
      }
    } catch (error) {
      console.error("Error fetching feeds:", error);
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feed?")) {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("No authentication token found. Please log in.");
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}feeds/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to delete feed: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.success) {
          setFeeds(feeds.filter((feed) => feed._id !== id));
        } else {
          throw new Error(data.message || "Failed to delete feed");
        }
      } catch (error) {
        console.error("Error deleting feed:", error);
        alert(error.message || "Something went wrong. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-4">Loading feeds...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-[64px]">
      <Navbar />
      <div className="container mx-auto px-4 py-8 items-center w-[1000px]">
        {isAdmin && (
          <Link
            to="/admin"
            className="inline-block mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Add New Feed
          </Link>
        )}

        {feeds.length === 0 ? (
          <p className="text-center text-gray-500">No feeds available.</p>
        ) : (
          <div className="space-y-8">
            {feeds.map((feed) => (
              <div
                key={feed._id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={feed.imgSrc}
                    alt={feed.title}
                    className="w-full h-[300px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-3xl font-bold text-white">
                    {feed.title}
                  </h3>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {feed.category}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-6">{feed.content}</p>

                  {isAdmin && (
                    <div className="flex justify-end space-x-4">
                      <Link
                        to={`/feeds/edit/${feed._id}`}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(feed._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feeds;
