"use client";

import { useEffect, useState } from "react";
import {
    getPermissionsService,
    updatePermissionsService
} from "../../../services/permissionService";
import toast from "react-hot-toast";

export default function ContentAdminPermissions() {

    const ROLE = "CONTENT_ADMIN";

    const [permissions, setPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPermissions();
    }, []);

    const fetchPermissions = async () => {
        try {
            setLoading(true);

            const res = await getPermissionsService(ROLE);
            const apiData = res?.data || [];

            setPermissions(apiData);

            const selected = apiData
                .filter(p => p.assigned)
                .map(p => p.value);

            setSelectedPermissions(selected);

        } catch (err) {
            console.error("Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const togglePermission = (perm) => {
        setSelectedPermissions(prev =>
            prev.includes(perm)
                ? prev.filter(p => p !== perm)
                : [...prev, perm]
        );
    };

    const groupPermissions = () => {
        if (!permissions?.length) return {};

        const groups = {};

        permissions.forEach((perm) => {
            const parts = perm.value.split("_");
            const key = parts[1] || "other";

            if (!groups[key]) groups[key] = [];
            groups[key].push(perm.value);
        });

        return groups;
    };

    const permissionGroups = groupPermissions();

    const toggleGroup = (perms) => {
        const allSelected = perms.every(p =>
            selectedPermissions.includes(p)
        );

        if (allSelected) {
            setSelectedPermissions(prev =>
                prev.filter(p => !perms.includes(p))
            );
        } else {
            setSelectedPermissions(prev =>
                [...new Set([...prev, ...perms])]
            );
        }
    };

    const handleSave = async () => {
        try {
            setLoading(true);

            const res = await updatePermissionsService({
                role: ROLE,
                permissions: selectedPermissions
            });

            toast.success(res.message || "Updated successfully");

        } catch (err) {
            console.error("Save Error:", err);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (loading && permissions.length === 0) {
        return <div className="p-10">Loading permissions...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-10">

            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold mb-6">
                    Content Admin Permissions
                </h1>

                <div className="space-y-6">

                    {Object.entries(permissionGroups).map(([module, perms]) => {

                        const groupSelected = perms.every(p =>
                            selectedPermissions.includes(p)
                        );

                        return (
                            <div key={module} className="bg-white p-6 rounded-xl shadow">

                                <div className="flex justify-between mb-4">
                                    <h2 className="capitalize font-semibold text-lg">
                                        {module}
                                    </h2>

                                    {perms.length > 1 && (
                                        <button
                                            onClick={() => toggleGroup(perms)}
                                            className="text-blue-600 text-sm"
                                        >
                                            {groupSelected ? "Deselect All" : "Select All"}
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                                    {[...perms]
                                        .sort((a, b) => {
                                            const order = ["create", "view", "read", "update", "delete"];

                                            const getPriority = (perm) => {
                                                const action = perm.split("_")[0];
                                                return order.indexOf(action);
                                            };

                                            return getPriority(a) - getPriority(b);
                                        })
                                        .map((perm) => (
                                            <label
                                                key={perm}
                                                className="flex items-center gap-2 border border-zinc-200 p-3 rounded-lg cursor-pointer hover:bg-gray-50"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedPermissions.includes(perm)}
                                                    onChange={() => togglePermission(perm)}
                                                />

                                                <span className="text-sm">
                                                    {perm
                                                        .replaceAll("_", " ")
                                                        .replace(/\b\w/g, (char) => char.toUpperCase())
                                                    }
                                                </span>
                                            </label>
                                        ))}

                                </div>

                            </div>
                        );
                    })}

                </div>

                <div className="mt-10 flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Save Permissions"}
                    </button>
                </div>

            </div>

        </div>
    );
}