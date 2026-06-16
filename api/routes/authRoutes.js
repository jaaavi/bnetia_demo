import { Router } from 'express';
import { login, me, resetPassword } from '../controllers/authController.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/login', login);
router.get('/me', authMiddleware, me);
router.put('/reset-password/:id', authMiddleware, isAdmin, resetPassword);

export default router;
