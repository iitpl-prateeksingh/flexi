"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GripVertical } from "lucide-react";
import QuillEditor from "../../../../component/QuillEditor";
import InterviewFormModal from "./InterviewFormModal";
import { uploadImageService } from "../../../../services/imageService";
import {
  addInterviewItemService,
  deleteInterviewItemService,
  getInterviewPageAdminService,
  updateInterviewHeadingService,
  updateInterviewItemService,
  updateInterviewVideoService,
  reorderInterviewItemsService,
} from "../../../../services/pages/interviewpageService";
import { requestConfirmation } from "../../../../component/common/confirmBus";

export default function InterviewAdminPage() {
  // Date managed by backend — no frontend date input needed
  // const toDateValue = (value) => {
  //   if (!value) return "";
  //   const date = new Date(value);
  //   if (Number.isNaN(date.getTime())) return "";
  //   const pad = (n) => String(n).padStart(2, "0");
  //   return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  // };

  const [headingTitle, setHeadingTitle] = useState("");
  const [headingImage, setHeadingImage] = useState(null);
  const [interviews, setInterviews] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [originalInterviews, setOriginalInterviews] = useState([]);

  const [showInterviewForm, setShowInterviewForm] = useState(false);
  const [editingInterviewId, setEditingInterviewId] = useState(null);
  const [interviewForm, setInterviewForm] = useState({
    title: "",
    description: "",
    thumbnail: null,
    videoUrl: "",
    thumbnailPreview: "",
    // updatedAt: "", // managed by backend
    sortOrder: "",
  });

  const parseUploadUrl = (uploadRes) => uploadRes?.data?.url || uploadRes?.url || "";

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
      // updatedAt: "", // managed by backend
      sortOrder: "",
    });
    setEditingInterviewId(null);
  };

  const fetchData = async () => {
    try {
      const res = await getInterviewPageAdminService();
      const data = res?.data || res;
      if (!data) return;

      setHeadingTitle(data.headingTitle || "");
      setHeadingImage(data.headingImage ? { url: data.headingImage, file: null } : null);
      const interviewsData = (data.interviews || []).slice().sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      setInterviews(interviewsData);
      setOriginalInterviews([...interviewsData]); // Keep backup for cancel functionality
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

      await updateInterviewHeadingService({ headingTitle, headingImage: headingImageUrl });
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
      // updatedAt: toDateValue(item.updatedAt), // managed by backend
      sortOrder: item.sortOrder ?? "",
    });
    setShowInterviewForm(true);
  };

  const saveInterviewForm = async (e) => {
    e.preventDefault();

    try {
      const toastId = editingInterviewId ? "interview-edit" : "interview-add";
      toast.loading(editingInterviewId ? "Updating interview..." : "Adding interview...", {
        id: toastId,
      });

      let thumbnailUrl = interviewForm.thumbnailPreview || "";
      let videoUrl = interviewForm.videoUrl || "";

      if (interviewForm.thumbnail?.file) {
        const imgRes = await uploadImageService(interviewForm.thumbnail.file);
        thumbnailUrl = parseUploadUrl(imgRes);
      }

      if (editingInterviewId) {
        const updateData = {
          title: interviewForm.title,
          description: interviewForm.description,
          thumbnail: thumbnailUrl,
          // updatedAt: interviewForm.updatedAt ? `${interviewForm.updatedAt}T00:00:00.000Z` : null, // managed by backend
        };
        if (interviewForm.sortOrder !== "") {
          updateData.sortOrder = parseInt(interviewForm.sortOrder);
        }
        await updateInterviewItemService(editingInterviewId, updateData);

        await updateInterviewVideoService(editingInterviewId, videoUrl || "");
      } else {
        const addData = {
          title: interviewForm.title,
          description: interviewForm.description,
          thumbnail: thumbnailUrl,
          videoUrl,
          // updatedAt: interviewForm.updatedAt ? `${interviewForm.updatedAt}T00:00:00.000Z` : null, // managed by backend
        };
        if (interviewForm.sortOrder !== "") {
          addData.sortOrder = parseInt(interviewForm.sortOrder);
        }
        await addInterviewItemService(addData);
      }

      toast.success(editingInterviewId ? "Interview updated" : "Interview added", { id: toastId });
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
    const ok = await requestConfirmation({
      title: "Delete Interview",
      description: "Are you sure you want to delete this interview?",
      confirmText: "Yes, Delete",
    });
    if (!ok) return;
    try {
      await deleteInterviewItemService(id);
      toast.success("Interview deleted");
      fetchData();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.outerHTML);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = async (e, dropIndex) => {
    e.preventDefault();
    setDragOverIndex(null);
    
    if (draggedItem === null || draggedItem === dropIndex) {
      setDraggedItem(null);
      return;
    }

    const items = Array.from(interviews);
    const [reorderedItem] = items.splice(draggedItem, 1);
    items.splice(dropIndex, 0, reorderedItem);

    // Update local state immediately for better UX
    setInterviews(items);
    setDraggedItem(null);

    // Show confirmation popup
    const confirmed = await requestConfirmation({
      title: "Confirm Reorder",
      description: `Are you sure you want to move "${reorderedItem.title || 'Untitled'}" to position ${dropIndex + 1}?`,
      confirmText: "Yes, Reorder",
      cancelText: "Cancel",
    });

    if (!confirmed) {
      // Revert to original state if cancelled
      setInterviews([...originalInterviews]);
      toast.info("Reorder cancelled");
      return;
    }

    try {
      // Create reorder payload with new sortOrder values
      const reorderPayload = items.map((item, index) => ({
        id: item._id,
        sortOrder: index + 1,
      }));

      await reorderInterviewItemsService(reorderPayload);
      
      // Update the items with new sortOrder values for immediate UI sync
      const updatedItems = items.map((item, index) => ({
        ...item,
        sortOrder: index + 1,
      }));
      
      setInterviews(updatedItems);
      setOriginalInterviews([...updatedItems]);
      toast.success("Interview order updated");
    } catch (error) {
      toast.error("Failed to update order");
      // Revert to original state on API error
      setInterviews([...originalInterviews]);
    }
  };

  const updateSortOrder = async (itemId, newSortOrder, currentItem) => {
    const parsedOrder = parseInt(newSortOrder);
    if (isNaN(parsedOrder) || parsedOrder < 0) {
      toast.error("Please enter a valid number (0 or greater)");
      setInterviews(interviews.map(i => i._id === itemId ? { ...i, tempSortOrder: undefined } : i));
      return;
    }

    const confirmed = await requestConfirmation({
      title: "Confirm Sort Order Change",
      description: `Are you sure you want to change the sort order of "${currentItem.title || 'Untitled'}" to ${parsedOrder}?`,
      confirmText: "Yes, Update",
      cancelText: "Cancel",
    });

    if (!confirmed) {
      toast.info("Sort order change cancelled");
      setInterviews(interviews.map(i => i._id === itemId ? { ...i, tempSortOrder: undefined } : i));
      return;
    }

    try {
      // Remove the dragged item, insert at new position, reassign sortOrder to all
      const others = interviews.filter(i => i._id !== itemId);
      const clampedOrder = Math.min(parsedOrder, others.length);
      others.splice(clampedOrder, 0, currentItem);

      const reorderPayload = others.map((item, index) => ({
        id: item._id,
        sortOrder: index + 1,
      }));

      await reorderInterviewItemsService(reorderPayload);
      toast.success("Sort order updated");
      fetchData();
    } catch (error) {
      toast.error("Failed to update sort order");
      setInterviews(interviews.map(i => i._id === itemId ? { ...i, tempSortOrder: undefined } : i));
    }
  };

  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Interview Page Manager</h1>

      <form onSubmit={saveHeading} className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Heading Section</h2>
        <QuillEditor value={headingTitle} onChange={setHeadingTitle} height="100px" />

        <div className="mt-6 flex items-center gap-6 flex-wrap">
          {headingImage?.url && (
            <div className="relative w-32 h-32">
              <img src={headingImage.url} alt="heading" className="w-full h-full object-cover rounded-lg border" />
              <button
                type="button"
                onClick={async () => {
                  const ok = await requestConfirmation({
                    title: "Remove Image",
                    description: "Are you sure you want to remove this image?",
                    confirmText: "Yes, Remove",
                  });
                  if (ok) setHeadingImage(null);
                }}
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

        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Save Heading</button>
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

        {interviews.length === 0 && <p className="text-gray-500">No interviews found.</p>}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] lg:min-w-0 table-fixed border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 border-b w-12">Drag</th>
                <th className="text-left p-3 border-b w-16">Order</th>
                <th className="text-left p-3 border-b w-24">Thumbnail</th>
                <th className="text-left p-3 border-b w-[18%]">Title</th>
                <th className="text-left p-3 border-b w-[28%]">Description</th>
                <th className="text-left p-3 border-b w-[26%]">Video Link</th>
                <th className="text-left p-3 border-b w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((item, idx) => (
                <tr
                  key={item._id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, idx)}
                  className={`border-b align-top transition-colors ${
                    draggedItem === idx ? "opacity-50 bg-blue-50" : ""
                  } ${
                    dragOverIndex === idx ? "bg-blue-100 border-blue-300" : ""
                  } hover:bg-gray-50 cursor-move`}
                >
                  <td className="p-3">
                    <div className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600">
                      <GripVertical size={16} />
                    </div>
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      key={`${item._id}-${item.sortOrder ?? idx}`}
                      value={item.tempSortOrder !== undefined ? item.tempSortOrder : (item.sortOrder ?? idx)}
                      onChange={(e) => {
                        // Update local state immediately for controlled input
                        const newInterviews = interviews.map(interview => 
                          interview._id === item._id 
                            ? { ...interview, tempSortOrder: e.target.value }
                            : interview
                        );
                        setInterviews(newInterviews);
                      }}
                      onBlur={(e) => {
                        const newValue = e.target.value;
                        const currentValue = item.sortOrder ?? idx;
                        if (newValue !== currentValue.toString()) {
                          updateSortOrder(item._id, newValue, item);
                        } else {
                          // Reset temp value if no change
                          const newInterviews = interviews.map(interview => 
                            interview._id === item._id 
                              ? { ...interview, tempSortOrder: undefined }
                              : interview
                          );
                          setInterviews(newInterviews);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.target.blur();
                        }
                        if (e.key === 'Escape') {
                          // Reset to original value
                          const newInterviews = interviews.map(interview => 
                            interview._id === item._id 
                              ? { ...interview, tempSortOrder: undefined }
                              : interview
                          );
                          setInterviews(newInterviews);
                          e.target.blur();
                        }
                      }}
                      className="w-12 p-1 border rounded text-center text-sm cursor-text"
                      min="0"
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                    />
                  </td>
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
                  <td className="p-3 text-sm text-gray-700 align-top overflow-hidden">
                    <div
                      className="line-clamp-4 max-w-full break-words whitespace-normal [&_*]:max-w-full [&_*]:break-words"
                      dangerouslySetInnerHTML={{ __html: item.description || "-" }}
                    />
                  </td>
                  <td className="p-3 text-sm align-top overflow-hidden">
                    {item.videoUrl ? (
                      <a
                        href={item.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline break-all max-w-full inline-block"
                      >
                        {item.videoUrl}
                      </a>
                    ) : (
                      <span className="text-gray-400">No video</span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
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
