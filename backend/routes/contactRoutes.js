import express from 'express';
import {
  createContact,
  getAllContacts,
  updateContactStatus,
  deleteContact
} from '../controllers/contactController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(createContact)
  .get(protect, admin, getAllContacts);

router.route('/:id')
  .put(protect, admin, updateContactStatus)
  .delete(protect, admin, deleteContact);

export default router;
