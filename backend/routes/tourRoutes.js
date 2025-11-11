import express from 'express';
import {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour
} from '../controllers/tourController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getTours)
  .post(protect, admin, createTour);

router.route('/:id')
  .get(getTour)
  .put(protect, admin, updateTour)
  .delete(protect, admin, deleteTour);

export default router;
