import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingsAPI, toursAPI } from '../../services/api';
import { FaPlane, FaUsers, FaDollarSign, FaCalendar } from 'react-icons/fa';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalTours: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingBookings: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [toursRes, bookingsRes] = await Promise.all([
        toursAPI.getAll(),
        bookingsAPI.getAll()
      ]);

      const tours = toursRes.data;
      const bookings = bookingsRes.data;

      const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
      const pendingBookings = bookings.filter(b => b.status === 'pending').length;

      setStats({
        totalTours: tours.length,
        totalBookings: bookings.length,
        totalRevenue,
        pendingBookings
      });

      setRecentBookings(bookings.slice(0, 5));
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Tours</p>
                <p className="text-3xl font-bold mt-2">{stats.totalTours}</p>
              </div>
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center">
                <FaPlane className="text-2xl text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Bookings</p>
                <p className="text-3xl font-bold mt-2">{stats.totalBookings}</p>
              </div>
              <div className="bg-secondary-100 w-12 h-12 rounded-full flex items-center justify-center">
                <FaUsers className="text-2xl text-secondary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold mt-2">${stats.totalRevenue}</p>
              </div>
              <div className="bg-accent-100 w-12 h-12 rounded-full flex items-center justify-center">
                <FaDollarSign className="text-2xl text-accent-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Bookings</p>
                <p className="text-3xl font-bold mt-2">{stats.pendingBookings}</p>
              </div>
              <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center">
                <FaCalendar className="text-2xl text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Link to="/admin/tours" className="btn-primary text-center">
            Manage Tours
          </Link>
          <Link to="/admin/bookings" className="btn-secondary text-center">
            Manage Bookings
          </Link>
          <Link to="/admin/categories" className="btn-outline text-center">
            Manage Categories
          </Link>
          <Link to="/admin/contacts" className="btn-outline text-center">
            View Inquiries
          </Link>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Bookings</h2>
            <Link to="/admin/bookings" className="text-primary-600 hover:text-primary-700 font-semibold">
              View All
            </Link>
          </div>

          {recentBookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Guest
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tour
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.guestName}</div>
                        <div className="text-sm text-gray-500">{booking.guestEmail}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{booking.tour?.title}</div>
                        <div className="text-sm text-gray-500">{booking.tour?.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(booking.bookingDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        ${booking.totalPrice}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-600 py-8">No bookings yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
