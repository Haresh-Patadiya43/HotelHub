import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { hotel, room } = location.state || {};

  // =========================
  // BOOKING STATES
  // =========================

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [guestName, setGuestName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [bookingLoading, setBookingLoading] = useState(false);

  // =========================
  // IF DATA IS MISSING
  // =========================

  if (!hotel || !room) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-6xl mb-4"
          >
            🏨
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-800">
            Booking information not found
          </h1>

          <p className="text-gray-500 mt-2">
            Please select a room from the hotel page.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Go Back
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  // =========================
  // CALCULATE NIGHTS
  // =========================

  let nights = 1;

  if (checkIn && checkOut) {
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    const difference = endDate.getTime() - startDate.getTime();

    nights = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );

    if (nights < 1) {
      nights = 0;
    }
  }

  // =========================
  // PRICE
  // =========================

  const roomPrice = Number(room.price) || 0;

  const roomTotal = roomPrice * nights;

  const taxes = Math.round(roomTotal * 0.12);

  const totalPrice = roomTotal + taxes;

  // =========================
  // TODAY
  // =========================

  const today = new Date()
    .toISOString()
    .split("T")[0];

  // =========================
  // CONTINUE TO PAYMENT
  // =========================

  const handleContinue = async () => {
    if (!checkIn) {
      alert("Please select your check-in date.");
      return;
    }

    if (!checkOut) {
      alert("Please select your check-out date.");
      return;
    }

    if (nights <= 0) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    if (!guestName.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (!phone.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    // =========================
    // CHECK LOGIN
    // =========================

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login before making a booking.");
      return;
    }

    try {
      setBookingLoading(true);

      // =========================
      // BOOKING DATA
      // =========================

      const bookingData = {
        hotelId: hotel._id,
        hotelName: hotel.name,
        hotelLocation: hotel.location,
        hotelImage: hotel.image,

        roomName: room.roomType,
        roomImage: room.image,
        roomPrice,

        checkIn,
        checkOut,

        guests,
        nights,

        guestName: guestName.trim(),
        phone: phone.trim(),
        email: email.trim(),

        taxes,
        totalPrice,

        // IMPORTANT
        // Booking is NOT confirmed yet
        paymentStatus: "pending",
        bookingStatus: "pending",
      };

      console.log(
        "Booking data prepared:",
        bookingData
      );

      // =========================
      // GO TO PAYMENT
      // =========================

      navigate("/payment", {
        state: {
          bookingData,
          amount: totalPrice,
        },
      });
    } catch (error) {
      console.error(
        "Payment Navigation Error:",
        error
      );

      alert(
        "Unable to continue to payment."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  // =========================
  // ANIMATION
  // =========================

  const containerVariants = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
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

  const cardHover = {
    y: -4,
    boxShadow:
      "0 15px 35px rgba(0, 0, 0, 0.08)",
    transition: {
      duration: 0.25,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-10"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4"
      >
        {/* HEADER */}

        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <motion.button
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 mb-4 cursor-pointer"
          >
            ← Back to hotel
          </motion.button>

          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            Complete Your Booking
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-gray-500 mt-2"
          >
            Enter your stay details and guest information.
          </motion.p>
        </motion.div>

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}

          <motion.div
            variants={containerVariants}
            className="lg:col-span-2 space-y-6"
          >

            {/* HOTEL */}

            <motion.div
              variants={itemVariants}
              whileHover={cardHover}
              className="bg-white rounded-2xl shadow-sm p-6"
            >
              <h2 className="text-2xl font-bold mb-5">
                Hotel
              </h2>

              <div className="flex flex-col sm:flex-row gap-5">

                <motion.img
                  whileHover={{ scale: 1.04 }}
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full sm:w-40 h-28 object-cover rounded-xl"
                />

                <div>
                  <h3 className="text-xl font-bold">
                    {hotel.name}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    📍 {hotel.location}
                  </p>

                  <div className="mt-3">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-md text-sm">
                      4.8 ⭐
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* ROOM */}

            <motion.div
              variants={itemVariants}
              whileHover={cardHover}
              className="bg-white rounded-2xl shadow-sm p-6"
            >
              <h2 className="text-2xl font-bold mb-5">
                Selected Room
              </h2>

              <div className="flex flex-col md:flex-row gap-6">

                <motion.img
                  whileHover={{ scale: 1.04 }}
                  src={room.image}
                  alt={room.roomType}
                  className="w-full md:w-64 h-48 object-cover rounded-xl"
                />

                <div className="flex-1">

                  <h3 className="text-2xl font-bold">
                    {room.roomType}
                  </h3>

                  <div className="flex flex-wrap gap-4 mt-4 text-gray-600">
                    <span>
                      👥 Up to {room.guests} Guests
                    </span>

                    <span>
                      🛏️ {room.beds}
                    </span>
                  </div>

                  <p className="text-gray-600 mt-4 leading-6">
                    {room.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">

                    {room.amenities?.map(
                      (amenity, index) => (
                        <motion.span
                          key={index}
                          initial={{
                            opacity: 0,
                            scale: 0.8,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                        >
                          ✓ {amenity}
                        </motion.span>
                      )
                    )}

                  </div>

                </div>

              </div>
            </motion.div>

            {/* STAY */}

            <motion.div
              variants={itemVariants}
              whileHover={cardHover}
              className="bg-white rounded-2xl shadow-sm p-6"
            >
              <h2 className="text-2xl font-bold mb-5">
                Your Stay
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="block font-semibold mb-2">
                    Check-in
                  </label>

                  <input
                    type="date"
                    min={today}
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);

                      if (
                        checkOut &&
                        e.target.value >= checkOut
                      ) {
                        setCheckOut("");
                      }
                    }}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">
                    Check-out
                  </label>

                  <input
                    type="date"
                    min={checkIn || today}
                    value={checkOut}
                    onChange={(e) =>
                      setCheckOut(e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

              </div>

              <AnimatePresence>
                {checkIn &&
                  checkOut &&
                  nights > 0 && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      className="mt-5 bg-blue-50 border border-blue-100 rounded-lg p-4 overflow-hidden"
                    >
                      <p className="text-blue-800 font-semibold">
                        🗓️ {nights}{" "}
                        {nights === 1
                          ? "Night"
                          : "Nights"}
                      </p>

                      <p className="text-blue-600 text-sm mt-1">
                        {checkIn} → {checkOut}
                      </p>
                    </motion.div>
                  )}
              </AnimatePresence>

              <div className="mt-5">

                <label className="block font-semibold mb-2">
                  Number of Guests
                </label>

                <select
                  value={guests}
                  onChange={(e) =>
                    setGuests(
                      Number(e.target.value)
                    )
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Array.from(
                    {
                      length: room.guests,
                    },
                    (_, index) => index + 1
                  ).map((guest) => (
                    <option
                      key={guest}
                      value={guest}
                    >
                      {guest}{" "}
                      {guest === 1
                        ? "Guest"
                        : "Guests"}
                    </option>
                  ))}
                </select>

              </div>

            </motion.div>

            {/* GUEST DETAILS */}

            <motion.div
              variants={itemVariants}
              whileHover={cardHover}
              className="bg-white rounded-2xl shadow-sm p-6"
            >
              <h2 className="text-2xl font-bold mb-5">
                Guest Details
              </h2>

              <div className="mb-5">

                <label className="block font-semibold mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  value={guestName}
                  onChange={(e) =>
                    setGuestName(e.target.value)
                  }
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="block font-semibold mb-2">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    placeholder="Enter phone number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter email address"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

              </div>
            </motion.div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-sm p-6 lg:sticky lg:top-6"
            >

              <h2 className="text-2xl font-bold mb-6">
                Price Summary
              </h2>

              <div className="flex justify-between mb-4">

                <span className="text-gray-600">
                  ₹{roomPrice} × {nights}{" "}
                  {nights === 1
                    ? "night"
                    : "nights"}
                </span>

                <span className="font-semibold">
                  ₹{roomTotal}
                </span>

              </div>

              <div className="flex justify-between mb-4">

                <span className="text-gray-600">
                  Taxes & fees
                </span>

                <span className="font-semibold">
                  ₹{taxes}
                </span>

              </div>

              <div className="border-t pt-4 mt-4">

                <div className="flex justify-between">

                  <span className="text-xl font-bold">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-green-600">
                    ₹{totalPrice}
                  </span>

                </div>

              </div>

              <motion.button
                whileHover={{
                  scale: 1.02,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={handleContinue}
                disabled={bookingLoading}
                className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl mt-6 hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {bookingLoading
                  ? "Processing..."
                  : "Continue to Payment →"}
              </motion.button>

              <p className="text-xs text-gray-400 text-center mt-4">
                Your booking will be created after payment confirmation.
              </p>

            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </motion.div>
  );
};

export default Booking;