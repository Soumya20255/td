import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toursAPI, bookingsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import { FaCalendar, FaUsers, FaDollarSign } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Booking = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    guestName: user?.name || '',
    guestEmail: user?.email || '',
    guestPhone: user?.phone || '',
    numberOfGuests: 1,
    bookingDate: '',
    specialRequests: ''
  });

  useEffect(() => {
    fetchTour();
  }, [tourId]);

  const fetchTour = async () => {
    try {
      const response = await toursAPI.getOne(tourId);
      setTour(response.data);
    } catch (error) {
      toast.error('Failed to load tour details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    return tour ? tour.price * formData.numberOfGuests : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const bookingData = {
        ...formData,
        tour: tourId,
        totalPrice: calculateTotal()
      };

      const response = await bookingsAPI.create(bookingData);
      
      if (response.success) {
        toast.success('Booking created successfully!');
        navigate('/profile');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create booking');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="large" />
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Tour not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="section-title mb-8">Complete Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              <h2 className="text-2xl font-bold mb-6">Booking Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="guestName"
                    value={formData.guestName}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="guestEmail"
                    value={formData.guestEmail}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="guestPhone"
                    value={formData.guestPhone}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaCalendar /> Booking Date *
                  </label>
                  <input
                    type="date"
                    name="bookingDate"
                    value={formData.bookingDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaUsers /> Number of Guests *
                  </label>
                  <input
                    type="number"
                    name="numberOfGuests"
                    value={formData.numberOfGuests}
                    onChange={handleChange}
                    required
                    min="1"
                    max={tour.maxGroupSize}
                    className="input-field"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Maximum {tour.maxGroupSize} guests per booking
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows="4"
                    className="input-field resize-none"
                    placeholder="Any special requirements or requests..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Processing...' : 'Confirm Booking'}
                </button>
              </form>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-20">
              <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <img
                    src={tour.images?.[0] || 'https://via.placeholder.com/400x300'}
                    alt={tour.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-bold text-lg">{tour.title}</h4>
                  <p className="text-gray-600 text-sm">{tour.location}</p>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per person</span>
                    <span className="font-semibold">${tour.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Number of guests</span>
                    <span className="font-semibold">{formData.numberOfGuests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">{tour.duration} days</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total Amount</span>
                    <span className="text-2xl font-bold text-primary-600">
                      ${calculateTotal()}
                    </span>
                  </div>
                </div>

                <div className="bg-primary-50 p-4 rounded-lg text-sm text-gray-700">
                  <p className="font-semibold mb-2">Important:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Free cancellation up to 24 hours before departure</li>
                    <li>Full payment required at booking</li>
                    <li>Confirmation email will be sent</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
