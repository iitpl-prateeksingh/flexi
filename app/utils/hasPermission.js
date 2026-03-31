// utils/permission.js

export const hasPermission = (permission) => {
    if (typeof window === "undefined") return false;

    const stored = localStorage.getItem("permissions");
    if (!stored) return false;

    console.log("Stored Permissions:", stored);
    const permissions = JSON.parse(stored);

    // ✅ SUPER ADMIN (has everything)
    if (permissions.includes("*")) return true;

    return permissions.includes(permission);
};