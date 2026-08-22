import "../index.css";
import  { useState } from "react";
import toast from "react-hot-toast";

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shake, setShake] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleForgotPassword = async () => {
    const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("OTP sent successfully");
      setOtpSent(true); // Show OTP input
      // or setStep("otp");   // If you're using a step-based flow
    } else {
      toast.error(data.message);
    }
  };

  const handleResetPassword = async () => {
    if (!otp || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
          newPassword,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Password reset successfully");

        // Go back to login
        setForgotPassword(false);
        setOtpSent(false);
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  if (!isOpen) return null;

  const triggerShake = () => {
    setHasError(true);
    setShake(true);

    setTimeout(() => {
      setShake(false);
    }, 450);

    setTimeout(() => {
      setHasError(false);
    }, 2000);
  };

  const handleSubmit = async () => {
    try {
      const url = isSignup
        ? "http://localhost:5000/api/auth/register"
        : "http://localhost:5000/api/auth/login";

      const body = isSignup
        ? {
            name,
            email,
            password,
          }
        : {
            email,
            password,
          };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log("Status:", response.status);
      console.log("Data:", data);

      if (!response.ok) {
        triggerShake();
        toast.error(data.message || "Login failed");
        return;
      }

      if (data.success) {
        // Save JWT Token
        localStorage.setItem("token", data.token);

        // Save User Data
        localStorage.setItem("user", JSON.stringify(data.user));

        toast.custom((t) => (
          <div
            className={`
      ${t.visible ? "animate-fadeIn" : ""}
      w-[350px]
      bg-white
      shadow-2xl
      rounded-2xl
      border
      border-gray-100
      overflow-hidden
    `}
          >
            {/* Gradient Top Line */}
            <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-green-400"></div>

            <div className="p-5 flex items-center gap-4">
              {/* Success Icon */}
              <div
                className="
        w-14 h-14
        rounded-full
        bg-green-100
        flex
        items-center
        justify-center
      "
              >
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              {/* Text */}
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Login Successful 🎉
                </h3>

                <p className="text-sm text-gray-500">
                  Welcome back, {data.user?.name || "User"} 👋
                </p>

                <p className="text-xs text-green-600 mt-1 font-medium">
                  You are now logged in
                </p>
              </div>
            </div>
          </div>
        ));

        if (onLoginSuccess) {
          onLoginSuccess();
        }

        onClose();

        // Clear form
        setName("");
        setEmail("");
        setPassword("");
      } else {
        triggerShake();
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      triggerShake();
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div
        className={`relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden ${
          shake ? "animate-shake" : ""
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6 text-center">
          <h2 className="text-3xl font-bold">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>

          <p className="text-sm mt-2 text-blue-100">
            {isSignup
              ? "Create your account to get started."
              : "Sign in to continue."}
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          {/* Name */}
          {isSignup && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-xl px-4 py-3 border transition-all duration-300
                          ${
                            hasError
                              ? "border-red-500 ring-2 ring-red-200"
                              : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                          }
                          focus:outline-none`}
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-xl px-4 py-3 border transition-all duration-300
                        ${
                          hasError
                            ? "border-red-500 ring-2 ring-red-200"
                            : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                        }
                        focus:outline-none`}
            />
          </div>

          {/* Password */}
          {!forgotPassword && (
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full rounded-xl px-4 py-3 border transition-all duration-300
        ${
          hasError
            ? "border-red-500 ring-2 ring-red-200"
            : "border-gray-300 focus:ring-2 focus:ring-blue-500"
        }
        focus:outline-none`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 text-sm font-medium cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          )}
          {/* Forgot Password */}
          {!isSignup && (
            <div className="text-right mb-5">
              <button
                onClick={() => setForgotPassword(true)}
                className="text-sm text-blue-600 hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          {/* Submit Button */}

          {forgotPassword ? (
            <>
              {!otpSent ? (
                <>
                  <button
                    onClick={handleForgotPassword}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl font-semibold cursor-pointer"
                  >
                    Send OTP
                  </button>

                  <button
                    onClick={() => setForgotPassword(false)}
                    className="w-full mt-3 text-blue-600 font-semibold cursor-pointer"
                  >
                    ← Back to Login
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 border border-gray-300 mb-4"
                  />

                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 border border-gray-300 mb-4"
                  />

                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 border border-gray-300 mb-4"
                  />

                  <button
                    onClick={handleResetPassword}
                    className="w-full bg-green-600 text-white py-3 rounded-xl cursor-pointer"
                  >
                    Reset Password
                  </button>
                </>
              )}
            </>
          ) : (
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition cursor-pointer"
            >
              {isSignup ? "Create Account" : "Sign In"}
            </button>
          )}

          {/* Switch Login Signup */}
          {!forgotPassword && (
            <p className="text-center text-gray-600 mt-6 text-sm">
              {isSignup ? "Already have an account?" : "Don't have an account?"}

              <button
                onClick={() => setIsSignup(!isSignup)}
                className="ml-2 text-blue-600 font-semibold hover:underline cursor-pointer"
              >
                {isSignup ? "Sign In" : "Create Account"}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
