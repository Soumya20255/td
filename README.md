# 🌍 Travel & Tourism Website

A full-stack travel and tourism booking platform built with React, Node.js, Express, and MongoDB.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Login Credentials](#login-credentials)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)

## ✨ Features

### User Features
- 🔐 User registration and authentication
- 🔍 Browse and search tours
- 🗺️ Filter tours by category, price, and location
- 📖 View detailed tour information
- 🎫 Book tours online
- 👤 User profile management
- 📝 View booking history
- 📧 Contact form

### Admin Features
- 📊 Admin dashboard with analytics
- ➕ Add, edit, and delete tours
- 📂 Manage tour categories
- 📅 View and manage all bookings
- 💬 View contact form submissions
- 🖼️ Upload tour images

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Soumya20255/td.git
cd td
```

2. **Backend Setup**
```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration
MONGODB_URI=mongodb://localhost:27017/travel-tourism
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install

# Create .env file
cp .env.example .env

# Update .env
VITE_API_URL=http://localhost:5000/api
```

4. **Seed Database with Sample Data**
```bash
cd ../backend
npm run seed
```

5. **Start the Application**

**Backend** (Terminal 1):
```bash
cd backend
npm run dev
```

**Frontend** (Terminal 2):
```bash
cd frontend
npm run dev
```

6. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## 🔑 Login Credentials

### Admin Account
```
Email: admin@travelhub.com
Password: admin123
```
**Admin Access:** Use these credentials to access the admin dashboard at `/admin/dashboard`

### Test User Account
```
Email: john@example.com
Password: password123
```
**User Access:** Use these credentials to test user features like booking tours and profile management

### Create New Account
You can also register a new account:
1. Go to http://localhost:3000/register
2. Fill in the registration form
3. Login with your new credentials

## 📁 Project Structure

```
td/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── tourController.js     # Tour CRUD operations
│   │   ├── bookingController.js  # Booking management
│   │   ├── categoryController.js # Category management
│   │   └── contactController.js  # Contact form handling
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   └── upload.js            # File upload configuration
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Tour.js              # Tour schema
│   │   ├── Booking.js           # Booking schema
│   │   ├── Category.js          # Category schema
│   │   └── Contact.js           # Contact schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── tourRoutes.js        # Tour endpoints
│   │   ├── bookingRoutes.js     # Booking endpoints
│   │   ├── categoryRoutes.js    # Category endpoints
│   │   └── contactRoutes.js     # Contact endpoints
│   ├── uploads/                 # Uploaded images
│   ├── .env                     # Environment variables
│   ├── server.js                # Express server
│   ├── seed.js                  # Database seeder
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Navigation bar
│   │   │   ├── Footer.jsx       # Footer component
│   │   │   ├── TourCard.jsx     # Tour card component
│   │   │   ├── SearchBar.jsx    # Search functionality
│   │   │   ├── Loader.jsx       # Loading spinner
│   │   │   ├── Modal.jsx        # Modal component
│   │   │   ├── PrivateRoute.jsx # Protected routes
│   │   │   └── AdminRoute.jsx   # Admin-only routes
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Global auth state
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Homepage
│   │   │   ├── TourList.jsx     # Tours listing
│   │   │   ├── TourDetails.jsx  # Tour details
│   │   │   ├── Booking.jsx      # Booking page
│   │   │   ├── Login.jsx        # Login page
│   │   │   ├── Register.jsx     # Registration page
│   │   │   ├── Profile.jsx      # User profile
│   │   │   ├── Contact.jsx      # Contact page
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── AdminTours.jsx
│   │   │       ├── AdminBookings.jsx
│   │   │       ├── AdminCategories.jsx
│   │   │       └── AdminContacts.jsx
│   │   ├── services/
│   │   │   └── api.js           # API client
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── .env                     # Environment variables
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind configuration
│   └── package.json
│
└── README.md                    # This file
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Tour Endpoints
- `GET /api/tours` - Get all tours (with filters)
- `GET /api/tours/:id` - Get single tour
- `POST /api/tours` - Create tour (Admin only)
- `PUT /api/tours/:id` - Update tour (Admin only)
- `DELETE /api/tours/:id` - Delete tour (Admin only)

### Booking Endpoints
- `GET /api/bookings` - Get user bookings (Protected)
- `GET /api/bookings/all` - Get all bookings (Admin only)
- `POST /api/bookings` - Create booking (Protected)
- `PUT /api/bookings/:id` - Update booking status (Admin only)
- `DELETE /api/bookings/:id` - Cancel booking (Protected)

### Category Endpoints
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin only)
- `PUT /api/categories/:id` - Update category (Admin only)
- `DELETE /api/categories/:id` - Delete category (Admin only)

### Contact Endpoints
- `GET /api/contact` - Get all messages (Admin only)
- `POST /api/contact` - Submit contact form
- `DELETE /api/contact/:id` - Delete message (Admin only)

## 🔒 Security Features
- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes (user and admin)
- CORS enabled
- Input validation
- Secure file uploads with Multer v2.0.0

## 🎨 UI Features
- Fully responsive design
- Modern and clean interface
- Toast notifications for user feedback
- Loading states
- Modal dialogs
- Search and filter functionality
- Pagination
- Image gallery

## 📝 License
This project is open source and available under the MIT License.

## 👨‍💻 Author
**Soumya20255**
- GitHub: [@Soumya20255](https://github.com/Soumya20255)

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support
Give a ⭐ if you like this project!

---

**Happy Traveling! 🌴✈️🏖️**
