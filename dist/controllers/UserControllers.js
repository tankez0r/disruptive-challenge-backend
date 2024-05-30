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
exports.getUserWithContents = exports.loginUser = exports.createUser = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jose_1 = require("jose");
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const Content_1 = require("../models/Content");
const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, role } = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = new User_1.User({ username, email, password: hashedPassword, role, contents: [] });
        yield user.save();
        res.status(201).json(user);
    }
    catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Usuario o correo ya existentes' });
        }
        else {
            next(error);
        }
    }
});
exports.createUser = createUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Correo o contraseña invalida' });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Correo o contraseña invalida' });
        }
        const token = yield new jose_1.CompactSign(new TextEncoder()
            .encode(JSON.stringify({ userId: user._id, role: user.role, username: user.username })))
            .setProtectedHeader({ alg: "HS256" }).sign(secretKey);
        res.status(200).json({ token });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
const getUserWithContents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    try {
        const user = yield User_1.User.findById(userId).select('username email').lean();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const contents = yield Content_1.Content.find({ author: userId }).select('-file').lean();
        res.status(200).json({ user, contents });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserWithContents = getUserWithContents;
