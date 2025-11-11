import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaHome, FaPlane, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaPlane className="text-3xl text-primary-600" />
            <span className="text-2xl font-bold font-heading text-primary-700">
              TravelHub
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors flex items-center gap-2">
              <FaHome /> Home
            </Link>
            <Link to="/tours" className="text-gray-700 hover:text-primary-600 font-medium transition-colors flex items-center gap-2">
              <FaPlane /> Tours
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium transition-colors flex items-center gap-2">
              <FaEnvelope /> Contact
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-primary-600 font-medium transition-colors flex items-center gap-2">
                  <FaUser /> {user?.name}
                </Link>
                {isAdmin() && (
                  <Link to="/admin/dashboard" className="text-accent-600 hover:text-accent-700 font-medium transition-colors">
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 font-medium transition-colors flex items-center gap-2"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-primary-600 focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium py-2" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link to="/tours" className="text-gray-700 hover:text-primary-600 font-medium py-2" onClick={() => setIsOpen(false)}>
                Tours
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium py-2" onClick={() => setIsOpen(false)}>
                Contact
              </Link>

              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="text-gray-700 hover:text-primary-600 font-medium py-2" onClick={() => setIsOpen(false)}>
                    Profile
                  </Link>
                  {isAdmin() && (
                    <Link to="/admin/dashboard" className="text-accent-600 hover:text-accent-700 font-medium py-2" onClick={() => setIsOpen(false)}>
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="text-red-600 hover:text-red-700 font-medium py-2 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-primary-600 font-medium py-2" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary text-center" onClick={() => setIsOpen(false)}>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
