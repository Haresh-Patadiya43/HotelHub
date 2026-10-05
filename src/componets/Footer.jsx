import React from 'react'
import {Link,NavLink} from 'react-router-dom';

function Footer() {
  return (
    <>
      <footer className="bg-[#0B3B60] text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          
          <div className="md:col-span-1">
            <div className="flex items-center font-bold text-2xl mb-4">
              <svg className="w-8 h-8 mr-2 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 9.5V21H22V9.5L12 2ZM12 4.5L19.5 10.1V19H16.5V13.5C16.5 11 14.5 9 12 9C9.5 9 7.5 11 7.5 13.5V19H4.5V10.1L12 4.5Z"/></svg>
              Hotel Hub
            </div>
            <p className="text-sm text-blue-100 mb-6 leading-relaxed">
              Your journey, our passion. Discover curated experiences that create lasting memories.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-200"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
              <a href="#" className="text-white hover:text-blue-200"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/></svg></a>
              <a href="#" className="text-white hover:text-blue-200"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-bold text-sm mb-4 tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-xs text-blue-100">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/hotels" className="hover:text-white transition-colors">Hotels</Link></li>
              <li><Link to="/experiences" className="hover:text-white transition-colors">Experiences</Link></li>
              <li><Link to="/offers" className="hover:text-white transition-colors">Offers</Link></li>
              <li><Link to="/concierge" className="hover:text-white transition-colors">Concierge</Link></li>
              <li><Link to="/aboutus" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-bold text-sm mb-4 tracking-wider">Top Destinations</h4>
            <ul className="space-y-3 text-xs text-blue-100">
              <li><a href="#" className="hover:text-white transition-colors">Goa</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kerala</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Andaman Islands</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bali</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dubai</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-bold text-sm mb-4 tracking-wider">Support</h4>
            <ul className="space-y-3 text-xs text-blue-100">
              <li><a href="#" className="hover:text-white transition-colors">FAQ's</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Booking Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Payment Options</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cancellation Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-bold text-sm mb-4 tracking-wider">Newsletter</h4>
            <p className="text-xs text-blue-100 mb-4">Subscribe to get special offers and travel inspiration.</p>
            <div className="flex bg-[#124975] rounded border border-[#1d5c8f]">
              <input type="email" placeholder="Email address" className="bg-transparent px-3 py-2 text-xs w-full focus:outline-none text-white placeholder-blue-200" />
              <button className="bg-[#0052CC] text-white px-3 py-2 border-l border-[#1d5c8f]">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-blue-200 pt-6 border-t border-[#1d5c8f]">
          <p>&copy; 2026 Hotel Hub. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <span className="text-[#1d5c8f]">|</span>
            <a href="#" className="hover:text-white">Terms & Conditions</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer;
