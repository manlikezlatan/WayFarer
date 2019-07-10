import express from 'express';
import Buses from '../controllers/busController';
import auth from '../middleware/auth';

const router = express.Router();

//Routes for buses
router.post('/', auth, addBusDetails);
router.get('/', auth, getAllBuses);

export default router;