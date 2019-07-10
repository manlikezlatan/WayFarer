import express from 'express';
import Admin from '../controllers/adminController';
import auth from '../middleware/auth';

const router = express.Router();

// Admin Routes
router.post('/', auth.verifyToken, Admin.createAdmin);
router.put('/', auth.verifyToken, Admin.updateUserToAdmin);

export default router;