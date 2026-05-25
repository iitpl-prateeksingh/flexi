"use client";

import QuillEditor from "../../../../component/QuillEditor";

export default function InterviewFormModal({
  open,
  editingInterviewId,
  interviewForm,
  setInterviewForm,
  validateImage,
  onClose,
  onSubmit,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl max-h-[90vh] overflow-y-auto p-6">
        <form onSubmit={onSubmit}>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              {editingInterviewId
                ? "Edit Interview"
                : "Add New Interview"}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-black"
            >
              Close
            </button>
          </div>

          {/* Title */}
          <div className="mb-5">
            <label className="block font-medium mb-2">
              Interview Title
            </label>

            <input
              type="text"
              value={interviewForm.title}
              onChange={(e) =>
                setInterviewForm((p) => ({
                  ...p,
                  title: e.target.value,
                }))
              }
              className="w-full border p-3 rounded-lg"
              placeholder="Enter interview title"
            />
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="block font-medium mb-2">
              Interview Description
            </label>

            <QuillEditor
              value={interviewForm.description}
              onChange={(val) =>
                setInterviewForm((p) => ({
                  ...p,
                  description: val,
                }))
              }
              height="140px"
            />
          </div>

          <div className="mb-5">
            <label className="block font-medium mb-2">
              Interview Date & Time
            </label>
            <input
              type="datetime-local"
              value={interviewForm.updatedAt || ""}
              onChange={(e) =>
                setInterviewForm((p) => ({
                  ...p,
                  updatedAt: e.target.value,
                }))
              }
              className="w-full border p-3 rounded-lg"
            />
            <p className="text-xs text-gray-500 mt-2">
              Latest/recent interview order will follow this date and time.
            </p>
          </div>

          {/* Thumbnail + Video URL */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Thumbnail */}
            <div>
              <label className="font-medium block mb-3">
                Interview Thumbnail
              </label>

              {interviewForm.thumbnail?.url ||
              interviewForm.thumbnailPreview ? (
                <div className="relative w-40 h-40">
                  <img
                    src={
                      interviewForm.thumbnail?.url ||
                      interviewForm.thumbnailPreview
                    }
                    alt="thumbnail"
                    className="w-full h-full object-cover rounded-lg border"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setInterviewForm((p) => ({
                        ...p,
                        thumbnail: null,
                        thumbnailPreview: "",
                      }))
                    }
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                  >
                    X
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl h-40 cursor-pointer hover:bg-gray-50">
                  <span className="text-3xl text-gray-400">+</span>

                  <span className="text-sm text-gray-500 mt-1">
                    Upload Thumbnail
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (!validateImage(file)) return;

                      setInterviewForm((p) => ({
                        ...p,
                        thumbnail: {
                          file,
                          url: URL.createObjectURL(file),
                        },
                        thumbnailPreview: "",
                      }));
                    }}
                  />
                </label>
              )}
            </div>

            {/* Video URL */}
            <div>
              <label className="font-medium block mb-3">
                Interview Link
              </label>

              <input
                type="url"
                value={interviewForm.videoUrl || ""}
                onChange={(e) =>
                  setInterviewForm((p) => ({
                    ...p,
                    videoUrl: e.target.value,
                  }))
                }
                className="w-full border p-3 rounded-lg"
                placeholder="Paste YouTube or video URL"
              />

              {/* Video Preview */}
              {interviewForm.videoUrl && (
                <div className="mt-4 border rounded-xl overflow-hidden bg-gray-100">
                  <video
                    src={interviewForm.videoUrl}
                    controls
                    className="w-full h-32 object-cover"
                  />
                </div>
              )}

              <p className="text-xs text-gray-500 mt-2">
                Paste a public video link only. Video files are not uploaded.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              {editingInterviewId
                ? "Update Interview"
                : "Save Interview"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
