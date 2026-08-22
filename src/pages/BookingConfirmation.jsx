import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { booking } = location.state || {};

  // =========================================
  // ANIMATION VARIANTS
  // =========================================

  const pageVariants = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const containerVariants = {
    hidden: {},

    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.55,
        ease: "easeOut",
      },
    },
  };

  const successIconVariants = {
    hidden: {
      scale: 0,
      rotate: -30,
      opacity: 0,
    },

    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,

      transition: {
        type: "spring",
        stiffness: 180,
        damping: 12,
        delay: 0.2,
      },
    },
  };

  // =========================================
  // NO BOOKING DATA
  // =========================================

  if (!booking) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          {/* HOTEL ICON */}

          <motion.div
            className="text-6xl mb-4"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🏨
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-800">
            Booking Not Found
          </h1>

          <p className="text-gray-500 mt-2">
            We couldn't find your booking information.
          </p>

          <motion.button
            onClick={() => navigate("/")}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            Go Home
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  // =========================================
  // FORMAT DATES
  // =========================================

  const checkIn = new Date(booking.checkIn).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  const checkOut = new Date(booking.checkOut).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  // =========================================
  // RETURN
  // =========================================

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-10"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="max-w-4xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* =====================================================
            SUCCESS HEADER
        ===================================================== */}

        <motion.div
          variants={cardVariants}
          className="relative overflow-hidden bg-white rounded-2xl shadow-sm p-8 text-center"
        >
          {/* DECORATIVE CIRCLE */}

          <motion.div
            className="absolute -top-20 -right-20 w-44 h-44 bg-green-100 rounded-full opacity-50"
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-100 rounded-full opacity-40"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* SUCCESS ICON */}

          <motion.div
            variants={successIconVariants}
            className="relative w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto"
          >
            {/* PULSE */}

            <motion.div
              className="absolute inset-0 rounded-full border-4 border-green-200"
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />

            {/* CHECK */}

            <motion.svg
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
            >
              <motion.path
                d="M10 21L18 29L33 13"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                animate={{
                  pathLength: 1,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.5,
                  duration: 0.6,
                  ease: "easeOut",
                }}
              />
            </motion.svg>
          </motion.div>

          {/* TITLE */}

          <motion.h1
            className="relative text-3xl md:text-4xl font-bold text-gray-900 mt-6"
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.6,
              duration: 0.5,
            }}
          >
            Booking Confirmed!
          </motion.h1>

          {/* DESCRIPTION */}

          <motion.p
            className="relative text-gray-500 mt-2"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.8,
            }}
          >
            Your hotel booking has been successfully confirmed.
          </motion.p>

          {/* BOOKING ID */}

          <motion.div
            className="relative mt-5 inline-block bg-gray-100 px-5 py-3 rounded-lg"
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 1,
              type: "spring",
              stiffness: 180,
            }}
          >
            <p className="text-sm text-gray-500">
              Booking ID
            </p>

            <p className="font-bold text-gray-800 mt-1 break-all">
              {booking._id}
            </p>
          </motion.div>
        </motion.div>

        {/* =====================================================
            HOTEL DETAILS
        ===================================================== */}

        <motion.div
          variants={cardVariants}
          className="bg-white rounded-2xl shadow-sm p-6 mt-6"
          whileHover={{
            y: -3,
            boxShadow:
              "0 12px 30px rgba(0,0,0,0.08)",
          }}
          transition={{
            duration: 0.25,
          }}
        >
          <h2 className="text-2xl font-bold mb-5">
            Your Stay
          </h2>

          <div className="flex flex-col md:flex-row gap-5">
            {/* HOTEL IMAGE */}

            <motion.div
              className="w-full md:w-52 h-36 overflow-hidden rounded-xl"
              whileHover={{
                scale: 1.02,
              }}
            >
              <motion.img
                src={booking.hotelImage}
                alt={booking.hotelName}
                className="w-full h-full object-cover"
                whileHover={{
                  scale: 1.08,
                }}
                transition={{
                  duration: 0.4,
                }}
              />
            </motion.div>

            {/* HOTEL INFO */}

            <div>
              <motion.h3
                className="text-2xl font-bold"
                initial={{
                  opacity: 0,
                  x: -15,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
              >
                {booking.hotelName}
              </motion.h3>

              <p className="text-gray-500 mt-2">
                📍 {booking.hotelLocation}
              </p>

              <motion.p
                className="text-lg font-semibold mt-4"
                initial={{
                  opacity: 0,
                  x: -15,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: 0.1,
                }}
              >
                🛏️ {booking.roomName}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* =====================================================
            BOOKING DETAILS
        ===================================================== */}

        <motion.div
          variants={cardVariants}
          className="bg-white rounded-2xl shadow-sm p-6 mt-6"
        >
          <h2 className="text-2xl font-bold mb-5">
            Booking Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* CHECK IN */}

            <motion.div
              className="bg-gray-50 rounded-xl p-4"
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <p className="text-sm text-gray-500">
                Check-in
              </p>

              <p className="font-bold mt-1">
                {checkIn}
              </p>
            </motion.div>

            {/* CHECK OUT */}

            <motion.div
              className="bg-gray-50 rounded-xl p-4"
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <p className="text-sm text-gray-500">
                Check-out
              </p>

              <p className="font-bold mt-1">
                {checkOut}
              </p>
            </motion.div>

            {/* GUESTS */}

            <motion.div
              className="bg-gray-50 rounded-xl p-4"
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <p className="text-sm text-gray-500">
                Guests
              </p>

              <p className="font-bold mt-1">
                {booking.guests}{" "}
                {booking.guests === 1
                  ? "Guest"
                  : "Guests"}
              </p>
            </motion.div>
          </div>

          {/* NIGHTS */}

          <motion.div
            className="mt-5 bg-blue-50 rounded-xl p-4"
            initial={{
              opacity: 0,
              x: -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <p className="text-blue-700 font-semibold">
              🗓️ {booking.nights}{" "}
              {booking.nights === 1
                ? "Night"
                : "Nights"}
            </p>
          </motion.div>
        </motion.div>

        {/* =====================================================
            GUEST INFORMATION
        ===================================================== */}

        <motion.div
          variants={cardVariants}
          className="bg-white rounded-2xl shadow-sm p-6 mt-6"
        >
          <h2 className="text-2xl font-bold mb-5">
            Guest Information
          </h2>

          <div className="space-y-3">
            <motion.p
              whileHover={{
                x: 5,
              }}
            >
              <span className="font-semibold">
                Name:
              </span>{" "}
              {booking.guestName}
            </motion.p>

            <motion.p
              whileHover={{
                x: 5,
              }}
            >
              <span className="font-semibold">
                Phone:
              </span>{" "}
              {booking.phone}
            </motion.p>

            <motion.p
              whileHover={{
                x: 5,
              }}
            >
              <span className="font-semibold">
                Email:
              </span>{" "}
              {booking.email}
            </motion.p>
          </div>
        </motion.div>

        {/* =====================================================
            PAYMENT SUMMARY
        ===================================================== */}

        <motion.div
          variants={cardVariants}
          className="bg-white rounded-2xl shadow-sm p-6 mt-6"
        >
          <h2 className="text-2xl font-bold mb-5">
            Payment Summary
          </h2>

          {/* ROOM */}

          <motion.div
            className="flex justify-between mb-3"
            initial={{
              opacity: 0,
              x: -15,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <span className="text-gray-600">
              Room
            </span>

            <span>
              ₹{booking.roomPrice}
            </span>
          </motion.div>

          {/* TAX */}

          <motion.div
            className="flex justify-between mb-3"
            initial={{
              opacity: 0,
              x: 15,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <span className="text-gray-600">
              Taxes & fees
            </span>

            <span>
              ₹{booking.taxes}
            </span>
          </motion.div>

          {/* TOTAL */}

          <div className="border-t pt-4 mt-4 flex justify-between items-center">
            <span className="text-xl font-bold">
              Total
            </span>

            <motion.span
              className="text-2xl font-bold text-green-600"
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
              }}
            >
              ₹{booking.totalPrice}
            </motion.span>
          </div>
        </motion.div>

        {/* =====================================================
            CONFIRMATION STATUS
        ===================================================== */}

        <motion.div
          variants={cardVariants}
          className="bg-green-50 border border-green-200 rounded-2xl p-6 mt-6 text-center"
          animate={{
            boxShadow: [
              "0 0 0 rgba(34,197,94,0)",
              "0 0 18px rgba(34,197,94,0.12)",
              "0 0 0 rgba(34,197,94,0)",
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.p
            className="text-green-700 font-bold text-lg"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ✓ Booking Confirmed
          </motion.p>

          <p className="text-green-600 text-sm mt-1">
            Your reservation has been saved successfully.
          </p>
        </motion.div>

        {/* =====================================================
            BUTTONS
        ===================================================== */}

        <motion.div
          variants={cardVariants}
          className="flex flex-col sm:flex-row gap-4 mt-6"
        >
          {/* HOME */}

          <motion.button
            onClick={() => navigate("/")}
            className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition"
            whileHover={{
              scale: 1.03,
              y: -2,
            }}
            whileTap={{
              scale: 0.96,
            }}
          >
            Back to Home
          </motion.button>

          {/* PRINT */}

          <motion.button
            onClick={() => window.print()}
            className="flex-1 border border-gray-300 bg-white font-semibold py-3 rounded-xl hover:bg-gray-100 transition"
            whileHover={{
              scale: 1.03,
              y: -2,
            }}
            whileTap={{
              scale: 0.96,
            }}
          >
            🖨️ Print Booking
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default BookingConfirmation;