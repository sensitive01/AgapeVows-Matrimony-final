import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSearch,
  FaClock,
  FaDirections,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { getAllEvents } from "../../api/axiosService/userSignUpService";
import LayoutComponent from "../../components/layouts/LayoutComponent";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchState, setSearchState] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Attempt to auto-detect user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Location access denied or error:", error);
        }
      );
    }

    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await getAllEvents();
        if (response.data && response.data.success) {
          setEvents(response.data.data);
        } else if (Array.isArray(response.data)) {
          setEvents(response.data);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter and Sort Events
  const getFilteredAndSortedEvents = () => {
    let filtered = [...events];

    if (searchState.trim()) {
      const query = searchState.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          (event.state && event.state.toLowerCase().includes(query)) ||
          (event.location && event.location.toLowerCase().includes(query))
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });

    return filtered;
  };

  const displayedEvents = getFilteredAndSortedEvents();

  const handleSearchChange = (e) => {
    setSearchState(e.target.value);
  };

  const formatEventDate = (dateString) => {
    if (!dateString) return { date: "TBD", time: "TBD", fullDate: null };
    const dateObj = new Date(dateString);
    return {
      date: dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      fullDate: dateObj,
    };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-white shadow-sm">
        <LayoutComponent />
      </div>

      {/* Main Content - Added adequate top padding to prevent overlap */}
      <div className="flex-grow pt-32 md:pt-40 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Page Title & Search Section */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Current & Upcoming Events
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto mb-8 text-sm md:text-base">
            Discover and join celebrations, gatherings, and special occasions
            near you.
          </p>

          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400 group-focus-within:text-purple-600 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search by locations (e.g., Kerala, Bengaluru)..."
              value={searchState}
              onChange={handleSearchChange}
              className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm transition-all duration-200 ease-in-out"
            />
          </div>
          {userLocation && !searchState && (
            <div className="mt-3 flex items-center justify-center text-xs text-green-600 font-medium">
              <FaMapMarkerAlt className="mr-1" />
              Location detected. Listing all events sorted by date.
            </div>
          )}
        </div>

        {/* Events Grid/List */}
        <div className="space-y-6 md:space-y-8">
          {displayedEvents.length > 0 ? (
            displayedEvents.map((event) => {
              const { date, time } = formatEventDate(event.date);

              return (
                <div
                  key={event._id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col md:flex-row group"
                >
                  {/* Image Container - Responsive sizing */}
                  <div className="md:w-2/5 lg:w-1/3 relative overflow-hidden min-h-[250px] md:min-h-[auto]">
                    <img
                      src={
                        event.image ||
                        "https://via.placeholder.com/600x400?text=Event+Image"
                      }
                      alt={event.name}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-none"></div>

                    {/* Status Badge */}
                    {event.status === "Active" && (
                      <span className="absolute top-4 left-4 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        ACTIVE
                      </span>
                    )}

                    {/* Mobile Only: Text Overlay for Title on Image */}
                    <div className="absolute bottom-4 left-4 right-4 md:hidden text-white">
                      <h3 className="text-xl font-bold truncate shadow-black drop-shadow-md">
                        {event.name}
                      </h3>
                      <p className="text-sm opacity-90 flex items-center">
                        <FaCalendarAlt className="mr-1.5 size-3" /> {date}
                      </p>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col">
                    {/* Desktop Date/Time Row */}
                    <div className="hidden md:flex flex-wrap gap-4 mb-4 text-sm font-medium text-gray-500">
                      <div className="flex items-center text-purple-600 bg-purple-50 px-3 py-1 rounded-md">
                        <FaCalendarAlt className="mr-2" />
                        {date}
                      </div>
                      <div className="flex items-center bg-gray-50 px-3 py-1 rounded-md">
                        <FaClock className="mr-2" />
                        {time}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="mb-4">
                      <h2 className="hidden md:block text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-200">
                        {event.name}
                      </h2>
                      <div className="flex items-start text-gray-600 mb-3">
                        <FaMapMarkerAlt className="mt-1 mr-2 flex-shrink-0 text-gray-400" />
                        <span className="font-medium">
                          {event.location}
                          {event.state && (
                            <span className="text-gray-400 font-normal">
                              , {event.state}
                            </span>
                          )}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 md:line-clamp-2 lg:line-clamp-3">
                        {event.description}
                      </p>
                    </div>

                    {/* Actions & Contact */}
                    <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg w-full sm:w-auto">
                        <span className="font-semibold mr-2 text-gray-900">
                          Contact:
                        </span>
                        {event.contact}
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        {event.mapLink && (
                          <a
                            href={event.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-purple-200 text-purple-700 font-medium rounded-lg hover:bg-purple-50 transition-colors text-sm"
                          >
                            <FaDirections /> Directions
                          </a>
                        )}
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform active:scale-95 transition-all text-sm">
                          View Details{" "}
                          <FaExternalLinkAlt className="text-xs opacity-70" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white rounded-3xl border border-dashed border-gray-300">
              <div className="bg-gray-50 p-4 rounded-full mb-4">
                <FaSearch className="text-4xl text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Events Found
              </h3>
              <p className="text-gray-500 max-w-sm mx-auto mb-6">
                We couldn't find any events matching "{searchState}". Try
                checking the spelling or searching for a broader location.
              </p>
              <button
                onClick={() => setSearchState("")}
                className="text-purple-600 font-semibold hover:text-purple-800 hover:underline transition-colors"
              >
                Clear Search & Show All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
