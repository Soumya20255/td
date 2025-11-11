import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toursAPI, categoriesAPI } from '../services/api';
import TourCard from '../components/TourCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import { FaPlane, FaMountain, FaUmbrellaBeach, FaHeart, FaStar, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Home = () => {
  const [featuredTours, setFeaturedTours] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [toursRes, categoriesRes] = await Promise.all([
        toursAPI.getAll({ featured: true }),
        categoriesAPI.getAll()
      ]);
      setFeaturedTours(toursRes.data.slice(0, 6));
      setCategories(categoriesRes.data);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    // Implement search navigation
    window.location.href = `/tours?search=${searchTerm}`;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
              Discover Your Next Adventure
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Explore amazing destinations around the world with our curated tour packages
            </p>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-3xl text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">Get the best deals on tour packages</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-3xl text-secondary-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Guidance</h3>
              <p className="text-gray-600">Professional tour guides and support</p>
            </div>
            <div className="text-center">
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-3xl text-accent-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Memorable Experiences</h3>
              <p className="text-gray-600">Create unforgettable memories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">Browse by Category</h2>
          {loading ? (
            <Loader size="large" />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/tours?category=${category._id}`}
                  className="card text-center p-8 hover:bg-primary-50 transition-colors"
                >
                  <div className="text-4xl mb-4">
                    {category.icon || <FaPlane className="mx-auto text-primary-600" />}
                  </div>
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="section-title mb-0">Featured Tours</h2>
            <Link to="/tours" className="btn-outline">
              View All Tours
            </Link>
          </div>
          
          {loading ? (
            <Loader size="large" />
          ) : featuredTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTours.map((tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-lg">No featured tours available</p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary-600 to-secondary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-secondary-100">
            Join thousands of happy travelers and create memories that last a lifetime
          </p>
          <Link to="/tours" className="inline-block bg-white text-secondary-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
            Explore Tours Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
