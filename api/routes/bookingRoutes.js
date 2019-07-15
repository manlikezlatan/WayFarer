import express from 'express';

import Bookings from '../controllers/bookingController';
import auth from '../middleware/auth';

const router = express.Router();

// Routes for bookings
router.post('/bookings', auth.verifyToken, Bookings.createBooking);
router.get('/bookings', auth.verifyToken, Bookings.getAllBookings);
router.delete('/bookings/:bookingId', auth.verifyToken, Bookings.deleteBooking);

export default router;
