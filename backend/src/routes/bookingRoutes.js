import express from 'express';
import {
  createBooking,
  getBookingByReference,
} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/:reference', getBookingByReference);

export default router;
