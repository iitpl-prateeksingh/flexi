"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
    addInsightItemApi,
    updateInsightItemApi
} from "../../services/insightService";
import { uploadImageService } from "../../services/imageService";

export default function InsightModal({ item, onClose, refresh }) {
    const [image, setImage] = useState(item?.image || null);
    const [imageFile, setImageFile] = useState(null);

    const [title, setTitle] = useState(item?.title || "");
    const [detail, setDetail] = useState(item?.detail || "");

    const isEdit = !!item;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImageFile(file);
        setImage({
            url: URL.createObjectURL(file)
        });
    };

    const handleRemoveImage = () => {
        setImage(null);
        setImageFile(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imageUrl = image?.url || "";

            // ✅ Upload image first if new file selected
            if (imageFile) {
                const res = await uploadImageService(imageFile);
                console.log("Image upload response:", res);
                imageUrl = res.data.url;
            }

            // ✅ Send JSON payload (NOT FormData)
            const payload = {
                title,
                detail,
                image: imageUrl
            };

            if (isEdit) {
                await updateInsightItemApi(item._id, payload);
                toast.success("Updated successfully");
            } else {
                await addInsightItemApi(payload);
                toast.success("Added successfully");
            }

            refresh();
            onClose();
        } catch (err) {
            console.log("Error:", err);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <form
                onSubmit={handleSubmit}
                className="w-[460px] bg-white rounded-2xl shadow-2xl p-6 space-y-1 animate-fadeIn"
            >
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {isEdit ? "Edit Insight Item" : "Add Insight Item"}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-black text-lg"
                    >
                        ✕
                    </button>
                </div>

                {/* Title */}
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title"
                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    />
                </div>

                {/* Detail */}
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Detail
                    </label>
                    <textarea
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        placeholder="Enter detail"
                        rows={4}
                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none resize-none"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Image
                    </label>

                    <div className="mt-2 flex items-center gap-4">

                        {/* PREVIEW */}
                        <div>
                            {image ? (
                                <div className="relative group">
                                    <img
                                        src={image.url || image}
                                        className="h-24 w-24 rounded-xl object-cover border shadow-sm"
                                    />

                                    {/* REMOVE BUTTON */}
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ) : (
                                <div className="h-24 w-24 flex items-center justify-center rounded-xl border border-dashed border-gray-300 text-gray-400 text-xs">
                                    No Image
                                </div>
                            )}
                            {/* Helper Text */}
                            <div className="text-xs mt-2 text-gray-400">
                                Recommended size <br /> 400x400px
                            </div>

                        </div>
                        {/* UPLOAD BUTTON */}
                        <label className="cursor-pointer">
                            <div className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                                Upload Image
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>



                    </div>
                </div>
                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition"
                    >
                        {isEdit ? "Update" : "Add"}
                    </button>
                </div>
            </form>
        </div>
    );
}