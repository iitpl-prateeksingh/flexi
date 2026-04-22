"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { uploadImageService } from "../services/imageService";
import {
    createServiceApi,
    updateServiceApi
} from "../services/services";

export default function ServiceFormModal({
    isOpen,
    onClose,
    onSuccess,
    editingData
}) {
    const [formData, setFormData] = useState({
        title: "",
        detail: ""
    });

    const [image, setImage] = useState(null);
    const [icon, setIcon] = useState(null);

    const MAX_SIZE = 2 * 1024 * 1024; // 2MB

    useEffect(() => {
        if (editingData) {
            setFormData({
                title: editingData.title,
                detail: editingData.detail
            });

            setImage(editingData.image ? { url: editingData.image } : null);
            setIcon(editingData.icon ? { url: editingData.icon } : null);
        } else {
            resetForm();
        }
    }, [editingData]);

    const resetForm = () => {
        setFormData({ title: "", detail: "" });
        setImage(null);
        setIcon(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            toast.loading("Saving...", { id: "save" });

            let imageUrl = image?.url || null;
            let iconUrl = icon?.url || null;

            if (image?.file) {
                const res = await uploadImageService(image.file);
                imageUrl = res.data.url;
            }

            if (icon?.file) {
                const res = await uploadImageService(icon.file);
                iconUrl = res.data.url;
            }

            const payload = {
                ...formData,
                image: imageUrl,
                icon: iconUrl
            };

            if (editingData?._id) {
                await updateServiceApi(editingData._id, payload);
                toast.success("Updated", { id: "save" });
            } else {
                await createServiceApi(payload);
                toast.success("Created", { id: "save" });
            }

            onSuccess();
            onClose();

        } catch {
            toast.error("Failed", { id: "save" });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50 px-4">

            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 animate-in fade-in zoom-in-95">

                {/* HEADER */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {editingData ? "Edit Service" : "Add Service"}
                    </h2>
                    <p className="text-sm text-gray-500">
                        Fill the details below
                    </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* TITLE */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter service title"
                            className="w-full mt-1 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none p-3 rounded-lg text-sm"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            required
                        />
                    </div>

                    {/* DETAIL */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Detail
                        </label>
                        <textarea
                            placeholder="Enter service details"
                            rows={3}
                            className="w-full mt-1 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none p-3 rounded-lg text-sm"
                            value={formData.detail}
                            onChange={(e) =>
                                setFormData({ ...formData, detail: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        {/* IMAGE UPLOAD */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Image
                            </label>

                            <div className="mt-2 flex items-center gap-4">

                                {/* PREVIEW */}
                                {image?.url ? (
                                    <div className="relative group">
                                        <img
                                            src={image.url}
                                            className="h-20 w-20 rounded-xl object-cover border shadow-sm"
                                        />

                                        {/* REMOVE BUTTON */}
                                        <button
                                            type="button"
                                            onClick={() => setImage(null)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : (
                                    <div className="h-20 w-20 flex items-center justify-center rounded-xl border border-dashed border-gray-300 text-gray-400 text-xs">
                                        No Image
                                    </div>
                                )}

                                {/* UPLOAD BUTTON */}
                                <label className="cursor-pointer">
                                    <div className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                                        Upload Image
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (!file) return;

                                            if (file.size > MAX_SIZE) {
                                                toast.error("Image must be less than 2MB");
                                                return;
                                            }

                                            setImage({
                                                file,
                                                url: URL.createObjectURL(file)
                                            });
                                        }}
                                    />
                                </label>

                            </div>
                        </div>

                        {/* ICON UPLOAD */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Icon
                            </label>

                            <div className="mt-2 flex items-center gap-4">

                                {/* PREVIEW */}
                                {icon?.url ? (
                                    <div className="relative group bg-zinc-300">
                                        <img
                                            src={icon.url}
                                            className="h-16 w-16 rounded-lg object-cover border shadow-sm"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setIcon(null)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : (
                                    <div className="h-16 w-16 flex items-center justify-center rounded-lg border border-dashed border-gray-300 text-gray-400 text-xs">
                                        No Icon
                                    </div>
                                )}

                                {/* UPLOAD BUTTON */}
                                <label className="cursor-pointer">
                                    <div className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                                        Upload Icon
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (!file) return;

                                            if (file.size > MAX_SIZE) {
                                                toast.error("Icon must be less than 2MB");
                                                return;
                                            }

                                            setIcon({
                                                file,
                                                url: URL.createObjectURL(file)
                                            });
                                        }}
                                    />
                                </label>

                            </div>
                        </div>
                    </div>
                    {/* ACTIONS */}
                    <div className="flex justify-end gap-3 pt-4 ">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
                        >
                            Save
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}