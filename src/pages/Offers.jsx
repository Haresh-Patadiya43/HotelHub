import React from 'react';

const Offers = () => {
  // Data for Top Offers
  const topOffers = [
    {
      badge: "Limited Time",
      badgeColor: "bg-orange-500",
      image: "https://images.unsplash.com/photo-1582719478250-c894e4dc240e?w=600&q=80",
      discount: "UP TO 40% OFF",
      title: "Summer Escape Offer",
      desc: "Enjoy up to 40% off on premium hotel stays.",
      features: ["Breakfast Included", "Free Cancellation"],
      validity: "15 Jun 2025"
    },
    {
      badge: "Best Seller",
      badgeColor: "bg-green-500",
      image: "https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?w=600&q=80",
      discount: "UP TO 30% OFF",
      title: "Weekend Getaway Deal",
      desc: "Flat 30% off on weekend stays at selected hotels.",
      features: ["Breakfast Included", "Flexible Dates"],
      validity: "30 Jun 2025"
    },
    {
      badge: "Family Special",
      badgeColor: "bg-blue-500",
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80",
      discount: "UP TO 35% OFF",
      title: "Family Fun Offer",
      desc: "Up to 35% off for family stays with kids.",
      features: ["Kids Stay Free", "Breakfast Included"],
      validity: "20 Jun 2025"
    },
    {
      badge: "Long Stay",
      badgeColor: "bg-purple-500",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80",
      discount: "UP TO 50% OFF",
      title: "Stay Longer, Save More",
      desc: "Get up to 50% off on stays of 5 nights or more.",
      features: ["Breakfast Included", "Free Cancellation"],
      validity: "10 Jul 2025"
    }
  ];

  // Data for Categories
  const categories = [
    { name: "Hotel Stays", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
    { name: "Experiences", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" },
    { name: "Spa & Wellness", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
    { name: "Dining", icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" },
    { name: "Activities", icon: "M14 5l7 7m0 0l-7 7m7-7H3" },
    { name: "Airport Transfers", icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" },
    { name: "All Offers", icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" }
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      
      {/* 1. Hero Section */}
      <section 
        className="relative w-full h-[450px] lg:h-[500px] bg-cover bg-center flex flex-col justify-center px-4 lg:px-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=80')" }}
      >
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-10">
          <p className="text-blue-400 font-bold text-sm tracking-widest uppercase mb-3">EXCLUSIVE OFFERS</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight max-w-2xl shadow-sm drop-shadow-md">
            Great Stays.<br />Greater Savings.
          </h1>
          <p className="text-gray-200 text-lg mb-8 max-w-md drop-shadow-md">
            Discover amazing offers and special deals on hotels, experiences and more.
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap gap-4">
            {[
              { text: "Best Price Guarantee", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
              { text: "Limited Time Offers", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
              { text: "Secure Bookings", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
              { text: "Easy Cancellations", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }
            ].map((badge, idx) => (
              <div key={idx} className="flex items-center text-white text-sm font-medium">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-2 backdrop-blur-sm">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={badge.icon}></path></svg>
                </div>
                {badge.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* 3. Top Offers For You */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-12">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Top Offers For You</h2>
          <a href="#" className="text-[#0052CC] text-sm font-semibold hover:underline flex items-center">
            View All Offers <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topOffers.map((offer, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full relative group">
              <div className="relative h-44 w-full overflow-hidden">
                <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className={`absolute top-3 left-3 ${offer.badgeColor} text-white px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider`}>
                  {offer.badge}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <span className="text-[#0052CC] bg-blue-50 px-2 py-0.5 rounded text-[10px] font-bold inline-block w-max mb-3">
                  {offer.discount}
                </span>
                <h3 className="font-bold text-lg text-gray-900 mb-1">{offer.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed flex-grow">{offer.desc}</p>
                
                <div className="space-y-2 mb-4">
                  {offer.features.map((feat, i) => (
                    <div key={i} className="flex items-center text-xs text-gray-600 font-medium">
                      <svg className="w-3.5 h-3.5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      {feat}
                    </div>
                  ))}
                </div>
                
                <div className="pt-3 border-t border-gray-100 text-xs text-gray-500 font-medium">
                  Book by {offer.validity}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Exclusive Bank Offers Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 lg:w-1/3">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-[#0052CC] flex items-center justify-center shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#0052CC]">Exclusive Bank Offers</h3>
              <p className="text-xs text-gray-500">Extra savings on top hotel deals with leading bank cards.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:w-2/3 divide-x divide-gray-200">
            {/* Dummy Bank representations (Text instead of actual SVGs to keep it clean) */}
            <div className="flex flex-col items-center justify-center text-center px-4">
              <span className="font-extrabold text-[#004A8F] text-lg mb-1">HDFC BANK</span>
              <p className="text-[10px] font-semibold text-gray-600">Up to 10% Instant<br/>Discount</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <span className="font-extrabold text-[#F18121] text-lg mb-1">ICICI Bank</span>
              <p className="text-[10px] font-semibold text-gray-600">Up to 10% Instant<br/>Discount</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <span className="font-extrabold text-[#0070B8] text-lg mb-1">SBI Card</span>
              <p className="text-[10px] font-semibold text-gray-600">Up to 8% Instant<br/>Discount</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <span className="font-extrabold text-[#97144D] text-lg mb-1">AXIS BANK</span>
              <p className="text-[10px] font-semibold text-gray-600">Up to 10% Instant<br/>Discount</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Explore Offers By Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Offers By Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white border border-gray-200 shadow-sm rounded-2xl p-5 flex flex-col items-center justify-center hover:border-[#0052CC] hover:shadow-md cursor-pointer transition-all group">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0052CC] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={cat.icon}></path>
                </svg>
              </div>
              <p className="text-xs font-bold text-gray-700 text-center">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Seasonal Offers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Seasonal Offers</h2>
          <a href="#" className="text-[#0052CC] text-sm font-semibold hover:underline flex items-center">
            View All <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </a>
        </div>
        
        <div className="bg-[#F0F7FF] rounded-3xl overflow-hidden flex flex-col md:flex-row items-center border border-blue-100 relative">
          <div className="w-full md:w-1/3 h-48 md:h-64 relative">
             {/* Using Unsplash for illustration replacement */}
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80" alt="Seasonal" className="w-full h-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F0F7FF] md:block hidden"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#F0F7FF] to-transparent md:hidden block"></div>
          </div>
          <div className="w-full md:w-2/3 p-8 relative z-10">
            <h3 className="text-3xl font-extrabold text-gray-900 mb-2 flex items-center gap-2">
              Monsoon Special 
              <svg className="w-6 h-6 text-[#0052CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 002-2v-4M17 9l-5-5-5 5M12 4v12"></path></svg>
            </h3>
            <p className="text-gray-600 mb-6 max-w-lg">
              Cozy stays, hot deals! Enjoy exclusive discounts this monsoon season at handpicked locations.
            </p>
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center text-sm font-semibold text-gray-800">
                <svg className="w-4 h-4 mr-1.5 text-[#0052CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                Up to 45% Off
              </div>
              <div className="flex items-center text-sm font-semibold text-gray-800">
                <svg className="w-4 h-4 mr-1.5 text-[#0052CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 8h-2.5m0 0V4a1 1 0 00-1-1H5a1 1 0 00-1 1v4m13.5 0A2.5 2.5 0 0120 10.5v1A2.5 2.5 0 0117.5 14H17v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2H4.5A2.5 2.5 0 012 11.5v-1A2.5 2.5 0 014.5 8h2.5"></path></svg>
                Complimentary Breakfast
              </div>
              <div className="flex items-center text-sm font-semibold text-gray-800">
                <svg className="w-4 h-4 mr-1.5 text-[#0052CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Free Cancellation
              </div>
            </div>
            <button className="bg-[#0052CC] hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-sm">
              Explore Now
            </button>
          </div>
        </div>
      </section>

      {/* 7. Why Book Our Offers? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Why Book Our Offers?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Best Price Guarantee", desc: "We ensure you get the best price every time.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
            { title: "No Hidden Charges", desc: "Transparent pricing and no surprises.", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
            { title: "24/7 Support", desc: "Our team is here to help you anytime.", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" },
            { title: "Trusted by Millions", desc: "Join millions of happy travelers worldwide.", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0052CC] flex items-center justify-center shrink-0 border border-blue-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900 mb-1">{item.title}</h3>
                <p className="text-[11px] text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Newsletter Subscribe */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#F4F7FB] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-100">
          <div className="flex items-center gap-6">
            <div className="hidden md:flex w-20 h-20 bg-blue-100 rounded-2xl items-center justify-center shrink-0 rotate-3">
              <span className="text-4xl">📬</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Never Miss an Offer!</h2>
              <p className="text-gray-600 text-sm">Subscribe to get exclusive deals and offers directly in your inbox.</p>
            </div>
          </div>
          <div className="w-full md:w-auto flex bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm">
            <input type="email" placeholder="Enter your email" className="px-4 py-2 text-sm outline-none w-full md:w-64" />
            <button className="bg-[#0052CC] hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* 9. Bottom Features (Pre-Footer as shown in image) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 border-t border-gray-200 pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Secure Payments", desc: "Your payments are safe and encrypted.", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
            { title: "Easy Bookings", desc: "Quick and hassle-free booking experience.", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
            { title: "Flexible Options", desc: "Modify or cancel your bookings easily.", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
            { title: "Top Destinations", desc: "Explore best places across the world.", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="text-gray-400 shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon}></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900 mb-1">{item.title}</h3>
                <p className="text-[11px] text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Offers;