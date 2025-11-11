import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bookingsAPI } from '../services/api';
import Loader from '../components/Loader';
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingsAPI.getUserBookings();
      setBookings(response.data);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="section-title mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUser className="text-4xl text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mt-2">
                  {user?.role}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <FaEnvelope className="text-primary-500" />
                  <span>{user?.email}</span>
                </div>
                {user?.phone && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <FaPhone className="text-primary-500" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bookings */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

              {loading ? (
                <Loader size="large" />
              ) : bookings.length > 0 ? (
                <div className="space-y-6">
                  {bookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Tour Image */}
                        <img
                          src={booking.tour?.images?.[0] || 'https://via.placeholder.com/200x150'}
                          alt={booking.tour?.title}
                          className="w-full md:w-48 h-32 object-cover rounded-lg"
                        />

                        {/* Booking Details */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-bold">{booking.tour?.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                              {booking.status.toUpperCase()}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <FaMapMarkerAlt className="text-primary-500" />
                              <span>{booking.tour?.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaClock className="text-primary-500" />
                              <span>{booking.tour?.duration} days</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaCalendar className="text-primary-500" />
                              <span>{formatDate(booking.bookingDate)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaUser className="text-primary-500" />
                              <span>{booking.numberOfGuests} guests</span>
                            </div>
                          </div>

                          <div className="mt-4 flex justify-between items-center">
                            <div>
                              <span className="text-sm text-gray-600">Total Amount:</span>
                              <span className="text-xl font-bold text-primary-600 ml-2">
                                ${booking.totalPrice}
                              </span>
                            </div>
                            <div>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                booking.paymentStatus === 'paid' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                Payment: {booking.paymentStatus}
                              </span>
                            </div>
                          </div>

                          {booking.specialRequests && (
                            <div className="mt-3 text-sm">
                              <span className="font-semibold">Special Requests:</span>
                              <p className="text-gray-600 mt-1">{booking.specialRequests}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg mb-4">No bookings yet</p>
                  <a href="/tours" className="btn-primary">
                    Browse Tours
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
