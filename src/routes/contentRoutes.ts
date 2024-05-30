import { Router } from 'express';
import { createContent, getContents, searchByTitle, updateContent, deleteContent, getContentByTopic } from "./../controllers/ContentControllers"
import { authMiddleware, permitRoles } from '../middleware/authMiddleware';
import { sendAttachment } from '../middleware/attachmentMiddleware';
import { Content } from '../models/Content';

const router = Router();

router.post('/', authMiddleware, permitRoles('creador', 'admin'), createContent);
router.put('/:id', authMiddleware, permitRoles('creador', 'admin'), updateContent);
router.delete('/:id', authMiddleware, permitRoles('admin'), deleteContent);
router.get('/', getContents);
router.get('/searchByTitle', searchByTitle);
router.get('/topic/:topicId', getContentByTopic);
router.get('/:id/download', (req, res, next)=>{sendAttachment(req, res, next, Content)});

export default router;