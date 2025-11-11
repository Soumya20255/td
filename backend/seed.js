import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Category from './models/Category.js';
import Tour from './models/Tour.js';
import connectDB from './config/db.js';

dotenv.config();

// Sample data
const categories = [
  {
    name: 'Adventure',
    description: 'Thrilling adventure tours for adrenaline seekers',
    icon: '🏔️'
  },
  {
    name: 'Beach',
    description: 'Relaxing beach getaways and coastal tours',
    icon: '🏖️'
  },
  {
    name: 'Cultural',
    description: 'Immerse yourself in local culture and traditions',
    icon: '🎭'
  },
  {
    name: 'Family',
    description: 'Perfect tours for the whole family',
    icon: '👨‍👩‍👧‍👦'
  },
  {
    name: 'Honeymoon',
    description: 'Romantic destinations for couples',
    icon: '💑'
  },
  {
    name: 'Wildlife',
    description: 'Experience nature and wildlife up close',
    icon: '🦁'
  }
];

const adminUser = {
  name: 'Admin User',
  email: 'admin@travelhub.com',
  password: 'admin123',
  role: 'admin',
  phone: '1234567890'
};

const regularUser = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  role: 'user',
  phone: '0987654321'
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Category.deleteMany({});
    await Tour.deleteMany({});

    // Create users
    console.log('Creating users...');
    const admin = await User.create(adminUser);
    const user = await User.create(regularUser);
    console.log('✅ Users created');

    // Create categories
    console.log('Creating categories...');
    const createdCategories = await Category.insertMany(categories);
    console.log('✅ Categories created');

    // Create sample tours
    console.log('Creating sample tours...');
    const tours = [
      {
        title: 'Paris City Tour',
        description: 'Explore the romantic city of Paris with guided tours of the Eiffel Tower, Louvre Museum, and Seine River cruise. Experience French cuisine and culture.',
        price: 1200,
        duration: 7,
        location: 'Paris, France',
        category: createdCategories.find(c => c.name === 'Cultural')._id,
        images: ['https://images.unsplash.com/photo-1502602898657-3e91760cbb34'],
        maxGroupSize: 15,
        difficulty: 'easy',
        itinerary: [
          { day: 1, title: 'Arrival & Eiffel Tower', description: 'Welcome to Paris! Visit the iconic Eiffel Tower' },
          { day: 2, title: 'Louvre Museum', description: 'Explore the world-famous Louvre Museum' },
          { day: 3, title: 'Versailles Palace', description: 'Day trip to the magnificent Palace of Versailles' }
        ],
        included: ['Accommodation', 'Breakfast', 'Guided tours', 'Airport transfers'],
        excluded: ['Lunch and dinner', 'Travel insurance', 'Personal expenses'],
        rating: 4.8,
        reviewCount: 156,
        featured: true,
        available: true
      },
      {
        title: 'Bali Beach Paradise',
        description: 'Relax on pristine beaches, visit ancient temples, and experience Balinese culture. Perfect tropical getaway with water sports and spa treatments.',
        price: 950,
        duration: 6,
        location: 'Bali, Indonesia',
        category: createdCategories.find(c => c.name === 'Beach')._id,
        images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4'],
        maxGroupSize: 20,
        difficulty: 'easy',
        itinerary: [
          { day: 1, title: 'Beach Day', description: 'Relax at Seminyak Beach' },
          { day: 2, title: 'Temple Tour', description: 'Visit Tanah Lot and Uluwatu temples' },
          { day: 3, title: 'Water Activities', description: 'Snorkeling and diving adventure' }
        ],
        included: ['Hotel stay', 'Daily breakfast', 'Temple entrance fees', 'Airport pickup'],
        excluded: ['Flights', 'Personal expenses', 'Optional activities'],
        rating: 4.9,
        reviewCount: 203,
        featured: true,
        available: true
      },
      {
        title: 'Swiss Alps Adventure',
        description: 'Hiking, skiing, and mountain climbing in the breathtaking Swiss Alps. Experience stunning landscapes and charming alpine villages.',
        price: 1800,
        duration: 10,
        location: 'Swiss Alps, Switzerland',
        category: createdCategories.find(c => c.name === 'Adventure')._id,
        images: ['https://images.unsplash.com/photo-1531366936337-7c912a4589a7'],
        maxGroupSize: 12,
        difficulty: 'hard',
        itinerary: [
          { day: 1, title: 'Arrival Zurich', description: 'Meet the group and equipment check' },
          { day: 2, title: 'Matterhorn', description: 'Visit the iconic Matterhorn' },
          { day: 3, title: 'Mountain Hiking', description: 'Challenging alpine hike' }
        ],
        included: ['Accommodation', 'All meals', 'Equipment rental', 'Professional guide'],
        excluded: ['International flights', 'Travel insurance', 'Tips'],
        rating: 4.7,
        reviewCount: 89,
        featured: true,
        available: true
      },
      {
        title: 'Tokyo Family Tour',
        description: 'Family-friendly tour of Tokyo with visits to theme parks, kid-friendly museums, and traditional experiences. Perfect for all ages.',
        price: 1400,
        duration: 8,
        location: 'Tokyo, Japan',
        category: createdCategories.find(c => c.name === 'Family')._id,
        images: ['https://images.unsplash.com/photo-1540959733332-eab4deabeeaf'],
        maxGroupSize: 18,
        difficulty: 'easy',
        itinerary: [
          { day: 1, title: 'Tokyo Disneyland', description: 'Full day at Tokyo Disneyland' },
          { day: 2, title: 'Cultural Experience', description: 'Traditional tea ceremony and kimono wearing' },
          { day: 3, title: 'Technology & Anime', description: 'Visit Akihabara and teamLab Borderless' }
        ],
        included: ['Hotel accommodation', 'Daily breakfast', 'Theme park tickets', 'Local transport'],
        excluded: ['Flights', 'Lunch and dinner', 'Shopping'],
        rating: 4.6,
        reviewCount: 127,
        featured: false,
        available: true
      },
      {
        title: 'Maldives Honeymoon',
        description: 'Romantic overwater bungalow experience in the Maldives. Private beach dinners, couples spa, and crystal-clear waters.',
        price: 2500,
        duration: 5,
        location: 'Maldives',
        category: createdCategories.find(c => c.name === 'Honeymoon')._id,
        images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8'],
        maxGroupSize: 2,
        difficulty: 'easy',
        itinerary: [
          { day: 1, title: 'Arrival & Welcome', description: 'Seaplane transfer to resort' },
          { day: 2, title: 'Water Activities', description: 'Snorkeling and kayaking' },
          { day: 3, title: 'Spa & Relaxation', description: 'Couples spa treatment and beach dinner' }
        ],
        included: ['Overwater villa', 'All meals', 'Couples spa', 'Water sports', 'Airport transfers'],
        excluded: ['International flights', 'Alcoholic beverages', 'Extra activities'],
        rating: 5.0,
        reviewCount: 94,
        featured: true,
        available: true
      },
      {
        title: 'African Safari',
        description: 'Witness the Big Five in their natural habitat. Luxury safari lodge experience with expert guides in Kenya.',
        price: 3200,
        duration: 9,
        location: 'Masai Mara, Kenya',
        category: createdCategories.find(c => c.name === 'Wildlife')._id,
        images: ['https://images.unsplash.com/photo-1516426122078-c23e76319801'],
        maxGroupSize: 10,
        difficulty: 'medium',
        itinerary: [
          { day: 1, title: 'Arrival Nairobi', description: 'Transfer to Masai Mara' },
          { day: 2, title: 'Morning Safari', description: 'Early morning game drive' },
          { day: 3, title: 'Full Day Safari', description: 'All-day game viewing with picnic lunch' }
        ],
        included: ['Luxury lodge', 'All meals', 'Game drives', 'Professional guide', 'Park fees'],
        excluded: ['International flights', 'Visa fees', 'Tips', 'Drinks'],
        rating: 4.9,
        reviewCount: 67,
        featured: true,
        available: true
      }
    ];

    await Tour.insertMany(tours);
    console.log('✅ Tours created');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\nLogin Credentials:');
    console.log('==================');
    console.log('Admin:');
    console.log('  Email: admin@travelhub.com');
    console.log('  Password: admin123');
    console.log('\nRegular User:');
    console.log('  Email: john@example.com');
    console.log('  Password: password123');
    console.log('\n✨ You can now start the application!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
