import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

// Tours API
export const toursAPI = {
  getAll: async (params) => {
    const response = await api.get('/tours', { params });
    return response.data;
  },
  getOne: async (id) => {
    const response = await api.get(`/tours/${id}`);
    return response.data;
  },
  create: async (tourData) => {
    const response = await api.post('/tours', tourData);
    return response.data;
  },
  update: async (id, tourData) => {
    const response = await api.put(`/tours/${id}`, tourData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/tours/${id}`);
    return response.data;
  }
};

// Bookings API
export const bookingsAPI = {
  create: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },
  getUserBookings: async () => {
    const response = await api.get('/bookings/user');
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },
  getOne: async (id) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },
  updateStatus: async (id, status) => {
    const response = await api.put(`/bookings/${id}`, status);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  }
};

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
  create: async (categoryData) => {
    const response = await api.post('/categories', categoryData);
    return response.data;
  },
  update: async (id, categoryData) => {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  }
};

// Contact API
export const contactAPI = {
  create: async (contactData) => {
    const response = await api.post('/contact', contactData);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/contact');
    return response.data;
  },
  updateStatus: async (id, status) => {
    const response = await api.put(`/contact/${id}`, { status });
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/contact/${id}`);
    return response.data;
  }
};

export default api;
