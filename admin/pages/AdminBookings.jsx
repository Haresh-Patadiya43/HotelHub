import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [hotelFilter, setHotelFilter] = useState("All");

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 8;

  const navigate = useNavigate();

  // ==============================
  // BACK TO ADMIN DASHBOARD
  // ==============================

  const handleBackToDashboard = () => {
    navigate("/admin/dashboard");
  };

  // ==============================
  // FETCH ALL BOOKINGS
  // ==============================

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/bookings/admin`);

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();

      console.log("Admin Bookings:", data);

      if (Array.isArray(data)) {
        setBookings(data);
      } else if (Array.isArray(data.bookings)) {
        setBookings(data.bookings);
      } else if (Array.isArray(data.data)) {
        setBookings(data.data);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error("Booking fetch error:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ==============================
  // HELPERS
  // ==============================

  const getBookingId = (booking) =>
    booking.bookingId ||
    booking.bookingNumber ||
    booking.confirmationNumber ||
    booking._id ||
    "N/A";

  const getCustomerName = (booking) =>
    booking.userId?.name ||
    booking.user?.name ||
    booking.user?.fullName ||
    booking.customerName ||
    booking.guestName ||
    booking.name ||
    "Unknown Customer";

  const getCustomerEmail = (booking) =>
    booking.userId?.email ||
    booking.user?.email ||
    booking.customerEmail ||
    booking.email ||
    "No email";

  const getHotelName = (booking) =>
    booking.hotelId?.name ||
    booking.hotel?.name ||
    booking.hotelName ||
    (typeof booking.hotel === "string" ? booking.hotel : null) ||
    "Unknown Hotel";

  const getRoomName = (booking) =>
    booking.room?.name || booking.roomName || booking.roomType || "Room";

  const getAmount = (booking) =>
    booking.totalPrice ??
    booking.totalAmount ??
    booking.amount ??
    booking.price ??
    0;

  // IMPORTANT:
  // Backend uses bookingStatus, not status.
  const getStatus = (booking) => {
    const status = booking.bookingStatus || "confirmed";

    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getBookingDate = (booking) =>
    booking.checkIn ||
    booking.startDate ||
    booking.bookingDate ||
    booking.createdAt;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(amount) || 0);

  // ==============================
  // HOTEL FILTER
  // ==============================

  const hotels = useMemo(() => {
    const names = bookings
      .map((booking) => getHotelName(booking))
      .filter((name) => name !== "Unknown Hotel");

    return [...new Set(names)];
  }, [bookings]);

  // ==============================
  // FILTER BOOKINGS
  // ==============================

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const text = search.toLowerCase();

      const bookingId = getBookingId(booking).toString().toLowerCase();

      const customer = getCustomerName(booking).toLowerCase();

      const email = getCustomerEmail(booking).toLowerCase();

      const hotel = getHotelName(booking).toLowerCase();

      const matchesSearch =
        !text ||
        bookingId.includes(text) ||
        customer.includes(text) ||
        email.includes(text) ||
        hotel.includes(text);

      const matchesStatus =
        statusFilter === "All" ||
        getStatus(booking).toLowerCase() === statusFilter.toLowerCase();

      const matchesHotel =
        hotelFilter === "All" || getHotelName(booking) === hotelFilter;

      return matchesSearch && matchesStatus && matchesHotel;
    });
  }, [bookings, search, statusFilter, hotelFilter]);

  // ==============================
  // STATS
  // ==============================

  const totalBookings = bookings.filter(
    (booking) => getStatus(booking) !== "Cancelled",
  ).length;

  const confirmedBookings = bookings.filter(
    (booking) => getStatus(booking) === "Confirmed",
  ).length;

  const pendingBookings = bookings.filter(
    (booking) => getStatus(booking) === "Pending",
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) => getStatus(booking) === "Cancelled",
  ).length;

  // ==============================
  // PAGINATION
  // ==============================

  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  const startIndex = (currentPage - 1) * bookingsPerPage;

  const currentBookings = filteredBookings.slice(
    startIndex,
    startIndex + bookingsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, hotelFilter]);

  // ==============================
  // CANCEL BOOKING
  // ==============================

  const handleCancel = async (booking) => {
    if (!booking._id) {
      alert("Booking ID not found");
      return;
    }

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmCancel) return;

    try {
      setActionLoading(true);

      const response = await fetch(
        `${API_URL}/bookings/${booking._id}/admin-cancel`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to cancel booking");
      }

      alert("Booking cancelled successfully.");

      setSelectedBooking(null);

      await fetchBookings();
    } catch (error) {
      console.error("Cancel booking error:", error);
      alert(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  // ==============================
  // DELETE BOOKING
  // ==============================

  const handleDelete = async (booking) => {
    if (!booking._id) {
      alert("Booking ID not found");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this booking?",
    );

    if (!confirmDelete) return;

    try {
      setActionLoading(true);

      const response = await fetch(`${API_URL}/bookings/${booking._id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete booking");
      }

      alert("Booking deleted successfully.");

      setBookings((prev) => prev.filter((item) => item._id !== booking._id));

      if (selectedBooking && selectedBooking._id === booking._id) {
        setSelectedBooking(null);
      }
    } catch (error) {
      console.error("Delete booking error:", error);
      alert(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />

          <p className="text-sm text-gray-500">Loading bookings...</p>
        </div>
      </div>
    );
  }

  // ==============================
  // MAIN UI
  // ==============================

  return (
    <div className="min-h-screen bg-[#f5f7fb] py-[50px]">
      {/* HEADER */}

   

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-xl">
            📅
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Total Bookings</p>

            <h2 className="text-2xl font-bold text-gray-900">
              {totalBookings.toLocaleString()}
            </h2>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-xl font-bold">
            ✓
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Confirmed</p>

            <h2 className="text-2xl font-bold text-gray-900">
              {confirmedBookings.toLocaleString()}
            </h2>
          </div>
        </div>

        {/* <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center text-xl font-bold">
            ◷
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Pending</p>

            <h2 className="text-2xl font-bold text-gray-900">
              {pendingBookings.toLocaleString()}
            </h2>
          </div>
        </div> */}

        <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center text-xl font-bold">
            ×
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Cancelled</p>

            <h2 className="text-2xl font-bold text-gray-900">
              {cancelledBookings.toLocaleString()}
            </h2>
          </div>
        </div>
      </div>

      {/* BOOKINGS CARD */}

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {/* FILTER BAR */}

        <div className="p-5 border-b border-gray-100 flex flex-col lg:flex-row gap-3">
          {/* SEARCH */}

          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search booking, customer or hotel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-11 pr-4 border border-gray-200 rounded-xl outline-none text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          {/* HOTEL */}

          <select
            value={hotelFilter}
            onChange={(e) => setHotelFilter(e.target.value)}
            className="h-11 px-4 border border-gray-200 rounded-xl bg-white text-sm text-gray-600 outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="All">All Hotels</option>

            {hotels.map((hotel) => (
              <option key={hotel} value={hotel}>
                {hotel}
              </option>
            ))}
          </select>

          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 px-4 border border-gray-200 rounded-xl bg-white text-sm text-gray-600 outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Confirmed">Confirmed</option>
            {/* <option value="Pending">Pending</option> */}
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1150px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-4 text-[11px] font-bold text-gray-500">
                  BOOKING
                </th>

                <th className="text-left px-5 py-4 text-[11px] font-bold text-gray-500">
                  CUSTOMER
                </th>

                <th className="text-left px-5 py-4 text-[11px] font-bold text-gray-500">
                  HOTEL
                </th>

                <th className="text-left px-5 py-4 text-[11px] font-bold text-gray-500">
                  ROOM
                </th>

                <th className="text-left px-5 py-4 text-[11px] font-bold text-gray-500">
                  DATE
                </th>

                <th className="text-left px-5 py-4 text-[11px] font-bold text-gray-500">
                  AMOUNT
                </th>

                <th className="text-left px-5 py-4 text-[11px] font-bold text-gray-500">
                  STATUS
                </th>

                <th className="text-left px-5 py-4 text-[11px] font-bold text-gray-500">
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody>
              {currentBookings.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-5 py-20 text-center">
                    <div className="text-5xl mb-3">📭</div>

                    <h3 className="font-semibold text-gray-800">
                      No bookings found
                    </h3>

                    <p className="text-sm text-gray-400 mt-1">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              ) : (
                currentBookings.map((booking) => {
                  const bookingId = getBookingId(booking);
                  const customer = getCustomerName(booking);
                  const status = getStatus(booking);

                  return (
                    <tr
                      key={booking._id || bookingId}
                      className="border-t border-gray-100 hover:bg-gray-50/70 transition"
                    >
                      {/* BOOKING */}

                      <td className="px-5 py-4">
                        <span className="font-semibold text-sm text-gray-800">
                          #{bookingId}
                        </span>

                        <p className="text-[10px] text-gray-400 mt-1">
                          {booking._id || "No ID"}
                        </p>
                      </td>

                      {/* CUSTOMER */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                            {customer.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <p className="font-semibold text-sm text-gray-700">
                              {customer}
                            </p>

                            <p className="text-[11px] text-gray-400 mt-0.5">
                              {getCustomerEmail(booking)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* HOTEL */}

                      <td className="px-5 py-4">
                        <span className="text-sm text-gray-600">
                          {getHotelName(booking)}
                        </span>
                      </td>

                      {/* ROOM */}

                      <td className="px-5 py-4">
                        <span className="text-sm text-gray-500">
                          {getRoomName(booking)}
                        </span>
                      </td>

                      {/* DATE */}

                      <td className="px-5 py-4">
                        <span className="text-sm text-gray-500">
                          {formatDate(getBookingDate(booking))}
                        </span>
                      </td>

                      {/* AMOUNT */}

                      <td className="px-5 py-4">
                        <span className="font-bold text-sm text-gray-800">
                          {formatCurrency(getAmount(booking))}
                        </span>
                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-4">
                        {status === "Confirmed" && (
                          <span className="inline-flex px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-[11px] font-semibold">
                            Confirmed
                          </span>
                        )}

                        {/* {status === "Pending" && (
                          <span className="inline-flex px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-700 text-[11px] font-semibold">
                            Pending
                          </span>
                        )} */}

                        {status === "Cancelled" && (
                          <span className="inline-flex px-3 py-1.5 rounded-full bg-red-100 text-red-600 text-[11px] font-semibold">
                            Cancelled
                          </span>
                        )}

                        {!["Confirmed", "Pending", "Cancelled"].includes(
                          status,
                        ) && (
                          <span className="inline-flex px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-[11px] font-semibold">
                            {status}
                          </span>
                        )}
                      </td>

                      {/* ACTION */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {/* VIEW */}

                          <button
                            onClick={() => setSelectedBooking(booking)}
                            title="View booking"
                            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 transition"
                          >
                            👁️
                          </button>

                          {/* CANCEL */}

                          {status !== "Cancelled" && (
                            <button
                              onClick={() => handleCancel(booking)}
                              disabled={actionLoading}
                              title="Cancel booking"
                              className="w-8 h-8 rounded-lg border border-yellow-200 text-yellow-600 flex items-center justify-center hover:bg-yellow-50 transition disabled:opacity-50"
                            >
                              ×
                            </button>
                          )}

                          {/* DELETE */}

                          <button
                            onClick={() => handleDelete(booking)}
                            disabled={actionLoading}
                            title="Delete booking"
                            className="w-8 h-8 rounded-lg border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition disabled:opacity-50"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}

        {filteredBookings.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              Showing <span className="font-semibold">{startIndex + 1}</span> to{" "}
              <span className="font-semibold">
                {Math.min(
                  startIndex + bookingsPerPage,
                  filteredBookings.length,
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold">{filteredBookings.length}</span>{" "}
              bookings
            </p>

            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="w-8 h-8 rounded-lg border border-gray-200 text-gray-500 disabled:opacity-40 hover:bg-gray-50"
              >
                ‹
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .slice(
                  Math.max(0, currentPage - 3),
                  Math.min(totalPages, currentPage + 2),
                )
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-semibold ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="w-8 h-8 rounded-lg border border-gray-200 text-gray-500 disabled:opacity-40 hover:bg-gray-50"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ==========================
          VIEW BOOKING MODAL
      ========================== */}

      {selectedBooking && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-5"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* MODAL HEADER */}

            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <p className="text-xs text-gray-400">Booking Details</p>

                <h2 className="text-xl font-bold text-gray-900 mt-1">
                  #{getBookingId(selectedBooking)}
                </h2>
              </div>

              <button
                onClick={() => setSelectedBooking(null)}
                className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 text-xl"
              >
                ×
              </button>
            </div>

            {/* MODAL BODY */}

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="mb-5">
                {getStatus(selectedBooking) === "Confirmed" && (
                  <span className="inline-flex px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                    Confirmed
                  </span>
                )}

                {/* {getStatus(selectedBooking) === "Pending" && (
                  <span className="inline-flex px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                    Pending
                  </span>
                )} */}

                {getStatus(selectedBooking) === "Cancelled" && (
                  <span className="inline-flex px-3 py-1.5 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                    Cancelled
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Detail
                  label="Customer"
                  value={getCustomerName(selectedBooking)}
                />

                <Detail
                  label="Email"
                  value={getCustomerEmail(selectedBooking)}
                />

                <Detail
                  label="Phone"
                  value={
                    selectedBooking.phone ||
                    selectedBooking.userId?.phone ||
                    "N/A"
                  }
                />

                <Detail label="Hotel" value={getHotelName(selectedBooking)} />

                <Detail
                  label="Location"
                  value={selectedBooking.hotelLocation || "N/A"}
                />

                <Detail label="Room" value={getRoomName(selectedBooking)} />

                <Detail
                  label="Check-in"
                  value={formatDate(selectedBooking.checkIn)}
                />

                <Detail
                  label="Check-out"
                  value={formatDate(selectedBooking.checkOut)}
                />

                <Detail
                  label="Guests"
                  value={
                    selectedBooking.guests ||
                    selectedBooking.numberOfGuests ||
                    selectedBooking.guestCount ||
                    "N/A"
                  }
                />

                <Detail
                  label="Nights"
                  value={selectedBooking.nights || "N/A"}
                />

                <Detail
                  label="Room Price"
                  value={formatCurrency(selectedBooking.roomPrice)}
                />

                <Detail
                  label="Taxes"
                  value={formatCurrency(selectedBooking.taxes)}
                />

                <Detail
                  label="Total Amount"
                  value={formatCurrency(getAmount(selectedBooking))}
                  highlight
                />

                <Detail
                  label="Booking Created"
                  value={formatDate(selectedBooking.createdAt)}
                />
              </div>
            </div>

            {/* MODAL FOOTER */}

            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              {getStatus(selectedBooking) !== "Cancelled" && (
                <button
                  onClick={() => handleCancel(selectedBooking)}
                  disabled={actionLoading}
                  className="px-4 py-2.5 rounded-lg bg-red-50 text-red-600 border border-red-100 text-sm font-semibold hover:bg-red-100 disabled:opacity-50"
                >
                  Cancel Booking
                </button>
              )}

              <button
                onClick={() => setSelectedBooking(null)}
                disabled={actionLoading}
                className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==============================
// DETAIL COMPONENT
// ==============================

const Detail = ({ label, value, highlight = false }) => {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">
        {label}
      </p>

      <p
        className={`text-sm font-semibold ${
          highlight ? "text-blue-600 text-base" : "text-gray-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
};

export default AdminBookings;
