"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentByTopic = exports.searchByTitle = exports.getContents = exports.deleteContent = exports.updateContent = exports.createContent = void 0;
const Content_1 = require("../models/Content");
const User_1 = require("../models/User");
const Topic_1 = require("../models/Topic");
const mongoose_1 = __importDefault(require("mongoose"));
const getMediaType_1 = require("../utils/getMediaType");
const createContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { topicName, fileType, fileName, fileContent, title } = req.body;
    const { userId, username, role } = req.body.user;
    try {
        const topic = yield Topic_1.Topic.findOne({ name: topicName });
        if (!topic) {
            return res.status(400).json({ message: 'Tematica no encontrada' });
        }
        if (role !== 'admin' && role !== 'creador') {
            return res.status(403).json({ message: 'Acceso denegado' });
        }
        const fileBuffer = Buffer.from(fileContent, "base64");
        const mediaType = (0, getMediaType_1.getMediaType)(fileType);
        const content = new Content_1.Content({
            topic: topic._id, fileContent: fileBuffer, author: userId,
            authorName: username, title: title, fileName, fileType, mediaType: mediaType
        });
        yield content.save();
        topic.contents.push(content._id);
        yield topic.save();
        const user = yield User_1.User.findById(userId);
        if (user) {
            user.contents.push(content._id);
            yield user.save();
        }
        res.status(201).json({ title: content.title, createdAt: content.createdAt, mediaType: content.mediaType, author: content.authorName, fileName: content.fileName });
    }
    catch (error) {
        next(error);
    }
});
exports.createContent = createContent;
const updateContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { topicName, fileType, fileName, title, fileContent } = req.body;
    const { userId, role } = req.body.user;
    try {
        const topic = yield Topic_1.Topic.findOne({ name: topicName });
        if (!topic) {
            return res.status(400).json({ message: 'Tematica no encontrada' });
        }
        const content = yield Content_1.Content.findById(id);
        if (!content) {
            return res.status(404).json({ message: 'contenido no encontrado' });
        }
        if (content.author.toString() !== userId && role !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado' });
        }
        const fileBuffer = Buffer.from(fileContent, "base64");
        const mediaType = (0, getMediaType_1.getMediaType)(fileType);
        content.topic = topic._id;
        content.fileContent = fileBuffer;
        content.title = title;
        content.fileName = fileName;
        content.fileType = fileType;
        content.mediaType = mediaType;
        yield content.save();
        res.status(200).json(content);
    }
    catch (error) {
        next(error);
    }
});
exports.updateContent = updateContent;
const deleteContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { role } = req.body.user;
    try {
        const content = yield Content_1.Content.findById(id);
        if (!content) {
            return res.status(404).json({ message: 'Contenido no encontrado' });
        }
        if (role !== 'admin') {
            return res.status(403).json({ message: 'No posee los permisos correspondientes.' });
        }
        yield content.deleteOne();
        res.status(200).json({ message: 'Contenido eliminado' });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteContent = deleteContent;
const getContents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contents = yield Content_1.Content.find().sort({ createdAt: -1 }).select(["-fileContent", "-fileName", "-fileType"]);
        res.status(200).json(contents);
    }
    catch (error) {
        next(error);
    }
});
exports.getContents = getContents;
const searchByTitle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    try {
        const regexQuery = new RegExp(query, 'i');
        const contents = yield Content_1.Content.find({ title: regexQuery }).select(["-fileContent", "-fileName", "-fileType"]).exec();
        res.status(200).json(contents);
    }
    catch (error) {
        next(error);
    }
});
exports.searchByTitle = searchByTitle;
const getContentByTopic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { topicId } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(topicId)) {
        return res.status(400).json({ message: 'Invalid topic ID' });
    }
    try {
        const topic = yield Topic_1.Topic.findById(topicId);
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }
        const contents = yield Content_1.Content.find({ topic: topic._id }).select(["-fileContent", "-fileName", "-fileType"]);
        res.status(200).json(contents);
    }
    catch (error) {
        next(error);
    }
});
exports.getContentByTopic = getContentByTopic;
