import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
// import AdminLayout from "./AdminLayout";

const API_URL = "http://localhost:5000/api/hotels";

const AdminHotels = () => {
  const navigate = useNavigate();

  // =====================================================
  // HOTEL STATES
  // =====================================================

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // SEARCH
  // =====================================================

  const [search, setSearch] = useState("");

  // =====================================================
  // ADD HOTEL
  // =====================================================

  const [showAddModal, setShowAddModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  const [addForm, setAddForm] = useState({
    name: "",
    location: "",
    price: "",
    rating: "4.5",
    reviews: "0",
    description: "",
    amenities: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // =====================================================
  // EDIT HOTEL
  // =====================================================

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
  });

  // =====================================================
  // DELETE
  // =====================================================

  const [deleteLoading, setDeleteLoading] = useState(null);

  // =====================================================
  // FETCH HOTELS
  // =====================================================

  const fetchHotels = async () => {
    try {
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch hotels");
      }

      const data = await response.json();

      console.log("Hotels API:", data);

      if (Array.isArray(data.hotels)) {
        setHotels(data.hotels);
      } else if (Array.isArray(data)) {
        setHotels(data);
      } else {
        setHotels([]);
      }
    } catch (err) {
      console.error("Fetch hotels error:", err);

      setError("Unable to load hotels. Please try again.");
      setHotels([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // =====================================================
  // SEARCH / FILTER
  // =====================================================

  const filteredHotels = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) {
      return hotels;
    }

    return hotels.filter((hotel) => {
      const hotelName = hotel.name?.toLowerCase() || "";
      const hotelLocation = hotel.location?.toLowerCase() || "";

      return (
        hotelName.includes(searchText) || hotelLocation.includes(searchText)
      );
    });
  }, [hotels, search]);

  // =====================================================
  // REFRESH
  // =====================================================

  const handleRefresh = () => {
    setRefreshing(true);
    fetchHotels();
  };

  // =====================================================
  // ADD HOTEL INPUT
  // =====================================================

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;

    setAddForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // IMAGE SELECT
  // =====================================================

  const handleImageSelect = (file) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      alert("Please select JPG, PNG or WEBP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB.");
      return;
    }

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setAddForm((prev) => ({
      ...prev,
      image: file,
    }));

    setImagePreview(previewUrl);
  };

  // =====================================================
  // FILE INPUT
  // =====================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    handleImageSelect(file);
  };

  // =====================================================
  // DRAG OVER
  // =====================================================

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);
  };

  // =====================================================
  // DRAG LEAVE
  // =====================================================

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  };

  // =====================================================
  // DROP
  // =====================================================

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];

    handleImageSelect(file);
  };

  // =====================================================
  // OPEN ADD MODAL
  // =====================================================

  const handleOpenAddModal = () => {
    setAddForm({
      name: "",
      location: "",
      price: "",
      rating: "4.5",
      reviews: "0",
      description: "",
      amenities: "",
      image: null,
    });

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview("");
    setIsDragging(false);
    setShowAddModal(true);
  };

  // =====================================================
  // CLOSE ADD MODAL
  // =====================================================

  const handleCloseAddModal = () => {
    if (addLoading) return;

    setShowAddModal(false);

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview("");
    setIsDragging(false);

    setAddForm({
      name: "",
      location: "",
      price: "",
      rating: "4.5",
      reviews: "0",
      description: "",
      amenities: "",
      image: null,
    });
  };

  // =====================================================
  // ADD HOTEL
  // =====================================================

  const handleAddHotel = async () => {
    if (!addForm.name.trim()) {
      alert("Please enter hotel name.");
      return;
    }

    if (!addForm.location.trim()) {
      alert("Please enter hotel location.");
      return;
    }

    if (!addForm.price || Number(addForm.price) <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    if (!addForm.description.trim()) {
      alert("Please enter hotel description.");
      return;
    }

    if (!addForm.image) {
      alert("Please select a hotel image.");
      return;
    }

    setAddLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", addForm.name.trim());
      formData.append("location", addForm.location.trim());
      formData.append("price", Number(addForm.price));
      formData.append("rating", Number(addForm.rating) || 4.5);
      formData.append("reviews", Number(addForm.reviews) || 0);
      formData.append("description", addForm.description.trim());

      const amenitiesArray = addForm.amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      formData.append("amenities", JSON.stringify(amenitiesArray));

      formData.append("image", addForm.image);

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log("Add hotel response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to add hotel");
      }

      const newHotel = data.hotel || data;

      if (newHotel && newHotel._id) {
        setHotels((prevHotels) => [newHotel, ...prevHotels]);
      } else {
        await fetchHotels();
      }

      alert("Hotel added successfully!");

      handleCloseAddModal();
    } catch (err) {
      console.error("Add hotel error:", err);

      alert(err.message || "Unable to add hotel. Please try again.");
    } finally {
      setAddLoading(false);
    }
  };

  // =====================================================
  // EDIT HOTEL
  // =====================================================

  const handleEdit = (hotel) => {
    setSelectedHotel(hotel);

    setEditForm({
      name: hotel.name || "",
      price: hotel.price ?? "",
    });

    setShowEditModal(true);
  };

  // =====================================================
  // CLOSE EDIT
  // =====================================================

  const handleCloseEdit = () => {
    if (editLoading) return;

    setShowEditModal(false);
    setSelectedHotel(null);

    setEditForm({
      name: "",
      price: "",
    });
  };

  // =====================================================
  // EDIT INPUT
  // =====================================================

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // SAVE EDIT
  // =====================================================

  const handleSaveEdit = async () => {
    if (!selectedHotel) return;

    if (!editForm.name.trim()) {
      alert("Please enter hotel name.");
      return;
    }

    if (!editForm.price || Number(editForm.price) <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    setEditLoading(true);

    try {
      const response = await fetch(`${API_URL}/${selectedHotel._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editForm.name.trim(),
          price: Number(editForm.price),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update hotel");
      }

      setHotels((prevHotels) =>
        prevHotels.map((hotel) =>
          hotel._id === selectedHotel._id
            ? {
                ...hotel,
                name: editForm.name.trim(),
                price: Number(editForm.price),
              }
            : hotel,
        ),
      );

      alert("Hotel updated successfully!");

      handleCloseEdit();

      await fetchHotels();
    } catch (err) {
      console.error("Update hotel error:", err);

      alert(err.message || "Unable to update hotel.");
    } finally {
      setEditLoading(false);
    }
  };

  // =====================================================
  // DELETE HOTEL
  // =====================================================

  const handleDelete = async (hotel) => {
    if (!hotel?._id) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${hotel.name}"?`,
    );

    if (!confirmed) return;

    setDeleteLoading(hotel._id);

    try {
      const response = await fetch(`${API_URL}/${hotel._id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete hotel");
      }

      setHotels((prevHotels) =>
        prevHotels.filter((item) => item._id !== hotel._id),
      );

      alert("Hotel deleted successfully!");
    } catch (error) {
      console.error("Delete hotel error:", error);

      alert(error.message || "Unable to delete hotel. Please try again.");
    } finally {
      setDeleteLoading(null);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-gray-600 font-medium">Loading hotels...</p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================
  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-8 text-center max-w-md w-full">
          <div className="w-14 h-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
            !
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-4">
            Something went wrong
          </h2>

          <p className="text-gray-500 mt-2">{error}</p>

          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={handleRefresh}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition cursor-pointer"
            >
              Try Again
            </button>

            <button
              onClick={() => navigate("/admin/dashboard")}
              className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition cursor-pointer"
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN PAGE
  // =====================================================

  return (
    <>
      {/* =====================================================
          ACTION BAR
      ===================================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 mb-6">
        {/* REFRESH */}

        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition cursor-pointer disabled:opacity-50"
        >
          {refreshing ? "Refreshing..." : "↻ Refresh"}
        </button>

        {/* ADD HOTEL */}

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-sm transition cursor-pointer"
        >
          + Add Hotel
        </button>
      </div>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-7">
        {/* TOTAL */}

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Hotels</p>

              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                {hotels.length}
              </h2>

              <p className="text-xs text-green-600 mt-2 font-medium">
                ● Active listings
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
              🏨
            </div>
          </div>
        </div>

        {/* SHOWING */}

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Showing</p>

              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                {filteredHotels.length}
              </h2>

              <p className="text-xs text-gray-500 mt-2">Matching hotels</p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-xl">
              ✓
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm mb-6">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search hotel or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition"
          />
        </div>
      </div>

      {/* =====================================================
          HOTEL TABLE
      ===================================================== */}

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="font-bold text-gray-900 text-lg">All Hotels</h2>

          <p className="text-sm text-gray-500 mt-1">
            {filteredHotels.length} hotel
            {filteredHotels.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {filteredHotels.length === 0 ? (
          <div className="py-16 text-center">
            <div className="text-5xl mb-4">🏨</div>

            <h3 className="text-lg font-semibold text-gray-900">
              No hotels found
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Add your first hotel using the Add Hotel button.
            </p>

            <button
              onClick={handleOpenAddModal}
              className="mt-5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold cursor-pointer"
            >
              + Add Hotel
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Hotel
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Location
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Price / Night
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>

                  <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredHotels.map((hotel) => (
                  <tr
                    key={hotel._id}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition"
                  >
                    {/* HOTEL */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          {hotel.image ? (
                            <img
                              src={hotel.image}
                              alt={hotel.name || "Hotel"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xl">
                              🏨
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate max-w-[250px]">
                            {hotel.name || "Unnamed Hotel"}
                          </h3>

                          <p className="text-xs text-gray-400 mt-1">
                            ID: {hotel._id?.slice(-8)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* LOCATION */}

                    <td className="px-6 py-5">
                      <span className="text-gray-600">
                        {hotel.location || "-"}
                      </span>
                    </td>

                    {/* PRICE */}

                    <td className="px-6 py-5">
                      <span className="font-bold text-gray-900">
                        ₹{Number(hotel.price || 0).toLocaleString("en-IN")}
                      </span>

                      <span className="text-xs text-gray-400 ml-1">
                        / night
                      </span>
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        Active
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(hotel)}
                          disabled={deleteLoading === hotel._id}
                          className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-sm font-medium transition cursor-pointer disabled:opacity-50"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(hotel)}
                          disabled={deleteLoading === hotel._id}
                          className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition cursor-pointer disabled:opacity-50 min-w-[70px]"
                        >
                          {deleteLoading === hotel._id ? (
                            <span className="flex items-center justify-center gap-2">
                              <span className="w-3.5 h-3.5 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                              Deleting...
                            </span>
                          ) : (
                            "Delete"
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* =====================================================
          ADD HOTEL MODAL
      ===================================================== */}

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* OVERLAY */}

          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCloseAddModal}
          />

          {/* MODAL */}

          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* HEADER */}

            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Add New Hotel
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Add a new hotel to your HotelHub system
                </p>
              </div>

              <button
                onClick={handleCloseAddModal}
                disabled={addLoading}
                className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center cursor-pointer disabled:opacity-50"
              >
                ✕
              </button>
            </div>

            {/* FORM */}

            <div className="p-6 space-y-5">
              {/* NAME + LOCATION */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hotel Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={addForm.name}
                    onChange={handleAddInputChange}
                    placeholder="Hotel Sunrise Inn"
                    disabled={addLoading}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location *
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={addForm.location}
                    onChange={handleAddInputChange}
                    placeholder="Ahmedabad, Gujarat"
                    disabled={addLoading}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* PRICE + RATING + REVIEWS */}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price / Night *
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                      ₹
                    </span>

                    <input
                      type="number"
                      name="price"
                      value={addForm.price}
                      onChange={handleAddInputChange}
                      placeholder="1299"
                      min="1"
                      disabled={addLoading}
                      className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rating
                  </label>

                  <input
                    type="number"
                    name="rating"
                    value={addForm.rating}
                    onChange={handleAddInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                    disabled={addLoading}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Reviews
                  </label>

                  <input
                    type="number"
                    name="reviews"
                    value={addForm.reviews}
                    onChange={handleAddInputChange}
                    min="0"
                    disabled={addLoading}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* DESCRIPTION */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>

                <textarea
                  name="description"
                  value={addForm.description}
                  onChange={handleAddInputChange}
                  placeholder="Enter hotel description..."
                  rows="4"
                  disabled={addLoading}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none disabled:bg-gray-100"
                />
              </div>

              {/* AMENITIES */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Amenities
                </label>

                <input
                  type="text"
                  name="amenities"
                  value={addForm.amenities}
                  onChange={handleAddInputChange}
                  placeholder="WiFi, Parking, Swimming Pool, AC"
                  disabled={addLoading}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition disabled:bg-gray-100"
                />

                <p className="text-xs text-gray-400 mt-2">
                  Separate amenities with commas.
                </p>
              </div>

              {/* IMAGE */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hotel Image *
                </label>

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 bg-gray-50"
                  }`}
                >
                  {imagePreview ? (
                    <div>
                      <img
                        src={imagePreview}
                        alt="Hotel preview"
                        className="w-full h-52 object-cover rounded-xl"
                      />

                      <div className="flex items-center justify-center gap-3 mt-4">
                        <label className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium cursor-pointer hover:bg-blue-100">
                          Change Image
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() => {
                            if (imagePreview) {
                              URL.revokeObjectURL(imagePreview);
                            }

                            setImagePreview("");

                            setAddForm((prev) => ({
                              ...prev,
                              image: null,
                            }));
                          }}
                          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium cursor-pointer hover:bg-red-100"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-5xl mb-3">🖼️</div>

                      <h3 className="font-semibold text-gray-800">
                        Drag & Drop your image here
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        or click below to select an image
                      </p>

                      <label className="inline-block mt-4 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold cursor-pointer">
                        Choose Image
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>

                      <p className="text-xs text-gray-400 mt-3">
                        JPG, PNG or WEBP • Maximum 5MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* FOOTER */}

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0">
              <button
                onClick={handleCloseAddModal}
                disabled={addLoading}
                className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-100 cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleAddHotel}
                disabled={addLoading}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold cursor-pointer disabled:opacity-60 min-w-[130px]"
              >
                {addLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Adding...
                  </span>
                ) : (
                  "Add Hotel"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          EDIT HOTEL MODAL
      ===================================================== */}

      {showEditModal && selectedHotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* OVERLAY */}

          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCloseEdit}
          />

          {/* MODAL */}

          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* HEADER */}

            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Edit Hotel</h2>

                <p className="text-sm text-gray-500 mt-1">
                  Update hotel information
                </p>
              </div>

              <button
                onClick={handleCloseEdit}
                disabled={editLoading}
                className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center cursor-pointer disabled:opacity-50"
              >
                ✕
              </button>
            </div>

            {/* FORM */}

            <div className="p-6 space-y-5">
              {/* NAME */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hotel Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  disabled={editLoading}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition disabled:bg-gray-100"
                />
              </div>

              {/* PRICE */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price per Night
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    ₹
                  </span>

                  <input
                    type="number"
                    name="price"
                    value={editForm.price}
                    onChange={handleEditChange}
                    min="1"
                    disabled={editLoading}
                    className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition disabled:bg-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* FOOTER */}

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={handleCloseEdit}
                disabled={editLoading}
                className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-100 cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveEdit}
                disabled={editLoading}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold cursor-pointer disabled:opacity-60 min-w-[130px]"
              >
                {editLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminHotels;
