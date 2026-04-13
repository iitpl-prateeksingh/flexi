"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { uploadImageService } from "../../services/imageService";
import SectionCard from "../SectionCard"
import { updateInsightContentApi } from "../../services/insightService";

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

    const removeImage = (type) => {
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
            <SectionCard
                title="Monthly"
                data={form.monthly}
                fileHandler={(e) => handleImageChange(e, "monthly")}
                removeImage={() => removeImage("monthly")}
                onChange={(field, value) =>
                    setForm(prev => ({
                        ...prev,
                        monthly: { ...prev.monthly, [field]: value }
                    }))
                }
            />

            {/* ================= WEEKLY ================= */}
            <SectionCard
                title="Weekly"
                data={form.weekly}
                fileHandler={(e) => handleImageChange(e, "weekly")}
                removeImage={() => removeImage("weekly")}
                onChange={(field, value) =>
                    setForm(prev => ({
                        ...prev,
                        weekly: { ...prev.weekly, [field]: value }
                    }))
                }
            />

            <div className="flex justify-end">
                <button className="px-8 py-3 bg-blue-600 text-white rounded-lg">
                    Update Insight
                </button>
            </div>
        </form>
    );
}