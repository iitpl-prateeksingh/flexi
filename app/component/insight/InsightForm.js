"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { uploadImageService } from "../../services/imageService";
import { updateInsightContentApi } from "../../services/insightService";
import QuillEditor from "../../component/QuillEditor";
import { requestConfirmation } from "../../component/common/confirmBus";

export default function InsightForm({ data, refresh }) {

    const [form, setForm] = useState({
        badge: "",
        heading: "",
        description: "",
        monthly: { image: "", title: "", detail: "" },
        weekly: { image: "", title: "", detail: "" }
    });

    const [monthlyFile, setMonthlyFile] = useState(null);
    const [weeklyFile, setWeeklyFile] = useState(null);

    useEffect(() => {
        setForm({
            badge: data?.badge || "",
            heading: data?.heading || "",
            description: data?.description || "",
            monthly: data?.monthly || { image: "", title: "", detail: "" },
            weekly: data?.weekly || { image: "", title: "", detail: "" }
        });
    }, [data]);

    // ================= IMAGE HANDLER =================
    const handleImageChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        const preview = URL.createObjectURL(file);

        if (type === "monthly") {
            setMonthlyFile(file);
            setForm(prev => ({
                ...prev,
                monthly: { ...prev.monthly, image: preview }
            }));
        } else {
            setWeeklyFile(file);
            setForm(prev => ({
                ...prev,
                weekly: { ...prev.weekly, image: preview }
            }));
        }
    };

    const removeImage = async (type) => {
        const ok = await requestConfirmation({
            title: "Remove Image",
            description: "Are you sure you want to remove this image?",
            confirmText: "Yes, Remove",
        });
        if (!ok) return;

        if (type === "monthly") {
            setMonthlyFile(null);
            setForm(prev => ({
                ...prev,
                monthly: { ...prev.monthly, image: "" }
            }));
        } else {
            setWeeklyFile(null);
            setForm(prev => ({
                ...prev,
                weekly: { ...prev.weekly, image: "" }
            }));
        }
    };

    // ================= SUBMIT =================
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            toast.loading("Updating...", { id: "insight" });

            let monthlyImage = form.monthly.image;
            let weeklyImage = form.weekly.image;

            if (monthlyFile) {
                const res = await uploadImageService(monthlyFile);
                monthlyImage = res.data.url;
            }

            if (weeklyFile) {
                const res = await uploadImageService(weeklyFile);
                weeklyImage = res.data.url;
            }

            const payload = {
                badge: form.badge,
                heading: form.heading,
                description: form.description,
                monthly: { ...form.monthly, image: monthlyImage },
                weekly: { ...form.weekly, image: weeklyImage }
            };

            await updateInsightContentApi(payload);

            toast.success("Updated successfully", { id: "insight" });
            refresh();

        } catch (err) {
            console.error(err);
            toast.error("Update failed", { id: "insight" });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-10">

            {/* ================= BASIC ================= */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
                <h2 className="text-lg font-semibold">Basic Info</h2>
                <div>

                    <label className="block">Badge</label>
                    <input
                        placeholder="Badge"
                        value={form.badge}
                        onChange={(e) => setForm({ ...form, badge: e.target.value })}
                        className="w-full border border-gray-200 p-3 rounded-lg"
                    />
                </div>

                <div>
                    <label className="block">Heading</label>
                    <input
                        placeholder="Heading"
                        value={form.heading}
                        onChange={(e) => setForm({ ...form, heading: e.target.value })}
                        className="w-full border border-gray-200 p-3 rounded-lg"
                    />
                </div>

                <div>
                    <label className="block">Description</label>
                    <textarea
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full border border-gray-200 p-3 rounded-lg"
                    />
                </div>
            </div>

            {/* ================= MONTHLY ================= */}
            {/* ================= MONTHLY ================= */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
                <h2 className="text-lg font-semibold">Monthly</h2>

                <div>
                    <label className="block mb-2 font-medium">Image</label>
                    <div className="mt-2 flex items-center gap-4">
                        {form.monthly.image ? (
                            <div className="relative group">
                                <img src={form.monthly.image} className="h-24 w-24 rounded-lg object-cover border shadow-sm" />
                                <button
                                    type="button"
                                    onClick={() => removeImage("monthly")}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition"
                                >
                                    ✕
                                </button>
                            </div>
                        ) : (
                            <div className="h-24 w-24 flex items-center justify-center rounded-lg border border-dashed border-gray-300 text-gray-400 text-xs">
                                No Image
                            </div>
                        )}
                        <label className="cursor-pointer">
                            <div className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                                Upload Image
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageChange(e, "monthly")}
                            />
                        </label>
                    </div>
                </div>

                {/* TITLE (QUILL) */}
                <div>
                    <label className="block mb-2">Title</label>
                    <QuillEditor
                        value={form.monthly.title}
                        onChange={(val) =>
                            setForm((prev) => ({
                                ...prev,
                                monthly: { ...prev.monthly, title: val },
                            }))
                        }
                        height="120px"
                    />
                </div>

                {/* DETAIL (QUILL) */}
                <div>
                    <label className="block mb-2">Detail</label>
                    <QuillEditor
                        value={form.monthly.detail}
                        onChange={(val) =>
                            setForm((prev) => ({
                                ...prev,
                                monthly: { ...prev.monthly, detail: val },
                            }))
                        }
                        height="160px"
                    />
                </div>
            </div>

            {/* ================= WEEKLY ================= */}
            {/* ================= WEEKLY ================= */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
                <h2 className="text-lg font-semibold">Weekly</h2>

                <div>
                    <label className="block mb-2 font-medium">Image</label>
                    <div className="mt-2 flex items-center gap-4">
                        {form.weekly.image ? (
                            <div className="relative group">
                                <img src={form.weekly.image} className="h-24 w-24 rounded-lg object-cover border shadow-sm" />
                                <button
                                    type="button"
                                    onClick={() => removeImage("weekly")}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition"
                                >
                                    ✕
                                </button>
                            </div>
                        ) : (
                            <div className="h-24 w-24 flex items-center justify-center rounded-lg border border-dashed border-gray-300 text-gray-400 text-xs">
                                No Image
                            </div>
                        )}
                        <label className="cursor-pointer">
                            <div className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                                Upload Image
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageChange(e, "weekly")}
                            />
                        </label>
                    </div>
                </div>

                {/* TITLE (QUILL) */}
                <div>
                    <label className="block mb-2">Title</label>
                    <QuillEditor
                        value={form.weekly.title}
                        onChange={(val) =>
                            setForm((prev) => ({
                                ...prev,
                                weekly: { ...prev.weekly, title: val },
                            }))
                        }
                        height="120px"
                    />
                </div>

                {/* DETAIL (QUILL) */}
                <div>
                    <label className="block mb-2">Detail</label>
                    <QuillEditor
                        value={form.weekly.detail}
                        onChange={(val) =>
                            setForm((prev) => ({
                                ...prev,
                                weekly: { ...prev.weekly, detail: val },
                            }))
                        }
                        height="160px"
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <button className="px-8 py-3 bg-blue-600 text-white rounded-lg">
                    Update Insight
                </button>
            </div>
        </form>
    );
}
