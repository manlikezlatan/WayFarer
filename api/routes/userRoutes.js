import express from 'express';
import Users from '../controllers/userController';

const router = express.Router();

// Users Routes
router.post('/', Users.signup);

export default router;