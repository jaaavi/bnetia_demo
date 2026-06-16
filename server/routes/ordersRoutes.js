import { Router } from 'express';
import {
  confirmOrder,
  createOrderController,
  deleteOrder,
  getAllOrders,
  getOrder,
  getOrders,
  getPendingOrders,
  rejectOrder,
  updateOrderController,
} from '../controllers/ordersController.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);
router.get('/pending-validation', isAdmin, getPendingOrders);
router.put('/:id/confirm', isAdmin, confirmOrder);
router.put('/:id/reject', isAdmin, rejectOrder);
router.get('/admin', isAdmin, getAllOrders);
router.get('/', getOrders);
router.post('/', createOrderController);
router.get('/:id', getOrder);
router.put('/:id', updateOrderController);
router.delete('/:id', deleteOrder);

export default router;
