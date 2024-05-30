"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserControllers_1 = require("../controllers/UserControllers");
const router = (0, express_1.Router)();
router.post('/', UserControllers_1.createUser);
router.post('/login', UserControllers_1.loginUser);
router.get('/:userId/contents', UserControllers_1.getUserWithContents);
exports.default = router;
