import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-300 pt-16 pb-8 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl text-white tracking-widest">FITTARA<span className="text-amber-500">.</span></h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Redefining ethnic luxury for the modern gentleman. Crafted with precision, designed for elegance.
            </p>
            <div className="flex space-x-4 pt-2">
              <Instagram size={20} className="hover:text-amber-500 cursor-pointer" />
              <Facebook size={20} className="hover:text-amber-500 cursor-pointer" />
              <Twitter size={20} className="hover:text-amber-500 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-amber-500 cursor-pointer">New Arrivals</li>
              <li className="hover:text-amber-500 cursor-pointer">Gurkha Pants</li>
              <li className="hover:text-amber-500 cursor-pointer">Shirts</li>
              <li className="hover:text-amber-500 cursor-pointer">Wedding Collection</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Support</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-amber-500 cursor-pointer">Order Tracking</li>
              <li className="hover:text-amber-500 cursor-pointer">Size Guide</li>
              <li className="hover:text-amber-500 cursor-pointer">Returns & Exchanges</li>
              <li className="hover:text-amber-500 cursor-pointer">Contact Us</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-amber-500" />
                <span>123, Fashion Street, Mumbai, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-amber-500" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-amber-500" />
                <span>support@fittara.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; 2024 FITTARA. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;