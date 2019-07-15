import express from 'express';
import Buses from '../controllers/busController';
import auth from '../middleware/auth';

const router = express.Router();

// Routes for buses
router.post('/buses', auth.verifyToken, Buses.addBusDetails);
router.get('/buses', auth.verifyToken, Buses.getAllBuses);

export default router;
