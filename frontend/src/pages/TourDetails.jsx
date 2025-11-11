import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toursAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import { FaMapMarkerAlt, FaClock, FaUsers, FaStar, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchTour();
  }, [id]);

  const fetchTour = async () => {
    try {
      const response = await toursAPI.getOne(id);
      setTour(response.data);
    } catch (error) {
      toast.error('Failed to load tour details');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      toast.info('Please login to book a tour');
      navigate('/login', { state: { from: `/tours/${id}` } });
      return;
    }
    navigate(`/booking/${id}`);
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

  const images = tour.images?.length > 0 ? tour.images : ['https://via.placeholder.com/800x600'];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Images Gallery */}
        <div className="mb-8">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-4">
            <img
              src={images[selectedImage]}
              alt={tour.title}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${tour.title} ${index + 1}`}
                onClick={() => setSelectedImage(index)}
                className={`h-24 w-full object-cover rounded-lg cursor-pointer transition-all ${
                  selectedImage === index ? 'ring-4 ring-primary-500' : 'hover:opacity-75'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h1 className="text-4xl font-bold font-heading mb-4">{tour.title}</h1>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaMapMarkerAlt className="text-primary-500" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaClock className="text-primary-500" />
                  <span>{tour.duration} days</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaUsers className="text-primary-500" />
                  <span>Max {tour.maxGroupSize} people</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaStar className="text-yellow-500" />
                  <span>{tour.rating || 0} ({tour.reviewCount || 0} reviews)</span>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-2xl font-bold mb-4">About This Tour</h2>
                <p className="text-gray-700 leading-relaxed">{tour.description}</p>
              </div>
            </div>

            {/* Itinerary */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6">Itinerary</h2>
                <div className="space-y-4">
                  {tour.itinerary.map((item, index) => (
                    <div key={index} className="border-l-4 border-primary-500 pl-4">
                      <h3 className="font-bold text-lg">Day {item.day}: {item.title}</h3>
                      <p className="text-gray-600 mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Included/Excluded */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tour.included && tour.included.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-8">
                  <h2 className="text-2xl font-bold mb-4">What's Included</h2>
                  <ul className="space-y-2">
                    {tour.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tour.excluded && tour.excluded.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-8">
                  <h2 className="text-2xl font-bold mb-4">What's Not Included</h2>
                  <ul className="space-y-2">
                    {tour.excluded.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FaTimesCircle className="text-red-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-20">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  ${tour.price}
                </div>
                <p className="text-gray-600">per person</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">{tour.duration} days</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Max Group</span>
                  <span className="font-semibold">{tour.maxGroupSize} people</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Difficulty</span>
                  <span className="font-semibold capitalize">{tour.difficulty}</span>
                </div>
              </div>

              <button
                onClick={handleBookNow}
                disabled={!tour.available}
                className="w-full btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {tour.available ? 'Book Now' : 'Not Available'}
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Free cancellation up to 24 hours before departure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
