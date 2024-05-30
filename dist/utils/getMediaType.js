"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMediaType = void 0;
const getMediaType = (fileType) => {
    if (fileType.startsWith('image/'))
        return 'image';
    if (fileType.startsWith('video/'))
        return 'video';
    if (fileType.startsWith('audio/'))
        return 'audio';
    if (fileType === 'text/plain' || fileType === 'application/pdf' || fileType.startsWith('application/'))
        return 'text';
    return 'unknown';
};
exports.getMediaType = getMediaType;
