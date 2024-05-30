"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const port = process.env.PORT;
const DBURI = process.env.MONGODB_URL;
const serverConection = (app) => {
    mongoose_1.default.connect(DBURI).then(() => {
        console.log('Conectado a base de datos MONGODB');
        app.listen(port, () => {
            console.log(`Server corriendo en: http://localhost:${port}`);
        });
    }).catch(error => {
        console.error('Error conexion en base de datos:', error);
    });
};
exports.default = serverConection;
