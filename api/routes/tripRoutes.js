import express from 'express';
import Trips from '../controllers/tripController';
import auth from '../middleware/auth';

const router = express.Router();

// trips Routes
router.post('/trips', auth.verifyToken, Trips.createTrip);
router.get('/trips', auth.verifyToken, Trips.getAllTrips);
router.patch('/trips/:tripId', auth.verifyToken, Trips.cancelTrip);
router.get('/trips/origin', auth.verifyToken, Trips.filterByOrigin);
router.get('/trips/destination', auth.verifyToken, Trips.filterByDestination);

export default router;
