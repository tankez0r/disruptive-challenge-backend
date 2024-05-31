import { Router } from 'express';
import { createUser, getUserInfo, getUserWithContents, loginUser } from '../controllers/UserControllers';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/:userId/contents', getUserWithContents);
router.get('/', authMiddleware, getUserInfo)


export default router;