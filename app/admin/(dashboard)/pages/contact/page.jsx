"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import {
  saveContactPageService,
  getContactPageAdminService,
  updateContactService,
} from "../../../../services/pages/contactpageService";

import { uploadVideoService } from "../../../../services/videoService";
import QuillEditor from "../../../../component/QuillEditor";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    banner: "",
  });

  const [bannerVideo, setBannerVideo] = useState(null);
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

      if (data.bannerVideo) {
        setBannerVideo({ url: data.bannerVideo, file: null });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load Contact page");
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  // ✅ VIDEO VALIDATION
  const validateVideo = (file) => {
    if (!file) return false;

    // 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Video must be less than 10MB");
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

  // ✅ VIDEO UPLOAD (LOCAL PREVIEW)
  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    if (!validateVideo(file)) return;

    setBannerVideo({
      file,
      url: URL.createObjectURL(file),
    });
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      toast.loading("Saving...", { id: "contact" });

      let bannerVideoUrl = bannerVideo?.url || null;

      if (bannerVideo?.file) {
        const res = await uploadVideoService(bannerVideo.file);
        bannerVideoUrl = res.data.url;
      }

      const payload = {
        banner: formData.banner,
        bannerVideo: bannerVideoUrl,
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

      fetchContact();
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

          {/* VIDEO SECTION */}
          <div className="mt-6">
            <label className="font-medium block mb-3">
              Upload Banner Video
            </label>

            <div className="grid grid-cols-2  gap-4">

              {/* VIDEO PREVIEW */}
              {bannerVideo?.url && (
                <div className="relative border rounded-xl overflow-hidden bg-gray-100">
                  <video
                    src={bannerVideo.url}
                    controls
                    className="w-full h-56 object-cover"
                  />

                  {/* REMOVE BUTTON */}
                  <button
                    type="button"
                    onClick={() => setBannerVideo(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* UPLOAD BOX */}
              {!bannerVideo && (
                <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl h-56 cursor-pointer hover:bg-gray-50">
                  <span className="text-3xl text-gray-400">+</span>
                  <span className="text-sm text-gray-500">Add Banner Video</span>

                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleVideoSelect}
                  />
                </label>
              )}

            </div>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
          Save Contact Page
        </button>
      </form>
    </div>
  );
}
