const isInvalidFileSize = (file: File, maxSize = 950) => file[0].size / 1024 > maxSize;

export { isInvalidFileSize };
