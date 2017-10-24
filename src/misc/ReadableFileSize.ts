
export const readableFileSize = (bytes: number) => {
    if (bytes < 1000) {
        return bytes;
    }

    const postfixes = ["KB", "MB", "GB", "TB", "PB"];
    const exp = Math.log(bytes) / Math.log(1000) | 0;
    const size = (bytes / (1000 ** exp)).toFixed(exp - 1);

    return `${size} ${postfixes[exp - 1]}`;
};