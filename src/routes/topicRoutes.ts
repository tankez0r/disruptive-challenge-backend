import { Router } from 'express';
import { createTopic, deleteTopic, getTopics, searchTopic, updateTopic } from '../controllers/TopicController';
import { authMiddleware, permitRoles } from '../middleware/authMiddleware';
import { sendAttachment } from '../middleware/attachmentMiddleware';
import { Topic } from '../models/Topic';

const router = Router();

router.post('/', authMiddleware, permitRoles('admin'), createTopic);
router.get('/', authMiddleware, getTopics);
router.get('/search', searchTopic)
router.put('/:id', authMiddleware, permitRoles('admin'), updateTopic);
router.delete('/:id', authMiddleware, permitRoles('admin'), deleteTopic);
router.get('/:id/download', (req, res, next) => { sendAttachment(req, res, next, Topic) });


export default router;