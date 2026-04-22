"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import QuillEditor from "../QuillEditor";
import { uploadImageService } from "../../services/imageService"

export default function BlogForm({ initialData = {}, onSubmit }) {
    const [form, setForm] = useState({
        title: initialData.title || "",
        thumbnail: initialData.thumbnail || null,
        shortDescription: initialData.shortDescription || "",
        readTime: initialData.readTime || "",
        category: initialData.category || "monthly",
        status: initialData.status || "draft",
        sections: initialData.sections || [
            { heading: "", content: "" }
        ],
    });

    const [thumbnailPreview, setThumbnailPreview] = useState(
        initialData.thumbnail || null
    );

    const [thumbnailFile, setThumbnailFile] = useState(null);

    // ==============================
    // ✅ BASIC INPUT
    // ==============================
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // ==============================
    // ✅ IMAGE HANDLING
    // ==============================
    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setThumbnailFile(file);
        setThumbnailPreview(URL.createObjectURL(file));
    };

    const removeThumbnail = () => {
        setThumbnailFile(null);
        setThumbnailPreview(null);
        setForm((prev) => ({ ...prev, thumbnail: null }));
    };

    // ==============================
    // ✅ SECTION HANDLERS
    // ==============================
    const handleHeadingChange = (value, index) => {
        const updated = [...form.sections];
        updated[index].heading = value;

        setForm((prev) => ({
            ...prev,
            sections: updated,
        }));
    };

    const handleQuillChange = (value, index) => {
        const updated = [...form.sections];
        updated[index].content = value;

        setForm((prev) => ({
            ...prev,
            sections: updated,
        }));
    };

    const addSection = () => {
        setForm((prev) => ({
            ...prev,
            sections: [...prev.sections, { heading: "", content: "" }],
        }));
    };

    const removeSection = (index) => {
        const updated = form.sections.filter((_, i) => i !== index);
        setForm((prev) => ({ ...prev, sections: updated }));
    };

    // ==============================
    // ✅ SUBMIT
    // ==============================
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            toast.loading("Saving blog...", { id: "blog" });

            let thumbnailUrl = thumbnailPreview;

            // 🔥 upload if file selected
            if (thumbnailFile) {
                const res = await uploadImageService(thumbnailFile);
                thumbnailUrl = res.data.url;
            }

            const cleanedSections = form.sections.filter(
                (sec) => sec.heading && sec.content
            );

            if (!cleanedSections.length) {
                toast.error("At least one section is required", { id: "blog" });
                return;
            }

            const payload = {
                ...form,
                thumbnail: thumbnailUrl,
                sections: cleanedSections,
            };

            await onSubmit(payload);

            toast.success("Saved successfully", { id: "blog" });

        } catch (err) {
            console.error(err);
            toast.error("Something went wrong", { id: "blog" });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-10">

            {/* ================= BASIC INFO ================= */}
            <div className="bg-white border border-gray-300 rounded-xl p-6 space-y-6">

                <h2 className="text-lg font-semibold text-gray-800">
                    Basic Information
                </h2>

                <div className="grid grid-cols-2 gap-6">

                    {/* TITLE */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Enter blog title"
                            className="w-full border border-gray-300 p-3 rounded-lg"
                            required
                        />
                    </div>
                    {/* SHORT DESCRIPTION */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">
                            Short Description <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                            <textarea
                                name="shortDescription"
                                value={form.shortDescription}
                                onChange={handleChange}
                                placeholder="Enter short description"
                                className="w-full pb-3 border border-gray-300 p-3 pb-8 rounded-lg"
                                rows={3}
                                maxLength={500}
                                required
                            />

                            {/* 🔥 COUNTER */}
                            <span className="absolute bottom-2 right-3 text-xs text-gray-500">
                                {form.shortDescription.length}/500
                            </span>
                        </div>
                    </div>

                    {/* READ TIME */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Read Time <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="readTime"
                            type="number"
                            value={form.readTime}
                            onChange={handleChange}
                            placeholder="e.g. 5 min"
                            className="w-full border border-gray-300 p-3 rounded-lg"
                            required
                        />
                    </div>

                    {/* CATEGORY */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-lg"
                        >
                            <option value="monthly">Monthly</option>
                            <option value="weekly">Weekly</option>
                        </select>
                    </div>

                    {/* STATUS */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Status
                        </label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-lg"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>

                </div>
            </div>

            {/* ================= THUMBNAIL ================= */}
            <div className="bg-white border border-gray-300 rounded-xl p-6 space-y-4">

                <h2 className="text-lg font-semibold text-gray-800">
                    Thumbnail
                </h2>

                <div className="flex items-center gap-4">

                    {thumbnailPreview ? (
                        <div className="relative group">
                            <img
                                src={thumbnailPreview}
                                className="h-28 w-28 rounded-xl object-cover border border-gray-300"
                            />

                            <button
                                type="button"
                                onClick={removeThumbnail}
                                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full opacity-0 group-hover:opacity-100"
                            >
                                ✕
                            </button>
                        </div>
                    ) : (
                        <div className="h-28 w-28 flex items-center justify-center border border-gray-300 border border-gray-300-dashed rounded-xl text-gray-400 text-sm">
                            No Image
                        </div>
                    )}

                    <label className="cursor-pointer">
                        <div className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                            Upload Image
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleThumbnailChange}
                            className="hidden"
                        />
                    </label>
                </div>
            </div>

            {/* ================= SECTIONS ================= */}
            <div className="bg-white border border-gray-300 rounded-xl p-6 space-y-6">

                <h2 className="text-lg font-semibold text-gray-800">
                    Blog Sections
                </h2>

                {form.sections.map((section, index) => (
                    <div key={index} className="border border-gray-300 rounded-xl p-5 space-y-4">

                        {/* HEADING */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Section Heading
                            </label>
                            <input
                                value={section.heading}
                                onChange={(e) =>
                                    handleHeadingChange(e.target.value, index)
                                }
                                placeholder="Enter section heading"
                                className="w-full border border-gray-300 p-3 rounded-lg"
                            />
                        </div>

                        {/* CONTENT */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Content
                            </label>
                            <QuillEditor
                                value={section.content}
                                onChange={(val) => handleQuillChange(val, index)}
                                height="200px"
                            />
                        </div>

                        {/* REMOVE */}
                        {form.sections.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeSection(index)}
                                className="text-red-500 text-sm"
                            >
                                Remove Section
                            </button>
                        )}
                    </div>
                ))}

                {/* ADD SECTION */}
                <button
                    type="button"
                    onClick={addSection}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg"
                >
                    + Add Section
                </button>
            </div>

            {/* ================= SUBMIT ================= */}
            <div className="flex justify-end">
                <button className="px-8 py-3 bg-green-600 text-white rounded-lg">
                    Save Blog
                </button>
            </div>

        </form>
    );
}