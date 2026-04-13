"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { hasPermission } from "../../utils/hasPermission";

export default function BlogTable({ list, onDelete }) {
    const [previewImage, setPreviewImage] = useState(null);
    const router = useRouter();
    const canShowActions =
        hasPermission("update_blog") || hasPermission("delete_blog");

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">

            {/* 🔥 HEADER */}


            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">

                    {/* HEADER */}
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                        <tr>
                            <th className="px-6 py-4 text-left">S.no</th>
                            <th className="px-6 py-4 text-left">Blog</th>
                            <th className="px-6 py-4 text-center">Category</th>
                            <th className="px-6 py-4 text-center">Read Time</th>
                            <th className="px-6 py-4 text-center">Status</th>
                            <th className="px-6 py-4 text-center">Image</th>

                            {canShowActions && (
                                <th className="px-6 py-4 text-center">Actions</th>
                            )}
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody className="divide-y">

                        {/* EMPTY STATE */}
                        {list?.length === 0 && (
                            <tr>
                                <td
                                    colSpan={canShowActions ? 7 : 6}
                                    className="text-center py-12 text-gray-500"
                                >
                                    No blogs found
                                </td>
                            </tr>
                        )}

                        {list?.map((item, index) => (

                            <tr
                                key={item._id}
                                className="hover:bg-gray-50 transition"
                            >

                                {/* INDEX */}
                                <td className="px-6 py-4 text-gray-400">
                                    {index + 1}
                                </td>

                                {/* BLOG INFO */}
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-800">
                                            {item.title}


                                        </span>
                                        <span className="text-xs text-gray-500 line-clamp-1">
                                            {item.shortDescription}
                                        </span>
                                    </div>
                                </td>

                                {/* CATEGORY */}
                                <td className="px-6 py-4 text-center capitalize">
                                    {item.category}
                                </td>

                                {/* READ TIME */}
                                <td className="px-6 py-4 text-center text-gray-600">
                                    {item.readTime}
                                </td>

                                {/* STATUS */}
                                <td className="px-6 py-4 text-center">
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full font-medium ${item.status === "published"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-yellow-100 text-yellow-600"
                                            }`}
                                    >
                                        {item.status.toUpperCase()}
                                    </span>
                                </td>

                                {/* IMAGE */}
                                <td className="px-6 py-4 flex justify-center">
                                    <img
                                        src={item.thumbnail}
                                        onClick={() =>
                                            setPreviewImage(item.thumbnail)
                                        }
                                        className="h-12 w-12 rounded-lg object-cover border cursor-pointer hover:scale-105 transition"
                                    />
                                </td>

                                {/* ACTIONS */}
                                {canShowActions && (
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">

                                            {hasPermission("update_blog") && (
                                                <button
                                                    onClick={() =>
                                                        router.push(
                                                            `/admin/blogs/edit/${item.slug}`
                                                        )
                                                    }
                                                    className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                                >
                                                    Edit
                                                </button>
                                            )}

                                            {hasPermission("delete_blog") && (
                                                <button
                                                    onClick={() =>
                                                        onDelete(item._id)
                                                    }
                                                    className="px-3 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600"
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
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setPreviewImage(null)}
                >
                    <div
                        className="relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setPreviewImage(null)}
                            className="absolute -top-3 -right-3 bg-white rounded-full px-2 py-1 shadow"
                        >
                            ✕
                        </button>

                        <img
                            src={previewImage}
                            className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}