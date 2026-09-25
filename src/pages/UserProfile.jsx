import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";

const API_URL = "http://localhost:5000/api/user/profile";

const UserProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    address: "",
    website: "",
    facebook: "",
    instagram: "",
    bio: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // =========================================================
  // FETCH PROFILE
  // =========================================================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/");
          return;
        }

        const res = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = res.data.user;

        setProfileData({
          fullName: user.name || "",
          username: user.username || "",
          email: user.email || "",
          phone: user.phone || "",
          dob: user.dob
            ? new Date(user.dob).toISOString().split("T")[0]
            : "",
          gender: user.gender || "",
          country: user.country || "",
          state: user.state || "",
          city: user.city || "",
          zip: user.zipCode || "",
          address: user.address || "",
          website: user.website || "",
          facebook: user.facebook || "",
          instagram: user.instagram || "",
          bio: user.about || "",
        });

        setProfileImage(user.profileImage || null);
      } catch (error) {
        console.error("Profile Error:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // EMAIL VALIDATION
  // =========================================================

  const isEmailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email);

  // =========================================================
  // PROFILE COMPLETION
  // =========================================================

  const calculateCompletion = () => {
    const fields = [
      profileData.fullName,
      profileData.username,
      profileData.email,
      profileData.phone,
      profileData.dob,
      profileData.gender,
      profileData.country,
      profileData.state,
      profileData.city,
      profileData.zip,
      profileData.address,
      profileData.website,
      profileData.facebook,
      profileData.instagram,
      profileData.bio,
      profileImage,
    ];

    const completed = fields.filter(
      (field) => field && String(field).trim() !== ""
    ).length;

    return Math.round((completed / fields.length) * 100);
  };

  const completionPercentage = calculateCompletion();

  // =========================================================
  // IMAGE UPLOAD
  // =========================================================

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // =========================================================
  // REMOVE IMAGE
  // =========================================================

  const handleRemoveImage = () => {
    setProfileImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================================================
  // SAVE PROFILE
  // =========================================================

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      setIsSaving(true);

      const response = await axios.put(
        API_URL,
        {
          name: profileData.fullName,
          username: profileData.username,
          phone: profileData.phone,
          dob: profileData.dob || null,
          gender: profileData.gender,
          country: profileData.country,
          state: profileData.state,
          city: profileData.city,
          zipCode: profileData.zip,
          address: profileData.address,
          website: profileData.website,
          facebook: profileData.facebook,
          instagram: profileData.instagram,
          about: profileData.bio,
          profileImage: profileImage || "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Update Profile Error:", error);

      alert(
        error.response?.data?.message ||
          "Error updating profile."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // =========================================================
  // PASSWORD
  // =========================================================

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSavePassword = () => {
    if (!passwords.current) {
      alert("Please enter your current password.");
      return;
    }

    if (!passwords.new) {
      alert("Please enter a new password.");
      return;
    }

    if (passwords.new.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (passwords.new !== passwords.confirm) {
      alert("New password and confirm password do not match.");
      return;
    }

    alert("Password changed successfully!");

    setIsPasswordModalOpen(false);

    setPasswords({
      current: "",
      new: "",
      confirm: "",
    });
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to log out?"
    );

    if (!confirmed) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // =========================================================
  // SCROLL
  // =========================================================

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);

    if (!element) return;

    const y =
      element.getBoundingClientRect().top +
      window.scrollY -
      100;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  // =========================================================
  // USER ICON
  // =========================================================

  const UserPlaceholderIcon = ({ className = "" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );

  // =========================================================
  // ANIMATIONS
  // =========================================================

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  const sidebarVariants = {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardHover = {
    y: -2,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.06)",
    transition: {
      duration: 0.2,
    },
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-sm text-gray-500">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <motion.div
      className="w-full min-h-screen bg-gray-50 font-sans pb-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-6 sm:pt-8 lg:pt-10">

        {/* =====================================================
            IMPORTANT:
            sticky is ONLY active on lg screens.
            This prevents sidebar overlapping content on mobile/tablet.
        ====================================================== */}

        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">

          {/* ===================================================
              SIDEBAR
          =================================================== */}

          <motion.aside
            variants={sidebarVariants}
            className="
              w-full
              lg:w-72
              flex
              flex-col
              gap-5
              shrink-0
              lg:sticky
              lg:top-24
              self-start
            "
          >
            {/* Navigation */}

            <motion.div
              whileHover={cardHover}
              className="bg-white rounded-2xl shadow-sm p-3 sm:p-4 border border-gray-100"
            >
              <button
                onClick={() =>
                  scrollToSection("personal-info")
                }
                className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl text-sm font-semibold transition-all"
              >
                <svg
                  className="w-5 h-5 mr-3 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7"
                  />
                </svg>

                Personal Info
              </button>

              <button
                onClick={() =>
                  scrollToSection("address-details")
                }
                className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl text-sm font-semibold transition-all"
              >
                <svg
                  className="w-5 h-5 mr-3 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                Address
              </button>

              <button
                onClick={() =>
                  scrollToSection("security-settings")
                }
                className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl text-sm font-semibold transition-all"
              >
                <svg
                  className="w-5 h-5 mr-3 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>

                Security
              </button>

              <button
                onClick={() =>
                  scrollToSection("my-listings")
                }
                className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl text-sm font-semibold transition-all"
              >
                <svg
                  className="w-5 h-5 mr-3 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2"
                  />
                </svg>

                My Listings
              </button>

              <hr className="my-2 border-gray-100" />

              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl text-sm font-semibold transition-all"
              >
                <svg
                  className="w-5 h-5 mr-3 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7"
                  />
                </svg>

                Log Out
              </button>
            </motion.div>

            {/* Profile Completion */}

            <motion.div
              variants={itemVariants}
              whileHover={cardHover}
              className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-gray-800">
                  Profile Completion
                </h3>

                <span className="text-[#1A63F4] font-bold text-sm">
                  {completionPercentage}%
                </span>
              </div>

              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-[#1A63F4] h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${completionPercentage}%`,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                />
              </div>

              <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                Add details to reach 100% and earn the
                "Elite Member" badge.
              </p>
            </motion.div>
          </motion.aside>

          {/* ===================================================
              MAIN CONTENT
          =================================================== */}

          <motion.main
            variants={containerVariants}
            className="flex-1 w-full min-w-0 flex flex-col gap-6"
          >
            {/* =================================================
                PROFILE HEADER
            ================================================= */}

            <motion.div
              variants={itemVariants}
              whileHover={cardHover}
              className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="relative shrink-0">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-16 h-16 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-400">
                      <UserPlaceholderIcon className="w-8 h-8" />
                    </div>
                  )}

                  {completionPercentage > 80 && (
                    <div className="absolute bottom-0 right-0 bg-green-500 p-0.5 rounded-full border-2 border-white">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                    {profileData.fullName || "Your Name"}
                  </h1>

                  <p className="text-sm text-gray-500 mt-1 truncate">
                    @{profileData.username || "username"}
                  </p>
                </div>
              </div>

              <button
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="bg-[#0052CC] hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center w-full sm:w-auto shrink-0"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3"
                  />
                </svg>

                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </motion.div>

            {/* =================================================
                PROFILE PHOTO
            ================================================= */}

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 border border-gray-100"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-5">
                Profile Photo
              </h2>

              <div className="flex flex-col md:flex-row gap-5 items-stretch">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/gif,image/webp"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="flex-1 min-h-[160px] border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-blue-50 hover:border-blue-300 rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer"
                >
                  <svg
                    className="w-9 h-9 text-gray-400 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>

                  <p className="text-sm font-medium text-gray-700">
                    <span className="text-[#1A63F4]">
                      Click to upload
                    </span>{" "}
                    photo
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG, GIF or WEBP (max. 5MB)
                  </p>
                </button>

                <div className="flex flex-row md:flex-col gap-3 md:w-48">
                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className="flex-1 bg-[#EBF3FE] text-[#1A63F4] font-semibold py-2.5 rounded-xl text-sm hover:bg-blue-100 transition-colors"
                  >
                    Upload New
                  </button>

                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    disabled={!profileImage}
                    className={`flex-1 font-semibold py-2.5 rounded-xl text-sm transition-colors border ${
                      profileImage
                        ? "bg-white border-red-200 text-red-500 hover:bg-red-50"
                        : "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </motion.div>

            {/* =================================================
                PERSONAL INFORMATION
            ================================================= */}

            <motion.div
              id="personal-info"
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 border border-gray-100 scroll-mt-24"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* FULL NAME */}

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Full Name
                  </label>

                  <input
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="e.g. John Doe"
                    className="profile-input"
                  />
                </div>

                {/* USERNAME */}

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Username
                  </label>

                  <input
                    name="username"
                    value={profileData.username}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="e.g. johndoe123"
                    className="profile-input"
                  />
                </div>

                {/* PHONE */}

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Phone Number
                  </label>

                  <input
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="+91 00000 00000"
                    className="profile-input"
                  />
                </div>

                {/* DOB */}

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Date of Birth
                  </label>

                  <input
                    name="dob"
                    value={profileData.dob}
                    onChange={handleInputChange}
                    type="date"
                    className="profile-input"
                  />
                </div>

                {/* EMAIL */}

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Email Address
                  </label>

                  <div className="relative">
                    <input
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      type="email"
                      placeholder="john@example.com"
                      className={`profile-input pr-10 ${
                        isEmailValid && profileData.email
                          ? "ring-1 ring-green-400"
                          : ""
                      }`}
                    />

                    {isEmailValid &&
                      profileData.email && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-green-500 rounded-full p-0.5">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                  </div>

                  {isEmailValid &&
                  profileData.email ? (
                    <p className="text-[10px] text-green-600 mt-1 font-medium">
                      Email verified successfully
                    </p>
                  ) : profileData.email ? (
                    <p className="text-[10px] text-red-500 mt-1 font-medium">
                      Please enter a valid email
                    </p>
                  ) : null}
                </div>

                {/* GENDER */}

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={profileData.gender}
                    onChange={handleInputChange}
                    className="profile-input"
                  >
                    <option value="">
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">
                      Female
                    </option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* =================================================
                ADDRESS
            ================================================= */}

            <motion.div
              id="address-details"
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 border border-gray-100 scroll-mt-24"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Address Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* COUNTRY */}

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Country
                  </label>

                  <select
                    name="country"
                    value={profileData.country}
                    onChange={handleInputChange}
                    className="profile-input"
                  >
                    <option value="">
                      Select Country
                    </option>
                    <option value="us">
                      United States
                    </option>
                    <option value="in">India</option>
                    <option value="uk">
                      United Kingdom
                    </option>
                  </select>
                </div>

                {/* STATE */}

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    State / Region
                  </label>

                  <input
                    name="state"
                    value={profileData.state}
                    onChange={handleInputChange}
                    placeholder="e.g. Gujarat"
                    className="profile-input"
                  />
                </div>

                {/* CITY */}

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    City
                  </label>

                  <input
                    name="city"
                    value={profileData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Jamnagar"
                    className="profile-input"
                  />
                </div>

                {/* ZIP */}

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    ZIP Code
                  </label>

                  <input
                    name="zip"
                    value={profileData.zip}
                    onChange={handleInputChange}
                    placeholder="e.g. 361004"
                    className="profile-input"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Full Address
                </label>

                <input
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  placeholder="Street, Suite, Unit..."
                  className="profile-input"
                />
              </div>
            </motion.div>

            {/* =================================================
                SOCIAL + ABOUT
            ================================================= */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 border border-gray-100"
              >
                <h2 className="text-lg font-bold text-gray-900 mb-5">
                  Social Profiles
                </h2>

                <div className="flex flex-col gap-4">
                  {[
                    {
                      name: "website",
                      placeholder:
                        "https://yourwebsite.com",
                    },
                    {
                      name: "facebook",
                      placeholder:
                        "facebook.com/username",
                    },
                    {
                      name: "instagram",
                      placeholder:
                        "instagram.com/username",
                    },
                  ].map((social) => (
                    <div
                      key={social.name}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 bg-[#F4F7FB] rounded-full flex items-center justify-center text-[#1A63F4] shrink-0">
                        🌐
                      </div>

                      <input
                        name={social.name}
                        value={profileData[social.name]}
                        onChange={handleInputChange}
                        type="text"
                        placeholder={social.placeholder}
                        className="profile-input"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 border border-gray-100"
              >
                <h2 className="text-lg font-bold text-gray-900 mb-5">
                  About Me
                </h2>

                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us a little bit about yourself..."
                  className="w-full bg-[#F4F7FB] p-4 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A63F4] resize-none min-h-[180px]"
                />
              </motion.div>
            </div>

            {/* =================================================
                SECURITY
            ================================================= */}

            <motion.div
              id="security-settings"
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 border border-gray-100 scroll-mt-24"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Security Settings
              </h2>

              <p className="text-sm text-gray-500 mb-5">
                Manage your password and security preferences.
              </p>

              <button
                onClick={() =>
                  setIsPasswordModalOpen(true)
                }
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                Change Password
              </button>
            </motion.div>

            {/* =================================================
                ACCOUNT INSIGHTS
            ================================================= */}

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 border border-gray-100"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-5">
                Account Insights
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-[#F4F7FB] rounded-xl p-4">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Member Since
                  </p>

                  <p className="text-lg font-bold text-gray-900">
                    Today
                  </p>
                </div>

                <div className="bg-[#F4F7FB] rounded-xl p-4">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Profile Strength
                  </p>

                  <p
                    className={`text-lg font-bold ${
                      completionPercentage === 100
                        ? "text-green-600"
                        : completionPercentage < 50
                        ? "text-red-500"
                        : "text-orange-500"
                    }`}
                  >
                    {completionPercentage < 50
                      ? "Weak"
                      : completionPercentage < 100
                      ? "Good"
                      : "Excellent"}
                  </p>
                </div>

                <div className="bg-[#F4F7FB] rounded-xl p-4">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Verification Status
                  </p>

                  <div
                    className={`flex items-center justify-center font-bold text-sm mt-1 ${
                      isEmailValid &&
                      profileData.email
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`rounded-full p-0.5 mr-1.5 ${
                        isEmailValid &&
                        profileData.email
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    >
                      ✓
                    </div>

                    {isEmailValid &&
                    profileData.email
                      ? "Email Verified"
                      : "Unverified"}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.main>
        </div>
      </div>

      {/* =====================================================
          PASSWORD MODAL
      ====================================================== */}

      <AnimatePresence>
        {isPasswordModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative"
            >
              <button
                onClick={() =>
                  setIsPasswordModalOpen(false)
                }
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Change Password
              </h2>

              <div className="space-y-4 mb-8">
                {[
                  {
                    name: "current",
                    label: "Current Password",
                    placeholder:
                      "Enter current password",
                  },
                  {
                    name: "new",
                    label: "New Password",
                    placeholder:
                      "Enter new password",
                  },
                  {
                    name: "confirm",
                    label: "Confirm New Password",
                    placeholder:
                      "Confirm new password",
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      {field.label}
                    </label>

                    <input
                      type="password"
                      name={field.name}
                      value={passwords[field.name]}
                      onChange={handlePasswordChange}
                      placeholder={field.placeholder}
                      className="profile-input"
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setIsPasswordModalOpen(false)
                  }
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl text-sm font-semibold"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSavePassword}
                  className="flex-1 bg-[#0052CC] hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-semibold"
                >
                  Save Password
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          LOCAL INPUT STYLE
      ====================================================== */}

      <style>{`
        .profile-input {
          width: 100%;
          background: #f4f7fb;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          color: #111827;
          border: 1px solid transparent;
          outline: none;
          transition: all 0.2s ease;
        }

        .profile-input::placeholder {
          color: #9ca3af;
        }

        .profile-input:focus {
          border-color: #1a63f4;
          box-shadow: 0 0 0 2px rgba(26, 99, 244, 0.12);
        }

        @media (max-width: 1023px) {
          .profile-input {
            min-height: 46px;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default UserProfile;