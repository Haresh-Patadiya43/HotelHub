import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

const ROOM_TYPES = [
  "Standard Room",
  "Deluxe Room",
  "Premium Room",
  "Executive Room",
  "Single Room",
  "Double Room",
  "Twin Room",
  "Family Suite",
  "Suite",
  "Presidential Suite",
];

const AdminRooms = () => {
  const navigate = useNavigate();

  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [expandedHotel, setExpandedHotel] = useState(null);

  const [loadingHotels, setLoadingHotels] = useState(true);
  const [loadingRooms, setLoadingRooms] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    hotel: "",
    roomType: "",
    price: "",
    capacity: "",
    image: "",
    available: true,
  });

  // ==========================================
  // FETCH HOTELS
  // ==========================================

  const fetchHotels = async () => {
    try {
      setLoadingHotels(true);

      const response = await fetch(`${API_URL}/hotels`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch hotels");
      }

      setHotels(Array.isArray(data.hotels) ? data.hotels : []);
    } catch (err) {
      console.error("Fetch hotels error:", err);
      setError("Unable to load hotels.");
    } finally {
      setLoadingHotels(false);
    }
  };

  // ==========================================
  // FETCH ROOMS
  // ==========================================

  const fetchRooms = async () => {
    try {
      setLoadingRooms(true);

      const response = await fetch(`${API_URL}/rooms`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch rooms");
      }

      setRooms(Array.isArray(data.rooms) ? data.rooms : []);
    } catch (err) {
      console.error("Fetch rooms error:", err);
      setError("Unable to load rooms.");
    } finally {
      setLoadingRooms(false);
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    fetchHotels();
    fetchRooms();
  }, []);

  const handleBackToDashboard = () => {
    navigate("/admin/dashboard");
  };

  // ==========================================
  // GET ROOMS OF HOTEL
  // ==========================================

  const getHotelRooms = (hotelId) => {
    return rooms.filter((room) => {
      const roomHotelId =
        typeof room.hotel === "object" ? room.hotel?._id : room.hotel;

      return roomHotelId === hotelId;
    });
  };

  // ==========================================
  // EXPAND HOTEL
  // ==========================================

  const toggleHotel = (hotelId) => {
    setExpandedHotel((current) => (current === hotelId ? null : hotelId));
  };

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {
    setFormData({
      hotel: "",
      roomType: "",
      price: "",
      capacity: "",
      image: "",
      available: true,
    });

    setEditingRoom(null);
    setError("");
    setDragActive(false);
  };

  // ==========================================
  // OPEN ADD ROOM
  // ==========================================

  const openAddRoom = (hotelId) => {
    resetForm();

    setFormData({
      hotel: hotelId,
      roomType: "",
      price: "",
      capacity: "",
      image: "",
      available: true,
    });

    setShowModal(true);
  };

  // ==========================================
  // OPEN EDIT ROOM
  // ==========================================

  const openEditRoom = (room) => {
    const hotelId =
      typeof room.hotel === "object" ? room.hotel?._id : room.hotel;

    setEditingRoom(room);

    setFormData({
      hotel: hotelId || "",
      roomType: room.roomType || "",
      price: room.price || "",
      capacity: room.capacity || "",
      image: room.image || "",
      available: room.available !== undefined ? room.available : true,
    });

    setError("");
    setShowModal(true);
  };

  // ==========================================
  // CLOSE MODAL
  // ==========================================

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    resetForm();
  };

  // ==========================================
  // FORM CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ==========================================
  // IMAGE PROCESS
  // ==========================================

  const processImage = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    // 5 MB limit
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result,
      }));

      setError("");
    };

    reader.onerror = () => {
      setError("Failed to read image.");
    };

    reader.readAsDataURL(file);
  };

  // ==========================================
  // FILE INPUT
  // ==========================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      processImage(file);
    }
  };

  // ==========================================
  // DRAG EVENTS
  // ==========================================

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      processImage(file);
    }
  };

  // ==========================================
  // REMOVE IMAGE
  // ==========================================

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ==========================================
  // SUBMIT ROOM
  // ==========================================

  const handleSubmit = async (e) => {
  e.preventDefault();

  // ==========================================
  // VALIDATION
  // ==========================================

  if (!formData.hotel) {
    setError("Please select a hotel.");
    return;
  }

  if (!formData.roomType) {
    setError("Please select a room type.");
    return;
  }

  if (!formData.price || Number(formData.price) <= 0) {
    setError("Please enter a valid price.");
    return;
  }

  if (
    !formData.capacity ||
    Number(formData.capacity) <= 0
  ) {
    setError("Please enter a valid capacity.");
    return;
  }

  if (!formData.image) {
    setError("Please upload a room image.");
    return;
  }

  try {
    setSaving(true);
    setError("");

    // ==========================================
    // ADD OR EDIT
    // ==========================================

    const isEditing = Boolean(editingRoom);

    const url = isEditing
      ? `${API_URL}/rooms/${editingRoom._id}`
      : `${API_URL}/rooms`;

    const method = isEditing ? "PUT" : "POST";

    // ==========================================
    // SEND REQUEST
    // ==========================================

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hotel: formData.hotel,
        roomType: formData.roomType,
        price: Number(formData.price),

        // Backend converts capacity → guests
        capacity: Number(formData.capacity),

        image: formData.image,
        available: formData.available,
      }),
    });

    // ==========================================
    // READ RESPONSE
    // ==========================================

    const data = await response.json();

    console.log("Room API response:", data);

    if (!response.ok || !data.success) {
      throw new Error(
        data.message ||
          `Failed to ${
            isEditing ? "update" : "add"
          } room`
      );
    }

    // ==========================================
    // UPDATE ROOM LIST WITHOUT FETCHING AGAIN
    // ==========================================

    if (isEditing) {
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room._id === editingRoom._id
            ? data.room
            : room
        )
      );
    } else {
      setRooms((prevRooms) => [
        data.room,
        ...prevRooms,
      ]);
    }

    // ==========================================
    // EXPAND HOTEL
    // ==========================================

    setExpandedHotel(formData.hotel);

    // ==========================================
    // CLOSE MODAL
    // ==========================================

    setShowModal(false);
    resetForm();

  } catch (err) {
    console.error("Save room error:", err);

    setError(
      err.message || "Something went wrong."
    );
  } finally {
    setSaving(false);
  }
};

  // ==========================================
  // DELETE ROOM
  // ==========================================

  const handleDelete = async (roomId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this room?",
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/rooms/${roomId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to delete room");
      }

      await fetchRooms();
    } catch (err) {
      console.error("Delete room error:", err);

      alert(err.message || "Failed to delete room.");
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loadingHotels || loadingRooms) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <div className="animate-spin w-10 h-10 border-4 border-gray-200 border-t-green-600 rounded-full mx-auto mb-4"></div>

            <p className="text-gray-500">Loading rooms...</p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="min-h-screen bg-gray-50  py-8">
      <div className="max-w-6xl mx-auto">

        {/* ERROR */}
        {error && !showModal && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* SUMMARY */}
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-7">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <p className="text-sm text-gray-500">Total Hotels</p>

            <p className="text-3xl font-bold text-gray-800 mt-1">
              {hotels.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <p className="text-sm text-gray-500">Total Rooms</p>

            <p className="text-3xl font-bold text-green-600 mt-1">
              {rooms.length}
            </p>
          </div>
        </div>

        {/* HOTEL LIST */}
        <div className="space-y-5">
          {hotels.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
              <p className="text-gray-500">No hotels found.</p>
            </div>
          ) : (
            hotels.map((hotel, index) => {
              const hotelRooms = getHotelRooms(hotel._id);

              const isExpanded = expandedHotel === hotel._id;

              return (
                <div
                  key={hotel._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* HOTEL HEADER */}

                  <div className="flex items-center justify-between px-5 py-4">
                    <button
                      type="button"
                      onClick={() => toggleHotel(hotel._id)}
                      className="flex-1 flex items-center gap-4 text-left hover:opacity-80 transition"
                    >
                      {/* Arrow */}

                      <div
                        className={`w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center transition-transform ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                      >
                        <svg
                          className="w-5 h-5 text-gray-600"
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
                      </div>

                      {/* Hotel Image */}

                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        {hotel.image ? (
                          <img
                            src={hotel.image}
                            alt={hotel.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            🏨
                          </div>
                        )}
                      </div>

                      {/* Hotel Info */}

                      <div>
                        <h2 className="font-bold text-lg text-gray-800">
                          {index + 1}. {hotel.name}
                        </h2>

                        <p className="text-sm text-gray-500">
                          {hotel.location}
                        </p>
                      </div>
                    </button>

                    {/* RIGHT SIDE */}

                    <div className="flex items-center gap-3 ml-4">
                      <span className="px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-semibold whitespace-nowrap">
                        {hotelRooms.length}{" "}
                        {hotelRooms.length === 1 ? "Room" : "Rooms"}
                      </span>
                    </div>
                  </div>

                  {/* ROOMS */}

                  {isExpanded && (
                   <div className="max-w-6xl mx-auto px-[90px] py-[50px]">
                      {/* HEADER */}

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">
                            {hotel.name} Rooms
                          </h3>

                          <p className="text-sm text-gray-500">
                            {hotelRooms.length}{" "}
                            {hotelRooms.length === 1 ? "room" : "rooms"}{" "}
                            available
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => openAddRoom(hotel._id)}
                          className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition"
                        >
                          + Add Room
                        </button>
                      </div>

                      {/* NO ROOMS */}

                      {hotelRooms.length === 0 ? (
                        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-8 text-center">
                          <div className="text-4xl mb-3">🛏️</div>

                          <h4 className="font-semibold text-gray-700">
                            No rooms added
                          </h4>

                          <p className="text-sm text-gray-500 mt-1 mb-4">
                            This hotel currently has no rooms.
                          </p>

                          <button
                            type="button"
                            onClick={() => openAddRoom(hotel._id)}
                            className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold"
                          >
                            + Add First Room
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {hotelRooms.map((room) => (
                            <div
                              key={room._id}
                              className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition p-4"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                {/* IMAGE */}

                                <div className="w-full sm:w-36 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                  {room.image ? (
                                    <img
                                      src={room.image}
                                      alt={room.roomType}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                      🛏️
                                    </div>
                                  )}
                                </div>

                                {/* DETAILS */}

                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <div>
                                      <h4 className="text-lg font-bold text-gray-800">
                                        {room.roomType}
                                      </h4>

                                      <p className="text-sm text-gray-500">
                                        Up to {room.capacity} guests
                                      </p>
                                    </div>

                                    <span
                                      className={`w-fit px-3 py-1 rounded-full text-xs font-semibold ${
                                        room.available
                                          ? "bg-green-100 text-green-700"
                                          : "bg-red-100 text-red-700"
                                      }`}
                                    >
                                      {room.available
                                        ? "Available"
                                        : "Unavailable"}
                                    </span>
                                  </div>

                                  <div className="flex items-center justify-between mt-3">
                                    <p className="text-lg font-bold text-green-600">
                                      ₹{Number(room.price).toLocaleString()}
                                      <span className="text-sm font-normal text-gray-500">
                                        {" "}
                                        / night
                                      </span>
                                    </p>

                                    {/* ACTION MENU */}

                                    <div className="flex items-center gap-2">
                                      <button
                                        type="button"
                                        onClick={() => openEditRoom(room)}
                                        className="px-3 py-2 rounded-lg text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition"
                                      >
                                        Edit
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() => handleDelete(room._id)}
                                        className="px-3 py-2 rounded-lg text-sm font-semibold text-red-700 bg-red-50 hover:bg-red-100 transition"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ==========================================
          ADD / EDIT ROOM MODAL
      ========================================== */}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto">
            {/* MODAL HEADER */}

            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {editingRoom ? "Edit Room" : "Add Room"}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {editingRoom
                    ? "Update room information"
                    : "Add a new room to this hotel"}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* HOTEL */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hotel
                </label>

                <select
                  name="hotel"
                  value={formData.hotel}
                  onChange={handleChange}
                  disabled={Boolean(editingRoom)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                >
                  <option value="">Select Hotel</option>

                  {hotels.map((hotel) => (
                    <option key={hotel._id} value={hotel._id}>
                      {hotel.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* ROOM TYPE DROPDOWN */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Room Type
                </label>

                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Room Type</option>

                  {ROOM_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* PRICE + CAPACITY */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price / Night
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                      ₹
                    </span>

                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="2999"
                      min="1"
                      className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Capacity
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      placeholder="2"
                      min="1"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* =====================================
                  IMAGE DROP ZONE
              ===================================== */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Room Image
                </label>

                {!formData.image ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition ${
                      dragActive
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 hover:border-green-400 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                    <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-green-50 flex items-center justify-center">
                      <svg
                        className="w-7 h-7 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14 8h.01"
                        />

                        <rect x="3" y="4" width="18" height="16" rx="2" />
                      </svg>
                    </div>

                    <p className="font-semibold text-gray-700">
                      {dragActive
                        ? "Drop your image here"
                        : "Drag & drop your image"}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      or{" "}
                      <span className="text-green-600 font-semibold">
                        browse from your device
                      </span>
                    </p>

                    <p className="text-xs text-gray-400 mt-3">
                      JPG, PNG or WEBP • Maximum 5MB
                    </p>
                  </div>
                ) : (
                  /* IMAGE PREVIEW */

                  <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                    <img
                      src={formData.image}
                      alt="Room preview"
                      className="w-full h-56 object-cover"
                    />

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-semibold">Room Image</p>

                          <p className="text-white/70 text-xs">
                            Image selected successfully
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={removeImage}
                          className="px-3 py-2 bg-white/90 hover:bg-white text-red-600 rounded-lg text-sm font-semibold transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* AVAILABLE */}

              <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition">
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Room Availability
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Allow guests to book this room
                  </p>
                </div>

                <div className="relative">
                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleChange}
                    className="sr-only peer"
                  />

                  <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-600 transition"></div>

                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition peer-checked:translate-x-5"></div>
                </div>
              </label>

              {/* ERROR */}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {/* BUTTONS */}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="flex-1 px-5 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-semibold transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-5 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white rounded-xl font-semibold transition"
                >
                  {saving
                    ? "Saving..."
                    : editingRoom
                      ? "Update Room"
                      : "Add Room"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRooms;
