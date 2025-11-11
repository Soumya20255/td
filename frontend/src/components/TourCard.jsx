import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaUsers, FaStar } from 'react-icons/fa';

const TourCard = ({ tour }) => {
  const { _id, title, description, price, duration, location, images, maxGroupSize, rating, reviewCount } = tour;

  return (
    <div className="card group">
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={images?.[0] || 'https://via.placeholder.com/400x300'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-accent-500 text-white px-3 py-1 rounded-full font-semibold">
          ${price}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
          <FaMapMarkerAlt className="text-primary-500" />
          <span>{location}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <FaClock className="text-primary-500" />
            <span>{duration} days</span>
          </div>
          <div className="flex items-center gap-1">
            <FaUsers className="text-primary-500" />
            <span>Max {maxGroupSize}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500" />
            <span>{rating || 0} ({reviewCount || 0})</span>
          </div>
        </div>

        {/* Button */}
        <Link to={`/tours/${_id}`} className="block">
          <button className="w-full btn-primary">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TourCard;
