import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Loader from "../componets/Loader";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [saved, setSaved] = useState(false);

  // =========================
  // ANIMATION VARIANTS
  // =========================

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const fadeLeft = {
    hidden: {
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const scaleIn = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  // =========================
  // FETCH HOTEL + ROOMS
  // =========================

  useEffect(() => {
    const fetchHotelAndRooms = async () => {
      try {
        setLoading(true);
        setRoomsLoading(true);

        // =========================
        // FETCH HOTEL
        // =========================

        const hotelResponse = await fetch(
          `http://localhost:5000/api/hotels/${id}`
        );

        const hotelData = await hotelResponse.json();

        console.log("Hotel Data:", hotelData);

        if (hotelData.success && hotelData.hotel) {
          setHotel(hotelData.hotel);
          setSelectedImage(hotelData.hotel.image);
        } else {
          setHotel(null);
        }

        // =========================
        // FETCH ROOMS
        // =========================

        const roomResponse = await fetch(
          `http://localhost:5000/api/rooms/hotel/${id}`
        );

        const roomData = await roomResponse.json();

        console.log("Room Data:", roomData);

        if (roomData.success) {
          setRooms(roomData.rooms || []);
        } else {
          setRooms([]);
        }
      } catch (error) {
        console.error("Error fetching hotel/rooms:", error);

        setHotel(null);
        setRooms([]);
      } finally {
        setLoading(false);
        setRoomsLoading(false);
      }
    };

    fetchHotelAndRooms();
  }, [id]);

  // =========================
  // HOTEL LOADER
  // =========================

  if (loading) {
    return <Loader />;
  }

  // =========================
  // HOTEL NOT FOUND
  // =========================

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="text-6xl mb-4"
          >
            🏨
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-800">
            Hotel Not Found
          </h1>

          <p className="text-gray-500 mt-2">
            We couldn't find this hotel.
          </p>

          <button
            onClick={() => navigate("/hotels")}
            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition"
          >
            Back to Hotels
          </button>
        </motion.div>
      </div>
    );
  }

  // =========================
  // GALLERY
  // =========================

  const hotelImages = [
    hotel.image,
    hotel.image2 || hotel.image,
    hotel.image3 || hotel.image,
    hotel.image4 || hotel.image,
  ];

  // =========================
  // SAVE HOTEL
  // =========================

  const handleSave = () => {
    setSaved((prev) => !prev);
  };

  // =========================
  // BOOK ROOM
  // =========================

  const handleBookRoom = (room) => {
    if (!room.available) return;

    navigate("/booking", {
      state: {
        hotel,
        room,
      },
    });
  };

  // =========================
  // BOOK FIRST AVAILABLE ROOM
  // =========================

  const handleBookNow = () => {
    const availableRoom = rooms.find((room) => room.available);

    if (availableRoom) {
      navigate("/booking", {
        state: {
          hotel,
          room: availableRoom,
        },
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden">
      {/* =====================================
          MAIN CONTAINER
      ===================================== */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* =====================================
            HOTEL TITLE
        ===================================== */}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8"
        >
          <div>
            <motion.h1
              variants={fadeLeft}
              className="text-3xl md:text-4xl font-bold text-gray-900"
            >
              {hotel.name}
            </motion.h1>

            <motion.p
              variants={fadeLeft}
              className="text-gray-500 mt-2 text-lg"
            >
              📍 {hotel.location}
            </motion.p>

            <motion.div
              variants={fadeLeft}
              className="flex items-center gap-3 mt-3"
            >
              <span className="bg-green-600 text-white px-3 py-1 rounded-md font-semibold">
                4.8 ⭐
              </span>

              <span className="text-gray-500">
                Excellent · 245 reviews
              </span>
            </motion.div>
          </div>

          {/* SAVE BUTTON */}

          <motion.button
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={handleSave}
            className={`border px-5 py-2.5 rounded-lg transition cursor-pointer ${
              saved
                ? "bg-red-50 border-red-200 text-red-600"
                : "border-gray-300 bg-white hover:bg-gray-100"
            }`}
          >
            {saved ? "❤️ Saved" : "♡ Save"}
          </motion.button>
        </motion.div>

        {/* =====================================
            IMAGE GALLERY
        ===================================== */}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-10"
        >
          {/* MAIN IMAGE */}

          <motion.div
            variants={scaleIn}
            className="md:col-span-2 md:row-span-2 overflow-hidden rounded-xl"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                initial={{
                  opacity: 0,
                  scale: 1.05,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.45,
                }}
                src={selectedImage}
                alt={hotel.name}
                className="w-full h-[300px] md:h-[500px] object-cover"
              />
            </AnimatePresence>
          </motion.div>

          {/* OTHER IMAGES */}

          {hotelImages.slice(1).map((image, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{
                scale: 1.02,
              }}
              className="overflow-hidden rounded-xl cursor-pointer"
            >
              <img
                src={image}
                alt={`${hotel.name} ${index + 2}`}
                onClick={() => setSelectedImage(image)}
                className="w-full h-[160px] md:h-[240px] object-cover hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* =====================================
            ABOUT HOTEL
        ===================================== */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          variants={fadeUp}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            About this hotel
          </h2>

          <p className="text-gray-600 leading-7 mt-4 text-lg">
            {hotel.description ||
              "Enjoy a comfortable and relaxing stay at this beautiful hotel. The hotel offers modern rooms, excellent facilities and convenient access to nearby attractions."}
          </p>
        </motion.div>

        {/* =====================================
            HOTEL AMENITIES
        ===================================== */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          variants={fadeUp}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-8"
        >
          <motion.h2
            variants={fadeLeft}
            className="text-2xl md:text-3xl font-bold mb-6"
          >
            Hotel Amenities
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              ["📶", "Free WiFi", "High-speed internet"],
              ["🍽️", "Restaurant", "Delicious meals"],
              ["🏊", "Swimming Pool", "Outdoor pool"],
              ["🚗", "Free Parking", "Parking available"],
              ["❄️", "Air Conditioning", "Available in rooms"],
              ["🛎️", "Room Service", "Available 24/7"],
              ["🛡️", "Security", "24/7 security"],
              ["🧹", "Housekeeping", "Daily cleaning"],
            ].map(([icon, title, description], index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.08)",
                }}
                className="border rounded-xl p-5 cursor-default"
              >
                <motion.div
                  whileHover={{
                    scale: 1.2,
                    rotate: 5,
                  }}
                  className="text-3xl"
                >
                  {icon}
                </motion.div>

                <h3 className="font-semibold mt-3">
                  {title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* =====================================
            ROOMS
        ===================================== */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          variants={fadeUp}
          className="mb-10"
        >
          <motion.div
            variants={fadeLeft}
            className="mb-6"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Choose your room
            </h2>

            <p className="text-gray-500 mt-2">
              Select a room that suits your needs.
            </p>
          </motion.div>

          {/* ROOM LOADER */}

          {roomsLoading ? (
            <div className="py-12">
              <Loader />
            </div>
          ) : rooms.length === 0 ? (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="bg-white rounded-2xl border p-10 text-center"
            >
              <div className="text-5xl mb-3">
                🛏️
              </div>

              <h3 className="text-xl font-bold">
                No rooms available
              </h3>

              <p className="text-gray-500 mt-2">
                There are currently no rooms available for this hotel.
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={staggerContainer}
              className="space-y-6"
            >
              {rooms.map((room, index) => (
                <motion.div
                  key={room._id || index}
                  variants={fadeUp}
                  whileHover={{
                    y: -5,
                    boxShadow:
                      "0 20px 40px rgba(0,0,0,0.08)",
                  }}
                  className="bg-white rounded-2xl shadow-sm border overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3">

                    {/* ROOM IMAGE */}

                    <div className="overflow-hidden">
                      <motion.img
                        whileHover={{
                          scale: 1.08,
                        }}
                        transition={{
                          duration: 0.5,
                        }}
                        src={room.image}
                        alt={room.roomType}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>

                    {/* ROOM DETAILS */}

                    <div className="p-6">
                      <h3 className="text-2xl font-bold">
                        {room.roomType}
                      </h3>

                      <div className="flex flex-wrap gap-4 mt-4 text-gray-500">
                        <span>
                          👥 {room.capacity} Guests
                        </span>

                        <span>
                          🛏️ Room available
                        </span>
                      </div>

                      <div className="mt-5">
                        <motion.span
                          initial={{
                            opacity: 0,
                            scale: 0.8,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          transition={{
                            delay: 0.2,
                          }}
                          className={`inline-block px-3 py-1.5 rounded-full text-sm ${
                            room.available
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {room.available
                            ? "✓ Available"
                            : "✕ Not Available"}
                        </motion.span>
                      </div>
                    </div>

                    {/* PRICE */}

                    <div className="border-t md:border-t-0 md:border-l p-6 flex flex-col justify-between">
                      <div>
                        <p className="text-gray-500">
                          Price per night
                        </p>

                        <motion.p
                          whileHover={{
                            scale: 1.05,
                          }}
                          className="text-3xl font-bold text-green-600 mt-1"
                        >
                          ₹{room.price}
                        </motion.p>

                        <p className="text-sm text-gray-400 mt-1">
                          + taxes and fees
                        </p>
                      </div>

                      <motion.button
                        whileHover={{
                          scale: 1.03,
                        }}
                        whileTap={{
                          scale: 0.96,
                        }}
                        disabled={!room.available}
                        onClick={() => handleBookRoom(room)}
                        className={`w-full text-white font-semibold py-3 rounded-xl transition mt-6 cursor-pointer ${
                          room.available
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {room.available
                          ? "Select Room"
                          : "Not Available"}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* =====================================
            REVIEWS
        ===================================== */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          variants={fadeUp}
          className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            Guest Reviews
          </h2>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8"
          >
            {/* RATING */}

            <motion.div
              variants={scaleIn}
              className="text-center md:border-r"
            >
              <motion.p
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                }}
                className="text-5xl font-bold"
              >
                4.8
              </motion.p>

              <div className="text-yellow-500 text-xl mt-2">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-gray-500 mt-2">
                245 reviews
              </p>
            </motion.div>

            {/* REVIEW 1 */}

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-between">
                <h3 className="font-semibold">
                  Rahul Sharma
                </h3>

                <span className="text-green-600">
                  5 ⭐
                </span>
              </div>

              <p className="text-gray-600 mt-3 text-sm leading-6">
                Amazing hotel with clean rooms and friendly
                staff. The location was excellent.
              </p>
            </motion.div>

            {/* REVIEW 2 */}

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-between">
                <h3 className="font-semibold">
                  Priya Patel
                </h3>

                <span className="text-green-600">
                  4.8 ⭐
                </span>
              </div>

              <p className="text-gray-600 mt-3 text-sm leading-6">
                Very comfortable stay. The room was spacious
                and the service was excellent.
              </p>
            </motion.div>

            {/* REVIEW 3 */}

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-between">
                <h3 className="font-semibold">
                  Amit Shah
                </h3>

                <span className="text-green-600">
                  5 ⭐
                </span>
              </div>

              <p className="text-gray-600 mt-3 text-sm leading-6">
                Great experience. Would definitely stay here
                again.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* =====================================
            HOTEL POLICIES
        ===================================== */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          variants={fadeUp}
          className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-8"
        >
          <motion.h2
            variants={fadeLeft}
            className="text-2xl md:text-3xl font-bold mb-6"
          >
            Hotel Policies
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              ["🕐", "Check-in", "From 12:00 PM"],
              ["🕐", "Check-out", "Until 11:00 AM"],
              ["👨‍👩‍👧", "Children", "Children are welcome"],
            ].map(([icon, title, text], index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{
                  x: 5,
                }}
              >
                <h3 className="font-semibold text-lg">
                  {icon} {title}
                </h3>

                <p className="text-gray-500 mt-2">
                  {text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* =====================================
            BOOKING CTA
        ===================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
          }}
          whileHover={{
            scale: 1.01,
          }}
          className="bg-blue-600 rounded-2xl p-8 md:p-10 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Ready to book your stay?
            </h2>

            <p className="text-blue-100 mt-2">
              Choose your room and enjoy a comfortable stay.
            </p>
          </div>

          <motion.button
            whileHover={{
              scale: 1.06,
              x: 5,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={handleBookNow}
            disabled={!rooms.some((room) => room.available)}
            className={`font-bold px-8 py-3 rounded-xl transition ${
              rooms.some((room) => room.available)
                ? "bg-white text-blue-600 hover:bg-gray-100"
                : "bg-blue-400 text-blue-100 cursor-not-allowed"
            }`}
          >
            {rooms.some((room) => room.available)
              ? "Book Now →"
              : "No Rooms Available"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default HotelDetails;