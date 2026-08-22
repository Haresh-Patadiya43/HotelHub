import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        {/* Logo + Animated Ring */}
        <div className="relative w-28 h-28 mb-5">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>

          {/* Spinning Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#1A63F4] border-r-[#1A63F4] animate-spin"></div>

          {/* Logo */}
          <div className="absolute inset-3 rounded-full bg-white flex items-center justify-center shadow-sm">
            <img
              src="/logo.png"
              alt="HotelHub Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
        </div>

        {/* Brand */}
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Hotel<span className="text-[#1A63F4]">Hub</span>
        </h2>

        {/* Loading Text */}
        <p className="mt-2 text-sm text-gray-500">
          Finding the best hotels
          <span className="inline-flex ml-1">
            <span className="animate-bounce">.</span>
            <span className="animate-bounce [animation-delay:150ms]">.</span>
            <span className="animate-bounce [animation-delay:300ms]">.</span>
          </span>
        </p>

        {/* Progress Bar */}
        <div className="w-52 h-1.5 mt-5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#1A63F4] rounded-full animate-loading"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
