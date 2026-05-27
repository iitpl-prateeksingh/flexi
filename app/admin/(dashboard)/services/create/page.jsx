"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { uploadImageService } from "../../../../services/imageService";
import { createServiceApi } from "../../../../services/services";
import { requestConfirmation } from "../../../../component/common/confirmBus";

export default function CreateServicePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    detail: "",
  });

  const [image, setImage] = useState(null);
  const [icon, setIcon] = useState(null);
  const MAX_SIZE = 2 * 1024 * 1024; // 2MB

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      toast.loading("Creating service...", { id: "create" });

      let imageUrl = null;
      let iconUrl = null;

      if (image?.file) {
        const res = await uploadImageService(image.file);
        imageUrl = res.data.url;
      }

      if (icon?.file) {
        const res = await uploadImageService(icon.file);
        iconUrl = res.data.url;
      }

      const payload = {
        ...formData,
        image: imageUrl,
        icon: iconUrl,
      };

      await createServiceApi(payload);
      toast.success("Service created successfully", { id: "create" });
      router.push("/admin/services");
    } catch (error) {
      toast.error("Failed to create service", { id: "create" });
    }
  };

  return (
    <div className="p-4 md:p-10  min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Create New Service
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* TITLE */}
          <div>
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Enter service title"
              className="w-full mt-1 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none p-3 rounded-lg text-sm"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          {/* DETAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700">Detail</label>
            <textarea
              placeholder="Enter service details"
              rows={4}
              className="w-full mt-1 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none p-3 rounded-lg text-sm"
              value={formData.detail}
              onChange={(e) =>
                setFormData({ ...formData, detail: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* IMAGE UPLOAD */}
            <div>
              <label className="text-sm font-medium text-gray-700">Image</label>
              <div className="mt-2 flex items-center gap-4">
                {image?.url ? (
                  <div className="relative group">
                    <img
                      src={image.url}
                      className="h-20 w-20 rounded-xl object-cover border shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={async () => {
                        const ok = await requestConfirmation({
                          title: "Remove Image",
                          description: "Are you sure you want to remove this image?",
                          confirmText: "Yes, Remove",
                        });
                        if (ok) setImage(null);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="h-20 w-20 flex items-center justify-center rounded-xl border border-dashed border-gray-300 text-gray-400 text-xs">
                    No Image
                  </div>
                )}
                <label className="cursor-pointer">
                  <div className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                    Upload Image
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      if (file.size > MAX_SIZE) {
                        toast.error("Image must be less than 2MB");
                        return;
                      }
                      setImage({ file, url: URL.createObjectURL(file) });
                    }}
                  />
                </label>
              </div>
            </div>

            {/* ICON UPLOAD */}
            <div>
              <label className="text-sm font-medium text-gray-700">Icon</label>
              <div className="mt-2 flex items-center gap-4">
                {icon?.url ? (
                  <div className="relative group bg-zinc-300">
                    <img
                      src={icon.url}
                      className="h-16 w-16 rounded-lg object-cover border shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={async () => {
                        const ok = await requestConfirmation({
                          title: "Remove Icon",
                          description: "Are you sure you want to remove this icon?",
                          confirmText: "Yes, Remove",
                        });
                        if (ok) setIcon(null);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="h-16 w-16 flex items-center justify-center rounded-lg border border-dashed border-gray-300 text-gray-400 text-xs">
                    No Icon
                  </div>
                )}
                <label className="cursor-pointer">
                  <div className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                    Upload Icon
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      if (file.size > MAX_SIZE) {
                        toast.error("Icon must be less than 2MB");
                        return;
                      }
                      setIcon({ file, url: URL.createObjectURL(file) });
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
            >
              Create Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
