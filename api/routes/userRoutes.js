import express from 'express';
import Users from '../controllers/userController';

const router = express.Router();

// Users Routes
router.post('/auth/signup', Users.signup);
router.post('/auth/signin', Users.signin);

// Admin Routes
router.post('/admin/signup', Users.AdminSignup);

export default router;
