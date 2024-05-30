export const getMediaType = (fileType: string): string => {
    if (fileType.startsWith('image/')) return 'image';
    if (fileType.startsWith('video/')) return 'video';
    if (fileType.startsWith('audio/')) return 'audio';
    if (fileType === 'text/plain' || fileType === 'application/pdf' || fileType.startsWith('application/')) return 'text';
    return 'unknown';
  };