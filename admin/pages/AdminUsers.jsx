import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  UserRound,
  Users as UsersIcon,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:5000/api/user/admin/users");
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch users");
        }

        const formattedUsers = data.users.map((user) => ({
          id: user._id,
          name: user.name || "Unknown User",
          email: user.email || "-",
          phone: user.phone || "-",
          bookings: user.bookings || 0,
          joined: user.createdAt
            ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "—",
          status: user.status || "Active",
          profileImage: user.profileImage || "",
        }));

        setUsers(formattedUsers);
      } catch (error) {
        console.error("Fetch users error:", error);
        setError(error.message || "Unable to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.includes(search);

      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, search, statusFilter]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
    setOpenMenu(null);
  };

  const handleDeleteUser = async (user) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/admin/users/${user.id}`,
        { method: "DELETE" }
      );
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to delete user");
      }

      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
      setOpenMenu(null);

      if (selectedUser?.id === user.id) {
        setSelectedUser(null);
        setShowViewModal(false);
      }

      alert("User deleted successfully");
    } catch (error) {
      console.error("Delete user error:", error);
      alert(error.message || "Unable to delete user");
    }
  };

  return (
    <div className="p-7">
      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                {users.length}
              </h2>
            </div>
            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
              <UsersIcon className="text-blue-600" size={21} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                {users.filter((u) => u.status === "Active").length}
              </h2>
            </div>
            <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
              <UserRound className="text-green-600" size={21} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Bookings</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                {users.reduce((total, user) => total + user.bookings, 0)}
              </h2>
            </div>
            <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
              <CalendarDays className="text-purple-600" size={21} />
            </div>
          </div>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="font-bold text-gray-900">All Users</h2>
              <p className="text-xs text-gray-500 mt-1">
                View and manage registered customers
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search users..."
                  className="w-full sm:w-[250px] pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wide">
                <th className="px-5 py-4 font-semibold">User</th>
                <th className="px-5 py-4 font-semibold">Email</th>
                <th className="px-5 py-4 font-semibold">Phone</th>
                <th className="px-5 py-4 font-semibold">Bookings</th>
                <th className="px-5 py-4 font-semibold">Joined</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">
                          {getInitials(user.name)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-400">Customer</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">
                      {user.phone}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-gray-800">
                        {user.bookings}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">
                      {user.joined}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right relative">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleViewUser(user)}
                          className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center transition"
                          title="View User"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() =>
                            setOpenMenu(openMenu === user.id ? null : user.id)
                          }
                          className="w-9 h-9 rounded-lg border border-gray-200 hover:bg-gray-100 flex items-center justify-center transition"
                        >
                          <MoreVertical size={16} />
                        </button>
                      </div>

                      {openMenu === user.id && (
                        <div className="absolute right-5 top-14 z-20 w-36 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                          <button
                            className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50"
                            onClick={() => setOpenMenu(null)}
                          >
                            View
                          </button>
                          <button
                            className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50"
                            onClick={() => setOpenMenu(null)}
                          >
                            Edit
                          </button>
                          <button
                            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                            onClick={() => handleDeleteUser(user)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="px-5 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {filteredUsers.length === 0 ? 0 : startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-gray-700">
              {Math.min(startIndex + usersPerPage, filteredUsers.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-700">
              {filteredUsers.length}
            </span>{" "}
            users
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center disabled:opacity-40 hover:bg-gray-50"
            >
              <ChevronLeft size={17} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center disabled:opacity-40 hover:bg-gray-50"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-7">
        HotelHub Admin Dashboard © 2026
      </div>
    </div>
  );
};

export default AdminUsers;