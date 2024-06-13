export function getFileExtension(url) {
    try {
        const parsedUrl = new URL(url);
        const pathname = parsedUrl.pathname;

        const extension = pathname.split('.').pop();
        if (extension.includes('/')) {
            return null;
        }

        return extension;
    } catch (error) {
        console.error("Invalid URL", error);
        return null;
    }
}