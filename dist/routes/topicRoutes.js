"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TopicController_1 = require("../controllers/TopicController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const attachmentMiddleware_1 = require("../middleware/attachmentMiddleware");
const Topic_1 = require("../models/Topic");
const router = (0, express_1.Router)();
router.post('/', authMiddleware_1.authMiddleware, (0, authMiddleware_1.permitRoles)('admin'), TopicController_1.createTopic);
router.get('/', authMiddleware_1.authMiddleware, TopicController_1.getTopics);
router.get('/search', TopicController_1.searchTopic);
router.put('/:id', authMiddleware_1.authMiddleware, (0, authMiddleware_1.permitRoles)('admin'), TopicController_1.updateTopic);
router.delete('/:id', authMiddleware_1.authMiddleware, (0, authMiddleware_1.permitRoles)('admin'), TopicController_1.deleteTopic);
router.get('/:id/download', (req, res, next) => { (0, attachmentMiddleware_1.sendAttachment)(req, res, next, Topic_1.Topic); });
exports.default = router;
