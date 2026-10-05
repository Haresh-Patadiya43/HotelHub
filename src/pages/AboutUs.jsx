import React from 'react';

const AboutUs = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans text-gray-900 pb-10">
      
      {/* 1. Hero Section */}
      <section 
        className="relative w-full h-[500px] bg-cover bg-center flex flex-col items-center justify-center text-center px-4"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?w=1600&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-4xl mx-auto mt-10">
          <p className="text-white/80 font-bold tracking-widest text-sm uppercase mb-4">More About</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Discover who we are and our commitment to creating the world's most trusted luxury travel brand.
          </h1>
        </div>
      </section>

      {/* 2. Our Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Side */}
          <div className="w-full lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1582719478250-c894e4dc240e?w=800&q=80" 
              alt="Our Story" 
              className="w-full h-auto rounded-2xl shadow-lg object-cover"
            />
          </div>
          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <p className="text-[#0052CC] font-bold text-sm tracking-widest uppercase mb-2">A Quick Intro</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4 leading-relaxed text-sm">
              Hotel Hub was founded with a simple idea: to redefine luxury travel and provide an effortless booking experience. Over the last decade, we have dedicated ourselves to connecting travelers with the world's most extraordinary properties, ensuring every trip is seamless and memorable.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed text-sm">
              Our journey started as a small passion project and has grown into a global community of avid travelers and premium hosts. We believe in quality over quantity, which is why every property on our platform is handpicked.
            </p>
            <button className="bg-[#0052CC] hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors flex items-center shadow-sm">
              Read More
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Hotel Hub */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Choose Hotel Hub</h2>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            We are dedicated to providing you with the best possible experience, from finding the perfect property to seamless check-outs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Best Price Guarantee", desc: "Find a lower price? We'll match it. We promise the best rates for all our properties.", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "text-blue-600", bg: "bg-blue-50" },
            { title: "Verified Homes", desc: "Every property is personally vetted by our team to ensure the highest standards.", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", color: "text-indigo-600", bg: "bg-indigo-50" },
            { title: "Secure Booking", desc: "Secure online payments and reservations protect your financial information.", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", color: "text-yellow-600", bg: "bg-yellow-50" },
            { title: "24/7 Customer Support", desc: "Our global support team is available around the clock to assist you anytime.", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z", color: "text-blue-500", bg: "bg-blue-50" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mb-5`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Mission and Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Mission */}
          <div className="bg-[#0052CC] text-white p-10 rounded-3xl relative overflow-hidden flex flex-col justify-center">
            {/* Decorative circle */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 border-4 border-white/10 rounded-full"></div>
            <div className="absolute -right-20 -bottom-20 w-60 h-60 border-4 border-white/10 rounded-full"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-blue-100 text-sm leading-relaxed max-w-md">
                To simplify the global travel experience, provide access to the best properties, and deliver customer support that exceeds expectations.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-[#0F172A] text-white p-10 rounded-3xl relative overflow-hidden flex flex-col justify-center">
             {/* Decorative eye shape abstract */}
             <div className="absolute -right-10 -bottom-10 w-40 h-40 border-4 border-white/5 rounded-full"></div>
             
             <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                To become the undisputed leader in luxury travel by integrating cutting-edge technology and human-centric service seamlessly.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Stats Banner */}
      <section className="w-full bg-[#0052CC] text-white py-12 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold mb-1">5000+</span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-blue-200">Global Hotels</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold mb-1">1M+</span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-blue-200">Happy Guests</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold mb-1">120+</span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-blue-200">Destinations</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold mb-1">4.9</span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-blue-200">Guest Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Meet Our Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Meet Our Team</h2>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            The talented people behind the Hub, dedicated to redefining your travel experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { name: "ANDERSON DAVIS", role: "CHIEF EXECUTIVE OFFICER", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80" },
            { name: "LINDA STERLING", role: "HEAD OF OPERATIONS", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80" },
            { name: "MARKUS WOLF", role: "DESIGN DIRECTOR", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80" }
          ].map((member, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="w-full h-[350px] mb-4 overflow-hidden rounded-2xl bg-gray-200">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h3 className="font-bold text-gray-900 text-lg uppercase">{member.name}</h3>
              <p className="text-[#0052CC] text-xs font-bold tracking-wider">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Guest Testimonials */}
      <section className="bg-gray-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Guest Testimonials</h2>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            Hear from travelers around the globe who trust us with their trips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "The interface was incredibly intuitive. I found a gorgeous villa for my family in minutes. The customer support team was also highly responsive!",
              name: "Sarah Jenkins",
              location: "London, UK",
              img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
            },
            {
              quote: "I've booked over 10 times via Hotel Hub and they never disappoint. The hand-picked selections ensure that we only stay at the best places.",
              name: "David Miller",
              location: "New York, USA",
              img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
            },
            {
              quote: "What impressed me most was the transparent pricing and seamless check-in process. Hotel Hub makes traveling a truly 5-star experience.",
              name: "Elena Petrov",
              location: "Paris, FR",
              img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
            }
          ].map((testimonial, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed italic mb-8">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <img src={testimonial.img} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{testimonial.name}</h4>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div 
          className="relative w-full rounded-3xl overflow-hidden bg-cover bg-center py-24 flex flex-col items-center justify-center text-center px-6"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80')" }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready To Start Your Next Adventure?</h2>
            <p className="text-white/80 text-sm mb-8 max-w-xl mx-auto">
              Join thousands of travelers who have found their perfect luxury accommodation with us. Your perfect stay is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#0052CC] hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-lg">
                Explore Hotels
              </button>
              <button className="bg-transparent border border-white text-white hover:bg-white/10 font-semibold px-8 py-3.5 rounded-xl transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;