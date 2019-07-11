import express from 'express';

import Bookings from '../controllers/bookingController';
import auth from '../middleware/auth';

const router = express.Router();

// Routes for bookings
router.post('/', auth.verifyToken, Bookings.createBooking);
router.get('/', auth.verifyToken, Bookings.getAllBookings);

export default router;