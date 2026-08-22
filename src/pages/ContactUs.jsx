import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  AlertCircle,
} from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    inquiryType: "Booking & Reservations",
    message: "",
  });

  const [activeFaq, setActiveFaq] = useState(null);
  const [isSending, setIsSending] = useState(false);

  // =========================================================
  // TOAST STATE
  // =========================================================

  const [toast, setToast] = useState({
    show: false,
    type: "",
    title: "",
    message: "",
  });

  // =========================================================
  // AUTO HIDE TOAST
  // =========================================================

  useEffect(() => {
    if (!toast.show) return;

    const timer = setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        show: false,
      }));
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast.show]);

  // =========================================================
  // SHOW TOAST
  // =========================================================

  const showToast = (type, title, message) => {
    setToast({
      show: true,
      type,
      title,
      message,
    });
  };

  // =========================================================
  // CLOSE TOAST
  // =========================================================

  const closeToast = () => {
    setToast((prev) => ({
      ...prev,
      show: false,
    }));
  };

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // SUBMIT CONTACT FORM
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSending) return;

    try {
      setIsSending(true);

      const response = await fetch(
        "http://localhost:5000/api/contact/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to send your message"
        );
      }

      showToast(
        "success",
        "Message sent successfully!",
        "Thank you for contacting HotelHub. Our support team will get back to you soon."
      );

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        inquiryType: "Booking & Reservations",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      showToast(
        "error",
        "Unable to send your message",
        error.message ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setIsSending(false);
    }
  };

  // =========================================================
  // FAQ DATA
  // =========================================================

  const faqs = [
    {
      question: "How do I modify or cancel my reservation?",
      answer:
        "Log in to your HotelHub account and open the My Bookings section. Select the reservation you want to manage and choose the available modification or cancellation option. If you need help, our support team is always ready to assist.",
    },
    {
      question: "Can I request an early check-in or late check-out?",
      answer:
        "Yes. You can add special requests to your booking or contact the hotel directly through HotelHub. Requests are subject to hotel availability and may vary by property.",
    },
    {
      question: "How can I find the best hotel deals?",
      answer:
        "Use our destination search and compare hotels, room types, ratings and prices. HotelHub regularly features special offers and exclusive deals to help you find great value.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Yes. HotelHub is designed with secure payment practices and account protection in mind. Never share your password or OTP with anyone, including someone claiming to be a HotelHub representative.",
    },
    {
      question: "How can I contact a hotel before booking?",
      answer:
        "You can review the hotel's available information on its property page. For additional questions, our support team can help guide you to the right information.",
    },
  ];

  // =========================================================
  // CONTACT CARDS
  // =========================================================

  const contactCards = [
    {
      icon: Phone,
      title: "Call us",
      subtitle: "24/7 Reservation Support",
      value: "+91 1800 123 4567",
      href: "tel:+9118001234567",
    },
    {
      icon: Mail,
      title: "Email us",
      subtitle: "We're here to help",
      value: "support@hotelhub.com",
      href: "mailto:support@hotelhub.com",
    },
    {
      icon: MessageCircle,
      title: "Live support",
      subtitle: "Average response time",
      value: "Under 5 minutes",
    },
  ];

  // =========================================================
  // ANIMATION VARIANTS
  // =========================================================

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 45,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeLeft = {
    hidden: {
      opacity: 0,
      x: -60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeRight = {
    hidden: {
      opacity: 0,
      x: 60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
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

  const cardAnimation = {
    hidden: {
      opacity: 0,
      y: 35,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden">

      {/* =========================================================
          TOAST POPUP
      ========================================================== */}

      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{
              opacity: 0,
              x: 100,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: 100,
              scale: 0.9,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed bottom-6 right-6 z-[99999] w-[calc(100%-3rem)] max-w-sm"
          >
            <div
              className={`relative overflow-hidden rounded-2xl bg-white shadow-2xl shadow-slate-900/20 border ${
                toast.type === "success"
                  ? "border-emerald-200"
                  : "border-red-200"
              }`}
            >
              <div
                className={`h-1 w-full ${
                  toast.type === "success"
                    ? "bg-emerald-500"
                    : "bg-red-500"
                }`}
              />

              <div className="flex items-start gap-4 p-5">

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.15,
                    type: "spring",
                    stiffness: 300,
                  }}
                  className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center ${
                    toast.type === "success"
                      ? "bg-emerald-100"
                      : "bg-red-100"
                  }`}
                >
                  {toast.type === "success" ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  )}
                </motion.div>

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 text-sm">
                    {toast.title}
                  </p>

                  <p className="text-sm text-slate-500 mt-1 leading-5">
                    {toast.message}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeToast}
                  className="w-7 h-7 shrink-0 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="h-1 bg-slate-100">
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{
                    duration: 5,
                    ease: "linear",
                  }}
                  className={`h-full ${
                    toast.type === "success"
                      ? "bg-emerald-500"
                      : "bg-red-500"
                  }`}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative bg-slate-950 text-white">

        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">

          <motion.div
            animate={{
              x: [0, 30, 0],
              y: [0, 25, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-32 -right-32 w-[450px] h-[450px] rounded-full bg-blue-600/20 blur-3xl"
          />

          <motion.div
            animate={{
              x: [0, -30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-3xl"
          />

          <div className="absolute inset-0 opacity-[0.05]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28">

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >

            {/* Badge */}

            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-7"
            >
              <motion.div
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
              >
                <Sparkles className="w-4 h-4 text-blue-300" />
              </motion.div>

              <span className="text-xs sm:text-sm font-semibold text-blue-100">
                HotelHub Support Center
              </span>
            </motion.div>

            {/* Heading */}

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.05]"
            >
              We're here to make

              <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.8,
                }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300"
              >
                every stay better.
              </motion.span>
            </motion.h1>

            {/* Description */}

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-2xl text-base sm:text-lg text-slate-300 leading-8"
            >
              Have a question about your booking, need help finding the perfect
              hotel, or simply want to share feedback? Our team is ready to help
              you every step of the way.
            </motion.p>

            {/* Buttons */}

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-wrap gap-4"
            >
              <motion.a
                href="#contact-form"
                whileHover={{
                  y: -4,
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-sm shadow-xl"
              >
                Contact Support

                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.a>

              <motion.a
                href="#faq"
                whileHover={{
                  y: -4,
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md text-white font-bold text-sm"
              >
                Browse FAQs
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Hero Stats */}

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl"
          >
            {[
              ["24/7", "Customer Support"],
              ["5 min", "Average Response"],
              ["100%", "Booking Assistance"],
              ["Secure", "Customer Data"],
            ].map(([number, label]) => (
              <motion.div
                key={label}
                variants={cardAnimation}
                whileHover={{
                  y: -7,
                  scale: 1.03,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                className="rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-5 cursor-default"
              >
                <p className="text-xl sm:text-2xl font-black">
                  {number}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          CONTACT CARDS
      ========================================================== */}

      <section className="relative -mt-10 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {contactCards.map((card) => {
            const Icon = card.icon;

            const content = (
              <motion.div
                variants={cardAnimation}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="group h-full bg-white rounded-2xl p-6 border border-slate-200 shadow-xl shadow-slate-900/5 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">

                  <motion.div
                    whileHover={{
                      rotate: [0, -8, 8, 0],
                      scale: 1.1,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className="w-12 h-12 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {card.title}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      {card.subtitle}
                    </p>

                    <p className="text-sm font-bold text-slate-900 mt-2">
                      {card.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            );

            return card.href ? (
              <a key={card.title} href={card.href}>
                {content}
              </a>
            ) : (
              <div key={card.title}>
                {content}
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* =========================================================
          CONTACT FORM
      ========================================================== */}

      <section
        id="contact-form"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
      >

        <div className="grid lg:grid-cols-[1.25fr_.75fr] gap-8 items-start">

          {/* FORM */}

          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-900/5 p-6 sm:p-8 lg:p-10"
          >

            <motion.div
              variants={fadeUp}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 text-blue-600 text-xs font-black uppercase tracking-widest">
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: 28 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="h-[2px] bg-blue-600"
                />

                Send us a message
              </div>

              <h2 className="text-3xl sm:text-4xl font-black mt-4 tracking-tight">
                How can we help?
              </h2>

              <p className="text-slate-500 mt-3 max-w-xl leading-7">
                Fill out the form below and our support team will get back to
                you as soon as possible.
              </p>
            </motion.div>

            <motion.form
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.1,
              }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* NAME */}

              <motion.div
                variants={fadeUp}
                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    First Name
                  </label>

                  <input
                    required
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Your first name"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Last Name
                  </label>

                  <input
                    required
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Your last name"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </motion.div>

              {/* EMAIL */}

              <motion.div variants={fadeUp}>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Email Address
                </label>

                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </motion.div>

              {/* INQUIRY */}

              <motion.div variants={fadeUp}>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  What can we help with?
                </label>

                <div className="relative">
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="appearance-none w-full px-4 py-3.5 pr-12 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option>Booking & Reservations</option>
                    <option>Payment & Billing</option>
                    <option>Hotel Information</option>
                    <option>Cancellation & Refunds</option>
                    <option>Technical Support</option>
                    <option>Feedback & Suggestions</option>
                    <option>Other</option>
                  </select>

                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </motion.div>

              {/* MESSAGE */}

              <motion.div variants={fadeUp}>
                <div className="flex items-center justify-between mb-2">

                  <label className="text-sm font-bold text-slate-700">
                    Message
                  </label>

                  <motion.span
                    key={formData.message.length}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-xs text-slate-400"
                  >
                    {formData.message.length}/500
                  </motion.span>
                </div>

                <textarea
                  required
                  maxLength={500}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us what you need help with..."
                  rows={6}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none transition-all placeholder:text-slate-400 resize-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </motion.div>

              {/* SUBMIT */}

              <motion.div variants={fadeUp}>
                <motion.button
                  whileHover={{
                    y: -3,
                    scale: 1.01,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  disabled={isSending}
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold text-sm shadow-lg shadow-blue-600/20 transition-all"
                >
                  {isSending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />

                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message

                      <motion.div
                        animate={{
                          x: [0, 4, 0],
                        }}
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                        }}
                      >
                        <Send className="w-4 h-4" />
                      </motion.div>
                    </>
                  )}
                </motion.button>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex items-center justify-center gap-2 text-xs text-slate-400"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-500" />

                Your information is kept private and secure.
              </motion.div>

            </motion.form>
          </motion.div>

          {/* SUPPORT PANEL */}

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="space-y-6"
          >

            {/* Support */}

            <motion.div
              whileHover={{
                y: -6,
              }}
              className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-7 sm:p-8"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-16 -top-16 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl"
              />

              <div className="relative">

                <motion.div
                  whileHover={{
                    rotate: 10,
                    scale: 1.1,
                  }}
                  className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6"
                >
                  <Users className="w-5 h-5 text-blue-300" />
                </motion.div>

                <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
                  Dedicated Support
                </p>

                <h3 className="text-2xl font-black mt-2">
                  Real people. Real help.
                </h3>

                <p className="text-sm text-slate-400 mt-4 leading-7">
                  Whether you're booking a weekend getaway or managing a
                  business trip, our team is here to help you find the right
                  solution.
                </p>

                <div className="mt-7 space-y-4">
                  {[
                    "24/7 customer assistance",
                    "Booking support",
                    "Cancellation guidance",
                    "Hotel information",
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay: index * 0.1,
                      }}
                      className="flex items-center gap-3 text-sm text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Hours */}

            <motion.div
              whileHover={{
                y: -6,
              }}
              className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">

                <motion.div
                  whileHover={{
                    rotate: 10,
                    scale: 1.08,
                  }}
                  className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"
                >
                  <Clock3 className="w-5 h-5" />
                </motion.div>

                <div>
                  <h3 className="font-black">
                    Support Hours
                  </h3>

                  <p className="text-xs text-slate-400">
                    We're always available
                  </p>
                </div>
              </div>

              <div className="space-y-4">

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">
                    Monday — Friday
                  </span>

                  <span className="text-sm font-bold">
                    24 Hours
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">
                    Saturday — Sunday
                  </span>

                  <span className="text-sm font-bold">
                    24 Hours
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2">

                <motion.span
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [1, 0.6, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="w-2 h-2 rounded-full bg-emerald-500"
                />

                <span className="text-xs font-semibold text-emerald-600">
                  Support team online
                </span>
              </div>
            </motion.div>

            {/* Global Assistance */}

            <motion.div
              whileHover={{
                y: -6,
                  scale: 1.01,
              }}
              className="rounded-3xl bg-blue-50 border border-blue-100 p-7"
            >
              <motion.div
                animate={{
                  rotate: [0, 8, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              >
                <Globe2 className="w-6 h-6 text-blue-600 mb-4" />
              </motion.div>

              <h3 className="font-black text-slate-900">
                Global assistance
              </h3>

              <p className="text-sm text-slate-500 mt-2 leading-6">
                Our support experience is designed to help travelers from
                different locations and backgrounds.
              </p>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================== */}

      <section
        id="faq"
        className="bg-white border-y border-slate-200 py-24"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3,
            }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 text-blue-600 text-xs font-black uppercase tracking-widest">

              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 28 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="h-[2px] bg-blue-600"
              />

              Help Center

              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 28 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="h-[2px] bg-blue-600"
              />
            </div>

            <h2 className="text-3xl sm:text-4xl font-black mt-4">
              Frequently asked questions
            </h2>

            <p className="text-slate-500 mt-4 max-w-xl mx-auto leading-7">
              Find quick answers to some of the most common HotelHub questions.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="space-y-3"
          >
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;

              return (
                <motion.div
                  key={faq.question}
                  variants={cardAnimation}
                  layout
                  className={`rounded-2xl border overflow-hidden ${
                    isOpen
                      ? "border-blue-200 bg-blue-50/50 shadow-sm"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setActiveFaq(isOpen ? null : index)
                    }
                    className="w-full flex items-center justify-between gap-6 text-left px-6 py-5"
                  >
                    <span className="font-bold text-sm sm:text-base">
                      {faq.question}
                    </span>

                    <motion.span
                      animate={{
                        rotate: isOpen ? 180 : 0,
                        backgroundColor: isOpen
                          ? "#2563eb"
                          : "#f1f5f9",
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${
                        isOpen
                          ? "text-white"
                          : "text-slate-500"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <motion.p
                          initial={{
                            y: -10,
                            opacity: 0,
                          }}
                          animate={{
                            y: 0,
                            opacity: 1,
                          }}
                          transition={{
                            delay: 0.1,
                          }}
                          className="px-6 pb-6 text-sm text-slate-500 leading-7"
                        >
                          {faq.answer}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          LOCATION
      ========================================================== */}

      <section className="relative bg-slate-950 py-20 overflow-hidden">

        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Location Text */}

            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
            >
              <div className="inline-flex items-center gap-2 text-blue-300 text-xs font-black uppercase tracking-widest">

                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <MapPin className="w-4 h-4" />
                </motion.div>

                Our location
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white mt-5 leading-tight">
                Visit the HotelHub team.
              </h2>

              <p className="text-slate-400 mt-5 leading-7 max-w-xl">
                Our headquarters is located in the heart of the city, helping us
                stay connected with travelers, hotel partners and our growing
                global community.
              </p>

              <div className="mt-8 flex items-start gap-4">

                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotate: 8,
                  }}
                  className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0"
                >
                  <MapPin className="w-5 h-5 text-blue-300" />
                </motion.div>

                <div>
                  <p className="font-bold text-white">
                    HotelHub Headquarters
                  </p>

                  <p className="text-sm text-slate-400 mt-1 leading-6">
                    750 Fifth Avenue
                    <br />
                    New York, NY 10019
                  </p>
                </div>
              </div>

              <motion.a
                href="https://www.google.com/maps/search/?api=1&query=750+Fifth+Avenue+New+York"
                target="_blank"
                rel="noreferrer"
                whileHover={{
                  y: -4,
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="inline-flex items-center gap-2 mt-8 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-all"
              >
                Get Directions

                <motion.div
                  animate={{
                    x: [0, 4, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.a>
            </motion.div>

            {/* Fake Map */}

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              whileHover={{
                scale: 1.02,
              }}
              className="relative h-[360px] rounded-3xl overflow-hidden border border-white/10 bg-slate-900"
            >

              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `
                    linear-gradient(25deg, transparent 45%, rgba(255,255,255,.08) 46%, rgba(255,255,255,.08) 48%, transparent 49%),
                    linear-gradient(120deg, transparent 45%, rgba(255,255,255,.08) 46%, rgba(255,255,255,.08) 48%, transparent 49%),
                    linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)
                  `,
                  backgroundSize:
                    "180px 180px, 220px 220px, 40px 40px, 40px 40px",
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-indigo-900/20" />

              {/* Roads */}

              <motion.div
                animate={{
                  x: [0, 30, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-[140%] h-3 bg-white/5 rotate-[25deg] top-28 -left-10"
              />

              <motion.div
                animate={{
                  x: [0, -30, 0],
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-[140%] h-3 bg-white/5 -rotate-[18deg] top-52 -left-20"
              />

              <div className="absolute w-[120%] h-2 bg-blue-300/10 rotate-[70deg] top-10 left-32" />

              {/* Marker */}

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/30"
                />

                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-14 h-14 rounded-full bg-blue-600 border-4 border-white shadow-2xl flex items-center justify-center"
                >
                  <MapPin className="w-6 h-6 text-white" />
                </motion.div>

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.5,
                  }}
                  className="absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white rounded-lg px-4 py-2 shadow-xl"
                >
                  <p className="text-xs font-black text-slate-900">
                    HotelHub HQ
                  </p>
                </motion.div>
              </div>

              <div className="absolute bottom-5 left-5 right-5 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3">

                <div className="flex items-center gap-2">

                  <motion.span
                    animate={{
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                    className="w-2 h-2 rounded-full bg-emerald-400"
                  />

                  <span className="text-xs font-semibold text-white">
                    HotelHub Global Office
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER CTA
      ========================================================== */}

      <section className="bg-white py-16">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="max-w-5xl mx-auto px-4 text-center"
        >

          <motion.div
            whileHover={{
              scale: 1.1,
              rotate: 5,
            }}
            className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center"
          >
            <Globe2 className="w-6 h-6" />
          </motion.div>

          <h2 className="text-2xl sm:text-3xl font-black mt-5">
            Stay connected with HotelHub
          </h2>

          <p className="text-slate-500 text-sm mt-3">
            Follow us for travel inspiration, hotel deals and destination tips.
          </p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center gap-3 mt-6"
          >

            <motion.a
              variants={cardAnimation}
              whileHover={{
                y: -5,
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.9,
              }}
              href="#"
              aria-label="Social media"
              className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
            >
              <Globe2 className="w-4 h-4" />
            </motion.a>

            <motion.a
              variants={cardAnimation}
              whileHover={{
                y: -5,
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.9,
              }}
              href="mailto:support@hotelhub.com"
              aria-label="Email"
              className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
            >
              <Mail className="w-4 h-4" />
            </motion.a>

            <motion.a
              variants={cardAnimation}
              whileHover={{
                y: -5,
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.9,
              }}
              href="tel:+9118001234567"
              aria-label="Phone"
              className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
            >
              <Phone className="w-4 h-4" />
            </motion.a>

          </motion.div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-slate-400">

            <span>© 2026 HotelHub</span>

            <span>•</span>

            <span>
              Travel smarter. Stay better.
            </span>

          </div>

        </motion.div>
      </section>

    </div>
  );
};

export default ContactUs;