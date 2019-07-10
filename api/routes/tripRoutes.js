import express from 'express';
import Trips from '../controllers/tripController';
import auth from '../middleware/auth';

const router = express.Router();

// trips Routes
router.post('/', auth.verifyToken, Trips.createTrip);

export default router;