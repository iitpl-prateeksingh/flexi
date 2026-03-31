"use client";

import { useState } from "react";
import { hasPermission } from "../../utils/hasPermission";

export default function InsightTable({ list, onEdit, onDelete }) {
    const [previewImage, setPreviewImage] = useState(null);

    // ✅ Single source of truth
    const canShowActions =
        hasPermission("update_insight") || hasPermission("delete_insight");

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">

            <div className="overflow-x-auto">
                <table className="w-full text-md">

                    {/* HEADER */}
                    <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4 text-center">S.no</th>
                            <th className="px-6 py-4 text-center">Title</th>
                            <th className="px-6 py-4 text-center">Detail</th>
                            <th className="px-6 py-4 text-center">Image</th>

                            {canShowActions && (
                                <th className="px-6 py-4 text-center">Actions</th>
                            )}
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody className="divide-y divide-gray-200">

                        {list?.length === 0 && (
                            <tr>
                                <td
                                    colSpan={canShowActions ? 5 : 4}
                                    className="text-center py-10 text-gray-500"
                                >
                                    No insight items found
                                </td>
                            </tr>
                        )}

                        {list?.map((item, index) => (
                            <tr
                                key={item._id}
                                className="hover:bg-gray-50 transition duration-200"
                            >
                                {/* S.NO */}
                                <td className="px-6 py-4 text-center text-gray-500 font-medium">
                                    {index + 1}
                                </td>

                                {/* TITLE */}
                                <td className="px-6 py-4 text-center font-medium text-gray-800">
                                    {item.title}
                                </td>

                                {/* DETAIL */}
                                <td className="px-6 py-4 text-center text-gray-600 max-w-xs">
                                    <p className="line-clamp-2">
                                        {item.detail}
                                    </p>
                                </td>

                                {/* IMAGE */}
                                <td className="px-6 py-4 flex justify-center">
                                    <img
                                        src={item.image}
                                        alt="insight"
                                        onClick={() => setPreviewImage(item.image)}
                                        className="h-12 w-12 rounded-md object-cover border cursor-pointer hover:scale-110 transition"
                                    />
                                </td>

                                {/* ACTIONS */}
                                {canShowActions && (
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-3 items-center">

                                            {hasPermission("update_insight") && (
                                                <button
                                                    onClick={() => onEdit(item)}
                                                    className="px-3 py-1 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md transition"
                                                >
                                                    Edit
                                                </button>
                                            )}

                                            {hasPermission("delete_insight") && (
                                                <button
                                                    onClick={() => onDelete(item._id)}
                                                    className="px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition"
                                                >
                                                    Delete
                                                </button>
                                            )}

                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            {/* 🔥 IMAGE PREVIEW MODAL */}
            {previewImage && (
                <div
                    className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50"
                    onClick={() => setPreviewImage(null)}
                >
                    <div
                        className="relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setPreviewImage(null)}
                            className="absolute -top-3 -right-3 bg-white rounded-full px-2 py-1 text-black shadow hover:scale-110 transition"
                        >
                            ✕
                        </button>

                        <img
                            src={previewImage}
                            alt="preview"
                            className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}