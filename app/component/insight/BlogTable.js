"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { hasPermission } from "../../utils/hasPermission";

function DraggableSection({ title, items, setItems, onReorder, onDelete, canShowActions }) {
    const dragIndex = useRef(null);
    const prevItems = useRef(null);
    const router = useRouter();

    const handleDragStart = (index) => {
        dragIndex.current = index;
        prevItems.current = [...items];
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        if (dragIndex.current === index) return;
        const reordered = [...items];
        const [moved] = reordered.splice(dragIndex.current, 1);
        reordered.splice(index, 0, moved);
        dragIndex.current = index;
        setItems(reordered);
    };

    const handleDrop = async () => {
        const confirmed = await onReorder(items.map((item, i) => ({ id: item._id, sortOrder: i })));
        if (!confirmed) setItems(prevItems.current);
        dragIndex.current = null;
        prevItems.current = null;
    };

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-700 capitalize">{title} Blogs</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                        <tr>
                            <th className="px-4 py-4 text-left w-8"></th>
                            <th className="px-6 py-4 text-left">S.no</th>
                            <th className="px-6 py-4 text-left">Blog</th>
                            <th className="px-6 py-4 text-center">Read Time</th>
                            <th className="px-6 py-4 text-center">Status</th>
                            <th className="px-6 py-4 text-center">Image</th>
                            {canShowActions && <th className="px-6 py-4 text-center">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {items.length === 0 && (
                            <tr>
                                <td colSpan={canShowActions ? 7 : 6} className="text-center py-10 text-gray-400">
                                    No {title} blogs found
                                </td>
                            </tr>
                        )}
                        {items.map((item, index) => (
                            <tr
                                key={item._id}
                                draggable
                                onDragStart={() => handleDragStart(index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDrop={handleDrop}
                                className="hover:bg-gray-50 transition cursor-grab active:cursor-grabbing"
                            >
                                <td className="px-4 py-4 text-gray-300 select-none text-lg">⠿</td>
                                <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-800">{item.title}</span>
                                        <span className="text-xs text-gray-500 line-clamp-1">{item.shortDescription}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center text-gray-600">{item.readTime}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${item.status === "published" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>
                                        {item.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex justify-center">
                                    <img
                                        src={item.thumbnail}
                                        className="h-12 w-12 rounded-lg object-cover border"
                                    />
                                </td>
                                {canShowActions && (
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            {hasPermission("update_blog") && (
                                                <button
                                                    onClick={() => router.push(`/admin/blogs/edit/${item.slug}`)}
                                                    className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                            {hasPermission("delete_blog") && (
                                                <button
                                                    onClick={() => onDelete(item._id)}
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
        </div>
    );
}

export default function BlogTable({ list, onDelete, onReorder }) {
    const [weekly, setWeekly] = useState([]);
    const [monthly, setMonthly] = useState([]);
    const canShowActions = hasPermission("update_blog") || hasPermission("delete_blog");

    useEffect(() => {
        setWeekly(list.filter((b) => b.category === "weekly"));
        setMonthly(list.filter((b) => b.category === "monthly"));
    }, [list]);

    return (
        <div className="flex flex-col gap-8">
            <DraggableSection
                title="weekly"
                items={weekly}
                setItems={setWeekly}
                onReorder={onReorder}
                onDelete={onDelete}
                canShowActions={canShowActions}
            />
            <DraggableSection
                title="monthly"
                items={monthly}
                setItems={setMonthly}
                onReorder={onReorder}
                onDelete={onDelete}
                canShowActions={canShowActions}
            />
        </div>
    );
}
