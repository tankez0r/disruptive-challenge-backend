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
exports.deleteTopic = exports.updateTopic = exports.searchTopic = exports.getTopics = exports.createTopic = void 0;
const Topic_1 = require("../models/Topic");
const mongoose_1 = __importDefault(require("mongoose"));
const Content_1 = require("../models/Content");
const createTopic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, fileName, fileType, fileContent } = req.body;
    const fileBuffer = Buffer.from(fileContent, "base64");
    try {
        const topic = new Topic_1.Topic({ name, fileName, fileType, contents: [], imageContent: fileBuffer });
        yield topic.save();
        res.status(201).json(topic);
    }
    catch (error) {
        next(error);
    }
});
exports.createTopic = createTopic;
const getTopics = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topics = yield Topic_1.Topic.find();
        res.status(200).json(topics);
    }
    catch (error) {
        next(error);
    }
});
exports.getTopics = getTopics;
const searchTopic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    try {
        const regexQuery = new RegExp(query, 'i');
        const contents = yield Topic_1.Topic.find({ name: regexQuery }).exec();
        res.status(200).json(contents);
    }
    catch (error) {
        next(error);
    }
});
exports.searchTopic = searchTopic;
const updateTopic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, fileName, fileType, fileContent } = req.body;
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid topic ID' });
    }
    try {
        const topic = yield Topic_1.Topic.findById(id);
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }
        topic.name = name || topic.name;
        if (fileContent) {
            topic.fileContent = fileContent;
            topic.fileType = fileType;
            topic.fileName = fileName;
        }
        yield topic.save();
        res.status(200).json(topic);
    }
    catch (error) {
        next(error);
    }
});
exports.updateTopic = updateTopic;
const deleteTopic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid topic ID' });
    }
    try {
        const topic = yield Topic_1.Topic.findById(id);
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }
        yield Content_1.Content.deleteMany({ topic: topic._id });
        yield topic.deleteOne();
        res.status(200).json({ message: 'Topic and associated contents deleted' });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTopic = deleteTopic;
