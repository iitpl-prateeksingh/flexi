"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import { updateInsightContentApi } from "../../services/insightService";
import { hasPermission } from "../../utils/hasPermission"

export default function InsightForm({ data, refresh }) {
    const [isEditing, setIsEditing] = useState(false);

    const [heading, setHeading] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setHeading(data?.heading || "");
        setDescription(data?.description || "");
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateInsightContentApi({ heading, description });
            toast.success("Updated successfully");
            setIsEditing(false);
            refresh();
        } catch {
            toast.error("Update failed");
        }
    };

    const handleCancel = () => {
        setHeading(data?.heading || "");
        setDescription(data?.description || "");
        setIsEditing(false);
    };

    return (
        <div className="border-gray-200">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Insight Content
                    </h2>
                    <p className="text-sm text-gray-500">
                        Manage heading and description
                    </p>
                </div>

                {!isEditing && hasPermission("update_insight") && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition active:scale-95"
                    >
                        <Pencil size={16} />
                        Edit
                    </button>
                )}
            </div>

            {/* VIEW MODE */}
            {!isEditing ? (
                <div className="space-y-5">

                    {/* Heading */}
                    <div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                        <p className="text-xs text-gray-500 mb-1">Heading</p>
                        <p className="text-base font-medium text-gray-800">
                            {heading || "—"}
                        </p>
                    </div>

                    {/* Description */}
                    <div className="p-4 rounded-lg border border-gray-200  bg-gray-50">
                        <p className="text-xs text-gray-500 mb-1">Description</p>
                        <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                            {description || "—"}
                        </p>
                    </div>

                </div>
            ) : (
                /* EDIT MODE */
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Heading */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Heading
                        </label>
                        <input
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                            placeholder="Enter heading"
                            className="w-full mt-1 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none p-3 rounded-lg text-sm"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description"
                            rows={4}
                            className="w-full mt-1 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none p-3 rounded-lg text-sm resize-none"
                        />
                    </div>

                    {/* ACTIONS */}
                    <div className="flex justify-end gap-3 pt-2">

                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
                        >
                            Update
                        </button>

                    </div>

                </form>
            )}
        </div>
    );
}