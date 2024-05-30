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
exports.sendAttachment = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sendAttachment = (req, res, next, model) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let modelQuery = yield model.findById(id).exec();
        if (!modelQuery) {
            return res.status(404).json({ message: 'Content not found' });
        }
        console.log(modelQuery);
        const outputFilePath = path_1.default.join(__dirname, 'uploads', modelQuery.fileName);
        fs_1.default.mkdirSync(path_1.default.dirname(outputFilePath), { recursive: true });
        fs_1.default.writeFileSync(outputFilePath, modelQuery.fileContent);
        res.setHeader('Content-Disposition', `attachment; filename="${modelQuery.fileName}"`);
        res.setHeader('Content-Type', modelQuery.fileType);
        res.send(modelQuery.fileContent);
        fs_1.default.rm(path_1.default.join(__dirname, "uploads"), { recursive: true }, () => { console.log("carpeta upload borrado"); });
    }
    catch (error) {
        next(error);
    }
    finally {
    }
});
exports.sendAttachment = sendAttachment;
