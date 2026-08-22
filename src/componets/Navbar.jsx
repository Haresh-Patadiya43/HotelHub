import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const API_URL = "http://localhost:5000/api/hotels";

/* =========================================================
   SEARCH BOX
   ========================================================= */
const SearchBox = ({
  mobile = false,
  searchTerm,
  setSearchTerm,
  hotels,
  onHotelSelect,
  onSearchSubmit,
  setIsMobileMenuOpen,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  /* =======================================================
     FILTER HOTELS
     ======================================================= */
  const filteredHotels =
    searchTerm.trim().length > 0
      ? hotels
          .filter((hotel) => {
            const search = searchTerm.toLowerCase().trim();

            const hotelName = String(
              hotel.name || hotel.hotelName || hotel.title || "",
            ).toLowerCase();

            const city = String(
              hotel.city || hotel.location || hotel.address || "",
            ).toLowerCase();

            return hotelName.includes(search) || city.includes(search);
          })
          .slice(0, 6)
      : [];

  /* =======================================================
     INPUT CHANGE
     ======================================================= */
  const handleChange = (e) => {
    const value = e.target.value;

    setSearchTerm(value);

    if (value.trim()) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  /* =======================================================
     INPUT FOCUS
     ======================================================= */
  const handleFocus = () => {
    if (searchTerm.trim()) {
      setShowSuggestions(true);
    }
  };

  /* =======================================================
     SELECT HOTEL
     ======================================================= */
  const handleSelect = (hotel) => {
    const hotelId = hotel._id || hotel.id;

    setShowSuggestions(false);
    setSearchTerm("");
    setIsMobileMenuOpen(false);

    onHotelSelect(hotel);

    console.log("Selected Hotel:", hotel);
    console.log("Hotel ID:", hotelId);
  };

  /* =======================================================
     SUBMIT SEARCH
     ======================================================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    const query = searchTerm.trim();

    if (!query) {
      return;
    }

    setShowSuggestions(false);
    setIsMobileMenuOpen(false);

    onSearchSubmit(query);
  };

  /* =======================================================
     CLICK OUTSIDE
     ======================================================= */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".hotel-search-container")) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`hotel-search-container relative ${
        mobile ? "w-full" : "w-auto"
      }`}
    >
      {/* =================================================
          SEARCH FORM
      ================================================= */}
      <form onSubmit={handleSubmit}>
        {/* Search Icon */}
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="Search hotels..."
          autoComplete="off"
          className={`
            bg-[#EBF3FE]
            text-gray-700
            outline-none
            rounded-full
            transition-all
            focus:ring-2
            focus:ring-blue-500/20
            ${
              mobile
                ? "text-sm w-full pl-9 pr-4 py-2.5"
                : "text-xs w-48 lg:w-56 pl-9 pr-4 py-2.5"
            }
          `}
        />
      </form>

      {/* =================================================
          SEARCH DROPDOWN
      ================================================= */}
      {showSuggestions && searchTerm.trim() && (
        <div
          className={`
            absolute
            top-full
            left-0
            mt-2
            bg-white
            rounded-2xl
            border
            border-gray-200
            shadow-2xl
            overflow-hidden
            z-[99999]
            ${mobile ? "w-full" : "w-[320px]"}
          `}
        >
          {/* Dropdown Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Hotel Suggestions
            </p>
          </div>

          {/* =================================================
              HOTEL RESULTS
          ================================================= */}
          {filteredHotels.length > 0 ? (
            <>
              {filteredHotels.map((hotel) => {
                const hotelName =
                  hotel.name || hotel.hotelName || hotel.title || "Hotel";

                const city =
                  hotel.city ||
                  hotel.location ||
                  hotel.address ||
                  "Location unavailable";

                const image =
                  hotel.image || hotel.imageUrl || hotel.images?.[0] || null;

                const hotelId = hotel._id || hotel.id;

                return (
                  <button
                    key={hotelId || hotelName}
                    type="button"
                    onMouseDown={(e) => {
                      // Prevent input from losing focus
                      e.preventDefault();
                    }}
                    onClick={() => handleSelect(hotel)}
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      text-left
                      hover:bg-blue-50
                      transition-colors
                    "
                  >
                    {/* Hotel Image */}
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                      {image ? (
                        <img
                          src={image}
                          alt={hotelName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl">
                          🏨
                        </div>
                      )}
                    </div>

                    {/* Hotel Information */}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {hotelName}
                      </p>

                      <p className="text-xs text-gray-500 mt-1 truncate">
                        📍 {city}
                      </p>
                    </div>

                    {/* Arrow */}
                    <svg
                      className="w-4 h-4 text-gray-400 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                );
              })}

              {/* View All */}
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={() => {
                  setShowSuggestions(false);
                  setIsMobileMenuOpen(false);

                  onSearchSubmit(searchTerm.trim());
                }}
                className="
                  w-full
                  px-4
                  py-3
                  border-t
                  border-gray-100
                  text-sm
                  font-semibold
                  text-blue-600
                  hover:bg-blue-50
                  transition-colors
                "
              >
                View all results for "{searchTerm}"
              </button>
            </>
          ) : (
            /* =================================================
               NO RESULTS
            ================================================= */
            <div className="px-4 py-7 text-center">
              <div className="text-3xl mb-2">🏨</div>

              <p className="text-sm font-semibold text-gray-700">
                No hotels found
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Try another hotel name or city.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* =========================================================
   NAVBAR
   ========================================================= */
const Navbar = ({ isLoggedIn, onLoginClick, onLogout }) => {
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [activeLink, setActiveLink] = useState("home");

  /* =======================================================
     HOTEL DATA
     ======================================================= */
  const [hotels, setHotels] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [searchLoading, setSearchLoading] = useState(true);

  /* =======================================================
     FETCH HOTELS
     ======================================================= */
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setSearchLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        console.log("Hotels API:", data);

        if (Array.isArray(data)) {
          setHotels(data);
        } else if (Array.isArray(data.hotels)) {
          setHotels(data.hotels);
        } else if (Array.isArray(data.data)) {
          setHotels(data.data);
        } else {
          setHotels([]);
        }
      } catch (error) {
        console.error("Failed to fetch hotels:", error);

        setHotels([]);
      } finally {
        setSearchLoading(false);
      }
    };

    fetchHotels();
  }, []);

  /* =======================================================
     DESKTOP LINK STYLE
     ======================================================= */
  const getDesktopLinkStyle = (linkName) => {
    return activeLink === linkName
      ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
      : "text-gray-600 hover:text-gray-900 transition-colors border-b-2 border-transparent pb-1";
  };

  /* =======================================================
     MOBILE LINK STYLE
     ======================================================= */
  const getMobileLinkStyle = (linkName) => {
    return activeLink === linkName
      ? "text-blue-600 font-semibold"
      : "text-gray-600 font-medium hover:text-blue-600";
  };

  /* =======================================================
     LINK CLICK
     ======================================================= */
  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    setIsMobileMenuOpen(false);
  };

  /* =======================================================
     SELECT HOTEL
     ======================================================= */
  const handleHotelSelect = (hotel) => {
    const hotelId = hotel._id || hotel.id;

    if (hotelId) {
      setSearchTerm("");
      setIsMobileMenuOpen(false);

      navigate(`/hotel/${hotelId}`);
    } else {
      navigate("/hotels");
    }
  };

  /* =======================================================
     SEARCH SUBMIT
     ======================================================= */
  const handleSearchSubmit = (query) => {
    if (!query) return;

    setIsMobileMenuOpen(false);

    navigate(`/hotels?search=${encodeURIComponent(query)}`);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      {/* =================================================
          MAIN NAVBAR
      ================================================= */}
      <div className="flex items-center justify-between px-4 lg:px-8 py-2">
        {/* =================================================
            LOGO
            MEDIUM SIZE
        ================================================= */}
        <div className="flex items-center cursor-pointer shrink-0">
          <Link to="/" onClick={() => handleLinkClick("home")}>
            <img
              src={logo}
              alt="HotelHub Logo"
              className="
                w-[90px]
                h-[55px]
                object-contain
              "
            />
          </Link>
        </div>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}
        <div className="hidden lg:flex items-center space-x-8 text-sm font-medium">
          <NavLink
            to="/"
            onClick={() => handleLinkClick("home")}
            className={getDesktopLinkStyle("home")}
          >
            Home
          </NavLink>

          <NavLink
            to="/hotels"
            onClick={() => handleLinkClick("hotels")}
            className={getDesktopLinkStyle("hotels")}
          >
            Hotels
          </NavLink>

          <NavLink
            to="/experiences"
            onClick={() => handleLinkClick("experiences")}
            className={getDesktopLinkStyle("experiences")}
          >
            Experiences
          </NavLink>

          <NavLink
            to="/offers"
            onClick={() => handleLinkClick("offers")}
            className={getDesktopLinkStyle("offers")}
          >
            Offers
          </NavLink>

          <NavLink
            to="/contactus"
            onClick={() => handleLinkClick("contactus")}
            className={getDesktopLinkStyle("contactus")}
          >
            Contact Us
          </NavLink>

          {isLoggedIn && (
            <NavLink
              to="/my-bookings"
              onClick={() => handleLinkClick("bookings")}
              className={getDesktopLinkStyle("bookings")}
            >
              My Bookings
            </NavLink>
          )}
        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}
        <div className="flex items-center space-x-3 lg:space-x-4">
          {/* Desktop Search */}
          <div className="hidden md:flex items-center">
            <SearchBox
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              hotels={hotels}
              onHotelSelect={handleHotelSelect}
              onSearchSubmit={handleSearchSubmit}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </div>

          {/* Profile */}
          {isLoggedIn && (
            <Link
              to="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="
                hidden
                lg:flex
                items-center
                text-gray-600
                text-sm
                font-medium
                hover:text-blue-600
                transition-colors
              "
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A8.97 8.97 0 0012 16.5a8.97 8.97 0 00-5.982 2.225M15 9a3 3 0 11-6 0 3 3 0 016 0zm6 3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Profile
            </Link>
          )}

          {/* Book Now */}
          <button
            onClick={() => navigate("/hotels")}
            className="
              hidden
              sm:block
              bg-[#0052CC]
              hover:bg-blue-700
              text-white
              text-xs
              lg:text-sm
              font-semibold
              px-4
              py-2
              lg:py-2.5
              rounded-lg
              transition-colors
              shadow-sm
              whitespace-nowrap
              cursor-pointer
            "
          >
            Book Now
          </button>

          {/* Login / Logout */}
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="
                hidden
                sm:block
                bg-red-600
                hover:bg-red-700
                text-white
                text-xs
                lg:text-sm
                font-semibold
                px-4
                py-2
                lg:py-2.5
                rounded-lg
                transition-colors
                shadow-sm
                whitespace-nowrap
                cursor-pointer
              "
            >
              Logout
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="
                hidden
                sm:block
                bg-green-600
                hover:bg-green-700
                text-white
                text-xs
                lg:text-sm
                font-semibold
                px-4
                py-2
                lg:py-2.5
                rounded-lg
                transition-colors
                shadow-sm
                whitespace-nowrap
                cursor-pointer
              "
            >
              Login / Sign Up
            </button>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="
              lg:hidden
              text-gray-600
              hover:text-gray-900
              p-1
              focus:outline-none
            "
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* =================================================
          MOBILE MENU
      ================================================= */}
      {isMobileMenuOpen && (
        <div
          className="
            lg:hidden
            absolute
            top-full
            left-0
            w-full
            bg-white
            border-b
            border-gray-200
            px-4
            py-4
            shadow-lg
            z-50
            flex
            flex-col
            space-y-4
          "
        >
          {/* Mobile Search */}
          <div className="w-full">
            <SearchBox
              mobile
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              hotels={hotels}
              onHotelSelect={handleHotelSelect}
              onSearchSubmit={handleSearchSubmit}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </div>

          {/* Mobile Links */}
          <NavLink
            to="/"
            onClick={() => handleLinkClick("home")}
            className={getMobileLinkStyle("home")}
          >
            Home
          </NavLink>

          <NavLink
            to="/hotels"
            onClick={() => handleLinkClick("hotels")}
            className={getMobileLinkStyle("hotels")}
          >
            Hotels
          </NavLink>

          <NavLink
            to="/experiences"
            onClick={() => handleLinkClick("experiences")}
            className={getMobileLinkStyle("experiences")}
          >
            Experiences
          </NavLink>

          <NavLink
            to="/offers"
            onClick={() => handleLinkClick("offers")}
            className={getMobileLinkStyle("offers")}
          >
            Offers
          </NavLink>

          <NavLink
            to="/contactus"
            onClick={() => handleLinkClick("contactus")}
            className={getMobileLinkStyle("contactus")}
          >
            Contact Us
          </NavLink>

          {isLoggedIn && (
            <NavLink
              to="/my-bookings"
              onClick={() => handleLinkClick("bookings")}
              className={getMobileLinkStyle("bookings")}
            >
              My Bookings
            </NavLink>
          )}

          <hr className="border-gray-200" />

          {/* Mobile Profile */}
          {isLoggedIn && (
            <Link
              to="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="
                text-gray-600
                font-medium
                hover:text-blue-600
              "
            >
              Profile
            </Link>
          )}

          {/* Mobile Book Now */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate("/hotels");
            }}
            className="
              bg-[#0052CC]
              hover:bg-blue-700
              text-white
              py-2
              rounded-lg
              font-semibold
            "
          >
            Book Now
          </button>

          {/* Mobile Login / Logout */}
          {isLoggedIn ? (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onLogout();
              }}
              className="
                bg-red-600
                hover:bg-red-700
                text-white
                py-2
                rounded-lg
                font-semibold
              "
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onLoginClick();
              }}
              className="
                bg-green-600
                hover:bg-green-700
                text-white
                py-2
                rounded-lg
                font-semibold
              "
            >
              Login / Sign Up
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
