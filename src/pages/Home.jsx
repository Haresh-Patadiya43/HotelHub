import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import video from "../assets/home_video.mp4";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  // =========================================================
  // TESTIMONIAL DATA
  // =========================================================

  const testimonials = [
    {
      quote:
        "Hotel Hub transformed our honeymoon into a seamless dream. The personalized recommendations were spot-on, and the service was truly beyond five stars. We'll never book travel any other way.",
      name: "Sarah Jenkins",
      role: "Travel Enthusiast",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    },
    {
      quote:
        "An absolutely incredible experience! Finding the perfect villa took minutes instead of days. The digital concierge handled our dinner reservations flawlessly.",
      name: "Michael Chen",
      role: "Business Traveler",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    },
    {
      quote:
        "The curated exclusivity is real. The properties listed here are on another level compared to standard booking sites. Highly recommend for luxury stays.",
      name: "Emma Watson",
      role: "Lifestyle Blogger",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // =========================================================
  // AUTO TESTIMONIAL SLIDER
  // =========================================================

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  // =========================================================
  // DATA
  // =========================================================

  const destinations = [
    {
      name: "Santorini",
      img: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=500&q=80",
      tag: "Greece",
    },
    {
      name: "Kyoto",
      img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80",
      tag: "Japan",
    },
    {
      name: "Amalfi Coast",
      img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=500&q=80",
      tag: "Italy",
    },
    {
      name: "Dubai",
      img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&q=80",
      tag: "UAE",
    },
  ];

  const hotels = [
    {
      title: "The Alpine Sanctuary",
      price: "$1,200",
      location: "Swiss Alps",
      rating: "4.9",
      img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80",
    },
    {
      title: "Azure Horizon Villa",
      price: "$2,500",
      location: "Maldives",
      rating: "5.0",
      img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=500&q=80",
    },
    {
      title: "The Imperial Court",
      price: "$850",
      location: "London, UK",
      rating: "4.8",
      img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500&q=80",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">

      {/* =====================================================
          1. HERO SECTION
      ===================================================== */}

      <section className="relative h-screen min-h-[650px] w-full overflow-hidden flex items-center">

        {/* Background Video */}
        <video
          className="
            absolute inset-0
            w-full h-full
            object-cover
            scale-105
            animate-[heroZoom_18s_ease-in-out_infinite_alternate]
          "
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={video} type="video/mp4" />
        </video>

        {/* Dark Gradient */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-black/80
            via-black/50
            to-black/20
          "
        />

        {/* Bottom Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Decorative Circle */}
        <div
          className="
            absolute
            -right-20
            top-20
            w-72 h-72
            rounded-full
            bg-blue-500/10
            blur-3xl
            animate-pulse
          "
        />

        {/* =====================================================
            HERO CONTENT
        ===================================================== */}

        <div
          className="
            relative z-10
            w-full max-w-[1400px]
            mx-auto
            px-6 lg:px-12
            text-white
          "
        >
          <div className="max-w-4xl">

            {/* Small Label */}
            

            {/* =================================================
                NORMAL HERO HEADING
            ================================================= */}

            <h1
              className="
                text-4xl
                sm:text-5xl
                lg:text-6xl
                xl:text-7xl
                font-extrabold
                tracking-tight
                leading-[1]
                animate-[fadeInLeft_1s_ease-out]
              "
            >
              <span className="block">
                Your Perfect Stay,
              </span>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-2">

                <span>
                  Just a Booking Away
                </span>

                {/* Animated Words */}
                <span
                  className="
                    relative
                    inline-block
                    h-[1em]
                    min-w-[120px]
                    sm:min-w-[150px]
                    overflow-hidden
                    text-blue-400
                    align-bottom
                  "
                >
                  <span
                    className="
                      flex flex-col
                      animate-[wordSlider_8s_ease-in-out_infinite]
                    "
                  >
                    <span className="h-[1em] flex items-center">
                      Hotels
                    </span>

                    <span className="h-[1em] flex items-center">
                      Resorts
                    </span>

                    <span className="h-[1em] flex items-center">
                      Villas
                    </span>

                    <span className="h-[1em] flex items-center">
                      Suites
                    </span>
                  </span>
                </span>

              </div>
            </h1>

            {/* Description */}
            <TypeAnimation
              sequence={[
                `Discover handpicked hotels, resorts, villas, and premium stays in destinations around the world. Find the perfect place to stay, compare options, and book your next unforgettable experience with HotelHub.`,
                2000,
                "",
                500,
              ]}
              wrapper="p"
              speed={60}
              repeat={Infinity}
              className="
                mt-6
                max-w-2xl
                text-sm
                sm:text-base
                lg:text-lg
                leading-7
                text-white/85
                animate-[fadeInUp_1.4s_ease-out]
              "
            />

            {/* Hero Buttons */}
            <div
              className="
                flex flex-wrap
                gap-4
                mt-7
                animate-[fadeInUp_1.6s_ease-out]
              "
            >
              <button
              onClick={() => navigate("/hotels")}
                className="
                  px-7 py-3.5
                  rounded-xl
                  bg-blue-600
                  text-white
                  font-semibold
                  shadow-lg shadow-blue-600/30
                  hover:bg-blue-700
                  hover:-translate-y-1
                  hover:shadow-xl
                  transition-all duration-300
                  cursor-pointer
                "
              >
                Explore Hotels →
              </button>

              <button
                className="
                  px-7 py-3.5
                  rounded-xl
                  bg-white/10
                  backdrop-blur-md
                  border border-white/30
                  text-white
                  font-semibold
                  hover:bg-white
                  hover:text-gray-900
                  hover:-translate-y-1
                  transition-all duration-300
                "
              >
                Discover Destinations
              </button>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="
            absolute
            bottom-8
            left-1/2
            -translate-x-1/2
            flex flex-col
            items-center
            text-white/70
            animate-bounce
          "
        >
          <span className="text-xs mb-2 tracking-widest uppercase">
            Scroll
          </span>

          <div className="w-5 h-8 rounded-full border border-white/50 flex justify-center pt-1">
            <span className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>

      </section>

      {/* =====================================================
          2. POPULAR DESTINATIONS
      ===================================================== */}

      <section className="py-16 px-6 lg:px-12 max-w-[1400px] mx-auto">

        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">

          <div>
            <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.2em] mb-2">
              Explore The World
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mb-1">
              Popular Destinations
            </h2>

            <p className="text-gray-500 text-sm">
              Trending locations for your next getaway.
            </p>
          </div>

          <a
            href="#"
            className="
              text-blue-600
              text-sm
              font-medium
              hover:underline
              hover:translate-x-1
              transition-transform
              duration-300
              inline-block
            "
          >
            Explore All →
          </a>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {destinations.map((dest, idx) => (
            <div
              key={idx}
              className="
                relative
                h-[340px]
                rounded-2xl
                overflow-hidden
                group
                cursor-pointer
                shadow-sm

                opacity-0
                animate-[cardReveal_0.8s_ease-out_forwards]

                hover:-translate-y-3
                hover:shadow-2xl

                transition-all
                duration-500
              "
              style={{
                animationDelay: `${idx * 150}ms`,
              }}
            >

              <img
                src={dest.img}
                alt={dest.name}
                className="
                  w-full h-full
                  object-cover
                  group-hover:scale-110
                  group-hover:rotate-1
                  transition-all
                  duration-700
                "
              />

              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/80
                  via-black/20
                  to-transparent
                  group-hover:from-black/90
                  transition-all duration-500
                "
              />

              <div
                className="
                  absolute
                  bottom-5
                  left-5
                  text-white
                  transform
                  group-hover:-translate-y-2
                  transition-transform
                  duration-500
                "
              >

                <h3 className="text-xl font-bold">
                  {dest.name}
                </h3>

                <p className="text-xs text-gray-300 mt-1">
                  {dest.tag}
                </p>

                <span
                  className="
                    inline-block
                    mt-3
                    text-xs
                    opacity-0
                    translate-y-3
                    group-hover:opacity-100
                    group-hover:translate-y-0
                    transition-all
                    duration-500
                  "
                >
                  Explore destination →
                </span>

              </div>

            </div>
          ))}

        </div>
      </section>

      {/* =====================================================
          3. FEATURED HOTEL COLLECTIONS
      ===================================================== */}

      <section className="py-12 px-6 lg:px-12 max-w-[1400px] mx-auto">

        <div className="mb-8">

          <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.2em] mb-2">
            Luxury Collection
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-1">
            Featured Hotel Collections
          </h2>

          <p className="text-gray-500 text-sm">
            Hand-picked stays just for you.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {hotels.map((hotel, idx) => (
            <div
              key={idx}
              className="
                bg-white
                rounded-2xl
                overflow-hidden
                shadow-sm
                border border-gray-100

                opacity-0
                animate-[cardReveal_0.8s_ease-out_forwards]

                hover:-translate-y-3
                hover:shadow-2xl

                transition-all
                duration-500
                group
              "
              style={{
                animationDelay: `${idx * 180}ms`,
              }}
            >

              <div className="relative h-64 overflow-hidden">

                <img
                  src={hotel.img}
                  alt={hotel.title}
                  className="
                    w-full h-full
                    object-cover
                    group-hover:scale-110
                    transition-transform
                    duration-700
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-black/0
                    group-hover:bg-black/10
                    transition-colors
                    duration-500
                  "
                />

                {/* Rating */}
                <div
                  className="
                    absolute
                    top-4
                    right-4
                    bg-white
                    px-2.5 py-1.5
                    rounded-full
                    text-xs
                    font-bold
                    flex items-center
                    gap-1
                    shadow-md
                    group-hover:scale-110
                    transition-transform
                    duration-300
                  "
                >
                  <svg
                    className="w-3.5 h-3.5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>

                  {hotel.rating}
                </div>

              </div>

              <div className="p-6">

                <div className="flex justify-between items-start mb-3 gap-3">

                  <h3 className="font-bold text-xl text-gray-900">
                    {hotel.title}
                  </h3>

                  <p className="text-blue-600 font-bold whitespace-nowrap">
                    {hotel.price}

                    <span className="text-xs text-gray-500 font-normal">
                      /night
                    </span>
                  </p>

                </div>

                <p className="text-sm text-gray-500 mb-5 line-clamp-2">
                  Experience luxury in the heart of {hotel.location} with
                  premium amenities and breathtaking views.
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 border-t border-gray-100 pt-4">

                  <span className="flex items-center gap-1.5">
                    🛏️ 3 Beds
                  </span>

                  <span className="flex items-center gap-1.5">
                    🛁 2 Baths
                  </span>

                  <span className="flex items-center gap-1.5">
                    📐 1200 sqft
                  </span>

                </div>

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* =====================================================
          4. PROMOS & REWARDS
      ===================================================== */}

      <section className="py-12 px-6 lg:px-12 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Promo */}
        <div
          className="
            lg:col-span-2
            relative
            h-96
            rounded-2xl
            overflow-hidden
            shadow-sm
            flex flex-col
            justify-center
            items-start
            p-8 md:p-10
            group
          "
        >

          <img
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1000&q=80"
            alt="Promo"
            className="
              absolute inset-0
              w-full h-full
              object-cover
              group-hover:scale-110
              transition-transform
              duration-[1200ms]
            "
          />

          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />

          <div className="relative z-10">

            <span
              className="
                bg-yellow-500
                text-black
                text-xs
                font-bold
                px-3 py-1
                rounded-full
                mb-4
                inline-block
                animate-pulse
              "
            >
              Exclusive Offer
            </span>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Island Solitude: 30% Off
            </h2>

            <p className="text-white/90 text-base max-w-lg mb-8">
              Book your private villa escape now and enjoy exclusive perks
              including a complimentary private dinner under the stars.
            </p>

            <button
              className="
                bg-white
                text-gray-900
                px-8 py-3
                rounded-lg
                text-sm
                font-semibold
                hover:bg-gray-100
                hover:-translate-y-1
                hover:shadow-xl
                transition-all
                duration-300
              "
            >
              Claim Offer
            </button>

          </div>
        </div>

        {/* Rewards */}
        <div
          className="
            lg:col-span-1
            bg-[#0052CC]
            rounded-2xl
            p-8
            text-white
            flex flex-col
            justify-between
            shadow-sm
            hover:-translate-y-2
            hover:shadow-2xl
            transition-all
            duration-500
          "
        >

          <div>

            <h3 className="text-2xl font-bold mb-4">
              Early Bird Rewards
            </h3>

            <p className="text-blue-100 text-sm mb-6 leading-relaxed">
              Planning ahead has its perks. Book 60 days in advance and unlock
              double loyalty points, plus a 15% discount on spa services.
            </p>

          </div>

          <div>

            <p className="text-sm font-medium mb-5 flex items-center gap-2">

              <svg
                className="w-5 h-5 text-blue-200 animate-pulse"
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

              Free Cancellation

            </p>

            <button
              className="
                w-full
                bg-white
                text-[#0052CC]
                py-3.5
                rounded-lg
                text-sm
                font-semibold
                hover:bg-gray-50
                hover:-translate-y-1
                hover:shadow-xl
                transition-all
                duration-300
              "
            >
              Unlock Rewards
            </button>

          </div>
        </div>

      </section>

      {/* =====================================================
          5. HOTEL HUB STANDARD
      ===================================================== */}

      <section className="py-20 px-6 lg:px-12 max-w-[1400px] mx-auto text-center">

        <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.2em] mb-3">
          Why HotelHub
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          The Hotel Hub Standard
        </h2>

        <p className="text-gray-500 text-base mb-16">
          Redefining luxury travel through three core pillars of excellence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Standard 1 */}
          <div
            className="
              flex flex-col items-center
              group
              hover:-translate-y-3
              transition-transform
              duration-500
            "
          >

            <div
              className="
                w-20 h-20
                bg-blue-50
                text-blue-600
                rounded-full
                flex items-center justify-center
                mb-6
                group-hover:bg-blue-600
                group-hover:text-white
                group-hover:scale-110
                group-hover:rotate-6
                transition-all
                duration-500
              "
            >

              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>

            </div>

            <h3 className="font-bold text-xl mb-3">
              Curated Exclusivity
            </h3>

            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
              We handpick every property, ensuring only the top 1% make it to
              your screen. Quality and aesthetics are our primary criteria.
            </p>

          </div>

          {/* Standard 2 */}
          <div
            className="
              flex flex-col items-center
              group
              hover:-translate-y-3
              transition-transform
              duration-500
            "
          >

            <div
              className="
                w-20 h-20
                bg-blue-50
                text-blue-600
                rounded-full
                flex items-center justify-center
                mb-6
                group-hover:bg-blue-600
                group-hover:text-white
                group-hover:scale-110
                group-hover:-rotate-6
                transition-all
                duration-500
              "
            >

              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>

            </div>

            <h3 className="font-bold text-xl mb-3">
              24/7 Digital Concierge
            </h3>

            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
              From restaurant reservations to personal shoppers, our dedicated
              team is available at your fingertips, anytime, anywhere.
            </p>

          </div>

          {/* Standard 3 */}
          <div
            className="
              flex flex-col items-center
              group
              hover:-translate-y-3
              transition-transform
              duration-500
            "
          >

            <div
              className="
                w-20 h-20
                bg-blue-50
                text-blue-600
                rounded-full
                flex items-center justify-center
                mb-6
                group-hover:bg-blue-600
                group-hover:text-white
                group-hover:scale-110
                group-hover:rotate-6
                transition-all
                duration-500
              "
            >

              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>

            </div>

            <h3 className="font-bold text-xl mb-3">
              Frictionless Travel
            </h3>

            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
              Seamless bookings, transparent payment systems, and direct
              communication with hotel staff for an effortless experience.
            </p>

          </div>

        </div>
      </section>

      {/* =====================================================
          6. TESTIMONIAL
      ===================================================== */}

      <section className="py-12 px-6 lg:px-12 max-w-[1400px] mx-auto text-center relative">

        <div
          className="
            bg-white
            border border-gray-100
            rounded-3xl
            p-8 md:p-12
            shadow-sm
            relative
            overflow-hidden
            hover:shadow-xl
            transition-all
            duration-500
          "
        >

          {/* Quote */}
          <div
            className="
              absolute
              top-8
              left-1/2
              -translate-x-1/2
              text-blue-100
              animate-pulse
            "
          >
            <svg
              className="w-10 h-10"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          <div
            key={currentTestimonial}
            className="animate-[testimonialIn_0.6s_ease-out]"
          >

            <h3 className="text-xl md:text-2xl font-medium italic text-gray-800 leading-relaxed mt-10 mb-6 min-h-[80px] max-w-4xl mx-auto">
              "{testimonials[currentTestimonial].quote}"
            </h3>

            <div className="flex flex-col items-center justify-center">

              <img
                src={testimonials[currentTestimonial].img}
                alt={testimonials[currentTestimonial].name}
                className="
                  w-14 h-14
                  rounded-full
                  mb-2
                  object-cover
                  shadow-md
                  ring-4
                  ring-blue-50
                "
              />

              <p className="font-bold text-sm text-gray-900">
                {testimonials[currentTestimonial].name}
              </p>

              <p className="text-xs text-gray-500">
                {testimonials[currentTestimonial].role}
              </p>

            </div>

          </div>

          {/* Previous */}
          <button
            onClick={prevTestimonial}
            className="
              absolute
              left-4 md:left-6
              top-1/2
              -translate-y-1/2
              bg-white
              border border-gray-200
              w-10 h-10
              rounded-full
              flex items-center justify-center
              text-gray-500
              hover:text-blue-600
              hover:scale-110
              hover:shadow-lg
              hover:border-blue-200
              transition-all
              duration-300
              z-20
            "
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Next */}
          <button
            onClick={nextTestimonial}
            className="
              absolute
              right-4 md:right-6
              top-1/2
              -translate-y-1/2
              bg-white
              border border-gray-200
              w-10 h-10
              rounded-full
              flex items-center justify-center
              text-gray-500
              hover:text-blue-600
              hover:scale-110
              hover:shadow-lg
              hover:border-blue-200
              transition-all
              duration-300
              z-20
            "
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-6">

            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                className={`
                  h-2
                  rounded-full
                  transition-all
                  duration-500
                  ${
                    idx === currentTestimonial
                      ? "bg-blue-600 w-6"
                      : "bg-gray-200 w-2 hover:bg-blue-300"
                  }
                `}
              />
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          7. NEWSLETTER
      ===================================================== */}

      <section className="py-16 px-6 lg:px-12 max-w-[1400px] mx-auto">

        <div
          className="
            relative
            overflow-hidden
            bg-[#1A2534]
            rounded-2xl
            p-10 md:p-16
            text-center
            text-white
            group
          "
        >

          {/* Decorative Background */}
          <div
            className="
              absolute
              -right-20
              -top-20
              w-64 h-64
              rounded-full
              bg-blue-600/20
              blur-3xl
              group-hover:scale-150
              transition-transform
              duration-1000
            "
          />

          <div
            className="
              absolute
              -left-20
              -bottom-20
              w-64 h-64
              rounded-full
              bg-purple-600/10
              blur-3xl
              group-hover:scale-150
              transition-transform
              duration-1000
            "
          />

          <div className="relative z-10">

            <h2
              className="
                text-4xl
                md:text-5xl
                font-bold
                mb-4
                group-hover:-translate-y-1
                transition-transform
                duration-500
              "
            >
              Stay Inspired.
            </h2>

            <p className="text-gray-300 text-base mb-10 max-w-xl mx-auto">
              Join our newsletter to receive curated travel guides, hidden gem
              discoveries, and exclusive early offers.
            </p>

            <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">

              <input
                type="email"
                placeholder="Your email address"
                className="
                  flex-1
                  bg-white/10
                  border border-white/20
                  rounded-lg
                  px-5 py-4
                  text-base
                  text-white
                  placeholder-gray-400
                  focus:outline-none
                  focus:border-blue-400
                  focus:ring-2
                  focus:ring-blue-500/20
                  transition-all
                  duration-300
                "
              />

              <button
                className="
                  bg-[#0052CC]
                  hover:bg-blue-600
                  text-white
                  px-8 py-4
                  rounded-lg
                  text-base
                  font-semibold
                  hover:-translate-y-1
                  hover:shadow-xl
                  hover:shadow-blue-600/30
                  transition-all
                  duration-300
                "
              >
                Subscribe
              </button>

            </div>

            <p className="text-xs text-gray-500 mt-5">
              By subscribing, you agree to our Privacy Policy and Terms of
              Service.
            </p>

          </div>
        </div>
      </section>

      {/* =====================================================
          CUSTOM ANIMATIONS
      ===================================================== */}

      <style>{`
        @keyframes heroZoom {
          0% {
            transform: scale(1.05);
          }

          100% {
            transform: scale(1.12);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cardReveal {
          from {
            opacity: 0;
            transform: translateY(40px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes wordSlider {
          0%,
          20% {
            transform: translateY(0);
          }

          25%,
          45% {
            transform: translateY(-1em);
          }

          50%,
          70% {
            transform: translateY(-2em);
          }

          75%,
          95% {
            transform: translateY(-3em);
          }

          100% {
            transform: translateY(0);
          }
        }

        @keyframes testimonialIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

    </div>
  );
};

export default Home;