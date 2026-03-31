"use client";

import { useState } from "react";
import QuillEditor from "../../../../component/QuillEditor";
import { useEffect } from "react";
import toast from "react-hot-toast";

import {
    saveAboutPageService,
    getAboutPageAdminService
} from "../../../../services/pages/aboutpageService"

import { uploadImageService } from "../../../../services/imageService";
export default function AboutPage() {

    const [formData, setFormData] = useState({
        title: "",
        section1Title: "",
        section2Title: " ",
        section1Description: "",

        teamTitle: "",
        teamDescription: "",
        sectionCardTitle: "",

    });

    const fetchAbout = async () => {
        try {
            const res = await getAboutPageAdminService();
            const data = res?.data?.contentRef;

            if (!data) return;

            setFormData(prev => ({
                ...prev,
                title: data.title || "",
                section1Title: data.section1Title || "",
                section2Title: data.section2Title || "",
                section1Description: data.section1Description || "",
                teamTitle: data.teamTitle || "",
                teamDescription: data.teamDescription || "",
                sectionCardTitle: data.sectionCardTitle || ""
            }));

            if (data.heroImage) {
                setHeroImage({ url: data.heroImage, file: null });
            }

            if (data.section1Image) {
                setSection1Image({ url: data.section1Image, file: null });
            }

            if (data.section2Card) {
                setsection2Card(data.section2Card);
            }

            if (data.teamMembers) {
                setTeamMembers(
                    data.teamMembers.map(m => ({
                        ...m,
                        image: m.image ? { url: m.image, file: null } : null
                    }))
                );
            }

        } catch (err) {
            console.error(err);
            toast.error("Failed to load About page");
        }
    };
    useEffect(() => {
        fetchAbout();
    }, []);


    const [heroImage, setHeroImage] = useState(null);
    const [section1Image, setSection1Image] = useState(null)
    const [section2Card, setsection2Card] = useState([
        { icon: null, title: "", description: "" }
    ]);
    const [teamMembers, setTeamMembers] = useState([
        {
            name: "",
            designation: "",
            description: "",
            image: null
        }
    ]);

    const validateImage = (file) => {
        if (!file) return false;

        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image must be less than 2MB");
            return false;
        }

        return true;
    };
    // ✅ Quill change handler
    const handleQuillChange = (value, field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
    };
    const addTeamMember = () => {
        if (teamMembers.length >= 3) {
            toast.error("Maximum 3 team members allowed")
            return
        }

        setTeamMembers(prev => [
            ...prev,
            { name: "", designation: "", description: "", image: null }
        ]);
    };
    const removeTeamMember = (index) => {
        setTeamMembers(prev => prev.filter((_, i) => i !== index));
    };
    const handleTeamChange = (index, field, value) => {
        const updated = [...teamMembers];
        updated[index][field] = value;
        setTeamMembers(updated);
    };
    const handleTeamImageUpload = (e, index) => {
        const file = e.target.files[0];
        if (!validateImage(file)) return;

        const preview = {
            file,
            url: URL.createObjectURL(file)
        };

        const updated = [...teamMembers];
        updated[index].image = preview;

        setTeamMembers(updated);
    };


    // ✅ Intro Image Upload
    const handleheroImageUpload = (e) => {
        const file = e.target.files[0];
        if (!validateImage(file)) return;

        setHeroImage({
            file,
            url: URL.createObjectURL(file)
        });
    };

    const handlesection1ImageUpload = (e) => {
        const file = e.target.files[0];
        if (!validateImage(file)) return;

        setSection1Image({
            file,
            url: URL.createObjectURL(file)
        });
    };

    const addSectionCard = () => {
        if (section2Card.length >= 4) return toast.error("Max 4  allowed");

        setsection2Card(prev => [
            ...prev,
            { icon: null, title: "", description: "" }
        ]);
    };

    const handleRemoveSectionCard = (index) => {
        setsection2Card(prev => prev.filter((_, i) => i !== index));
    };

    const handleSectionCard = (index, field, value) => {
        const updated = [...section2Card];
        updated[index][field] = value;
        setsection2Card(updated);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            toast.loading("Uploading...", { id: "upload" });

            // 🔥 Upload hero image
            let heroImageUrl = heroImage?.url || null;
            if (heroImage?.file) {
                const res = await uploadImageService(heroImage.file);
                heroImageUrl = res.data.url;
            }

            // 🔥 Upload section image
            let section1ImageUrl = section1Image?.url || null;
            if (section1Image?.file) {
                const res = await uploadImageService(section1Image.file);
                section1ImageUrl = res.data.url;
            }

            // 🔥 Upload team images
            const updatedTeam = [];

            for (let member of teamMembers) {
                let imageUrl = member.image?.url || null;

                if (member.image?.file) {
                    const res = await uploadImageService(member.image.file);
                    imageUrl = res.data.url;
                }

                updatedTeam.push({
                    name: member.name,
                    designation: member.designation,
                    description: member.description,
                    image: imageUrl
                });
            }

            // 🔥 Final payload
            const payload = {
                ...formData,
                heroImage: heroImageUrl,
                section1Image: section1ImageUrl,
                section2Card,
                teamMembers: updatedTeam   // ✅ FIX HERE

            };

            // 🔥 API CALL
            const res = await saveAboutPageService(payload);

            toast.success(res?.data?.message || "About saved", {
                id: "upload"
            });

        } catch (err) {
            console.error(err);
            toast.error("Upload failed", { id: "upload" });
        }
    };
    return (
        <div className="p-10 bg-gray-50 min-h-screen">

            <h1 className="text-3xl font-bold mb-8">About Us </h1>

            <form onSubmit={handleSubmit} className="space-y-10">

                {/* HERO SECTION */}
                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-xl font-semibold mb-4">
                        Hero Section
                    </h2>
                    <label className="font-medium block mb-3">
                        Heading
                    </label>
                    <QuillEditor
                        value={formData.title}
                        onChange={(val) => handleQuillChange(val, "title")}
                        height="120px"
                    />

                    <div className="mt-6 flex items-center gap-6 flex-wrap">
                        <label className="font-medium block mb-3">
                            Upload Hero Image
                        </label>

                        {/* Preview */}
                        {heroImage && (
                            <div className="relative w-32 h-32">
                                <img
                                    src={heroImage.url}
                                    className="w-full h-full object-cover rounded-lg border"
                                />
                                <button
                                    type="button"
                                    onClick={() => setHeroImage(null)}
                                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                        {/* Upload */}
                        {!heroImage && (
                            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg w-32 h-32 cursor-pointer hover:bg-gray-50">
                                <span className="text-2xl text-gray-400">+</span>
                                <span className="text-xs text-gray-500">Upload</span>

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleheroImageUpload}
                                />
                            </label>
                        )}



                    </div>
                </div>


                {/* Section 1 */}
                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-xl font-semibold mb-4">
                        Section 1
                    </h2>
                    <div className="mb-4">
                        <label> Title</label>
                        <QuillEditor
                            value={formData.section1Title}
                            onChange={(val) => handleQuillChange(val, "section1Title")}
                            height="60px"
                        />
                    </div>

                    <div className="mb-4">
                        <label> Description</label>

                        <QuillEditor
                            value={formData.section1Description}
                            onChange={(val) => handleQuillChange(val, "section1Description")}
                            height="180px"
                        />
                    </div>
                    <div className="mt-6 flex items-center gap-6 flex-wrap">
                        <div className="mb-4">
                            <label> Title</label>
                            <QuillEditor
                                value={formData.section2Title}
                                onChange={(val) => handleQuillChange(val, "section2Title")}
                                height="60px"
                            />
                        </div>
                        {/* Preview */}
                        {section1Image && (
                            <div className="relative w-32 h-32">
                                <img
                                    src={section1Image.url}
                                    className="w-full h-full object-cover rounded-lg border"
                                />
                                <button
                                    type="button"
                                    onClick={() => setSection1Image(null)}
                                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                        {/* Upload */}
                        {!section1Image && (
                            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg w-32 h-32 cursor-pointer hover:bg-gray-50">
                                <span className="text-2xl text-gray-400">+</span>
                                <span className="text-xs text-gray-500">Upload</span>

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handlesection1ImageUpload}
                                />
                            </label>
                        )}
                    </div>
                </div>


                {/* Section Card */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-4">
                        Section Cards
                    </h2>
                    <div className="mb-4">
                        <label> Title</label>

                        <QuillEditor
                            value={formData.sectionCardTitle}
                            onChange={(val) => handleQuillChange(val, "sectionCardTitle")}
                            height="180px"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">

                        {section2Card.map((item, index) => (
                            <div key={index} className="border p-4 rounded-lg space-y-4 relative">

                                {/* Remove Button */}
                                {section2Card.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSectionCard(index)}
                                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
                                    >
                                        ✕
                                    </button>
                                )}



                                {/* TITLE */}
                                <label >Card Title</label>
                                <input
                                    type="text"
                                    placeholder="Title (e.g. Trusted Experts)"
                                    className="w-full border p-2 rounded"
                                    value={item.title}
                                    onChange={(e) =>
                                        handleSectionCard(index, "title", e.target.value)
                                    }
                                />

                                {/* DESCRIPTION */}
                                <label >Card Description</label>

                                <textarea
                                    placeholder="Short description (max 500 characters)"
                                    className="w-full border p-2 rounded"
                                    rows={4}
                                    value={item.description}
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        if (value.length <= 500) {
                                            handleSectionCard(index, "description", value);
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
                    {section2Card.length < 4 && (
                        <button
                            type="button"
                            onClick={addSectionCard}
                            className="mt-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                        >
                            + Add Point
                        </button>
                    )}
                </div>
                {/* Services */}
                {/* TEAM SECTION */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-4">
                        Team Members
                    </h2>
                    <div className="mb-4">
                        <label> Title</label>

                        <QuillEditor
                            value={formData.teamTitle}
                            onChange={(val) => handleQuillChange(val, "teamTitle")}
                            height="180px"
                        />
                    </div>
                    <div className="mb-4">
                        <label> Detail</label>

                        <QuillEditor
                            value={formData.teamDescription}
                            onChange={(val) => handleQuillChange(val, "teamDescription")}
                            height="180px"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="border p-4 rounded-lg space-y-4 relative">

                                {/* REMOVE */}
                                {teamMembers.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeTeamMember(index)}
                                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
                                    >
                                        ✕
                                    </button>
                                )}

                                {/* IMAGE */}
                                <div>
                                    <label className="block mb-2 font-medium">Image</label>

                                    {member.image ? (
                                        <div className="relative w-24 h-24">
                                            <img
                                                src={member.image.url}
                                                className="w-full h-full object-cover rounded border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleTeamChange(index, "image", null)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex items-center justify-center border-2 border-dashed w-24 h-24 cursor-pointer">
                                            +
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => handleTeamImageUpload(e, index)}
                                            />
                                        </label>
                                    )}
                                </div>

                                {/* NAME */}
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full border p-2 rounded"
                                    value={member.name}
                                    onChange={(e) =>
                                        handleTeamChange(index, "name", e.target.value)
                                    }
                                />

                                {/* DESIGNATION */}
                                <input
                                    type="text"
                                    placeholder="Designation"
                                    className="w-full border p-2 rounded"
                                    value={member.designation}
                                    onChange={(e) =>
                                        handleTeamChange(index, "designation", e.target.value)
                                    }
                                />

                                {/* DESCRIPTION (QUILL) */}
                                <div>
                                    <label className="block mb-2 font-medium">Description</label>

                                    <QuillEditor
                                        value={member.description}
                                        onChange={(val) =>
                                            handleTeamChange(index, "description", val)
                                        }
                                        height="120px"
                                    />
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* ADD BUTTON */}
                    {teamMembers.length < 3 && (
                        <button
                            type="button"
                            onClick={addTeamMember}
                            className="mt-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                        >
                            + Add Member
                        </button>
                    )}
                </div>

                {/* SAVE BUTTON */}
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
                    Save About Us
                </button>

            </form>
        </div>
    );
}