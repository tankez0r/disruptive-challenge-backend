"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    password: {
        type: String,
        required: true
    },
    contents: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Content'
        }],
    role: {
        type: String,
        required: true,
        enum: ['admin', 'lector', 'creador']
    }
}, { collection: 'users' });
exports.User = (0, mongoose_1.model)('User', userSchema);
