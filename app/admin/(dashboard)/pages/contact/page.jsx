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

    // 20MB limit
    if (file.size > 20 * 1024 * 1024) {
      toast.error("Video must be less than 20MB");
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
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {/* LEFT: PREVIEW */}
            <div className="w-full h-48 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
              {bannerVideo?.url ? (
                <video
                  src={bannerVideo.url}
                  controls
                  className="w-full h-48 object-cover"
                />
              ) : (
                <span className="text-gray-400 h-48 text-sm">No video selected</span>
              )}
            </div>

            {/* RIGHT: ACTIONS */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Banner Video
                </label>

                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoSelect}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2 file:mr-3 file:py-1 file:px-3 file:border-0 file:bg-gray-100 file:rounded-md file:cursor-pointer"
                />
              </div>

              {/* REMOVE */}
              {bannerVideo && (
                <button
                  type="button"
                  onClick={() => setBannerVideo(null)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove Video
                </button>
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
