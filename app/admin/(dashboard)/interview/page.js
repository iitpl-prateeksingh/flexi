"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import QuillEditor from "../../../component/QuillEditor";
import InterviewFormModal from "./InterviewFormModal";
import { uploadImageService } from "../../../services/imageService";
import {
  addInterviewItemService,
  deleteInterviewItemService,
  getInterviewPageAdminService,
  updateInterviewHeadingService,
  updateInterviewItemService,
  updateInterviewVideoService,
} from "../../../services/pages/interviewpageService"
export default function InterviewAdminPage() {
  const [headingTitle, setHeadingTitle] = useState("");
  const [headingImage, setHeadingImage] = useState(null);
  const [interviews, setInterviews] = useState([]);

  const [showInterviewForm, setShowInterviewForm] = useState(false);
  const [editingInterviewId, setEditingInterviewId] = useState(null);
  const [interviewForm, setInterviewForm] = useState({
    title: "",
    description: "",
    thumbnail: null,
    videoUrl: "",
    thumbnailPreview: "",
  });

  const parseUploadUrl = (uploadRes) =>
    uploadRes?.data?.url || uploadRes?.url || "";

  const validateImage = (file) => {
    if (!file) return false;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB");
      return false;
    }
    return true;
  };

  const resetInterviewForm = () => {
    setInterviewForm({
      title: "",
      description: "",
      thumbnail: null,
      videoUrl: "",
      thumbnailPreview: "",
    });
    setEditingInterviewId(null);
  };

  const fetchData = async () => {
    try {
      const res = await getInterviewPageAdminService();
      const data = res?.data || res;
      if (!data) return;

      setHeadingTitle(data.headingTitle || "");
      setHeadingImage(
        data.headingImage ? { url: data.headingImage, file: null } : null,
      );
      setInterviews(data.interviews || []);
    } catch (error) {
      toast.error("Failed to load interview page");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveHeading = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Saving heading...", { id: "heading-save" });
      let headingImageUrl = headingImage?.url || "";

      if (headingImage?.file) {
        const uploadRes = await uploadImageService(headingImage.file);
        headingImageUrl = parseUploadUrl(uploadRes);
      }

      await updateInterviewHeadingService({
        headingTitle,
        headingImage: headingImageUrl,
      });
      toast.success("Heading updated", { id: "heading-save" });
      fetchData();
    } catch (error) {
      toast.error("Failed to save heading", { id: "heading-save" });
    }
  };

  const openAddInterviewForm = () => {
    resetInterviewForm();
    setShowInterviewForm(true);
  };

  const openEditInterviewForm = (item) => {
    setEditingInterviewId(item._id);
    setInterviewForm({
      title: item.title || "",
      description: item.description || "",
      thumbnail: null,
      videoUrl: item.videoUrl || "",
      thumbnailPreview: item.thumbnail || "",
    });
    setShowInterviewForm(true);
  };

  const saveInterviewForm = async (e) => {
    e.preventDefault();

    try {
      const toastId = editingInterviewId ? "interview-edit" : "interview-add";
      toast.loading(
        editingInterviewId ? "Updating interview..." : "Adding interview...",
        {
          id: toastId,
        },
      );

      let thumbnailUrl = interviewForm.thumbnailPreview || "";
      let videoUrl = interviewForm.videoUrl || "";

      if (interviewForm.thumbnail?.file) {
        const imgRes = await uploadImageService(interviewForm.thumbnail.file);
        thumbnailUrl = parseUploadUrl(imgRes);
      }

      if (editingInterviewId) {
        await updateInterviewItemService(editingInterviewId, {
          title: interviewForm.title,
          description: interviewForm.description,
          thumbnail: thumbnailUrl,
        });

        await updateInterviewVideoService(editingInterviewId, videoUrl || "");
      } else {
        await addInterviewItemService({
          title: interviewForm.title,
          description: interviewForm.description,
          thumbnail: thumbnailUrl,
          videoUrl,
        });
      }

      toast.success(
        editingInterviewId ? "Interview updated" : "Interview added",
        { id: toastId },
      );
      setShowInterviewForm(false);
      resetInterviewForm();
      fetchData();
    } catch (error) {
      toast.error("Save failed", {
        id: editingInterviewId ? "interview-edit" : "interview-add",
      });
    }
  };

  const removeInterview = async (id) => {
    try {
      await deleteInterviewItemService(id);
      toast.success("Interview deleted");
      fetchData();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Interview Page Manager</h1>

      <form
        onSubmit={saveHeading}
        className="bg-white p-6 rounded-xl shadow mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Heading Section</h2>
        <QuillEditor
          value={headingTitle}
          onChange={setHeadingTitle}
          height="100px"
        />

        <div className="mt-6 flex items-center gap-6 flex-wrap">
          {headingImage?.url && (
            <div className="relative w-32 h-32">
              <img
                src={headingImage.url}
                alt="heading"
                className="w-full h-full object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => setHeadingImage(null)}
                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
              >
                X
              </button>
            </div>
          )}

          {!headingImage && (
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg w-32 h-32 cursor-pointer hover:bg-gray-50">
              <span className="text-2xl text-gray-400">+</span>
              <span className="text-xs text-gray-500">Upload</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!validateImage(file)) return;
                  setHeadingImage({ file, url: URL.createObjectURL(file) });
                }}
              />
            </label>
          )}
        </div>

        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Save Heading
        </button>
      </form>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Interview Listing</h2>
          <button
            type="button"
            onClick={openAddInterviewForm}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
          >
            + Add Interview
          </button>
        </div>

        {interviews.length === 0 && (
          <p className="text-gray-500">No interviews found.</p>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 border-b">Thumbnail</th>
                <th className="text-left p-3 border-b">Title</th>
                <th className="text-left p-3 border-b">Description</th>
                <th className="text-left p-3 border-b">Video Link</th>
                <th className="text-left p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((item, idx) => (
                <tr key={item._id || idx} className="border-b align-top">
                  <td className="p-3">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt="thumbnail"
                        className="w-16 h-16 object-cover rounded border"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No image</span>
                    )}
                  </td>
                  <td className="p-3 font-medium">{item.title || "-"}</td>
                  <td className="p-3 text-sm text-gray-700 max-w-md">
                    <div
                      className="line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: item.description || "-",
                      }}
                    />
                  </td>
                  <td className="p-3 text-sm">
                    {item.videoUrl ? (
                      <a
                        href={item.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline break-all"
                      >
                        {item.videoUrl}
                      </a>
                    ) : (
                      <span className="text-gray-400">No video</span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEditInterviewForm(item)}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => removeInterview(item._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <InterviewFormModal
        open={showInterviewForm}
        editingInterviewId={editingInterviewId}
        interviewForm={interviewForm}
        setInterviewForm={setInterviewForm}
        validateImage={validateImage}
        onSubmit={saveInterviewForm}
        onClose={() => {
          setShowInterviewForm(false);
          resetInterviewForm();
        }}
      />
    </div>
  );
}
