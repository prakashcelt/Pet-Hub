import express from 'express';
import { authenticateToken } from '../middlewares/jwt.js';
import { getBookingsByCustomerId } from '../controller/bookingsController.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getBookingsByCustomerId);

export default router;

