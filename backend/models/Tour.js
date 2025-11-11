import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Tour title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Tour description is required']
  },
  price: {
    type: Number,
    required: [true, 'Tour price is required'],
    min: 0
  },
  duration: {
    type: Number,
    required: [true, 'Tour duration is required'],
    min: 1
  },
  location: {
    type: String,
    required: [true, 'Tour location is required']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  images: [{
    type: String
  }],
  maxGroupSize: {
    type: Number,
    required: [true, 'Max group size is required'],
    min: 1
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  itinerary: [{
    day: Number,
    title: String,
    description: String
  }],
  included: [{
    type: String
  }],
  excluded: [{
    type: String
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search functionality
tourSchema.index({ title: 'text', location: 'text', description: 'text' });

export default mongoose.model('Tour', tourSchema);
