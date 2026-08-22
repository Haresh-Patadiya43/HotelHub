import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../componets/Loader";
import video from "../assets/hotel-page-vedio.mp4";

const Hotels = () => {
  // ==============================
  // HOTEL DATA
  // ==============================
  const [hotelsData, setHotelsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==============================
  // SEARCH STATES
  // ==============================
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
  });

  // ==============================
  // SUGGESTION STATES
  // ==============================
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);

  const destinationRef = useRef(null);

  // ==============================
  // PAGINATION
  // ==============================
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // ==============================
  // FETCH HOTELS
  // ==============================
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hotels");

        if (!response.ok) {
          throw new Error("Failed to fetch hotels");
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.hotels)) {
          setHotelsData(data.hotels);
        } else {
          setHotelsData([]);
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setHotelsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // ==============================
  // CLOSE SUGGESTIONS
  // ==============================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        destinationRef.current &&
        !destinationRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ==============================
  // DESTINATION SUGGESTIONS
  // ==============================
  const suggestions = useMemo(() => {
    const search = destination.trim().toLowerCase();

    if (!search) {
      return [];
    }

    const results = [];

    hotelsData.forEach((hotel) => {
      const hotelName = hotel.name?.trim() || "";
      const location = hotel.location?.trim() || "";
      const city = hotel.city?.trim() || "";

      const hotelNameLower = hotelName.toLowerCase();
      const locationLower = location.toLowerCase();
      const cityLower = city.toLowerCase();

      // Hotel name match
      if (hotelNameLower.includes(search)) {
        results.push({
          type: "hotel",
          value: hotelName,
          label: hotelName,
          subLabel: location || city,
          id: hotel._id,
        });
      }

      // City match
      if (
        city &&
        cityLower.includes(search) &&
        !results.some((item) => item.type === "city" && item.value === city)
      ) {
        results.push({
          type: "city",
          value: city,
          label: city,
          subLabel: "City",
          id: `city-${city}`,
        });
      }

      // Location match
      if (
        location &&
        locationLower.includes(search) &&
        !results.some(
          (item) => item.type === "location" && item.value === location,
        )
      ) {
        results.push({
          type: "location",
          value: location,
          label: location,
          subLabel: "Location",
          id: `location-${location}`,
        });
      }
    });

    // Remove duplicates
    const uniqueResults = results.filter(
      (item, index, self) =>
        index ===
        self.findIndex(
          (suggestion) =>
            suggestion.type === item.type &&
            suggestion.value.toLowerCase() === item.value.toLowerCase(),
        ),
    );

    return uniqueResults.slice(0, 8);
  }, [destination, hotelsData]);

  // ==============================
  // SELECT SUGGESTION
  // ==============================
  const handleSuggestionClick = (suggestion) => {
    setDestination(suggestion.value);

    setSearchData({
      destination: suggestion.value,
      checkIn,
      checkOut,
      guests,
    });

    setCurrentPage(1);
    setShowSuggestions(false);
    setSelectedSuggestion(-1);
  };

  // ==============================
  // DESTINATION CHANGE
  // ==============================
  const handleDestinationChange = (e) => {
    const value = e.target.value;

    setDestination(value);
    setShowSuggestions(true);
    setSelectedSuggestion(-1);
  };

  // ==============================
  // KEYBOARD NAVIGATION
  // ==============================
  const handleDestinationKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) {
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();

      setSelectedSuggestion((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0,
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      setSelectedSuggestion((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1,
      );
    }

    if (e.key === "Enter" && selectedSuggestion >= 0) {
      e.preventDefault();

      handleSuggestionClick(suggestions[selectedSuggestion]);
    }

    if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedSuggestion(-1);
    }
  };

  // ==============================
  // SEARCH HANDLER
  // ==============================
  const handleSearch = (e) => {
    e.preventDefault();

    setSearchData({
      destination: destination.trim(),
      checkIn,
      checkOut,
      guests,
    });

    setCurrentPage(1);
    setShowSuggestions(false);
    setSelectedSuggestion(-1);
  };

  // ==============================
  // CLEAR SEARCH
  // ==============================
  const clearSearch = () => {
    setDestination("");
    setCheckIn("");
    setCheckOut("");
    setGuests("2");

    setSearchData({
      destination: "",
      checkIn: "",
      checkOut: "",
      guests: "2",
    });

    setCurrentPage(1);
    setShowSuggestions(false);
    setSelectedSuggestion(-1);
  };

  // ==============================
  // FILTER HOTELS
  // ==============================
  const filteredHotels = useMemo(() => {
    let result = [...hotelsData];

    if (searchData.destination) {
      const search = searchData.destination.toLowerCase();

      result = result.filter((hotel) => {
        const hotelName = hotel.name?.toLowerCase() || "";
        const location = hotel.location?.toLowerCase() || "";
        const city = hotel.city?.toLowerCase() || "";

        return (
          hotelName.includes(search) ||
          location.includes(search) ||
          city.includes(search)
        );
      });
    }

    return result;
  }, [hotelsData, searchData]);

  // ==============================
  // PAGINATION
  // ==============================
  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentHotels = filteredHotels.slice(indexOfFirstItem, indexOfLastItem);

  // ==============================
  // PAGE CHANGE
  // ==============================
  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==============================
  // AMENITY ICON
  // ==============================
  const AmenityIcon = ({ type }) => {
    switch (type) {
      case "Free Wi-Fi":
        return (
          <svg
            className="w-3.5 h-3.5 mr-1 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
            />
          </svg>
        );

      case "Pool":
        return (
          <svg
            className="w-3.5 h-3.5 mr-1 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 11a9 9 0 019 9m-9-9a9 9 0 009-9m-9 9H3m9 9v1m0-19V2"
            />
          </svg>
        );

      case "Parking":
        return (
          <svg
            className="w-3.5 h-3.5 mr-1 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 8h8a4 4 0 110 8H5V8z"
            />
          </svg>
        );

      case "Breakfast":
        return (
          <svg
            className="w-3.5 h-3.5 mr-1 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 8h-2.5m0 0V4a1 1 0 00-1-1H5a1 1 0 00-1 1v4m13.5 0A2.5 2.5 0 0120 10.5v1A2.5 2.5 0 0117.5 14H17v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2H4.5A2.5 2.5 0 012 11.5v-1A2.5 2.5 0 014.5 8h2.5"
            />
          </svg>
        );

      default:
        return null;
    }
  };

  // ==============================
  // LOADING
  // ==============================
  if (loading) {
    return <Loader />;
  }

  return (
   <div className="w-full min-h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
      {/* =====================================
          HERO + SEARCH
      ===================================== */}
      <div className="w-full mb-12 lg:mb-16">
        {/* HERO */}
        {/* =====================================
    HERO
===================================== */}
<section
  className="
    relative
    w-full
    min-h-[350px]
    lg:h-[450px]
    flex
    flex-col
    justify-center
    bg-gray-900
    overflow-hidden
  "
>
  {/* BACKGROUND VIDEO */}
  <video
    className="
      absolute
      inset-0
      w-full
      h-full
      object-cover
      animate-[heroZoom_18s_ease-in-out_infinite_alternate]
    "
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
  >
    <source src={video} type="video/mp4" />
  </video>

  {/* DARK OVERLAY */}
  <div
    className="
      absolute
      inset-0
      bg-black/45
      animate-[heroOverlay_6s_ease-in-out_infinite]
    "
  />

  {/* GRADIENT OVERLAY */}
  <div
    className="
      absolute
      inset-0
      bg-gradient-to-r
      from-black/70
      via-black/40
      to-transparent
    "
  />

  {/* DECORATIVE GLOW */}
  <div
    className="
      absolute
      -right-20
      top-10
      w-72
      h-72
      rounded-full
      bg-blue-500/20
      blur-3xl
      animate-[glowMove_7s_ease-in-out_infinite]
    "
  />

  {/* SECOND GLOW */}
  <div
    className="
      absolute
      -left-32
      bottom-0
      w-80
      h-80
      rounded-full
      bg-blue-600/10
      blur-3xl
      animate-pulse
    "
  />

  {/* HERO CONTENT */}
  <div
    className="
      relative
      z-10
      max-w-6xl
      mx-auto
      w-full
      px-6
      pt-10
      pb-20
      lg:py-0
      text-white
    "
  >

    {/* TITLE */}
    <h1
      className="
        text-4xl
        md:text-5xl
        lg:text-6xl
        font-extrabold
        text-white
        mb-4
        tracking-tight
        animate-[fadeInLeft_1s_ease-out]
      "
    >
      Find Your
      <span className="text-blue-400 ml-2">
        Perfect Stay
      </span>
    </h1>

    {/* DESCRIPTION */}
    <p
      className="
        text-gray-200
        text-base
        md:text-lg
        max-w-lg
        leading-relaxed
        animate-[fadeInUp_1.2s_ease-out]
      "
    >
      Discover top-rated hotels and enjoy a
      memorable stay with HotelHub.
    </p>

    {/* SMALL FEATURE TEXT */}
    <div
      className="
        flex
        flex-wrap
        gap-5
        mt-6
        text-sm
        text-white/80
        animate-[fadeInUp_1.4s_ease-out]
      "
    >
      <span className="flex items-center gap-2">
        <span className="text-blue-400">✓</span>
        Best Hotels
      </span>

      <span className="flex items-center gap-2">
        <span className="text-blue-400">✓</span>
        Easy Booking
      </span>

      <span className="flex items-center gap-2">
        <span className="text-blue-400">✓</span>
        Premium Stay
      </span>
    </div>
  </div>

  {/* SCROLL INDICATOR */}
  <div
    className="
      absolute
      bottom-6
      left-1/2
      -translate-x-1/2
      flex
      flex-col
      items-center
      text-white/60
      animate-[scrollIndicator_1.8s_ease-in-out_infinite]
    "
  >
    <span className="text-[10px] uppercase tracking-widest mb-1">
      Scroll
    </span>

    <div
      className="
        w-5
        h-8
        rounded-full
        border
        border-white/40
        flex
        justify-center
        pt-1
      "
    >
      <span
        className="
          w-0.5
          h-1.5
          bg-white
          rounded-full
        "
      />
    </div>
  </div>
</section>

        {/* SEARCH BAR */}
        <div
          className="
            relative
            z-20
            max-w-6xl
            mx-auto
            w-full
            px-6
            -mt-16
            lg:-mt-12
            animate-[searchBarReveal_1s_ease-out]
          "
        >
          <form
            onSubmit={handleSearch}
            className="
              bg-white
              p-3
              rounded-2xl
              flex
              flex-col
              lg:flex-row
              items-center
              shadow-xl
              shadow-gray-200/50
              w-full
              border
              border-gray-100
              hover:shadow-2xl
              transition-shadow
              duration-500
            "
          >
            {/* DESTINATION */}
            <div
              ref={destinationRef}
              className="
                relative
                flex-1
                w-full
                p-2
                border-b
                lg:border-b-0
                lg:border-r
                border-gray-100
                px-4
              "
            >
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Destination
              </label>

              <div className="flex items-center">
                <svg
                  className="
                    w-4
                    h-4
                    text-gray-400
                    mr-2
                    flex-shrink-0
                    transition-transform
                    duration-300
                    focus-within:scale-110
                  "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <input
                  type="text"
                  value={destination}
                  onChange={handleDestinationChange}
                  onFocus={() => {
                    if (destination.trim()) {
                      setShowSuggestions(true);
                    }
                  }}
                  onKeyDown={handleDestinationKeyDown}
                  placeholder="Where are you going?"
                  autoComplete="off"
                  className="
                    w-full
                    text-sm
                    outline-none
                    placeholder-gray-400
                  "
                />
              </div>

              {/* SUGGESTIONS */}
              {showSuggestions &&
                destination.trim() &&
                suggestions.length > 0 && (
                  <div
                    className="
                      absolute
                      left-0
                      right-0
                      top-full
                      mt-2
                      bg-white
                      border
                      border-gray-200
                      rounded-xl
                      shadow-xl
                      overflow-hidden
                      z-[100]
                      animate-[dropdownIn_0.25s_ease-out]
                    "
                  >
                    <div
                      className="
                        px-4
                        py-2
                        text-[11px]
                        font-semibold
                        text-gray-400
                        uppercase
                        tracking-wide
                        border-b
                        border-gray-100
                      "
                    >
                      Suggestions
                    </div>

                    {suggestions.map((suggestion, index) => (
                      <button
                        key={suggestion.id}
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`
                          w-full
                          px-4
                          py-3
                          flex
                          items-center
                          gap-3
                          text-left
                          transition-all
                          duration-200
                          hover:translate-x-1
                          ${
                            selectedSuggestion === index
                              ? "bg-blue-50"
                              : "hover:bg-gray-50"
                          }
                        `}
                      >
                        <div
                          className="
                            w-9
                            h-9
                            rounded-full
                            bg-blue-50
                            flex
                            items-center
                            justify-center
                            flex-shrink-0
                            transition-transform
                            duration-300
                          "
                        >
                          {suggestion.type === "hotel" ? (
                            <svg
                              className="w-4 h-4 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 21h18M5 21V7a2 2 0 012-2h10a2 2 0 012 2v14M9 21v-4h6v4M8 9h1m6 0h1M8 12h1m6 0h1"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-4 h-4 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 21s8-4.438 8-11a8 8 0 10-16 0c0 6.562 8 11 8 11z"
                              />
                              <circle cx="12" cy="10" r="2.5" />
                            </svg>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {suggestion.label}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {suggestion.subLabel}
                          </p>
                        </div>

                        <svg
                          className="
                            w-4
                            h-4
                            text-gray-300
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                          "
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                )}

              {/* NO SUGGESTION */}
              {showSuggestions &&
                destination.trim() &&
                suggestions.length === 0 && (
                  <div
                    className="
                      absolute
                      left-0
                      right-0
                      top-full
                      mt-2
                      bg-white
                      border
                      border-gray-200
                      rounded-xl
                      shadow-xl
                      z-[100]
                      animate-[dropdownIn_0.25s_ease-out]
                    "
                  >
                    <div className="px-4 py-4 text-sm text-gray-500 text-center">
                      No matching hotels or destinations found.
                    </div>
                  </div>
                )}
            </div>

            {/* CHECK IN */}
            <div
              className="
                w-full
                lg:w-48
                p-2
                border-b
                lg:border-b-0
                lg:border-r
                border-gray-100
                px-4
              "
            >
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Check-in
              </label>

              <div className="flex items-center justify-between">
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);

                    if (checkOut && e.target.value >= checkOut) {
                      setCheckOut("");
                    }
                  }}
                  min={new Date().toISOString().split("T")[0]}
                  className="
                    w-full
                    text-sm
                    outline-none
                    text-gray-600
                    transition-all
                    duration-300
                    focus:text-blue-600
                  "
                />
              </div>
            </div>

            {/* CHECK OUT */}
            <div
              className="
                w-full
                lg:w-48
                p-2
                border-b
                lg:border-b-0
                lg:border-r
                border-gray-100
                px-4
              "
            >
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Check-out
              </label>

              <div className="flex items-center justify-between">
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || new Date().toISOString().split("T")[0]}
                  className="
                    w-full
                    text-sm
                    outline-none
                    text-gray-600
                    transition-all
                    duration-300
                    focus:text-blue-600
                  "
                />
              </div>
            </div>

            {/* GUESTS */}
            <div className="w-full lg:w-48 p-2 px-4">
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Guests
              </label>

              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-gray-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>

                <input
                  type="number"
                  min="1"
                  max="20"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full text-sm outline-none"
                />

                <span className="text-xs text-gray-500 ml-1">Guests</span>
              </div>
            </div>

            {/* SEARCH BUTTON */}
            <div className="p-3 w-full lg:w-auto">
              <button
                type="submit"
                className="
                  w-full
                  lg:w-auto
                  bg-[#1A63F4]
                  hover:bg-blue-700
                  text-white
                  text-sm
                  font-semibold
                  px-8
                  py-3.5
                  rounded-lg
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                  hover:shadow-blue-500/30
                  active:scale-95
                "
              >
                Search Hotels
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* =====================================
          MAIN CONTENT
      ===================================== */}
      <section className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-end
            justify-between
            mb-8
            gap-4
            animate-[fadeInUp_0.8s_ease-out]
          "
        >
          <div>
            <p
              className="
                text-blue-600
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                mb-2
              "
            >
              Explore & Stay
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {searchData.destination
                ? `Hotels in "${searchData.destination}"`
                : "All Hotels"}
            </h2>

            <p className="text-gray-500 text-sm">
              {filteredHotels.length}{" "}
              {filteredHotels.length === 1 ? "hotel" : "hotels"} found
            </p>
          </div>

          {/* CLEAR SEARCH */}
          {(searchData.destination ||
            searchData.checkIn ||
            searchData.checkOut) && (
            <button
              onClick={clearSearch}
              className="
                text-sm
                text-blue-600
                font-medium
                hover:underline
                hover:-translate-y-0.5
                transition-all
                duration-300
              "
            >
              Clear Search
            </button>
          )}
        </div>

        {/* =====================================
            NO RESULTS
        ===================================== */}
        {filteredHotels.length === 0 ? (
          <div
            className="
              bg-white
              rounded-2xl
              border
              border-gray-200
              p-12
              text-center
              animate-[emptyStateIn_0.7s_ease-out]
            "
          >
            <div className="text-5xl mb-4 animate-bounce">🏨</div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No hotels found
            </h3>

            <p className="text-gray-500 text-sm mb-5">
              We couldn't find any hotels matching your destination.
            </p>

            <button
              onClick={clearSearch}
              className="
                bg-[#1A63F4]
                hover:bg-blue-700
                text-white
                text-sm
                font-semibold
                px-6
                py-2.5
                rounded-lg
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-md
              "
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          /* =====================================
              HOTEL GRID
          ===================================== */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentHotels.map((hotel) => (
              <div
                key={hotel._id}
                className="
                  bg-white
                  rounded-2xl
                  overflow-hidden
                  border
                  border-gray-100
                  shadow-sm
                  hover:shadow-xl
                  transition-all
                  duration-300
                  flex
                  flex-col
                  group
                  hover:-translate-y-1.5
                "
              >
                {/* CARD IMAGE */}
                <div className="relative h-52 overflow-hidden bg-gray-200">
                  <img
                    src={
                      hotel.images?.[0] ||
                      hotel.image ||
                      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
                    }
                    alt={hotel.name}
                    className="
                      w-full
                      h-full
                      object-cover
                      group-hover:scale-105
                      transition-transform
                      duration-500
                    "
                  />

                  {/* RATING BADGE */}
                  {hotel.rating && (
                    <div
                      className="
                        absolute
                        top-3
                        right-3
                        bg-white/90
                        backdrop-blur-md
                        px-2.5
                        py-1
                        rounded-full
                        text-xs
                        font-bold
                        text-gray-800
                        flex
                        items-center
                        shadow-md
                      "
                    >
                      <span className="text-yellow-400 mr-1">★</span>
                      {hotel.rating}
                    </div>
                  )}

                  {/* CITY BADGE */}
                  {hotel.city && (
                    <div
                      className="
                        absolute
                        bottom-3
                        left-3
                        bg-black/60
                        backdrop-blur-md
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-medium
                        text-white
                      "
                    >
                      {hotel.city}
                    </div>
                  )}
                </div>

                {/* CARD DETAILS */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {hotel.name}
                    </h3>

                    <p className="text-xs text-gray-500 mb-4 flex items-center">
                      <svg
                        className="w-3.5 h-3.5 text-gray-400 mr-1 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="truncate">
                        {hotel.location ||
                          hotel.address ||
                          "Location unavailable"}
                      </span>
                    </p>

                    {/* AMENITIES */}
                    {hotel.amenities && hotel.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                          <span
                            key={idx}
                            className="
                              inline-flex
                              items-center
                              text-[11px]
                              bg-gray-100
                              text-gray-600
                              px-2.5
                              py-1
                              rounded-md
                              font-medium
                            "
                          >
                            <AmenityIcon type={amenity} />
                            {amenity}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* PRICE & ACTION */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-xs text-gray-400 block">
                        Starting from
                      </span>
                      <span className="text-xl font-extrabold text-gray-900">
                        ${hotel.pricePerNight || hotel.price || "N/A"}
                      </span>
                      <span className="text-xs text-gray-500"> / night</span>
                    </div>

                    <Link
                        to={`/hotel/${hotel._id}`}
                        className="
                          bg-[#1A63F4]
                          hover:bg-blue-700
                          text-white
                          px-5
                          py-2
                          rounded-lg

                          hover:-translate-y-1
                          hover:shadow-lg
                          hover:shadow-blue-500/30

                          active:scale-95

                          transition-all
                          duration-300
                        "
                      >
                        View Details
                      </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =====================================
            PAGINATION CONTROLS
        ===================================== */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              className="
                px-3.5
                py-2
                rounded-lg
                border
                border-gray-200
                bg-white
                text-xs
                font-medium
                text-gray-600
                hover:bg-gray-50
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition-all
              "
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => changePage(pageNumber)}
                  className={`
                    w-9
                    h-9
                    rounded-lg
                    text-xs
                    font-semibold
                    transition-all
                    ${
                      currentPage === pageNumber
                        ? "bg-[#1A63F4] text-white shadow-md shadow-blue-500/20"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="
                px-3.5
                py-2
                rounded-lg
                border
                border-gray-200
                bg-white
                text-xs
                font-medium
                text-gray-600
                hover:bg-gray-50
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition-all
              "
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Hotels;
