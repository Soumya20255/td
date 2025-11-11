import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt, FaPlane } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaPlane className="text-3xl text-primary-400" />
              <span className="text-2xl font-bold text-white">TravelHub</span>
            </div>
            <p className="text-sm mb-4">
              Explore the world with us. Your trusted partner for unforgettable travel experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400 transition-colors">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/tours" className="hover:text-primary-400 transition-colors">Tours</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-400 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-400 transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              <li className="hover:text-primary-400 transition-colors cursor-pointer">Paris, France</li>
              <li className="hover:text-primary-400 transition-colors cursor-pointer">Bali, Indonesia</li>
              <li className="hover:text-primary-400 transition-colors cursor-pointer">Tokyo, Japan</li>
              <li className="hover:text-primary-400 transition-colors cursor-pointer">New York, USA</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                <span className="text-sm">123 Travel Street, City, Country</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="flex-shrink-0" />
                <span className="text-sm">+1 234 567 8900</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="flex-shrink-0" />
                <span className="text-sm">info@travelhub.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} TravelHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
