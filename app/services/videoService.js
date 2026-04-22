import API from "./api";

const getMediaBaseUrl = () => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    if (!base) return "";

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
    if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(rawUrl)) return rawUrl;

    const mediaBaseUrl = getMediaBaseUrl();
    if (!mediaBaseUrl) return rawUrl;

    const normalizedPath = rawUrl.replace(/\\/g, "/");
    const uploadsIdx = normalizedPath.lastIndexOf("/uploads/");
    if (uploadsIdx >= 0) {
        const uploadsPath = normalizedPath.slice(uploadsIdx);
        return `${mediaBaseUrl}${uploadsPath}`;
    }

    if (normalizedPath.startsWith("/")) return `${mediaBaseUrl}${normalizedPath}`;
    return `${mediaBaseUrl}/${normalizedPath}`;
};

export const uploadVideoService = (file) => {
    const formData = new FormData();
    formData.append("video", file);

    // Don't manually set `Content-Type` for FormData; let axios/browser add the boundary.
    return API.post("/upload/video", formData).then((payload) => {
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

        return { data };
    });
};
