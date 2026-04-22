"use client";

import { useState, useEffect } from "react";
import QuillEditor from "../../../../component/QuillEditor";
import toast from "react-hot-toast";

import {
    saveAboutPageService,
    getAboutPageAdminService
} from "../../../../services/pages/aboutpageService";

import { uploadImageService } from "../../../../services/imageService";

export default function AboutPage() {

    const [formData, setFormData] = useState({
        title: "",
        section1Title: "",
        section1Description: "",
        team: "",   // ✅ FIXED
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
                section1Description: data.section1Description || "",
                team: data.team || "",   // ✅ FIXED
            }));

            if (data.heroImage) {
                setHeroImage({ url: data.heroImage, file: null });
            }

            if (data.section1Image) {
                setSection1Image({ url: data.section1Image, file: null });
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
    const [section1Image, setSection1Image] = useState(null);

    const [teamMembers, setTeamMembers] = useState([
        {
            name: "",
            designation: "",
            description: "",
            image: null,
            link: ""
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

    const handleQuillChange = (value, field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const addTeamMember = () => {
        if (teamMembers.length >= 3) {
            toast.error("Maximum 3 team members allowed");
            return;
        }

        setTeamMembers(prev => [
            ...prev,
            { name: "", designation: "", link: "", description: "", image: null }
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            toast.loading("Uploading...", { id: "upload" });

            let heroImageUrl = heroImage?.url || null;
            if (heroImage?.file) {
                const res = await uploadImageService(heroImage.file);
                heroImageUrl = res.data.url;
            }

            let section1ImageUrl = section1Image?.url || null;
            if (section1Image?.file) {
                const res = await uploadImageService(section1Image.file);
                section1ImageUrl = res.data.url;
            }

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
                    image: imageUrl,
                    link: member.link   // ✅ ADD THIS
                });
            }

            const payload = {
                ...formData,
                heroImage: heroImageUrl,
                section1Image: section1ImageUrl,
                teamMembers: updatedTeam
            };

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

                    <QuillEditor
                        value={formData.title}
                        onChange={(val) => handleQuillChange(val, "title")}
                        height="120px"
                    />

                    <div className="mt-6 flex items-center gap-6 flex-wrap">

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

                        {!heroImage && (
                            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg w-32 h-32 cursor-pointer hover:bg-gray-50">
                                +
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

                        <QuillEditor
                            value={formData.section1Title}
                            onChange={(val) => handleQuillChange(val, "section1Title")}
                            height="60px"

                        />
                    </div>
                    <div className="mb-4">
                        <QuillEditor
                            value={formData.section1Description}
                            onChange={(val) => handleQuillChange(val, "section1Description")}
                            height="180px"
                        /></div>

                    {section1Image && (
                        <div className="relative w-32 h-32">
                            <img src={section1Image.url} className="w-full h-full object-cover rounded-lg border" />
                            <button type="button" onClick={() => setSection1Image(null)}
                                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                ✕
                            </button>
                        </div>
                    )}

                    {!section1Image && (
                        <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg w-32 h-32 cursor-pointer hover:bg-gray-50">
                            +
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handlesection1ImageUpload}
                            />
                        </label>
                    )}
                </div>

                {/* TEAM SECTION */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-4">
                        Team Members
                    </h2>

                    {/* ✅ SINGLE FIELD */}
                    <div className="mb-4">

                        <QuillEditor
                            value={formData.team}
                            onChange={(val) => handleQuillChange(val, "team")}
                            height="180px"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="border p-4 rounded-lg space-y-4 relative">

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
                                {member.image ? (
                                    <div className="relative w-24 h-24">
                                        <img src={member.image.url} className="w-full h-full object-cover rounded border" />
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

                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full border p-2 rounded"
                                    value={member.name}
                                    onChange={(e) =>
                                        handleTeamChange(index, "name", e.target.value)
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="Designation"
                                    className="w-full border p-2 rounded"
                                    value={member.designation}
                                    onChange={(e) =>
                                        handleTeamChange(index, "designation", e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Link"
                                    className="w-full border p-2 rounded"
                                    value={member.link}
                                    onChange={(e) =>
                                        handleTeamChange(index, "link", e.target.value)
                                    }
                                />


                                <textarea
                                    className="w-full border p-2 rounded h-[120px]"
                                    value={member.description}
                                    onChange={(e) =>
                                        handleTeamChange(index, "description", e.target.value)
                                    }
                                />
                            </div>
                        ))}
                    </div>

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

                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
                    Save About Us
                </button>

            </form>
        </div>
    );
}