"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Plus, ChevronDown, ChevronUp, Edit, Trash2 } from "lucide-react";

import {
  getAllServicesApi,
  deleteServiceApi,
  getSubServicesApi,
  addSubServiceApi,
  updateSubServiceApi,
  deleteSubServiceApi,
} from "../../../services/services";

import {
  getAllValuesApi,
  createValueApi,
  updateValueApi,
  deleteValueApi,
} from "../../../services/valueService";

import { uploadVideoService } from "../../../services/videoService";

import ConfirmModal from "../../../component/common/ConfirmModel";
import { hasPermission } from "../../../utils/hasPermission";

export default function ServicesAdmin() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedServices, setExpandedServices] = useState(new Set());

  // Modal states
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [subServiceModal, setSubServiceModal] = useState({
    isOpen: false,
    serviceId: null,
    editingData: null,
  });
  const [subServiceForm, setSubServiceForm] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [valueData, setValueData] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoUploading, setVideoUploading] = useState(false);

  // Permissions
  const canCreate = hasPermission("create_services");
  const canUpdate = hasPermission("update_services");
  const canDelete = hasPermission("delete_services");

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await getAllServicesApi();
      setServices(res.data || []);
    } catch {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const toggleExpand = (serviceId) => {
    setExpandedServices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId);
      } else {
        newSet.add(serviceId);
      }
      return newSet;
    });
  };

  const fetchValue = async () => {
    try {
      const res = await getAllValuesApi();
      setValueData(res.data?.[0] || null); // only one video
    } catch {
      toast.error("Failed to load video");
    }
  };
  useEffect(() => {
    fetchServices();
    fetchValue();
  }, []);
  const handleDeleteService = async () => {
    try {
      await deleteServiceApi(deleteId);
      toast.success("Service deleted");
      fetchServices();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleDeleteSubService = async (serviceId, subServiceId) => {
    try {
      await deleteSubServiceApi(serviceId, subServiceId);
      toast.success("Sub-service deleted");
      fetchServices();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleSubServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      const { serviceId, editingData } = subServiceModal;
      const payload = {
        title: subServiceForm.title,
        description: subServiceForm.description,
        image: subServiceForm.image?.url || null,
      };

      if (editingData) {
        await updateSubServiceApi(serviceId, editingData._id, payload);
        toast.success("Sub-service updated");
      } else {
        await addSubServiceApi(serviceId, payload);
        toast.success("Sub-service added");
      }

      setSubServiceModal({ isOpen: false, serviceId: null, editingData: null });
      setSubServiceForm({ title: "", description: "", image: null });
      fetchServices();
    } catch {
      toast.error("Operation failed");
    }
  };
const handleVideoUpload = async () => {
  if (!videoFile) {
    toast.error("Please select a video");
    return;
  }

  try {
    setVideoUploading(true);

    // Upload video
    const uploadRes = await uploadVideoService(videoFile);
    const videoUrl = uploadRes.data?.url;

    if (valueData?._id) {
      // ✅ UPDATE EXISTING
      await updateValueApi(valueData._id, { videoUrl });
      toast.success("Video updated successfully");
    } else {
      // ✅ CREATE NEW
      await createValueApi({ videoUrl });
      toast.success("Video uploaded successfully");
    }

    setVideoFile(null);
    fetchValue();
  } catch {
    toast.error("Upload failed");
  } finally {
    setVideoUploading(false);
  }
};
  const handleDeleteVideo = async () => {
    try {
      await deleteValueApi(valueData._id);
      toast.success("Video deleted");
      setValueData(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Services
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and organize your services and sub-services
          </p>
        </div>

        {canCreate && (
          <button
            onClick={() => router.push("/admin/services/create")}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 transition text-white px-4 py-2 rounded-lg shadow-sm"
          >
            <Plus size={18} />
            Add Service
          </button>
        )}
      </div>

      {/* SERVICES LIST */}
      <div className="space-y-4">
        {services.length === 0 && !loading && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center text-gray-500">
            No services found
          </div>
        )}

        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
          >
            {/* Service Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={service.image}
                    alt="service"
                    className="h-12 w-12 rounded-lg object-cover border"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{service.detail}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleExpand(service._id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    {expandedServices.has(service._id) ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>

                  {canUpdate && (
                    <button
                      onClick={() =>
                        router.push(`/admin/services/${service._id}/update`)
                      }
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    >
                      <Edit size={18} />
                    </button>
                  )}

                  {canDelete && (
                    <button
                      onClick={() => {
                        setDeleteId(service._id);
                        setIsDeleteOpen(true);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Sub-services Section */}
            {expandedServices.has(service._id) && (
              <div className="p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-md font-medium text-gray-700">
                    Sub-services
                  </h4>
                  {canUpdate && (
                    <button
                      onClick={() =>
                        setSubServiceModal({
                          isOpen: true,
                          serviceId: service._id,
                          editingData: null,
                        })
                      }
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      <Plus size={16} />
                      Add Sub-service
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {service.subServices?.length === 0 && (
                    <p className="text-gray-500 text-sm">No sub-services</p>
                  )}

                  {service.subServices?.map((subService) => (
                    <div
                      key={subService._id}
                      className="flex items-center justify-between bg-white p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        {subService.image && (
                          <img
                            src={subService.image}
                            alt="sub-service"
                            className="h-8 w-8 rounded object-cover border"
                          />
                        )}
                        <div>
                          <h5 className="font-medium text-gray-800">
                            {subService.title}
                          </h5>
                          <p className="text-gray-600 text-sm">
                            {subService.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {canUpdate && (
                          <button
                            onClick={() => {
                              setSubServiceModal({
                                isOpen: true,
                                serviceId: service._id,
                                editingData: subService,
                              });
                              setSubServiceForm({
                                title: subService.title,
                                description: subService.description,
                                image: subService.image
                                  ? { url: subService.image }
                                  : null,
                              });
                            }}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit size={16} />
                          </button>
                        )}

                        {canDelete && (
                          <button
                            onClick={() =>
                              handleDeleteSubService(
                                service._id,
                                subService._id,
                              )
                            }
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* VIDEO VALUE SECTION */}
      <div className="bg-white rounded-xl mt-6 shadow-lg border border-gray-200 p-6 ">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Values Video</h2>
          <p className="text-sm text-gray-500">
            Upload or update your website video
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          {/* VIDEO PREVIEW BOX */}
          <div className="w-full max-w-md h-56 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50 overflow-hidden">
            {videoFile ? (
              <video
                src={URL.createObjectURL(videoFile)}
                className="w-full h-40 object-cover"
                controls
              />
            ) : valueData?.videoUrl ? (
              <video
                src={valueData.videoUrl}
                className="w-full h-40 object-cover"
                controls
              />
            ) : (
              <span className="text-gray-400 text-sm h-40 flex items-center justify-center p-2">
                No video selected
              </span>
            )}
          </div>

          {/* SINGLE BUTTON */}
          <label className="cursor-pointer">
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                // Optional validation (20MB)
                if (file.size > 20 * 1024 * 1024) {
                  toast.error("Video must be less than 20MB");
                  return;
                }

                setVideoFile(file);
              }}
            />

            <div className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
              {valueData?.videoUrl ? "Replace Video" : "Upload Video"}
            </div>
          </label>

          {/* SAVE BUTTON */}
          {videoFile && (
            <button
              onClick={handleVideoUpload}
              disabled={videoUploading}
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 text-sm"
            >
              {videoUploading ? "Processing..." : "Save Video"}
            </button>
          )}

          {/* DELETE BUTTON */}
          {valueData?.videoUrl && !videoFile && canDelete && (
            <button
              onClick={handleDeleteVideo}
              className="text-red-500 text-sm hover:underline"
            >
              Delete Video
            </button>
          )}
        </div>
      </div>
      {/* DELETE MODAL */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteService}
        title="Delete Service"
        description="Are you sure you want to delete this service? This will also delete all its sub-services."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        confirmColor="bg-red-500"
      />

      {/* SUB-SERVICE MODAL */}
      {subServiceModal.isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {subServiceModal.editingData
                ? "Edit Sub-service"
                : "Add Sub-service"}
            </h2>

            <form onSubmit={handleSubServiceSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter sub-service title"
                  className="w-full mt-1 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none p-3 rounded-lg text-sm"
                  value={subServiceForm.title}
                  onChange={(e) =>
                    setSubServiceForm({
                      ...subServiceForm,
                      title: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  placeholder="Enter description"
                  rows={3}
                  className="w-full mt-1 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none p-3 rounded-lg text-sm"
                  value={subServiceForm.description}
                  onChange={(e) =>
                    setSubServiceForm({
                      ...subServiceForm,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Image
                </label>
                <div className="mt-2 flex items-center gap-4">
                  {subServiceForm.image?.url ? (
                    <div className="relative group">
                      <img
                        src={subServiceForm.image.url}
                        className="h-16 w-16 rounded-lg object-cover border shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setSubServiceForm({ ...subServiceForm, image: null })
                        }
                        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="h-16 w-16 flex items-center justify-center rounded-lg border border-dashed border-gray-300 text-gray-400 text-xs">
                      No Image
                    </div>
                  )}
                  <label className="cursor-pointer">
                    <div className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                      Upload
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        if (file.size > 2 * 1024 * 1024) {
                          toast.error("Image must be less than 2MB");
                          return;
                        }
                        setSubServiceForm({
                          ...subServiceForm,
                          image: { file, url: URL.createObjectURL(file) },
                        });
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setSubServiceModal({
                      isOpen: false,
                      serviceId: null,
                      editingData: null,
                    });
                    setSubServiceForm({
                      title: "",
                      description: "",
                      image: null,
                    });
                  }}
                  className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
