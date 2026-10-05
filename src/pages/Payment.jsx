import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "motion/react";

/* =========================================================
   PHONEPE ICON
========================================================= */

const PhonePeIcon = ({ size = 30 }) => {
  return (
    <div
      className="flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: "#5F259F",
      }}
    >
      <span
        style={{
          color: "white",
          fontSize: size * 0.62,
          fontWeight: "800",
          lineHeight: 1,
          fontFamily: "Arial, sans-serif",
        }}
      >
        पे
      </span>
    </div>
  );
};

/* =========================================================
   UPI ICON
========================================================= */

const UPIIcon = ({ size = 25 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
    >
      <rect
        x="3"
        y="3"
        width="42"
        height="42"
        rx="10"
        fill="#E8F0FF"
      />

      <path
        d="M14 14H34"
        stroke="#2563EB"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M14 20H34"
        stroke="#2563EB"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M14 26H28"
        stroke="#2563EB"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M14 32H23"
        stroke="#2563EB"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <circle
        cx="34"
        cy="32"
        r="3"
        fill="#2563EB"
      />
    </svg>
  );
};

/* =========================================================
   QR ICON
========================================================= */

const QRIcon = ({ size = 25 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
    >
      <rect
        x="3"
        y="3"
        width="42"
        height="42"
        rx="10"
        fill="#F3F4F6"
      />

      <rect
        x="11"
        y="11"
        width="10"
        height="10"
        rx="2"
        stroke="#111827"
        strokeWidth="3"
      />

      <rect
        x="15"
        y="15"
        width="2"
        height="2"
        fill="#111827"
      />

      <rect
        x="27"
        y="11"
        width="10"
        height="10"
        rx="2"
        stroke="#111827"
        strokeWidth="3"
      />

      <rect
        x="31"
        y="15"
        width="2"
        height="2"
        fill="#111827"
      />

      <rect
        x="11"
        y="27"
        width="10"
        height="10"
        rx="2"
        stroke="#111827"
        strokeWidth="3"
      />

      <rect
        x="15"
        y="31"
        width="2"
        height="2"
        fill="#111827"
      />

      <rect
        x="27"
        y="27"
        width="4"
        height="4"
        fill="#111827"
      />

      <rect
        x="33"
        y="27"
        width="4"
        height="4"
        fill="#111827"
      />

      <rect
        x="27"
        y="33"
        width="4"
        height="4"
        fill="#111827"
      />

      <rect
        x="33"
        y="35"
        width="4"
        height="2"
        fill="#111827"
      />
    </svg>
  );
};

/* =========================================================
   CHECK ICON
========================================================= */

const CheckIcon = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 12L10 17L19 7"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/* =========================================================
   SHIELD ICON
========================================================= */

const ShieldIcon = () => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 3L20 6V11C20 16.5 16.5 20 12 21C7.5 20 4 16.5 4 11V6L12 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path
        d="M8 12L11 15L16 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/* =========================================================
   SUCCESS CHECK
========================================================= */

const SuccessCheck = () => {
  return (
    <motion.div
      initial={{
        scale: 0,
        rotate: -30,
      }}
      animate={{
        scale: 1,
        rotate: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 12,
      }}
      className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center mx-auto"
    >
      <motion.div
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          delay: 0.2,
          type: "spring",
        }}
        className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-lg"
      >
        <motion.svg
          width="45"
          height="45"
          viewBox="0 0 50 50"
          fill="none"
        >
          <motion.path
            d="M10 26L21 37L41 14"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{
              pathLength: 0,
            }}
            animate={{
              pathLength: 1,
            }}
            transition={{
              delay: 0.4,
              duration: 0.5,
            }}
          />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
};

/* =========================================================
   PAYMENT
========================================================= */

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedMethod, setSelectedMethod] =
    useState("phonepe");

  const [loading, setLoading] = useState(false);

  const [paymentOpened, setPaymentOpened] =
    useState(false);

  const [confirmed, setConfirmed] =
    useState(false);

  /* =========================================================
     BOOKING DATA
  ========================================================= */

  const bookingData =
    location.state?.bookingData;

  const amount = Number(
    location.state?.amount || 0
  );

  /* =========================================================
     CHECK DATA
  ========================================================= */

  if (!bookingData || !amount) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md"
        >
          <div className="text-6xl mb-4">
            ⚠️
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Payment Information Missing
          </h1>

          <p className="text-gray-500 mt-2">
            Please return to the booking page and try again.
          </p>

          <button
            onClick={() => navigate("/hotels")}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Back to Hotels
          </button>
        </motion.div>

      </div>
    );
  }

  /* =========================================================
     UPI
  ========================================================= */

  const upiId = "9726281978@axl";

  const payeeName =
    "PATADIYA HARESH";

  const formattedAmount =
    amount.toLocaleString("en-IN");

  const upiPaymentUrl =
    `upi://pay?pa=${encodeURIComponent(
      upiId
    )}` +
    `&pn=${encodeURIComponent(
      payeeName
    )}` +
    `&am=${amount.toFixed(2)}` +
    `&cu=INR`;

  /* =========================================================
     OPEN PAYMENT
  ========================================================= */

  const handlePayNow = () => {
    if (!amount || amount <= 0) {
      alert("Invalid payment amount.");
      return;
    }

    setPaymentOpened(true);

    // Open UPI application
    window.location.href =
      upiPaymentUrl;
  };

  /* =========================================================
     CONFIRM PAYMENT
  ========================================================= */

  const handleConfirmPayment = async () => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      alert(
        "Please login before confirming payment."
      );
      return;
    }

    try {
      setLoading(true);

      /* ==========================================
         CREATE BOOKING ONLY NOW
      ========================================== */

      const finalBookingData = {
        ...bookingData,

        paymentStatus: "completed",
        bookingStatus: "confirmed",

        paymentMethod:
          selectedMethod === "phonepe"
            ? "PhonePe"
            : selectedMethod === "upi"
              ? "UPI"
              : "QR",

        paidAmount: amount,

        paymentDate:
          new Date().toISOString(),
      };

      console.log(
        "Creating confirmed booking:",
        finalBookingData
      );

      const response = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify(
            finalBookingData
          ),
        }
      );

      const data =
        await response.json();

      console.log(
        "Booking response:",
        data
      );

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to create booking."
        );
      }

      /* ==========================================
         SUCCESS
      ========================================== */

      setConfirmed(true);

    } catch (error) {
      console.error(
        "Booking Confirmation Error:",
        error
      );

      alert(
        error.message ||
          "Payment confirmation failed."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     PAYMENT METHOD
  ========================================================= */

  const PaymentMethod = ({
    id,
    icon,
    title,
    description,
    amountShow = true,
  }) => {
    const selected =
      selectedMethod === id;

    return (
      <button
        type="button"
        onClick={() =>
          setSelectedMethod(id)
        }
        className={`w-full text-left px-5 py-5 border-b border-gray-200 transition-all ${
          selected
            ? "bg-blue-50"
            : "bg-white hover:bg-gray-50"
        }`}
      >

        <div className="flex items-center gap-4">

          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              selected
                ? "border-blue-600 bg-blue-600"
                : "border-gray-400 bg-white"
            }`}
          >
            {selected && (
              <CheckIcon />
            )}
          </div>

          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
              selected
                ? "bg-white shadow-sm"
                : "bg-gray-100"
            }`}
          >
            {icon}
          </div>

          <div className="flex-1 min-w-0">

            <h3 className="font-semibold text-gray-900">
              {title}
            </h3>

            <p className="text-sm text-gray-500 mt-0.5">
              {description}
            </p>

          </div>

          {amountShow && (
            <span className="font-semibold text-gray-900 whitespace-nowrap">
              ₹{formattedAmount}
            </span>
          )}

        </div>

      </button>
    );
  };

  /* =========================================================
     CONFIRMATION SCREEN
  ========================================================= */

  if (confirmed) {
    return (
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-4"
      >

        {/* CONFETTI */}

        {Array.from({
          length: 30,
        }).map((_, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: -50,
              x: 0,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [
                -50,
                Math.random() * 400 + 100,
              ],
              x:
                (Math.random() - 0.5) *
                700,
              rotate:
                Math.random() * 720,
            }}
            transition={{
              duration:
                2.5 +
                Math.random() * 1.5,
              delay:
                Math.random() * 0.5,
            }}
            className="fixed top-0 left-1/2 w-3 h-3 rounded-sm bg-green-500"
          />
        ))}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.7,
            y: 40,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            type: "spring",
            stiffness: 120,
          }}
          className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-xl w-full p-8 md:p-12 text-center"
        >

          <SuccessCheck />

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.5,
            }}
          >

            <p className="text-green-600 font-semibold mt-7 text-lg">
              🎉 Payment Successful
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
              Congratulations!
            </h1>

            <p className="text-2xl font-semibold text-gray-800 mt-3">
              Your Booking is Confirmed
            </p>

            <p className="text-gray-500 mt-3">
              Your stay at{" "}
              <span className="font-semibold text-gray-800">
                {bookingData.hotelName}
              </span>{" "}
              has been successfully booked.
            </p>

          </motion.div>

          {/* BOOKING CARD */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.7,
            }}
            className="mt-7 bg-gray-50 border border-gray-200 rounded-2xl p-5 text-left"
          >

            <div className="flex justify-between mb-3">

              <span className="text-gray-500">
                Hotel
              </span>

              <span className="font-semibold text-gray-900">
                {bookingData.hotelName}
              </span>

            </div>

            <div className="flex justify-between mb-3">

              <span className="text-gray-500">
                Room
              </span>

              <span className="font-semibold text-gray-900">
                {bookingData.roomName}
              </span>

            </div>

            <div className="flex justify-between mb-3">

              <span className="text-gray-500">
                Check-in
              </span>

              <span className="font-semibold text-gray-900">
                {bookingData.checkIn}
              </span>

            </div>

            <div className="flex justify-between mb-3">

              <span className="text-gray-500">
                Check-out
              </span>

              <span className="font-semibold text-gray-900">
                {bookingData.checkOut}
              </span>

            </div>

            <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between">

              <span className="font-semibold">
                Paid Amount
              </span>

              <span className="font-bold text-green-600 text-xl">
                ₹{formattedAmount}
              </span>

            </div>

          </motion.div>

          {/* STATUS */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.9,
            }}
            className="mt-5 flex items-center justify-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-xl py-3"
          >
            <span className="text-xl">
              ✓
            </span>

            <span className="font-semibold">
              Booking Confirmed & Added to My Bookings
            </span>
          </motion.div>

          {/* BUTTONS */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.1,
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-7"
          >

            <button
              onClick={() =>
                navigate("/my-bookings")
              }
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition"
            >
              View My Bookings
            </button>

            <button
              onClick={() =>
                navigate("/")
              }
              className="border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-3.5 rounded-xl transition"
            >
              Back to Home
            </button>

          </motion.div>

        </motion.div>

      </motion.div>
    );
  }

  /* =========================================================
     NORMAL PAYMENT PAGE
  ========================================================= */

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}

      <header className="bg-white border-b border-gray-200">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">

          <div className="flex items-center justify-between">

            <button
              onClick={() =>
                navigate(-1)
              }
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium"
            >
              <span className="text-xl">
                ←
              </span>
              Back
            </button>

            <div className="flex items-center gap-2">

              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                H
              </div>

              <span className="text-xl font-bold text-gray-900">
                HotelHub
              </span>

            </div>

            <div className="w-12" />

          </div>

        </div>

      </header>

      {/* MAIN */}

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        <div className="mb-7">

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Select Payment Method
          </h1>

          <p className="text-gray-500 text-sm mt-2">
            Complete your payment to confirm your booking
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT */}

          <div className="lg:col-span-2">

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">

              <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">

                <h2 className="font-semibold text-gray-900">
                  UPI Payment
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  Select one of the payment options below
                </p>

              </div>

              <PaymentMethod
                id="phonepe"
                icon={
                  <PhonePeIcon size={30} />
                }
                title="PhonePe"
                description="Pay securely using PhonePe"
              />

              <PaymentMethod
                id="upi"
                icon={
                  <UPIIcon size={36} />
                }
                title="Other UPI Apps"
                description="Google Pay, Paytm, BHIM and more"
              />

              <PaymentMethod
                id="qr"
                icon={
                  <QRIcon size={36} />
                }
                title="Scan QR Code"
                description="Scan the QR using any UPI app"
                amountShow={false}
              />

            </div>

            {/* PHONEPE */}

            {selectedMethod === "phonepe" && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="mt-5 bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
              >

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <PhonePeIcon size={27} />
                  </div>

                  <div>

                    <h3 className="font-semibold text-gray-900">
                      Pay with PhonePe
                    </h3>

                    <p className="text-sm text-gray-500">
                      Your payment will open in your UPI app.
                    </p>

                  </div>

                </div>

                <div className="mt-5 bg-purple-50 border border-purple-100 rounded-xl p-4">

                  <p className="text-xs text-gray-500">
                    Paying to
                  </p>

                  <p className="font-semibold text-gray-900 mt-1">
                    {payeeName}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    {upiId}
                  </p>

                </div>

              </motion.div>
            )}

            {/* OTHER UPI */}

            {selectedMethod === "upi" && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="mt-5 bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
              >

                <div className="flex items-center gap-3">

                  <UPIIcon size={30} />

                  <div>

                    <h3 className="font-semibold">
                      Pay using UPI
                    </h3>

                    <p className="text-sm text-gray-500">
                      Use any supported UPI application.
                    </p>

                  </div>

                </div>

                <div className="mt-5 bg-gray-50 border border-gray-200 rounded-xl p-4">

                  <p className="text-xs text-gray-500">
                    UPI ID
                  </p>

                  <p className="font-semibold text-gray-900 mt-1">
                    {upiId}
                  </p>

                </div>

              </motion.div>
            )}

            {/* QR */}

            {selectedMethod === "qr" && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="mt-5 bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
              >

                <div className="text-center">

                  <QRIcon size={34} />

                  <h3 className="font-semibold text-gray-900 text-lg mt-3">
                    Scan & Pay
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Scan this QR code using any UPI app
                  </p>

                </div>

                <div className="flex justify-center mt-6">

                  <div className="p-4 bg-white border border-gray-200 rounded-2xl shadow-md">

                    <QRCodeSVG
                      value={upiPaymentUrl}
                      size={260}
                      level="H"
                      includeMargin
                    />

                  </div>

                </div>

                <div className="text-center mt-6">

                  <p className="text-sm text-gray-500">
                    Amount to Pay
                  </p>

                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    ₹{formattedAmount}
                  </p>

                </div>

              </motion.div>
            )}

          </div>

          {/* RIGHT SUMMARY */}

          <div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden lg:sticky lg:top-6">

              <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">

                <h2 className="font-semibold text-gray-900">
                  Payment Summary
                </h2>

              </div>

              <div className="p-5">

                {/* HOTEL */}

                <div className="mb-4">

                  <p className="text-xs text-gray-500">
                    Hotel
                  </p>

                  <p className="font-semibold text-gray-900 mt-1">
                    {bookingData.hotelName}
                  </p>

                </div>

                {/* ROOM */}

                <div className="mb-4">

                  <p className="text-xs text-gray-500">
                    Room
                  </p>

                  <p className="font-semibold text-gray-900 mt-1">
                    {bookingData.roomName}
                  </p>

                </div>

                {/* DATES */}

                <div className="mb-4">

                  <p className="text-xs text-gray-500">
                    Stay
                  </p>

                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {bookingData.checkIn}
                    {" → "}
                    {bookingData.checkOut}
                  </p>

                </div>

                <div className="border-t border-gray-200 my-5" />

                <div className="flex justify-between items-center">

                  <span className="font-semibold text-gray-900">
                    Total Amount
                  </span>

                  <span className="text-2xl font-bold text-green-600">
                    ₹{formattedAmount}
                  </span>

                </div>

                {/* PAY */}

                <button
                  type="button"
                  onClick={handlePayNow}
                  disabled={loading}
                  className="w-full mt-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-[0.98] disabled:opacity-70 text-white font-bold shadow-md transition-all"
                >
                  {loading
                    ? "Opening UPI..."
                    : `Pay ₹${formattedAmount}`}
                </button>

                {/* AFTER PAYMENT */}

                <AnimatePresence>

                  {paymentOpened && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                        y: -10,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        y: 0,
                      }}
                      className="overflow-hidden"
                    >

                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">

                        <div className="text-center">

                          <div className="text-2xl">
                            📱
                          </div>

                          <p className="font-semibold text-green-800 mt-2">
                            Complete your payment
                          </p>

                          <p className="text-xs text-green-700 mt-1">
                            After completing payment in your UPI app, return here and confirm.
                          </p>

                        </div>

                        <button
                          type="button"
                          onClick={
                            handleConfirmPayment
                          }
                          disabled={loading}
                          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-60"
                        >
                          {loading
                            ? "Confirming Booking..."
                            : "✓ I've Completed Payment"}
                        </button>

                      </div>

                    </motion.div>
                  )}

                </AnimatePresence>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-4">

                  <ShieldIcon />

                  Secure UPI payment

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Payment;