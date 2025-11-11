import { useState, useEffect } from 'react';
import { toursAPI, categoriesAPI } from '../../services/api';
import Modal from '../../components/Modal';
import Loader from '../../components/Loader';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminTours = () => {
  const [tours, setTours] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    location: '',
    category: '',
    maxGroupSize: '',
    difficulty: 'medium',
    featured: false,
    available: true
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [toursRes, categoriesRes] = await Promise.all([
        toursAPI.getAll(),
        categoriesAPI.getAll()
      ]);
      setTours(toursRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (tour = null) => {
    if (tour) {
      setEditingTour(tour);
      setFormData({
        title: tour.title,
        description: tour.description,
        price: tour.price,
        duration: tour.duration,
        location: tour.location,
        category: tour.category._id || tour.category,
        maxGroupSize: tour.maxGroupSize,
        difficulty: tour.difficulty,
        featured: tour.featured,
        available: tour.available
      });
    } else {
      setEditingTour(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        duration: '',
        location: '',
        category: '',
        maxGroupSize: '',
        difficulty: 'medium',
        featured: false,
        available: true
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTour(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTour) {
        await toursAPI.update(editingTour._id, formData);
        toast.success('Tour updated successfully');
      } else {
        await toursAPI.create(formData);
        toast.success('Tour created successfully');
      }
      handleCloseModal();
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      try {
        await toursAPI.delete(id);
        toast.success('Tour deleted successfully');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete tour');
      }
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Tours</h1>
          <button onClick={() => handleOpenModal()} className="btn-primary flex items-center gap-2">
            <FaPlus /> Add New Tour
          </button>
        </div>

        {tours.length > 0 ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tours.map((tour) => (
                  <tr key={tour._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{tour.title}</div>
                      <div className="text-sm text-gray-500">{tour.category?.name}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{tour.location}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">${tour.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{tour.duration} days</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        {tour.featured && (
                          <span className="px-2 py-1 bg-accent-100 text-accent-800 text-xs rounded">Featured</span>
                        )}
                        <span className={`px-2 py-1 text-xs rounded ${
                          tour.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {tour.available ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenModal(tour)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(tour._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-gray-600 mb-4">No tours yet</p>
            <button onClick={() => handleOpenModal()} className="btn-primary">
              Add Your First Tour
            </button>
          </div>
        )}

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingTour ? 'Edit Tour' : 'Add New Tour'}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="input-field resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (days) *</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  min="1"
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Group Size *</label>
                <input
                  type="number"
                  name="maxGroupSize"
                  value={formData.maxGroupSize}
                  onChange={handleChange}
                  required
                  min="1"
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="input-field"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">Featured Tour</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">Available</span>
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button type="submit" className="flex-1 btn-primary">
                {editingTour ? 'Update Tour' : 'Create Tour'}
              </button>
              <button type="button" onClick={handleCloseModal} className="flex-1 btn-outline">
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default AdminTours;
