"use client";

import { useEffect, useState } from "react";
import QuillEditor from "../../../../component/QuillEditor";
import { saveHomePageService, getHomePageAdminService } from "../../../../services/pages/homepageService";
import toast from "react-hot-toast";
import { uploadVideoService } from "../../../../services/videoService";
import { uploadImageService } from "../../../../services/imageService"


export default function HomeAdminPage() {

    const [formData, setFormData] = useState({
        title: "",
        missionTitle: "",
        mission: "",
        services: "",
        ctoContent: "",
        yoe: "",
        familiesServed: "",
        aua: "",
        whyChooseTitle: "",
        whyChooseDetail: "",
        bannerText: ""
    });
    const fetchHomepage = async () => {
        try {
            const res = await getHomePageAdminService();

            const data = res?.data?.contentRef;
            console.log(data, "Data")

            if (!data) return;

            // ✅ set text fields
            setFormData(prev => ({
                ...prev,
                title: data.title || "",
                missionTitle: data.missionTitle || "",
                mission: data.mission || "",
                services: data.services || "",
                ctoContent: data.ctoContent || "",
                yoe: data.yoe || "",
                familiesServed: data.familiesServed || "",
                aua: data.aua || "",
                whyChooseTitle: data.whyChooseTitle || "",
                whyChooseDetail: data.whyChooseDetail || "",
                bannerText: data.bannerText || ""
            }));

            // ✅ videos (convert URL → preview format)
            if (data.videos) {
                setVideos(
                    data.videos.map((url) => ({
                        url,       // existing video URL
                        file: null // no file yet
                    }))
                );
            }

            if (data.whyChooseImage) {
                setWhyChooseImage({
                    url: data.whyChooseImage,
                    file: null
                });
            }
            if (data.banner) {
                setBannerImage({
                    url: data.banner,
                    file: null
                });
            }
            // ✅ intro image
            if (data.introImage) {
                setIntroImage({
                    url: data.introImage,
                    file: null
                });
            }

            // ✅ cto image
            if (data.ctoImage) {
                setCtoImage({
                    url: data.ctoImage,
                    file: null
                });
            }

            // ✅ whyChooseList
            if (data.whyChooseList) {
                setWhyChooseList(
                    data.whyChooseList.map(item => ({
                        title: item.title,
                        description: item.description,
                        icon: item.icon
                            ? { url: item.icon, file: null }
                            : null
                    }))
                );
            }

        } catch (err) {
            console.error(err);
            toast.error("Failed to load homepage");
        }
    };
    useEffect(() => {
        fetchHomepage();
    }, []);

    const [bannerImage, setBannerImage] = useState(null);
    const [videos, setVideos] = useState([]);
    const [introImage, setIntroImage] = useState(null);
    const [ctoImage, setCtoImage] = useState(null)
    const [whyChooseImage, setWhyChooseImage] = useState(null)
    const [whyChooseList, setWhyChooseList] = useState([
        { icon: null, title: "", description: "" }
    ]);
    // ✅ Quill change handler
    const handleQuillChange = (value, field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
    };
    const validateImage = (file) => {
        if (!file) return false;

        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image must be less than 2MB");
            return false;
        }

        return true;
    };

    // ✅ Video Upload
    const handleVideoUpload = (e) => {
        const files = Array.from(e.target.files);

        const totalAllowed = 4 - videos.length;

        if (files.length > totalAllowed) {
            toast.error(`You can only upload ${totalAllowed} more videos`);
        }

        const validVideos = files
            .slice(0, totalAllowed)
            .filter(file => {
                if (file.size > 10 * 1024 * 1024) {
                    toast.error(`${file.name} exceeds 10MB limit`);
                    return false;
                }
                return true;
            });

        const preview = validVideos.map((file) => ({
            file,
            url: URL.createObjectURL(file)
        }));

        setVideos((prev) => [...prev, ...preview]);
    };

    const removeVideo = (index) => {
        setVideos((prev) => prev.filter((_, i) => i !== index));
    };
    // ✅ Intro Image Upload
    const handleIntroImageUpload = (e) => {
        const file = e.target.files[0];
        if (!validateImage(file)) return;

        setIntroImage({
            file,
            url: URL.createObjectURL(file)
        });
    };
    const handleCtoImageUpload = (e) => {
        const file = e.target.files[0];
        if (!validateImage(file)) return;

        setCtoImage({
            file,
            url: URL.createObjectURL(file)
        });
    };

    const handleWhyChooseImage = (e) => {
        const file = e.target.files[0];
        if (!validateImage(file)) return;

        setWhyChooseImage({
            file,
            url: URL.createObjectURL(file)
        });
    };
    const addWhyChoose = () => {
        if (whyChooseList.length >= 6) return toast.error("Max 6 items allowed");

        setWhyChooseList(prev => [
            ...prev,
            { icon: null, title: "", description: "" }
        ]);
    };

    const removeWhyChoose = (index) => {
        setWhyChooseList(prev => prev.filter((_, i) => i !== index));
    };

    const handleWhyChooseChange = (index, field, value) => {
        const updated = [...whyChooseList];
        updated[index][field] = value;
        setWhyChooseList(updated);
    };

    const handleWhyChooseIconUpload = (e, index) => {
        const file = e.target.files[0];
        if (!validateImage(file)) return;

        const preview = {
            file,
            url: URL.createObjectURL(file)
        };

        const updated = [...whyChooseList];
        updated[index].icon = preview;
        setWhyChooseList(updated);
    };


    console.log("Fetched Data", formData)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            toast.loading("Uploading...", { id: "upload" });

            // ========================
            // ✅ 1. Upload Videos
            // ========================
            const uploadedVideos = [];

            for (let v of videos) {
                if (v.file) {
                    const res = await uploadVideoService(v.file);
                    uploadedVideos.push(res.data.url);
                } else {
                    uploadedVideos.push(v.url); // existing
                }
            }



            // ========================
            // ✅ 2. Upload Images
            // ========================
            let introImageUrl = null;
            let ctoImageUrl = null;

            if (introImage?.file) {
                const res = await uploadImageService(introImage.file);
                introImageUrl = res.data.url;
            } else {
                introImageUrl = introImage?.url || null;
            }

            if (ctoImage?.file) {
                const res = await uploadImageService(ctoImage.file);
                ctoImageUrl = res.data.url;
            } else {
                ctoImageUrl = ctoImage?.url || null;
            }

            let whyChooseImageUrl = null;

            if (whyChooseImage?.file) {
                const res = await uploadImageService(whyChooseImage.file);
                whyChooseImageUrl = res.data.url;
            } else {
                whyChooseImageUrl = whyChooseImage?.url || null;
            }


            let bannerUrl = null;

            if (bannerImage?.file) {
                const res = await uploadImageService(bannerImage.file);
                bannerUrl = res.data.url;
            } else {
                bannerUrl = bannerImage?.url || formData.banner || null;
            }
            // ========================
            // ✅ 3. Upload whyChoose Icons
            // ========================
            const updatedWhyChoose = [];
            for (let item of whyChooseList) {
                let iconUrl = item.icon?.url || null;

                if (item.icon?.file) {
                    const res = await uploadImageService(item.icon.file);
                    iconUrl = res.data.url;
                }

                updatedWhyChoose.push({
                    title: item.title,
                    description: item.description,
                    icon: iconUrl
                });
            }

            // ========================
            // ✅ 4. Final Payload (ONLY URLs)
            // ========================
            const payload = {
                ...formData,
                videos: uploadedVideos,
                introImage: introImageUrl,
                ctoImage: ctoImageUrl,
                banner: bannerUrl,
                whyChooseImage: whyChooseImageUrl,
                whyChooseList: updatedWhyChoose
            };

            // ========================
            // ✅ 5. SAVE HOMEPAGE
            // ========================
            const res = await saveHomePageService(payload);

            toast.success(res?.data?.message || "Homepage saved", {
                id: "upload"
            });

        } catch (err) {
            console.error(err);
            toast.error("Upload failed", { id: "upload" });
        }
    };

    return (
        <div className="p-10 bg-gray-50 min-h-screen">

            <h1 className="text-3xl font-bold mb-8">Homepage Manager</h1>

            <form onSubmit={handleSubmit} className="space-y-10">


                {/* HERO SECTION */}
                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-xl font-semibold mb-4">
                        Hero Section
                    </h2>

                    <QuillEditor
                        value={formData.title}
                        onChange={(val) => handleQuillChange(val, "title")}
                        height="120px"
                    />

                    {/* VIDEO UPLOAD */}
                    <div className="mt-6">
                        <label className="font-medium block mb-3">
                            Upload Hero Videos (Max 4, 10MB each)
                        </label>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                            {videos.map((video, i) => (
                                <div key={i} className="relative border rounded-xl overflow-hidden bg-gray-100">
                                    <video
                                        src={video.url}
                                        controls
                                        className="w-full h-40 object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeVideo(i)}
                                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}

                            {videos.length < 4 && (
                                <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl h-40 cursor-pointer hover:bg-gray-50">
                                    <span className="text-3xl text-gray-400">+</span>
                                    <span className="text-sm text-gray-500">Add Video</span>

                                    <input
                                        type="file"
                                        accept="video/*"
                                        multiple
                                        className="hidden"
                                        onChange={handleVideoUpload}
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                </div>

                {/* INTRODUCTION */}
                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-xl font-semibold mb-4">
                        Introduction
                    </h2>
                    <div className="mb-4">
                        <label>Introduction title</label>
                        <QuillEditor
                            value={formData.missionTitle}
                            onChange={(val) => handleQuillChange(val, "missionTitle")}
                            height="60px"
                        />
                    </div>

                    <div className="mb-4">
                        <label>Introduction Description</label>

                        <QuillEditor
                            value={formData.mission}
                            onChange={(val) => handleQuillChange(val, "mission")}
                            height="180px"
                        />
                    </div>
                    <div className="mt-6 flex items-center gap-6 flex-wrap">

                        {/* Preview */}
                        {introImage && (
                            <div className="relative w-32 h-32">
                                <img
                                    src={introImage.url}
                                    className="w-full h-full object-cover rounded-lg border"
                                />
                                <button
                                    type="button"
                                    onClick={() => setIntroImage(null)}
                                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                        {/* Upload */}
                        {!introImage && (
                            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg w-32 h-32 cursor-pointer hover:bg-gray-50">
                                <span className="text-2xl text-gray-400">+</span>
                                <span className="text-xs text-gray-500">Upload</span>

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleIntroImageUpload}
                                />
                            </label>
                        )}

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                            <div>

                                <label>Year of Experience</label>
                                <input
                                    type="text"
                                    placeholder="Years of Experience"
                                    className="border rounded-lg p-3"
                                    value={formData.yoe}
                                    onChange={(e) =>
                                        setFormData(prev => ({ ...prev, yoe: e.target.value }))
                                    }
                                /></div>
                            <div>
                                <label>Families Served</label>
                                <input
                                    type="text"
                                    placeholder="Families Served"
                                    className="border rounded-lg p-3"
                                    value={formData.familiesServed}

                                    onChange={(e) =>
                                        setFormData(prev => ({ ...prev, familiesServed: e.target.value }))
                                    }
                                />
                            </div>
                            <div>
                                <label>Assets Under Advisory</label>
                                <input
                                    type="text"
                                    placeholder="Assets Under Advisory"
                                    className="border rounded-lg p-3"
                                    value={formData.aua}
                                    onChange={(e) =>
                                        setFormData(prev => ({ ...prev, aua: e.target.value }))
                                    }
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* CTO */}
                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-xl font-semibold mb-4">
                        CTO
                    </h2>
                    <div className="mb-4">
                        <label>Content</label>
                        <QuillEditor
                            value={formData.ctoContent}
                            onChange={(val) => handleQuillChange(val, "ctoContent")}
                            height="100px"
                        />
                    </div>
                    <div className="mt-6 flex items-center gap-6 flex-wrap">

                        {/* Preview */}
                        {ctoImage && (
                            <div className="relative w-32 h-32">
                                <img
                                    src={ctoImage.url}
                                    className="w-full h-full object-cover rounded-lg border"
                                />
                                <button
                                    type="button"
                                    onClick={() => setCtoImage(null)}
                                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                        {/* Upload */}
                        {!ctoImage && (
                            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg w-32 h-32 cursor-pointer hover:bg-gray-50">
                                <span className="text-2xl text-gray-400">+</span>
                                <span className="text-xs text-gray-500">Upload</span>

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleCtoImageUpload}
                                />
                            </label>
                        )}
                    </div>
                </div>

                {/* Services */}
                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-xl font-semibold mb-4">
                        Servies
                    </h2>
                    <div className="mb-4">
                        <label>Services</label>
                        <QuillEditor
                            value={formData.services}
                            onChange={(val) => handleQuillChange(val, "services")}
                            height="100px"
                        />
                    </div>

                </div>



                {/* Why Choose */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-4">
                        Why Choose Flexi
                    </h2>

                    <div className="mb-4">
                        <label>Title</label>
                        <QuillEditor
                            value={formData.whyChooseTitle}
                            onChange={(val) => handleQuillChange(val, "whyChooseTitle")}
                            height="60px"
                        />
                    </div>

                    <div className="mb-4">
                        <label>Detail</label>
                        <QuillEditor
                            value={formData.whyChooseDetail}
                            onChange={(val) => handleQuillChange(val, "whyChooseDetail")}
                            height="60px"
                        />
                    </div>

                    <div className="mb-4 flex items-center gap-6 flex-wrap">

                        {/* Preview */}
                        {whyChooseImage && (
                            <div className="relative w-32 h-32">
                                <img
                                    src={whyChooseImage.url}
                                    className="w-full h-full object-cover rounded-lg border"
                                />
                                <button
                                    type="button"
                                    onClick={() => setWhyChooseImage(null)}
                                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                        {/* Upload */}
                        {!whyChooseImage && (
                            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg w-32 h-32 cursor-pointer hover:bg-gray-50">
                                <span className="text-2xl text-gray-400">+</span>
                                <span className="text-xs text-gray-500">Upload</span>

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleWhyChooseImage}
                                />
                            </label>
                        )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">

                        {whyChooseList.map((item, index) => (
                            <div key={index} className="border p-4 rounded-lg space-y-4 relative">

                                {/* Remove Button */}
                                {whyChooseList.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeWhyChoose(index)}
                                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
                                    >
                                        ✕
                                    </button>
                                )}

                                {/* ICON */}
                                <div>
                                    <label className="block mb-2 font-medium">Icon</label>

                                    {item.icon ? (
                                        <div className="relative w-16 h-16">
                                            <img
                                                src={item.icon.url}
                                                className="w-full h-full object-cover rounded border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleWhyChooseChange(index, "icon", null)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex items-center justify-center border-2 border-dashed w-16 h-16 cursor-pointer">
                                            +
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => handleWhyChooseIconUpload(e, index)}
                                            />
                                        </label>
                                    )}
                                </div>

                                {/* TITLE */}
                                <input
                                    type="text"
                                    placeholder="Title (e.g. Trusted Experts)"
                                    className="w-full border p-2 rounded"
                                    value={item.title}
                                    onChange={(e) =>
                                        handleWhyChooseChange(index, "title", e.target.value)
                                    }
                                />

                                {/* DESCRIPTION */}
                                <textarea
                                    placeholder="Short description (max 500 characters)"
                                    className="w-full border p-2 rounded"
                                    rows={6}
                                    value={item.description}
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        if (value.length <= 500) {
                                            handleWhyChooseChange(index, "description", value);
                                        }
                                    }}
                                />

                                <p className="text-xs text-gray-400">
                                    {item.description.length}/500 characters
                                </p>

                            </div>
                        ))}
                    </div>

                    {/* ADD BUTTON */}
                    {whyChooseList.length < 6 && (
                        <button
                            type="button"
                            onClick={addWhyChoose}
                            className="mt-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                        >
                            + Add Point
                        </button>
                    )}
                </div>


                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-4">
                        Banner Section
                    </h2>

                    {/* Banner Text */}
                    <div className="mb-4">
                        <label>Banner Text</label>
                        <QuillEditor
                            value={formData.bannerText}
                            onChange={(val) => handleQuillChange(val, "bannerText")}
                            height="100px"
                        />
                    </div>

                    {/* Banner Image */}
                    <div className="mt-6 flex items-center gap-6 flex-wrap">

                        {/* Preview */}
                        {bannerImage && (
                            <div className="relative w-40 h-40">
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

                        {/* Upload */}
                        {!bannerImage && (
                            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg w-40 h-40 cursor-pointer hover:bg-gray-50">
                                <span className="text-2xl text-gray-400">+</span>
                                <span className="text-xs text-gray-500">Upload Banner Image </span>

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (!validateImage(file)) return;

                                        setBannerImage({
                                            file,
                                            url: URL.createObjectURL(file)
                                        });
                                    }}
                                />
                            </label>
                        )}
                    </div>
                </div>
                {/* SAVE BUTTON */}
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
                    Save Homepage
                </button>

            </form>
        </div>
    );
}