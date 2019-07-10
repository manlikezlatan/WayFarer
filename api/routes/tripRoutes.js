import express from 'express';
import Trips from '../controllers/tripController';
import auth from '../middleware/auth';

const router = express.Router();

// trips Routes
router.post('/', auth.verifyToken, Trips.createTrip);
router.patch('/', auth.verifyToken, Trips.cancelTrip);
router.get('/', auth.verifyToken, Trips.getAllTrips);

export default router;