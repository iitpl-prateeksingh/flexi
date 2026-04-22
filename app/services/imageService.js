import API from "./api";

const getMediaBaseUrl = () => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    if (!base) return "";

    // Common pattern: API base ends with `/api`, while media is served above it.
    // Example: `https://example.com/flexi/api` -> `https://example.com/flexi`
    try {
        const url = new URL(base);
        url.pathname = url.pathname.replace(/\/api\/?$/, "/");
        return url.toString().replace(/\/$/, "");
    } catch {
        return base.replace(/\/api\/?$/, "").replace(/\/$/, "");
    }
};

const normalizeMediaUrl = (rawUrl) => {
    if (!rawUrl || typeof rawUrl !== "string") return rawUrl;

    // Already absolute (http(s), blob, data, etc.)
    if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(rawUrl)) return rawUrl;

    const mediaBaseUrl = getMediaBaseUrl();
    if (!mediaBaseUrl) return rawUrl;

    const normalizedPath = rawUrl.replace(/\\/g, "/");

    // If backend accidentally returns a filesystem path, try to recover an `/uploads/...` path.
    const uploadsIdx = normalizedPath.lastIndexOf("/uploads/");
    if (uploadsIdx >= 0) {
        const uploadsPath = normalizedPath.slice(uploadsIdx); // includes leading `/uploads/`
        return `${mediaBaseUrl}${uploadsPath}`;
    }

    if (normalizedPath.startsWith("/")) {
        return `${mediaBaseUrl}${normalizedPath}`;
    }

    return `${mediaBaseUrl}/${normalizedPath}`;
};

export const uploadImageService = (file) => {
    console.log("Uploading image:", file);
    if (!file) return Promise.reject(new Error("No file provided"));

    const postWithFieldName = (fieldName) => {
        const formData = new FormData();
        formData.append(fieldName, file);
        console.log(`FormData prepared (field: ${fieldName}):`, formData);

        // Don't manually set `Content-Type` for FormData; let axios/browser add the boundary.
        return API.post("/upload/image", formData);
    };

    return postWithFieldName("image")
        .catch(() => postWithFieldName("file"))
        .then((payload) => {
            // `API` response interceptor returns `response.data`, so `payload` is typically the JSON body.
            const rawUrl =
                payload?.url ??
                payload?.data?.url ??
                (typeof payload === "string" ? payload : null);

            const normalizedUrl =
                typeof rawUrl === "string" ? normalizeMediaUrl(rawUrl) : rawUrl;

            const data =
                payload && typeof payload === "object"
                    ? { ...payload, ...(normalizedUrl ? { url: normalizedUrl } : {}) }
                    : normalizedUrl
                        ? { url: normalizedUrl }
                        : { url: rawUrl };

            // Many call-sites expect axios-like shape: `res.data.url`
            return { data };
        });
};
