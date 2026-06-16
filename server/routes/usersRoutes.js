import { Router } from 'express';
import {
  createUserController,
  deleteUserController,
  getUser,
  getUsers,
  updateUserController,
} from '../controllers/usersController.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware, isAdmin);
router.get('/', getUsers);
router.post('/', createUserController);
router.get('/:id', getUser);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);

export default router;
