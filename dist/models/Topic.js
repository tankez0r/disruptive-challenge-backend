"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topic = void 0;
const mongoose_1 = require("mongoose");
const topicSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    fileContent: {
        type: Buffer,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    contents: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Content'
        }]
}, { collection: 'topics' });
exports.Topic = (0, mongoose_1.model)('Topic', topicSchema);
