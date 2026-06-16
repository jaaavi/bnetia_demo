import { Router } from 'express';
import { bootstrap, reset } from '../controllers/demoController.js';

const router = Router();

router.get('/bootstrap', bootstrap);
router.post('/reset', reset);

export default router;
