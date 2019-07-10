import express from 'express';
import Trips from '../controllers/tripController';
import auth from '../middleware/auth';

const router = express.Router();

// trips Routes

router.post('/', auth.verifyToken, Trips.createTrip);
router.get('/', auth.verifyToken, Trips.getAllTrips);
router.patch('/', auth.verifyToken, Trips.cancelTrip);

export default router;