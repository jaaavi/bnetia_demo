import { Router } from 'express';
import {
  getConfig,
  getStatus,
  processIncomingMessage,
  saveConfig,
  startSession,
  stopSession,
} from '../controllers/whatsappController.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);
router.get('/admin/config', isAdmin, getConfig);
router.post('/admin/config', isAdmin, saveConfig);
router.get('/admin/baileys/status', isAdmin, getStatus);
router.post('/admin/baileys/start', isAdmin, startSession);
router.post('/admin/baileys/stop', isAdmin, stopSession);
router.post('/demo/process-message', isAdmin, processIncomingMessage);

export default router;
