import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import jsPDF from "jspdf";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { booking } = location.state || {};

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

  const checkIn = booking.checkIn
    ? new Date(booking.checkIn).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  const checkOut = booking.checkOut
    ? new Date(booking.checkOut).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  // =========================================
  // DOWNLOAD BILL
  // =========================================

  const handleDownloadBill = () => {
  try {
    const doc = new jsPDF();

    // =========================================
    // COLORS
    // =========================================

    const primary = [37, 99, 235];       // Blue
    const dark = [31, 41, 55];           // Dark gray
    const gray = [107, 114, 128];        // Gray
    const lightGray = [243, 244, 246];   // Background
    const green = [22, 163, 74];         // Green
    const border = [229, 231, 235];      // Border

    // =========================================
    // PAGE
    // =========================================

   const pageWidth = 210;

    // =========================================
    // HEADER
    // =========================================

    doc.setFillColor(...primary);
    doc.rect(0, 0, pageWidth, 48, "F");

    // HotelHub Logo Box
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(18, 12, 25, 25, 4, 4, "F");

    doc.setTextColor(...primary);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("H", 26, 29);

    // HOTELHUB
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("HOTELHUB", 50, 25);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Your stay, our priority.", 50, 34);

    // INVOICE label
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("INVOICE", 157, 22);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("HOTEL BOOKING", 157, 30);

    // =========================================
    // INVOICE INFORMATION
    // =========================================

    doc.setTextColor(...dark);

    doc.setFillColor(...lightGray);
    doc.roundedRect(18, 58, 174, 28, 4, 4, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...gray);

    doc.text("INVOICE NUMBER", 25, 68);
    doc.text("INVOICE DATE", 88, 68);
    doc.text("BOOKING ID", 145, 68);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...dark);

    const invoiceNumber =
      booking.invoiceNumber ||
      `INV-${booking._id?.slice(-8).toUpperCase() || Date.now()}`;

    const billDate = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    doc.text(invoiceNumber, 25, 78);
    doc.text(billDate, 88, 78);

    const shortBookingId =
      booking._id?.slice(-8).toUpperCase() || "N/A";

    doc.text(shortBookingId, 145, 78);

    // =========================================
    // HOTEL + GUEST SECTION
    // =========================================

    // HOTEL CARD
    doc.setDrawColor(...border);
    doc.setFillColor(255, 255, 255);

    doc.roundedRect(18, 96, 84, 48, 4, 4, "FD");

    doc.setTextColor(...primary);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("HOTEL DETAILS", 25, 107);

    doc.setTextColor(...dark);
    doc.setFontSize(10);

    doc.setFont("helvetica", "bold");
    doc.text(booking.hotelName || "Hotel", 25, 118);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...gray);
    doc.setFontSize(9);

    doc.text(
      `Location: ${booking.hotelLocation || "N/A"}`,
      25,
      127
    );

    doc.text(
      `Room: ${booking.roomName || "N/A"}`,
      25,
      136
    );

    // GUEST CARD
    doc.setDrawColor(...border);
    doc.setFillColor(255, 255, 255);

    doc.roundedRect(108, 96, 84, 48, 4, 4, "FD");

    doc.setTextColor(...primary);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("GUEST DETAILS", 115, 107);

    doc.setTextColor(...dark);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);

    doc.text(
      booking.guestName || "Guest",
      115,
      118
    );

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...gray);
    doc.setFontSize(8.5);

    doc.text(
      `Phone: ${booking.phone || "N/A"}`,
      115,
      127
    );

    doc.text(
      `Email: ${booking.email || "N/A"}`,
      115,
      136
    );

    // =========================================
    // STAY DETAILS
    // =========================================

    doc.setTextColor(...dark);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);

    doc.text("STAY DETAILS", 18, 158);

    // Table Header
    doc.setFillColor(...lightGray);
    doc.roundedRect(18, 164, 174, 12, 2, 2, "F");

    doc.setFontSize(8);
    doc.setTextColor(...gray);

    doc.text("CHECK-IN", 25, 172);
    doc.text("CHECK-OUT", 72, 172);
    doc.text("NIGHTS", 122, 172);
    doc.text("GUESTS", 155, 172);

    // Table Data
    doc.setTextColor(...dark);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);

    doc.text(checkIn, 25, 184);
    doc.text(checkOut, 72, 184);

    doc.text(
      `${booking.nights || 0}`,
      122,
      184
    );

    doc.text(
      `${booking.guests || 0}`,
      155,
      184
    );

    // =========================================
    // BILLING SUMMARY
    // =========================================

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...dark);

    doc.text("BILLING SUMMARY", 18, 204);

    // Billing container
    doc.setDrawColor(...border);
    doc.setFillColor(255, 255, 255);

    doc.roundedRect(18, 210, 174, 45, 4, 4, "FD");

    // Room
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...gray);

    doc.text("Room Charges", 26, 222);

    doc.setTextColor(...dark);
    doc.setFont("helvetica", "bold");

    doc.text(
      `Rs. ${Number(booking.roomPrice || 0).toLocaleString("en-IN")}`,
      158,
      222,
      { align: "right" }
    );

    // Taxes
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...gray);

    doc.text("Taxes & Fees", 26, 233);

    doc.setTextColor(...dark);
    doc.setFont("helvetica", "bold");

    doc.text(
      `Rs. ${Number(booking.taxes || 0).toLocaleString("en-IN")}`,
      158,
      233,
      { align: "right" }
    );

    // Divider
    doc.setDrawColor(...border);
    doc.line(26, 239, 184, 239);

    // TOTAL
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...dark);

    doc.text("TOTAL AMOUNT", 26, 249);

    doc.setFontSize(15);
    doc.setTextColor(...primary);

    doc.text(
      `Rs. ${Number(booking.totalPrice || 0).toLocaleString("en-IN")}`,
      158,
      249,
      { align: "right" }
    );

    // =========================================
    // STATUS
    // =========================================

    const paymentStatus =
      booking.paymentStatus || "Paid";

    const bookingStatus =
      booking.bookingStatus || "Confirmed";

    // Payment badge
    doc.setFillColor(220, 252, 231);
    doc.roundedRect(18, 264, 78, 13, 3, 3, "F");

    doc.setTextColor(...green);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);

    doc.text(
      `Payment: ${paymentStatus.toUpperCase()}`,
      27,
      273
    );

    // Booking badge
    doc.setFillColor(219, 234, 254);
    doc.roundedRect(102, 264, 90, 13, 3, 3, "F");

    doc.setTextColor(...primary);

    doc.text(
      `Booking: ${bookingStatus.toUpperCase()}`,
      111,
      273
    );

    // =========================================
    // FOOTER
    // =========================================

    doc.setFillColor(...primary);
    doc.rect(0, 284, pageWidth, 13, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);

    doc.text(
      "Thank you for choosing HotelHub!",
      18,
      292
    );

    doc.text(
      "This is a digitally generated invoice.",
      192,
      292,
      { align: "right" }
    );

    // =========================================
    // DOWNLOAD
    // =========================================

    doc.save(
      `HotelHub-Invoice-${booking._id || Date.now()}.pdf`
    );
  } catch (error) {
    console.error("Invoice download error:", error);

    alert(
      "Unable to download the bill. Please try again."
    );
  }
};

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
            <motion.div
              className="bg-gray-50 rounded-xl p-4"
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
            >
              <p className="text-sm text-gray-500">
                Check-in
              </p>

              <p className="font-bold mt-1">
                {checkIn}
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 rounded-xl p-4"
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
            >
              <p className="text-sm text-gray-500">
                Check-out
              </p>

              <p className="font-bold mt-1">
                {checkOut}
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 rounded-xl p-4"
              whileHover={{
                y: -4,
                scale: 1.02,
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
            <motion.p whileHover={{ x: 5 }}>
              <span className="font-semibold">
                Name:
              </span>{" "}
              {booking.guestName}
            </motion.p>

            <motion.p whileHover={{ x: 5 }}>
              <span className="font-semibold">
                Phone:
              </span>{" "}
              {booking.phone}
            </motion.p>

            <motion.p whileHover={{ x: 5 }}>
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

          {/* DOWNLOAD BILL */}

          <motion.button
            onClick={handleDownloadBill}
            className="flex-1 bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition"
            whileHover={{
              scale: 1.03,
              y: -2,
            }}
            whileTap={{
              scale: 0.96,
            }}
          >
            📄 Download Bill
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default BookingConfirmation;