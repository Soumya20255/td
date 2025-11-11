import express from 'express';
import {
  createBooking,
  getUserBookings,
  getAllBookings,
  getBooking,
  updateBookingStatus,
  deleteBooking
} from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, createBooking)
  .get(protect, admin, getAllBookings);

router.get('/user', protect, getUserBookings);

router.route('/:id')
  .get(protect, getBooking)
  .put(protect, admin, updateBookingStatus)
  .delete(protect, admin, deleteBooking);

export default router;
