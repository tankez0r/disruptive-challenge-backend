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
Object.defineProperty(exports, "__esModule", { value: true });
exports.permitRoles = exports.authMiddleware = void 0;
const jose_1 = require("jose");
require("dotenv/config");
const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        return next(res.status(401).json({ message: 'Acceso denegado, no hay token de seguridad provisto.' }));
    }
    try {
        const { payload } = yield (0, jose_1.compactVerify)(token, secretKey);
        const user = JSON.parse(new TextDecoder().decode(payload));
        req.body.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.authMiddleware = authMiddleware;
const permitRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.body.user.role)) {
            return res.status(403).json({ message: 'Acceso denegado, no cuenta con los permisos correspondientes.' });
        }
        next();
    };
};
exports.permitRoles = permitRoles;
