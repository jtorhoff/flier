
export const readableFileSize = (bytes: number) => {
    if (bytes < 1024) {
        return bytes + " B";
    }

    const postfixes = ["KB", "MB", "GB", "TB", "PB"];
    const exp = (Math.log(bytes) / Math.log(1024)) | 0;
    const size = (bytes / (1024 ** exp)).toFixed(exp - 1);

    return `${size} ${postfixes[exp - 1]}`;
};