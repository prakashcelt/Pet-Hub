import express from 'express';
import { signup, signin, logout } from '../controller/authController.js';
import { authenticateToken } from '../middlewares/jwt.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout', logout);

// Dummy protected route
router.get('/protected', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
});

export default router;
