"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { getSettingsService, saveSettingsService } from "../../../services/settingService";

import { uploadImageService } from "../../../services/imageService";
export default function SettingsPage() {

    const [formData, setFormData] = useState({
        siteName: "",
        email: "",
        phone: "",

        // NEW FIELDS
        arn: "",
        arnFromDate: "",
        arnTillDate: "",
        address: "",
        officeLocation: "",
        mapLink: "",

        // SOCIAL MEDIA
        facebook: "",
        instagram: "",
        twitter: "",
        youtube: "",
        linkedin: "",
        other: ""
    });

    const [logo, setLogo] = useState(null);
    const [favicon, setFavicon] = useState(null);

    const [logoPreview, setLogoPreview] = useState(null);
    const [faviconPreview, setFaviconPreview] = useState(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        console.log("fetch Settin")
        try {
            console.log("before api call")
            const res = await getSettingsService();
            console.log("FULL RESPONSE:", res);
            console.log("res.data:", res.data);
            console.log("res.data.data:", res.data?.data);

            const data = res?.data || {};

            setFormData({
                siteName: data.siteName || "",
                email: data.email || "",
                phone: data.phone || "",

                arn: data.arn?.number || "",
                arnFromDate: data.arn?.fromDate?.split("T")[0] || "",
                arnTillDate: data.arn?.tillDate?.split("T")[0] || "",

                address: data.address || "",
                officeLocation: data.officeLocation || "",
                mapLink: data.mapLink || "",

                facebook: data.socialMedia?.facebook || "",
                instagram: data.socialMedia?.instagram || "",
                twitter: data.socialMedia?.twitter || "",
                youtube: data.socialMedia?.youtube || "",
                linkedin: data.socialMedia?.linkedin || "",
                other: data.socialMedia?.other || ""
            });

            // previews
            if (data.logo) setLogoPreview(data.logo);
            if (data.favicon) setFaviconPreview(data.favicon);

        } catch (err) {
            toast.error("Failed to load settings");
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImage = (e, type) => {
        const file = e.target.files[0];

        if (!file) return;

        // ✅ TYPE CHECK
        if (!file.type.startsWith("image/")) {
            toast.error("Only image files are allowed");
            return;
        }

        // ✅ SIZE CHECK (2MB)
        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image must be less than 2MB");
            return;
        }

        const preview = URL.createObjectURL(file);

        if (type === "logo") {
            setLogo(file);
            setLogoPreview(preview);
        }

        if (type === "favicon") {
            setFavicon(file);
            setFaviconPreview(preview);
        }
    };

    const removeImage = (type) => {

        if (type === "logo") {
            setLogo(null);
            setLogoPreview(null);
        }

        if (type === "favicon") {
            setFavicon(null);
            setFaviconPreview(null);
        }

    };

    const isValidURL = (url) => {
        if (!url) return true;

        try {
            const parsed = new URL(
                url.startsWith("http") ? url : "https://" + url
            );

            return !!parsed.hostname;
        } catch {
            return false;
        }
    };

    const validateForm = () => {

        // ✅ REQUIRED
        if (!formData.siteName.trim()) {
            toast.error("Site name is required");
            return false;
        }

        // ✅ EMAIL
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            toast.error("Invalid email format");
            return false;
        }

        // ✅ PHONE (10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        if (formData.phone && !phoneRegex.test(formData.phone)) {
            toast.error("Phone must be exactly 10 digits");
            return false;
        }

        // ✅ DATE VALIDATION
        if (formData.arnFromDate && formData.arnTillDate) {
            const from = new Date(formData.arnFromDate);
            const till = new Date(formData.arnTillDate);

            if (from > till) {
                toast.error("ARN From Date must be before Till Date");
                return false;
            }
        }

        // ✅ URL VALIDATION
        const urlFields = [
            "facebook",
            "instagram",
            "twitter",
            "youtube",
            "linkedin",
            "other"
        ];

        for (let key of urlFields) {
            let url = formData[key];

            if (!url) continue;

            // ✅ AUTO ADD https://
            if (!url.startsWith("http")) {
                url = "https://" + url;
            }

            // ✅ VALIDATE
            if (!isValidURL(url)) {
                toast.error(`Invalid URL for ${key}`);
                return false;
            }

            // ✅ SAVE FIXED VALUE
            formData[key] = url;
        }
        return true;
    };
    const extractMapSrc = (input) => {
        if (!input) return "";

        // If user pasted iframe
        if (input.includes("<iframe")) {
            const match = input.match(/src="([^"]+)"/);
            return match ? match[1] : "";
        }

        // If user pasted direct link
        return input;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            toast.loading("Saving...", { id: "save" });

            // 🔥 Upload logo first
            let logoUrl = logoPreview || null;

            if (logo instanceof File) {
                const res = await uploadImageService(logo);
                logoUrl = res.data.url;
            }

            // 🔥 Upload favicon
            let faviconUrl = faviconPreview || null;

            if (favicon instanceof File) {
                const res = await uploadImageService(favicon);
                faviconUrl = res.data.url;
            }

            // 🔥 Final payload (JSON — NOT FormData)
            const payload = {
                siteName: formData.siteName,
                email: formData.email,
                phone: formData.phone,

                arn: {
                    number: formData.arn,
                    fromDate: formData.arnFromDate,
                    tillDate: formData.arnTillDate
                },

                address: formData.address,
                officeLocation: formData.officeLocation,
                mapLink: extractMapSrc(formData.mapLink),
                socialMedia: {
                    facebook: formData.facebook,
                    instagram: formData.instagram,
                    twitter: formData.twitter,
                    youtube: formData.youtube,
                    linkedin: formData.linkedin,
                    other: formData.other
                },

                // ✅ IMPORTANT
                logo: logoUrl,
                favicon: faviconUrl
            };

            await saveSettingsService(payload);

            toast.success("Settings saved", { id: "save" });

        } catch (err) {
            console.error(err);
            toast.error("Failed to save", { id: "save" });
        }
    };

    return (


        <div className="p-8 bg-gray-50 min-h-screen ">

            {/* HEADER */}

            <div className="mb-10">

                <h1 className="text-3xl font-semibold text-gray-800">
                    Website Settings
                </h1>

                <p className="text-gray-500 mt-1">
                    Manage website configuration and media
                </p>

            </div>

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* GENERAL SETTINGS */}

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-7">

                    <h2 className="text-lg font-semibold text-gray-700 mb-6">
                        General Information
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">

                        <Input label="Site Name" name="siteName" placeholder="Enter website name" value={formData.siteName} onChange={handleChange} />

                        <Input label="Email" name="email" type="email" placeholder="Enter email address" value={formData.email} onChange={handleChange} />

                        <Input label="Phone" name="phone" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} />

                        <Input label="ARN Number" name="arn" placeholder="Enter ARN number" value={formData.arn} onChange={handleChange} />

                        <Input label="ARN From Date" name="arnFromDate" type="date" placeholder="Select start date" value={formData.arnFromDate} onChange={handleChange} max={formData.arnTillDate || undefined} />

                        <Input label="ARN Till Date" name="arnTillDate" type="date" placeholder="Select end date" value={formData.arnTillDate} onChange={handleChange} min={formData.arnFromDate} />

                        <Input label="Office Location" name="officeLocation" placeholder="Enter office location" value={formData.officeLocation} onChange={handleChange} />

                        <Input label="Address" name="address" placeholder="Enter full address" value={formData.address} onChange={handleChange} />
                    </div>

                </div>

                {/* MEDIA SETTINGS */}

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-7">

                    <h2 className="text-lg font-semibold text-gray-700 mb-6">
                        Website Media
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">

                        <ImageUpload
                            label="Website Logo"
                            preview={logoPreview}
                            onChange={(e) => handleImage(e, "logo")}
                            remove={() => removeImage("logo")}
                        />

                        <ImageUpload
                            label="Favicon"
                            preview={faviconPreview}
                            onChange={(e) => handleImage(e, "favicon")}
                            remove={() => removeImage("favicon")}
                        />

                    </div>

                </div>

                {/* MAP */}

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-7">

                    <h2 className="text-lg font-semibold text-gray-700 mb-6">
                        Location
                    </h2>

                    <Input
                        label="Google Map Link"
                        name="mapLink"
                        placeholder="Paste Google Maps embed/link"
                        value={formData.mapLink}
                        onChange={handleChange}
                    />

                </div>

                {/* SOCIAL MEDIA */}

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-7">

                    <h2 className="text-lg font-semibold text-gray-700 mb-6">
                        Social Media Links
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">

                        <Input label="Facebook" name="facebook" placeholder="https://facebook.com/yourpage" value={formData.facebook} onChange={handleChange} />

                        <Input label="Instagram" name="instagram" placeholder="https://instagram.com/yourprofile" value={formData.instagram} onChange={handleChange} />

                        <Input label="X (Twitter)" name="twitter" placeholder="https://x.com/yourprofile" value={formData.twitter} onChange={handleChange} />

                        <Input label="YouTube" name="youtube" placeholder="https://youtube.com/yourchannel" value={formData.youtube} onChange={handleChange} />

                        <Input label="LinkedIn" name="linkedin" placeholder="https://linkedin.com/in/yourprofile" value={formData.linkedin} onChange={handleChange} />

                        <Input label="Other Social Link" name="other" placeholder="Any other social link" value={formData.other} onChange={handleChange} />
                    </div>

                </div>

                {/* SAVE BUTTON */}

                <div className="flex justify-end">

                    <button
                        type="submit"
                        className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
                    >
                        Save Settings
                    </button>

                </div>

            </form>

        </div>

    );

}

/* INPUT COMPONENT */

function Input({ label, name, value, onChange, type = "text", placeholder, min, max }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={(e) => {

                    let val = e.target.value;

                    // ✅ PHONE → only digits (max 10)
                    if (name === "phone") {
                        val = val.replace(/\D/g, "").slice(0, 10);
                    }

                    // ✅ ARN → only digits (no limit or you can add)
                    if (name === "arn") {
                        val = val.replace(/\D/g, "");
                    }

                    onChange({
                        target: {
                            name,
                            value: val
                        }
                    });
                }}
                placeholder={placeholder}
                min={min}   // ✅ added
                max={max}   // 
                className="w-full border border-gray-200 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
            />
        </div>
    );
}
/* IMAGE UPLOAD COMPONENT */

function ImageUpload({ label, preview, onChange, remove }) {

    return (

        <div>

            <label className="block text-sm font-medium text-gray-600 mb-2">
                {label}
            </label>

            {!preview ? (

                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-36 cursor-pointer hover:bg-gray-50">

                    <span className="text-sm text-gray-500">
                        Click to upload image
                    </span>

                    <input
                        type="file"
                        className="hidden"
                        onChange={onChange}
                    />

                </label>

            ) : (

                <div className="relative w-full h-36 border border-gray-200 rounded-lg overflow-hidden">

                    <img
                        src={preview}
                        alt="preview"
                        className="w-full h-full object-contain bg-gray-50"
                    />

                    {/* REMOVE BUTTON */}

                    <button
                        type="button"
                        onClick={remove}
                        className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded"
                    >
                        ✕
                    </button>
                </div>
            )}
        </div>
    );

}