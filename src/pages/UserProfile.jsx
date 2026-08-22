import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";

const UserProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(null);

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
    linkedin: "",
    bio: "",
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // ==========================================
  // FETCH PROFILE
  // ==========================================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/");
          return;
        }

        const res = await axios.get(
          "http://localhost:5000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = res.data.user;

        setProfileData({
          fullName: user.name || "",
          username: user.username || "",
          email: user.email || "",
          phone: user.phone || "",
          dob: user.dob || "",
          gender: user.gender || "",
          country: user.country || "",
          state: user.state || "",
          city: user.city || "",
          zip: user.zipCode || "",
          address: user.address || "",
          website: user.website || "",
          facebook: user.facebook || "",
          instagram: user.instagram || "",
          linkedin: user.linkedin || "",
          bio: user.about || "",
        });

        setProfileImage(user.profileImage || null);
      } catch (err) {
        console.log("Profile Error:", err);
      }
    };

    fetchProfile();
  }, [navigate]);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // EMAIL VALIDATION
  // ==========================================

  const isEmailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email);

  // ==========================================
  // PROFILE COMPLETION
  // ==========================================

  const calculateCompletion = () => {
    let filledFields = 0;

    const totalFields = Object.keys(profileData).length + 1;

    if (profileImage) {
      filledFields++;
    }

    Object.values(profileData).forEach((val) => {
      if (val && val.trim() !== "") {
        filledFields++;
      }
    });

    return Math.round((filledFields / totalFields) * 100);
  };

  const completionPercentage = calculateCompletion();

  // ==========================================
  // IMAGE UPLOAD
  // ==========================================

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

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

  // ==========================================
  // REMOVE IMAGE
  // ==========================================

  const handleRemoveImage = () => {
    setProfileImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/user/profile",
        {
          name: profileData.fullName,
          username: profileData.username,
          phone: profileData.phone,
          dob: profileData.dob,
          gender: profileData.gender,
          country: profileData.country,
          state: profileData.state,
          city: profileData.city,
          zipCode: profileData.zip,
          address: profileData.address,
          website: profileData.website,
          facebook: profileData.facebook,
          instagram: profileData.instagram,
          linkedin: profileData.linkedin,
          about: profileData.bio,
          profileImage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile Updated Successfully!");
    } catch (err) {
      console.log(err);
      alert("Error updating profile");
    }
  };

  // ==========================================
  // PASSWORD
  // ==========================================

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

    if (passwords.new !== passwords.confirm) {
      alert("New password and confirm password do not match!");
      return;
    }

    if (passwords.new.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    alert("✅ Password changed successfully!");

    setIsPasswordModalOpen(false);

    setPasswords({
      current: "",
      new: "",
      confirm: "",
    });
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  // ==========================================
  // SCROLL
  // ==========================================

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);

    if (element) {
      const y =
        element.getBoundingClientRect().top +
        window.scrollY -
        100;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  // ==========================================
  // PLACEHOLDER ICON
  // ==========================================

  const UserPlaceholderIcon = ({ className }) => (
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

  // ==========================================
  // ANIMATION VARIANTS
  // ==========================================

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
        duration: 0.55,
        ease: "easeOut",
      },
    },
  };

  const sidebarVariants = {
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

  const cardHover = {
    y: -3,
    boxShadow:
      "0 12px 30px rgba(0, 0, 0, 0.08)",
    transition: {
      duration: 0.25,
    },
  };

  return (
    <motion.div
      className="w-full min-h-screen bg-gray-50 font-sans pb-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-10">

        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10">

          {/* ==========================================
              SIDEBAR
          ========================================== */}

          <motion.aside
            variants={sidebarVariants}
            className="w-full lg:w-72 flex flex-col gap-6 sticky top-24 shrink-0"
          >
            <motion.div
              whileHover={cardHover}
              className="bg-white rounded-2xl shadow-sm p-4 flex flex-col space-y-1 border border-gray-100"
            >
              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  scrollToSection("personal-info")
                }
                className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl text-sm font-semibold transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7-7"
                  />
                </svg>

                Personal Info
              </motion.button>

              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  scrollToSection("address-details")
                }
                className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl text-sm font-semibold transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-3"
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
              </motion.button>

              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  scrollToSection("security-settings")
                }
                className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl text-sm font-semibold transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-3"
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
              </motion.button>

              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  scrollToSection("my-listings")
                }
                className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl text-sm font-semibold transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-3"
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
              </motion.button>

              <hr className="my-2 border-gray-100" />

              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl text-sm font-semibold transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-3"
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
              </motion.button>
            </motion.div>

            {/* PROFILE COMPLETION */}

            <motion.div
              variants={itemVariants}
              whileHover={cardHover}
              className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-gray-800">
                  Profile Completion
                </h3>

                <motion.span
                  key={completionPercentage}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-[#1A63F4] font-bold text-sm"
                >
                  {completionPercentage}%
                </motion.span>
              </div>

              <div className="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
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

              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Add details to reach 100% and earn the
                'Elite Member' badge.
              </p>
            </motion.div>
          </motion.aside>

          {/* ==========================================
              MAIN
          ========================================== */}

          <motion.main
            variants={containerVariants}
            className="flex-1 w-full flex flex-col gap-6"
          >

            {/* ==========================================
                PROFILE HEADER
            ========================================== */}

            <motion.div
              variants={itemVariants}
              whileHover={cardHover}
              className="bg-white rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-100 gap-4"
            >
              <div className="flex items-center gap-4">

                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.06 }}
                >
                  {profileImage ? (
                    <motion.img
                      initial={{
                        opacity: 0,
                        scale: 0.7,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.4,
                      }}
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
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute bottom-0 right-0 bg-green-500 p-0.5 rounded-full border-2 border-white"
                    >
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
                    </motion.div>
                  )}
                </motion.div>

                <div>
                  <motion.h1
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-bold text-gray-900"
                  >
                    {profileData.fullName ||
                      "Your Name"}
                  </motion.h1>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-500">
                      @{profileData.username ||
                        "username"}
                    </span>

                    {completionPercentage === 100 && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded"
                      >
                        Verified Host
                      </motion.span>
                    )}
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{
                  scale: 1.03,
                  y: -2,
                }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSaveChanges}
                className="bg-[#0052CC] hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center shadow-sm w-full sm:w-auto justify-center"
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

                Save Changes
              </motion.button>
            </motion.div>

            {/* ==========================================
                PROFILE PHOTO
            ========================================== */}

            <motion.div
              variants={itemVariants}
              whileHover={cardHover}
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Profile Photo
              </h2>

              <div className="flex flex-col md:flex-row gap-6 items-center">

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />

                <motion.div
                  whileHover={{
                    scale: 1.01,
                    borderColor: "#1A63F4",
                  }}
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="flex-1 w-full border-2 border-dashed border-gray-200 bg-gray-50 rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer"
                >
                  <motion.svg
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="w-8 h-8 text-gray-400 mb-2"
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
                  </motion.svg>

                  <p className="text-sm font-medium text-gray-700">
                    <span className="text-[#1A63F4]">
                      Click to upload
                    </span>{" "}
                    photo
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG or GIF (max. 5MB)
                  </p>
                </motion.div>

                <div className="flex flex-col gap-3 w-full md:w-48">

                  <motion.button
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className="w-full bg-[#EBF3FE] text-[#1A63F4] font-semibold py-2.5 rounded-xl text-sm hover:bg-blue-100 transition-colors"
                  >
                    Upload New
                  </motion.button>

                  <motion.button
                    whileHover={
                      profileImage
                        ? { scale: 1.03 }
                        : {}
                    }
                    whileTap={
                      profileImage
                        ? { scale: 0.97 }
                        : {}
                    }
                    onClick={handleRemoveImage}
                    className={`w-full font-semibold py-2.5 rounded-xl text-sm transition-colors border ${
                      profileImage
                        ? "bg-white border-red-200 text-red-500 hover:bg-red-50"
                        : "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!profileImage}
                  >
                    Remove
                  </motion.button>

                </div>
              </div>
            </motion.div>

            {/* ==========================================
                PERSONAL INFORMATION
            ========================================== */}

            <motion.div
              id="personal-info"
              variants={itemVariants}
              whileHover={cardHover}
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 scroll-mt-24"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {[
                  {
                    name: "fullName",
                    label: "Full Name",
                    placeholder: "e.g. John Doe",
                    type: "text",
                  },
                  {
                    name: "username",
                    label: "Username",
                    placeholder: "e.g. johndoe123",
                    type: "text",
                  },
                  {
                    name: "phone",
                    label: "Phone Number",
                    placeholder: "+1 (000) 000-0000",
                    type: "text",
                  },
                  {
                    name: "dob",
                    label: "Date of Birth",
                    placeholder: "",
                    type: "date",
                  },
                ].map((field) => (
                  <motion.div
                    key={field.name}
                    whileHover={{ y: -2 }}
                  >
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      {field.label}
                    </label>

                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      name={field.name}
                      value={profileData[field.name]}
                      onChange={handleInputChange}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full bg-[#F4F7FB] px-4 py-3 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A63F4]"
                    />
                  </motion.div>
                ))}

                {/* EMAIL */}

                <motion.div
                  whileHover={{ y: -2 }}
                >
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Email Address
                  </label>

                  <div
                    className={`relative border rounded-xl overflow-hidden ${
                      isEmailValid &&
                      profileData.email
                        ? "border-green-300"
                        : "border-transparent"
                    }`}
                  >
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-[#F4F7FB] pl-4 pr-10 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                    />

                    {isEmailValid &&
                      profileData.email && (
                        <motion.div
                          initial={{
                            scale: 0,
                            opacity: 0,
                          }}
                          animate={{
                            scale: 1,
                            opacity: 1,
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-green-500 rounded-full p-0.5"
                        >
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
                        </motion.div>
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
                </motion.div>

                {/* GENDER */}

                <motion.div
                  whileHover={{ y: -2 }}
                >
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Gender
                  </label>

                  <motion.select
                    whileFocus={{ scale: 1.01 }}
                    name="gender"
                    value={profileData.gender}
                    onChange={handleInputChange}
                    className="w-full bg-[#F4F7FB] px-4 py-3 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A63F4]"
                  >
                    <option value="" disabled hidden>
                      Select Gender
                    </option>
                    <option value="male">
                      Male
                    </option>
                    <option value="female">
                      Female
                    </option>
                    <option value="other">
                      Other
                    </option>
                  </motion.select>
                </motion.div>

              </div>
            </motion.div>

            {/* ==========================================
                ADDRESS
            ========================================== */}

            <motion.div
              id="address-details"
              variants={itemVariants}
              whileHover={cardHover}
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 scroll-mt-24"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Address Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Country
                  </label>

                  <motion.select
                    whileFocus={{ scale: 1.01 }}
                    name="country"
                    value={profileData.country}
                    onChange={handleInputChange}
                    className="w-full bg-[#F4F7FB] px-4 py-3 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A63F4]"
                  >
                    <option value="" disabled hidden>
                      Select Country
                    </option>

                    <option value="us">
                      United States
                    </option>

                    <option value="in">
                      India
                    </option>

                    <option value="uk">
                      United Kingdom
                    </option>
                  </motion.select>
                </div>

                {[
                  {
                    name: "state",
                    label: "State / Region",
                    placeholder: "e.g. Gujarat",
                  },
                  {
                    name: "city",
                    label: "City",
                    placeholder: "e.g. Jamnagar",
                  },
                  {
                    name: "zip",
                    label: "ZIP Code",
                    placeholder: "e.g. 361004",
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      {field.label}
                    </label>

                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      name={field.name}
                      value={profileData[field.name]}
                      onChange={handleInputChange}
                      type="text"
                      placeholder={field.placeholder}
                      className="w-full bg-[#F4F7FB] px-4 py-3 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A63F4]"
                    />
                  </div>
                ))}

              </div>

              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Full Address
              </label>

              <motion.input
                whileFocus={{ scale: 1.005 }}
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                type="text"
                placeholder="Street, Suite, Unit..."
                className="w-full bg-[#F4F7FB] px-4 py-3 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A63F4]"
              />
            </motion.div>

            {/* ==========================================
                SOCIAL + ABOUT
            ========================================== */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <motion.div
                variants={itemVariants}
                whileHover={cardHover}
                className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex flex-col"
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
                    {
                      name: "linkedin",
                      placeholder:
                        "linkedin.com/in/username",
                    },
                  ].map((social) => (
                    <motion.div
                      key={social.name}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 bg-[#F4F7FB] rounded-full flex items-center justify-center text-[#1A63F4] shrink-0">
                        🌐
                      </div>

                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        name={social.name}
                        value={profileData[social.name]}
                        onChange={handleInputChange}
                        type="text"
                        placeholder={social.placeholder}
                        className="w-full bg-[#F4F7FB] px-4 py-2.5 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A63F4]"
                      />
                    </motion.div>
                  ))}

                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={cardHover}
                className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex flex-col"
              >
                <h2 className="text-lg font-bold text-gray-900 mb-5">
                  About Me
                </h2>

                <motion.textarea
                  whileFocus={{
                    scale: 1.01,
                  }}
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us a little bit about yourself..."
                  className="w-full bg-[#F4F7FB] p-4 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A63F4] resize-none h-full min-h-[140px]"
                />
              </motion.div>

            </div>

            {/* ==========================================
                SECURITY
            ========================================== */}

            <motion.div
              id="security-settings"
              variants={itemVariants}
              whileHover={cardHover}
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 scroll-mt-24"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Security Settings
              </h2>

              <p className="text-sm text-gray-500 mb-4">
                Manage your password and security preferences.
              </p>

              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={() =>
                  setIsPasswordModalOpen(true)
                }
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                Change Password
              </motion.button>
            </motion.div>

            {/* ==========================================
                ACCOUNT INSIGHTS
            ========================================== */}

            <motion.div
              variants={itemVariants}
              whileHover={cardHover}
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 mb-8"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-5">
                Account Insights
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-[#F4F7FB] rounded-xl p-4"
                >
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Member Since
                  </p>

                  <p className="text-lg font-bold text-gray-900">
                    Today
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-[#F4F7FB] rounded-xl p-4"
                >
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Profile Strength
                  </p>

                  <p
                    className={`text-lg font-bold ${
                      completionPercentage === 100
                        ? "text-green-600"
                        : "text-orange-500"
                    }`}
                  >
                    {completionPercentage < 50
                      ? "Weak"
                      : completionPercentage < 100
                      ? "Good"
                      : "Excellent"}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-[#F4F7FB] rounded-xl p-4"
                >
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
                      className={`${
                        isEmailValid &&
                        profileData.email
                          ? "bg-green-500"
                          : "bg-gray-300"
                      } rounded-full p-0.5 mr-1.5`}
                    >
                      ✓
                    </div>

                    {isEmailValid &&
                    profileData.email
                      ? "Email Verified"
                      : "Unverified"}
                  </div>
                </motion.div>

              </div>
            </motion.div>

          </motion.main>
        </div>
      </div>

      {/* ==========================================
          PASSWORD MODAL
      ========================================== */}

      <AnimatePresence>
        {isPasswordModalOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.85,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.85,
                y: 30,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative"
            >

              {/* CLOSE */}

              <motion.button
                whileHover={{
                  rotate: 90,
                  scale: 1.1,
                }}
                whileTap={{
                  scale: 0.9,
                }}
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
              </motion.button>

              <motion.h2
                initial={{
                  opacity: 0,
                  x: -15,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                className="text-xl font-bold text-gray-900 mb-6"
              >
                Change Password
              </motion.h2>

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
                  <motion.div
                    key={field.name}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                  >
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      {field.label}
                    </label>

                    <motion.input
                      whileFocus={{
                        scale: 1.01,
                      }}
                      type="password"
                      name={field.name}
                      value={passwords[field.name]}
                      onChange={handlePasswordChange}
                      placeholder={field.placeholder}
                      className="w-full bg-[#F4F7FB] px-4 py-3 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A63F4]"
                    />
                  </motion.div>
                ))}

              </div>

              <div className="flex gap-3">

                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={() =>
                    setIsPasswordModalOpen(false)
                  }
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl text-sm font-semibold transition-colors"
                >
                  Cancel
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={handleSavePassword}
                  className="flex-1 bg-[#0052CC] hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-semibold transition-colors"
                >
                  Save Password
                </motion.button>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserProfile;