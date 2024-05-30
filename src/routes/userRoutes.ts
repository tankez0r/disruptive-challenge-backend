import { Router } from 'express';
import { createUser, getUserWithContents, loginUser } from '../controllers/UserControllers';

const router = Router();

router.post('/', createUser); 
router.post('/login', loginUser);
router.get('/:userId/contents', getUserWithContents);


export default router;