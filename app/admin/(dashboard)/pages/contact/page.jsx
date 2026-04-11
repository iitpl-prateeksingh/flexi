"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import {
    saveContactPageService,
    getContactPageAdminService,
    updateContactService,
} from "../../../../services/pages/contactpageService"

import { uploadImageService } from "../../../../services/imageService";
import QuillEditor from "../../../../component/QuillEditor";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        banner: "",
    });

    const [bannerImage, setBannerImage] = useState(null);
    const [contactId, setContactId] = useState(null);

    // ✅ FETCH EXISTING DATA
    const fetchContact = async () => {
        try {
            const res = await getContactPageAdminService();
            const data = res?.data;

            if (!data) return;

            setContactId(data._id);

            setFormData({
                banner: data.banner || "",
            });

            if (data.bannerImage) {
                setBannerImage({ url: data.bannerImage, file: null });
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to load Contact page");
        }
    };

    useEffect(() => {
        fetchContact();
    }, []);

    // ✅ IMAGE VALIDATION
    const validateImage = (file) => {
        if (!file) return false;

        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image must be less than 2MB");
            return false;
        }

        return true;
    };

    // ✅ HANDLE INPUT
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ✅ IMAGE UPLOAD
    const handleBannerUpload = (e) => {
        const file = e.target.files[0];
        if (!validateImage(file)) return;

        setBannerImage({
            file,
            url: URL.createObjectURL(file),
        });
    };

    // ✅ SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            toast.loading("Saving...", { id: "contact" });

            let bannerImageUrl = bannerImage?.url || null;

            if (bannerImage?.file) {
                const res = await uploadImageService(bannerImage.file);
                bannerImageUrl = res.data.url;
            }

            const payload = {
                banner: formData.banner,
                bannerImage: bannerImageUrl,
            };

            let res;

            if (contactId) {
                res = await updateContactService(contactId, payload);
            } else {
                res = await saveContactPageService(payload);
            }

            toast.success(res?.data?.message || "Saved successfully", {
                id: "contact",
            });

            fetchContact(); // refresh

        } catch (err) {
            console.error(err);
            toast.error("Save failed", { id: "contact" });
        }
    };

    const handleQuillChange = (value, field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    return (
        <div className="p-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Contact Page</h1>

            <form onSubmit={handleSubmit} className="space-y-10">

                {/* BANNER SECTION */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-4">Banner</h2>
                    <QuillEditor
                        value={formData.banner}
                        onChange={(val) => handleQuillChange(val, "banner")}
                        height="120px"
                    />

                    <div className="mt-6 flex items-center gap-6 flex-wrap">

                        {bannerImage && (
                            <div className="relative w-32 h-32">
                                <img
                                    src={bannerImage.url}
                                    className="w-full h-full object-cover rounded-lg border"
                                />
                                <button
                                    type="button"
                                    onClick={() => setBannerImage(null)}
                                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                        {!bannerImage && (
                            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg w-32 h-32 cursor-pointer hover:bg-gray-50">
                                +
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleBannerUpload}
                                />
                            </label>
                        )}
                    </div>
                </div>

                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
                    Save Contact Page
                </button>
            </form>
        </div>
    );
}