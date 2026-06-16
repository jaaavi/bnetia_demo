import { Router } from 'express';
import { processIncomingMessage } from '../controllers/whatsappController.js';
import { getPendingOrders } from '../controllers/ordersController.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware, isAdmin);
router.get('/pending', getPendingOrders);
router.post('/parse', processIncomingMessage);

export default router;
