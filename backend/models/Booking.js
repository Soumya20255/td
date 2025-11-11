import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: true
  },
  guestName: {
    type: String,
    required: [true, 'Guest name is required']
  },
  guestEmail: {
    type: String,
    required: [true, 'Guest email is required']
  },
  guestPhone: {
    type: String,
    required: [true, 'Guest phone is required']
  },
  numberOfGuests: {
    type: Number,
    required: [true, 'Number of guests is required'],
    min: 1
  },
  bookingDate: {
    type: Date,
    required: [true, 'Booking date is required']
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  specialRequests: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('Booking', bookingSchema);
