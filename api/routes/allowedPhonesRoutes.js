import { Router } from 'express';
import {
  addAllowedPhone,
  deleteAllowedPhone,
  getAllowedPhones,
  toggleAllowedPhone,
  updateAllowedPhone,
} from '../controllers/allowedPhonesController.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware, isAdmin);
router.get('/phones', getAllowedPhones);
router.post('/phones', addAllowedPhone);
router.put('/phones/:id', updateAllowedPhone);
router.patch('/phones/:id/toggle', toggleAllowedPhone);
router.delete('/phones/:id', deleteAllowedPhone);

export default router;
