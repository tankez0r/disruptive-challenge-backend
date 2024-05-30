"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
const mongoose_1 = require("mongoose");
const contentSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    mediaType: {
        type: String,
        required: true
    },
    topic: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileContent: {
        type: Buffer,
        required: true
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    authorName: {
        type: String,
        required: true
    }
}, {
    collection: 'contents',
    timestamps: true
});
exports.Content = (0, mongoose_1.model)('Content', contentSchema);
