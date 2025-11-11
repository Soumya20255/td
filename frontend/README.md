# Travel & Tourism Frontend

React-based frontend for the Travel & Tourism platform with Vite and Tailwind CSS.

## Getting Started

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

### Development

```bash
npm run dev
```

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
```

Builds the app for production to the `dist` folder.

### Preview

```bash
npm run preview
```

Preview the production build locally.

## Features

### User Features
- Home page with featured tours and categories
- Tour listing with advanced filters
- Detailed tour pages with image gallery
- User authentication (login/register)
- Booking system with form validation
- User profile with booking history
- Contact form

### Admin Features
- Admin dashboard with statistics
- Tour management (CRUD)
- Booking management with status updates
- Category management
- Contact inquiry management

## Project Structure

```
src/
├── components/
│   ├── AdminRoute.jsx       # Protected route for admin
│   ├── Footer.jsx           # Footer component
│   ├── Loader.jsx           # Loading spinner
│   ├── Modal.jsx            # Reusable modal
│   ├── Navbar.jsx           # Navigation bar
│   ├── PrivateRoute.jsx     # Protected route for users
│   ├── SearchBar.jsx        # Search input component
│   └── TourCard.jsx         # Tour card component
├── context/
│   └── AuthContext.jsx      # Authentication context
├── pages/
│   ├── admin/               # Admin pages
│   │   ├── AdminBookings.jsx
│   │   ├── AdminCategories.jsx
│   │   ├── AdminContacts.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminLogin.jsx
│   │   └── AdminTours.jsx
│   ├── Booking.jsx          # Booking page
│   ├── Contact.jsx          # Contact page
│   ├── Home.jsx             # Home page
│   ├── Login.jsx            # Login page
│   ├── Profile.jsx          # User profile
│   ├── Register.jsx         # Registration page
│   ├── TourDetails.jsx      # Tour details page
│   └── TourList.jsx         # Tours listing page
├── services/
│   └── api.js               # API service layer
├── App.jsx                  # Main app component
├── index.css                # Global styles
└── main.jsx                 # App entry point
```

## Routing

### Public Routes
- `/` - Home page
- `/tours` - Tour listing
- `/tours/:id` - Tour details
- `/login` - User login
- `/register` - User registration
- `/contact` - Contact form

### Protected Routes (User)
- `/profile` - User profile and bookings
- `/booking/:tourId` - Create booking

### Admin Routes
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard
- `/admin/tours` - Manage tours
- `/admin/bookings` - Manage bookings
- `/admin/categories` - Manage categories
- `/admin/contacts` - View inquiries

## Styling

This project uses **Tailwind CSS** with a custom configuration for the travel theme.

### Custom Classes
- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.btn-outline` - Outline button style
- `.card` - Card container style
- `.input-field` - Form input style
- `.section-title` - Section heading style

### Color Palette
- **Primary**: Blue (#1890ff)
- **Secondary**: Green (#22c55e)
- **Accent**: Gold/Yellow (#f59e0b)

## State Management

- **AuthContext** - Manages user authentication state globally
- **Local State** - Component-level state with React hooks

## API Integration

The frontend communicates with the backend API using Axios. All API calls are centralized in `src/services/api.js`.

### API Service Methods

```javascript
// Auth
authAPI.login(email, password)
authAPI.register(userData)
authAPI.getMe()

// Tours
toursAPI.getAll(params)
toursAPI.getOne(id)
toursAPI.create(tourData)
toursAPI.update(id, tourData)
toursAPI.delete(id)

// Bookings
bookingsAPI.create(bookingData)
bookingsAPI.getUserBookings()
bookingsAPI.getAll()
bookingsAPI.updateStatus(id, status)

// Categories
categoriesAPI.getAll()
categoriesAPI.create(categoryData)
categoriesAPI.update(id, categoryData)
categoriesAPI.delete(id)

// Contact
contactAPI.create(contactData)
contactAPI.getAll()
contactAPI.updateStatus(id, status)
```

## Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (< 768px)
- Tablets (768px - 1024px)
- Desktops (> 1024px)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

### Core
- **react** - UI library
- **react-dom** - React DOM renderer
- **react-router-dom** - Routing
- **axios** - HTTP client

### UI & Styling
- **tailwindcss** - Utility CSS framework
- **react-icons** - Icon library
- **react-toastify** - Toast notifications

### Build Tools
- **vite** - Build tool
- **@vitejs/plugin-react** - React plugin for Vite

## Performance Optimization

- Code splitting with React.lazy()
- Image lazy loading
- Optimized bundle size
- Caching strategies
- Responsive images

## Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast compliance
- Screen reader support
