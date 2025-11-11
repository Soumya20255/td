# Travel & Tourism Backend API

RESTful API for the Travel & Tourism platform built with Node.js, Express, and MongoDB.

## Getting Started

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travel-tourism
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

### Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Documentation

Base URL: `http://localhost:5000/api`

### Authentication Endpoints

All authentication endpoints are public.

#### Register User
- **POST** `/auth/register`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890"
}
```

#### Login
- **POST** `/auth/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
- **GET** `/auth/me`
- **Headers:** `Authorization: Bearer <token>`

### Tours Endpoints

#### Get All Tours
- **GET** `/tours`
- **Query Parameters:**
  - `category` - Filter by category ID
  - `location` - Filter by location (case-insensitive)
  - `minPrice` - Minimum price
  - `maxPrice` - Maximum price
  - `search` - Text search
  - `featured` - Filter featured tours (true/false)

#### Get Tour by ID
- **GET** `/tours/:id`

#### Create Tour (Admin Only)
- **POST** `/tours`
- **Headers:** `Authorization: Bearer <admin-token>`
- **Body:**
```json
{
  "title": "Paris Adventure",
  "description": "Explore the city of lights",
  "price": 1200,
  "duration": 7,
  "location": "Paris, France",
  "category": "category_id",
  "maxGroupSize": 15,
  "difficulty": "easy",
  "featured": true,
  "available": true
}
```

#### Update Tour (Admin Only)
- **PUT** `/tours/:id`
- **Headers:** `Authorization: Bearer <admin-token>`

#### Delete Tour (Admin Only)
- **DELETE** `/tours/:id`
- **Headers:** `Authorization: Bearer <admin-token>`

### Bookings Endpoints

#### Create Booking
- **POST** `/bookings`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "tour": "tour_id",
  "guestName": "John Doe",
  "guestEmail": "john@example.com",
  "guestPhone": "1234567890",
  "numberOfGuests": 2,
  "bookingDate": "2024-06-15",
  "totalPrice": 2400,
  "specialRequests": "Vegetarian meals"
}
```

#### Get User Bookings
- **GET** `/bookings/user`
- **Headers:** `Authorization: Bearer <token>`

#### Get All Bookings (Admin Only)
- **GET** `/bookings`
- **Headers:** `Authorization: Bearer <admin-token>`

#### Update Booking Status (Admin Only)
- **PUT** `/bookings/:id`
- **Headers:** `Authorization: Bearer <admin-token>`
- **Body:**
```json
{
  "status": "confirmed",
  "paymentStatus": "paid"
}
```

### Categories Endpoints

#### Get All Categories
- **GET** `/categories`

#### Create Category (Admin Only)
- **POST** `/categories`
- **Headers:** `Authorization: Bearer <admin-token>`
- **Body:**
```json
{
  "name": "Adventure",
  "description": "Thrilling adventure tours",
  "icon": "🏔️"
}
```

### Contact Endpoints

#### Submit Contact Form
- **POST** `/contact`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "subject": "Inquiry",
  "message": "I have a question..."
}
```

#### Get All Contacts (Admin Only)
- **GET** `/contact`
- **Headers:** `Authorization: Bearer <admin-token>`

## Error Handling

All errors follow this format:
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Success Response

All successful responses follow this format:
```json
{
  "success": true,
  "data": { /* response data */ },
  "count": 10  // for list endpoints
}
```

## Models

### User
- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- phone (String)
- role (String: 'user' | 'admin')
- avatar (String)

### Tour
- title (String, required)
- description (String, required)
- price (Number, required)
- duration (Number, required)
- location (String, required)
- category (ObjectId, ref: Category)
- images (Array of Strings)
- maxGroupSize (Number, required)
- difficulty (String: 'easy' | 'medium' | 'hard')
- itinerary (Array of Objects)
- included (Array of Strings)
- excluded (Array of Strings)
- rating (Number, 0-5)
- reviewCount (Number)
- featured (Boolean)
- available (Boolean)

### Booking
- user (ObjectId, ref: User)
- tour (ObjectId, ref: Tour)
- guestName (String, required)
- guestEmail (String, required)
- guestPhone (String, required)
- numberOfGuests (Number, required)
- bookingDate (Date, required)
- totalPrice (Number, required)
- status (String: 'pending' | 'confirmed' | 'cancelled' | 'completed')
- paymentStatus (String: 'pending' | 'paid' | 'refunded')
- specialRequests (String)

### Category
- name (String, required, unique)
- description (String)
- icon (String)

### Contact
- name (String, required)
- email (String, required)
- phone (String)
- subject (String, required)
- message (String, required)
- status (String: 'new' | 'read' | 'replied')
