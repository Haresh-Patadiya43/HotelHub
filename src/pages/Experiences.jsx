import React from "react";
import { motion } from "motion/react";
import video from "../assets/experience-vedio.mp4";

const Experiences = () => {
  // ==========================================
  // ANIMATION VARIANTS
  // ==========================================

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
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
        ease: "easeOut",
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
        ease: "easeOut",
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
      y: 40,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // ==========================================
  // POPULAR EXPERIENCES
  // ==========================================

  const popularExperiences = [
    {
      title: "Delicious Dining",
      desc: "Savor exquisite cuisines prepared by top chefs using fresh, local ingredients.",
      bullets: [
        "Multi-cuisine options",
        "Local & international flavors",
        "Fine dining experience",
      ],
      img: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&q=80",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      ),
    },
    {
      title: "Wellness & Spa",
      desc: "Relax your mind, body, and soul with our luxury spa therapies.",
      bullets: [
        "Relaxing spa sessions",
        "Yoga & meditation",
        "Rejuvenating therapies",
      ],
      img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      ),
    },
    {
      title: "Adventure Activities",
      desc: "Exciting adventures for thrill seekers and nature lovers.",
      bullets: ["Water sports", "Trekking & hiking", "Outdoor adventures"],
      img: "https://images.unsplash.com/photo-1533240332313-0bc499f530d9?w=600&q=80",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      ),
    },
    {
      title: "Cultural Tours",
      desc: "Explore heritage, history and local traditions with expert guides.",
      bullets: ["Heritage walk", "Local culture", "Traditional shows"],
      img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=80",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      ),
    },
    {
      title: "Nature & Wildlife",
      desc: "Connect with nature and witness breathtaking wildlife experiences.",
      bullets: ["Wildlife safaris", "Bird watching", "Nature trails"],
      img: "https://images.unsplash.com/photo-1504567961542-e24d9439a724?w=600&q=80",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
        />
      ),
    },
    {
      title: "Romantic Getaways",
      desc: "Perfect experiences to celebrate love and create beautiful memories.",
      bullets: ["Candle light dinner", "Private setups", "Romantic stays"],
      img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      ),
    },
  ];

  // ==========================================
  // CATEGORIES
  // ==========================================

  const categories = [
    { name: "Adventure", icon: "🏕️" },
    { name: "Wellness", icon: "🧘" },
    { name: "Food & Dining", icon: "🍽️" },
    { name: "Cultural", icon: "🏛️" },
    { name: "Nature & Wildlife", icon: "🦌" },
    { name: "Water Activities", icon: "🏄" },
    { name: "Romantic", icon: "❤️" },
    { name: "Family Fun", icon: "👨‍👩‍👧‍👦" },
  ];

  // ==========================================
  // WHY BOOK WITH US
  // ==========================================

  const whyBook = [
    {
      title: "Handpicked Experiences",
      desc: "We carefully choose the best experiences for you.",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    },
    {
      title: "Local Experts",
      desc: "Our local experts bring you authentic experiences.",
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
    },
    {
      title: "Secure & Easy Booking",
      desc: "Hassle-free booking with secure payments.",
      icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
    },
    {
      title: "Customer Support",
      desc: "We're here 24/7 to help you before, during & after.",
      icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
    },
  ];

  // ==========================================
  // STATS
  // ==========================================

  const stats = [
    {
      num: "500+",
      text: "Happy Guests",
      icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      num: "200+",
      text: "Unique Experiences",
      icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
    },
    {
      num: "50+",
      text: "Top Destinations",
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
    },
    {
      num: "4.8/5",
      text: "Guest Rating",
      icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
    },
  ];

  // ==========================================
  // INCLUDED
  // ==========================================

  const included = [
    {
      title: "Expert Guides",
      text: "Professional & friendly guides",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    },
    {
      title: "Safe & Secure",
      text: "Your safety is our top priority",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    },
    {
      title: "Comfort & Convenience",
      text: "Well-planned for your comfort",
      icon: "M5 13l4 4L19 7",
    },
    {
      title: "Flexible Options",
      text: "Choose what suits your needs",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    },
    {
      title: "No Hidden Charges",
      text: "Transparent pricing always",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  ];

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative w-full h-[550px] overflow-hidden flex flex-col justify-center px-4 lg:px-20">

        {/* VIDEO */}

        <motion.video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 2.5,
            ease: "easeOut",
          }}
        >
          <source src={video} type="video/mp4" />
        </motion.video>

        {/* OVERLAY */}

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />

        {/* HERO CONTENT */}

        <div className="relative z-10 max-w-7xl mx-auto w-full pt-10">

          <motion.p
            className="text-blue-400 font-bold text-sm tracking-widest uppercase mb-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Experiences
          </motion.p>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight max-w-2xl drop-shadow-md"
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1,
              delay: 0.5,
              ease: "easeOut",
            }}
          >
            Experience More
            <br />
            Than Just a Stay
          </motion.h1>

          <motion.p
            className="text-gray-200 text-lg mb-8 max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.8,
            }}
          >
            Handpicked experiences to make your journey extraordinary and
            unforgettable.
          </motion.p>

          {/* BADGES */}

          <motion.div
            className="flex flex-wrap gap-3"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                text: "Curated by Experts",
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                text: "Best Price Guarantee",
                icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
              },
              {
                text: "Safe & Trusted",
                icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
              },
              {
                text: "24/7 Support",
                icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
              },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                variants={cardAnimation}
                whileHover={{
                  y: -6,
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="bg-white/95 text-gray-800 px-4 py-2 rounded-full text-xs font-bold flex items-center shadow-sm cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-blue-100 text-[#0052CC] flex items-center justify-center mr-2">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={badge.icon}
                    />
                  </svg>
                </div>

                {badge.text}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* SCROLL INDICATOR */}

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] mb-2">
            Scroll
          </span>

          <motion.div
            className="w-5 h-8 rounded-full border border-white/50 flex justify-center pt-1"
            animate={{
              y: [0, 7, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-1 h-2 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* =====================================================
          WHY BOOK WITH US
      ===================================================== */}

      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="bg-[#F8FAFC] rounded-3xl p-10 border border-gray-100">

          <div className="text-center mb-10">
            <motion.p
              variants={fadeUp}
              className="text-[#0052CC] font-bold text-xs tracking-widest uppercase mb-1"
            >
              Why Book With Us?
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-2xl font-bold text-gray-900"
            >
              We Make Experiences Better
            </motion.h2>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {whyBook.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={cardAnimation}
                whileHover={{
                  y: -8,
                }}
                className="flex gap-4 items-start"
              >
                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.1,
                  }}
                  className="w-12 h-12 rounded-full bg-[#EBF3FE] text-[#0052CC] flex items-center justify-center shrink-0"
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
                      d={feature.icon}
                    />
                  </svg>
                </motion.div>

                <div>
                  <h3 className="font-bold text-sm text-gray-900 mb-1">
                    {feature.title}
                  </h3>

                  <p className="text-xs text-gray-500 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* =====================================================
          POPULAR EXPERIENCES
      ===================================================== */}

      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeUp}
      >
        <motion.p
          variants={fadeLeft}
          className="text-[#0052CC] font-bold text-xs tracking-widest uppercase mb-1"
        >
          Popular Experiences
        </motion.p>

        <motion.h2
          variants={fadeLeft}
          className="text-3xl font-bold text-gray-900 mb-8"
        >
          Explore the Best Experiences
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={staggerContainer}
        >
          {popularExperiences.map((exp, idx) => (
            <motion.div
              key={idx}
              variants={cardAnimation}
              whileHover={{
                y: -8,
                boxShadow: "0px 20px 40px rgba(0,0,0,0.10)",
              }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col sm:flex-row h-full"
            >
              {/* IMAGE */}

              <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden">
                <motion.img
                  src={exp.img}
                  alt={exp.title}
                  className="w-full h-full object-cover"
                  whileHover={{
                    scale: 1.08,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                />
              </div>

              {/* CONTENT */}

              <div className="sm:w-3/5 p-6 flex flex-col justify-center">

                <div className="flex items-center gap-2 mb-3">

                  <motion.div
                    whileHover={{
                      rotate: 10,
                      scale: 1.1,
                    }}
                    className="w-8 h-8 rounded bg-[#EBF3FE] text-[#0052CC] flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {exp.icon}
                    </svg>
                  </motion.div>

                  <h3 className="font-bold text-lg text-gray-900">
                    {exp.title}
                  </h3>
                </div>

                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {exp.desc}
                </p>

                <ul className="space-y-2">
                  {exp.bullets.map((bullet, i) => (
                    <motion.li
                      key={i}
                      initial={{
                        opacity: 0,
                        x: -10,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay: i * 0.1,
                      }}
                      className="flex items-center text-xs font-medium text-gray-600"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2" />
                      {bullet}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* =====================================================
          STATS
      ===================================================== */}

      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100"
            variants={staggerContainer}
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={cardAnimation}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="flex flex-col items-center text-center px-4"
              >
                <motion.div
                  whileHover={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 0.7,
                  }}
                  className="w-12 h-12 rounded-full border-2 border-blue-100 text-[#0052CC] flex items-center justify-center mb-3"
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
                      d={stat.icon}
                    />
                  </svg>
                </motion.div>

                <h3 className="text-2xl font-extrabold text-[#0052CC] mb-1">
                  {stat.num}
                </h3>

                <p className="text-xs font-bold text-gray-700">
                  {stat.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* =====================================================
          EXPERIENCE CATEGORIES
      ===================================================== */}

      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
      >
        <motion.p
          variants={fadeUp}
          className="text-[#0052CC] font-bold text-xs tracking-widest uppercase mb-1"
        >
          Experience Categories
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="text-2xl font-bold text-gray-900 mb-10"
        >
          Find Experiences That Match Your Mood
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4"
          variants={staggerContainer}
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              variants={cardAnimation}
              whileHover={{
                y: -10,
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer"
            >
              <motion.span
                className="text-3xl mb-3"
                whileHover={{
                  scale: 1.25,
                  rotate: 8,
                }}
              >
                {cat.icon}
              </motion.span>

              <p className="text-xs font-bold text-gray-700">
                {cat.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* =====================================================
          WHAT'S INCLUDED
      ===================================================== */}

      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
      >
        <div className="text-center mb-10">

          <motion.p
            variants={fadeUp}
            className="text-[#0052CC] font-bold text-xs tracking-widest uppercase mb-1"
          >
            What's Included
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="text-2xl font-bold text-gray-900"
          >
            Everything You Need for a Perfect Experience
          </motion.h2>

        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-x divide-gray-100"
          variants={staggerContainer}
        >
          {included.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardAnimation}
              whileHover={{
                y: -7,
              }}
              className="flex flex-col items-center px-4"
            >
              <motion.div
                whileHover={{
                  scale: 1.12,
                  rotate: 5,
                }}
                className="w-10 h-10 rounded bg-[#F8FAFC] text-gray-500 flex items-center justify-center mb-3 border border-gray-100"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={item.icon}
                  />
                </svg>
              </motion.div>

              <h4 className="font-bold text-sm text-gray-900 mb-1">
                {item.title}
              </h4>

              <p className="text-[11px] text-gray-500 leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          variants={fadeUp}
          whileHover={{
            y: -5,
          }}
          className="bg-[#F4F7FB] rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between border border-blue-50 overflow-hidden relative"
        >

          {/* CONTENT */}

          <motion.div
            className="md:w-1/2 relative z-10"
            variants={fadeLeft}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Help Planning Your Experience?
            </h2>

            <p className="text-gray-600 mb-8 max-w-sm">
              Our concierge team is here to help you create the perfect
              itinerary.
            </p>

            <motion.button
              whileHover={{
                scale: 1.05,
                y: -3,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="bg-[#0052CC] hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              Contact Concierge
            </motion.button>
          </motion.div>

          {/* SVG */}

          <motion.div
            className="md:w-1/2 mt-8 md:mt-0 flex justify-end relative z-10"
            variants={fadeRight}
          >
            <motion.svg
              width="250"
              height="200"
              viewBox="0 0 250 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <rect
                x="50"
                y="120"
                width="150"
                height="80"
                rx="10"
                fill="#0052CC"
              />

              <circle
                cx="125"
                cy="70"
                r="40"
                fill="#FFC1A1"
              />

              <path
                d="M105 50 Q125 30 145 50 L145 70 L105 70 Z"
                fill="#333"
              />

              <rect
                x="80"
                y="140"
                width="90"
                height="40"
                rx="4"
                fill="#6699FF"
              />

              <circle
                cx="160"
                cy="70"
                r="8"
                fill="#555"
              />

              <path
                d="M165 70 L180 80"
                stroke="#555"
                strokeWidth="4"
                strokeLinecap="round"
              />

              <rect
                x="180"
                y="20"
                width="60"
                height="40"
                rx="20"
                fill="white"
              />

              <circle
                cx="195"
                cy="40"
                r="3"
                fill="#0052CC"
              />

              <circle
                cx="210"
                cy="40"
                r="3"
                fill="#0052CC"
              />

              <circle
                cx="225"
                cy="40"
                r="3"
                fill="#0052CC"
              />
            </motion.svg>
          </motion.div>

        </motion.div>
      </motion.section>

    </div>
  );
};

export default Experiences;