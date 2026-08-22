import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MyBookings = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  // ============================
  // ANIMATION VARIANTS
  // ============================

  const pageVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // ============================
  // FETCH MY BOOKINGS
  // ============================

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/bookings/my-bookings",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      console.log("My bookings:", data);

      if (data.success) {
        setBookings(data.bookings || []);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // CANCEL BOOKING
  // ============================

  const handleCancelBooking = async (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again.");
        return;
      }

      setCancellingId(bookingId);

      const response = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}/cancel`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      console.log("Cancel booking response:", data);

      if (data.success) {
        setBookings((previousBookings) =>
          previousBookings.map((booking) =>
            booking._id === bookingId
              ? {
                  ...booking,
                  bookingStatus: "cancelled",
                }
              : booking,
          ),
        );

        alert("Booking cancelled successfully.");
      } else {
        alert(data.message || "Unable to cancel booking.");
      }
    } catch (error) {
      console.error("Cancel Booking Error:", error);

      alert("Unable to cancel booking. Please try again.");
    } finally {
      setCancellingId(null);
    }
  };

  // ============================
  // LOADING
  // ============================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Animated Loader */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto"
          />

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-semibold text-gray-700 mt-5"
          >
            Loading your bookings...
          </motion.h2>
        </motion.div>
      </div>
    );
  }

  // ============================
  // PAGE
  // ============================

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50 py-10 px-4"
    >
      <div className="max-w-6xl mx-auto">

        {/* ============================
            HEADER
        ============================ */}

        <motion.div variants={itemVariants} className="mb-8">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900"
          >
            My Bookings
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-500 mt-2"
          >
            View and manage your hotel reservations.
          </motion.p>
        </motion.div>

        {/* ============================
            NO BOOKINGS
        ============================ */}

        {bookings.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-sm p-10 text-center"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-6xl mb-5"
            >
              🏨
            </motion.div>

            <h2 className="text-2xl font-bold text-gray-800">
              No bookings yet
            </h2>

            <p className="text-gray-500 mt-2">
              You haven't booked any hotel yet.
            </p>

            <motion.button
              whileHover={{
                scale: 1.05,
                y: -2,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={() => navigate("/")}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition cursor-pointer"
            >
              Explore Hotels
            </motion.button>
          </motion.div>
        ) : (
          /* ============================
             BOOKINGS
          ============================ */

          <motion.div
            variants={pageVariants}
            className="space-y-6"
          >
            <AnimatePresence>
              {bookings.map((booking, index) => {
                const checkIn = new Date(
                  booking.checkIn,
                ).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });

                const checkOut = new Date(
                  booking.checkOut,
                ).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <motion.div
                    key={booking._id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{
                      opacity: 0,
                      scale: 0.95,
                      y: -20,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    whileHover={{
                      y: -5,
                      boxShadow:
                        "0 15px 35px rgba(0,0,0,0.10)",
                    }}
                    className="bg-white rounded-2xl shadow-md overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">

                        {/* ============================
                            HOTEL IMAGE
                        ============================ */}

                        <motion.div
                          className="w-full md:w-60 h-40 overflow-hidden rounded-xl"
                          whileHover={{
                            scale: 1.02,
                          }}
                        >
                          <motion.img
                            src={booking.hotelImage}
                            alt={booking.hotelName}
                            className="w-full h-full object-cover"
                            initial={{
                              scale: 1.1,
                              opacity: 0,
                            }}
                            animate={{
                              scale: 1,
                              opacity: 1,
                            }}
                            transition={{
                              duration: 0.7,
                            }}
                            whileHover={{
                              scale: 1.08,
                            }}
                          />
                        </motion.div>

                        {/* ============================
                            BOOKING INFO
                        ============================ */}

                        <div className="flex-1">

                          <div className="flex flex-col sm:flex-row sm:justify-between gap-3">

                            <div>
                              <motion.h2
                                initial={{
                                  opacity: 0,
                                  x: -15,
                                }}
                                animate={{
                                  opacity: 1,
                                  x: 0,
                                }}
                                transition={{
                                  delay: 0.15,
                                }}
                                className="text-2xl font-bold text-gray-900"
                              >
                                {booking.hotelName}
                              </motion.h2>

                              <p className="text-gray-500 mt-1">
                                📍 {booking.hotelLocation}
                              </p>
                            </div>

                            {/* STATUS */}

                            <motion.span
                              initial={{
                                opacity: 0,
                                scale: 0.7,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                              }}
                              transition={{
                                delay: 0.25,
                                type: "spring",
                                stiffness: 200,
                              }}
                              className={`self-start px-3 py-1 rounded-full text-sm font-semibold ${
                                booking.bookingStatus === "confirmed"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {booking.bookingStatus === "confirmed"
                                ? "✓ Confirmed"
                                : "✕ Cancelled"}
                            </motion.span>
                          </div>

                          {/* ============================
                              ROOM
                          ============================ */}

                          <motion.div
                            initial={{
                              opacity: 0,
                              y: 10,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            transition={{
                              delay: 0.2,
                            }}
                            className="mt-5"
                          >
                            <p className="font-semibold text-gray-800">
                              🛏️ {booking.roomName}
                            </p>

                            <p className="text-gray-500 mt-1">
                              ₹{booking.roomPrice} / night
                            </p>
                          </motion.div>

                          {/* ============================
                              DATES
                          ============================ */}

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">

                            {/* CHECK IN */}

                            <motion.div
                              whileHover={{
                                scale: 1.03,
                              }}
                              className="bg-gray-50 rounded-lg p-3"
                            >
                              <p className="text-sm text-gray-500">
                                Check-in
                              </p>

                              <p className="font-semibold mt-1">
                                {checkIn}
                              </p>
                            </motion.div>

                            {/* CHECK OUT */}

                            <motion.div
                              whileHover={{
                                scale: 1.03,
                              }}
                              className="bg-gray-50 rounded-lg p-3"
                            >
                              <p className="text-sm text-gray-500">
                                Check-out
                              </p>

                              <p className="font-semibold mt-1">
                                {checkOut}
                              </p>
                            </motion.div>

                            {/* GUESTS */}

                            <motion.div
                              whileHover={{
                                scale: 1.03,
                              }}
                              className="bg-gray-50 rounded-lg p-3"
                            >
                              <p className="text-sm text-gray-500">
                                Guests
                              </p>

                              <p className="font-semibold mt-1">
                                {booking.guests}
                              </p>
                            </motion.div>
                          </div>

                          {/* ============================
                              BOTTOM
                          ============================ */}

                          <div className="border-t mt-5 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                            {/* TOTAL */}

                            <motion.div
                              initial={{
                                opacity: 0,
                                x: -15,
                              }}
                              animate={{
                                opacity: 1,
                                x: 0,
                              }}
                              transition={{
                                delay: 0.3,
                              }}
                            >
                              <p className="text-sm text-gray-500">
                                Total Amount
                              </p>

                              <motion.p
                                whileHover={{
                                  scale: 1.05,
                                }}
                                className="text-2xl font-bold text-green-600"
                              >
                                ₹{booking.totalPrice}
                              </motion.p>
                            </motion.div>

                            {/* BUTTONS */}

                            <div className="flex flex-col sm:flex-row gap-3">

                              {/* VIEW BOOKING */}

                              <motion.button
                                whileHover={{
                                  scale: 1.04,
                                  y: -2,
                                }}
                                whileTap={{
                                  scale: 0.95,
                                }}
                                onClick={() =>
                                  navigate(
                                    "/booking-confirmation",
                                    {
                                      state: {
                                        booking: booking,
                                      },
                                    },
                                  )
                                }
                                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition cursor-pointer"
                              >
                                View Booking
                              </motion.button>

                              {/* CANCEL BOOKING */}

                              {booking.bookingStatus ===
                                "confirmed" && (
                                <motion.button
                                  whileHover={{
                                    scale: 1.04,
                                    y: -2,
                                  }}
                                  whileTap={{
                                    scale: 0.95,
                                  }}
                                  onClick={() =>
                                    handleCancelBooking(
                                      booking._id,
                                    )
                                  }
                                  disabled={
                                    cancellingId ===
                                    booking._id
                                  }
                                  className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                                >
                                  {cancellingId ===
                                  booking._id ? (
                                    <span className="flex items-center justify-center gap-2">
                                      <motion.span
                                        animate={{
                                          rotate: 360,
                                        }}
                                        transition={{
                                          duration: 0.8,
                                          repeat: Infinity,
                                          ease: "linear",
                                        }}
                                        className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                      />

                                      Cancelling...
                                    </span>
                                  ) : (
                                    "Cancel Booking"
                                  )}
                                </motion.button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MyBookings;