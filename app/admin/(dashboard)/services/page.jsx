"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

import {
    getAllServicesApi,
    deleteServiceApi
} from "../../../services/services";

import ConfirmModal from "../../../component/common/ConfirmModel";
import ServiceFormModal from "../../../component/serviceFormModel";
import { hasPermission } from "../../../utils/hasPermission";

export default function ServicesAdmin() {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    // ✅ PERMISSIONS
    const canCreate = hasPermission("create_services");
    const canUpdate = hasPermission("update_services"); // ✅ fixed typo
    const canDelete = hasPermission("delete_services");

    const canShowActions = canUpdate || canDelete;

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

    const handleDelete = async () => {
        try {
            await deleteServiceApi(deleteId);
            toast.success("Service deleted");
            fetchServices();
        } catch {
            toast.error("Delete failed");
        }
    };

    return (
        <div className="p-6 md:p-10 bg-gray-50 ">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
                        Services
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage and organize your services
                    </p>
                </div>

                {/* ✅ CREATE BUTTON */}
                {canCreate && (
                    <button
                        onClick={() => {
                            setEditingData(null);
                            setIsFormOpen(true);
                        }}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 transition text-white px-4 py-2 rounded-lg shadow-sm"
                    >
                        <Plus size={18} />
                        Add Service
                    </button>
                )}
            </div>

            {/* TABLE CARD */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full text-md">

                        <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 text-center">S.no</th>
                                <th className="px-6 py-4 text-center">Title</th>
                                <th className="px-6 py-4 text-center">Service</th>
                                <th className="px-6 py-4 text-center">Detail</th>

                                {/* ✅ ACTION HEADER */}
                                {canShowActions && (
                                    <th className="px-6 py-4 text-center">Actions</th>
                                )}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">

                            {services.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={canShowActions ? 5 : 4}
                                        className="text-center py-8 text-gray-500"
                                    >
                                        No services found
                                    </td>
                                </tr>
                            )}

                            {services.map((item, index) => (
                                <tr
                                    key={item._id}
                                    className="hover:bg-gray-50 transition duration-200"
                                >
                                    <td className="px-6 py-4 text-center text-gray-500 font-medium align-middle">
                                        {index + 1}
                                    </td>

                                    <td className="px-6 py-4 text-center font-medium text-gray-800 align-middle">
                                        {item.title}
                                    </td>

                                    <td className="px-6 py-4 flex justify-center align-middle">
                                        <img
                                            src={item.image}
                                            alt="service"
                                            onClick={() => setPreviewImage(item.image)}
                                            className="h-10 w-10 rounded-md object-cover border cursor-pointer hover:scale-110 transition"
                                        />
                                    </td>

                                    <td className="px-6 py-4 text-center text-gray-600 max-w-xs align-middle">
                                        <p className="line-clamp-2">
                                            {item.detail}
                                        </p>
                                    </td>

                                    {/* ✅ ACTIONS */}
                                    {canShowActions && (
                                        <td className="px-6 py-4 text-center align-middle">
                                            <div className="flex justify-center items-center gap-3">

                                                {canUpdate && (
                                                    <button
                                                        onClick={() => {
                                                            setEditingData(item);
                                                            setIsFormOpen(true);
                                                        }}
                                                        className="px-3 py-1 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md transition"
                                                    >
                                                        Edit
                                                    </button>
                                                )}

                                                {canDelete && (
                                                    <button
                                                        onClick={() => {
                                                            setDeleteId(item._id);
                                                            setIsDeleteOpen(true);
                                                        }}
                                                        className="px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition"
                                                    >
                                                        Delete
                                                    </button>
                                                )}

                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* MODALS */}
            <ServiceFormModal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSuccess={fetchServices}
                editingData={editingData}
            />

            <ConfirmModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDelete}
                title="Delete Item"
                description="Are you sure you want to delete this service? This action cannot be undone."
                confirmText="Yes, Delete"
                cancelText="Cancel"
                confirmColor="bg-red-500"
            />

            {previewImage && (
                <div
                    className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50"
                    onClick={() => setPreviewImage(null)}
                >
                    <div
                        className="relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setPreviewImage(null)}
                            className="absolute -top-3 -right-3 bg-white rounded-full px-2 py-1 text-black shadow"
                        >
                            ✕
                        </button>

                        <img
                            src={previewImage}
                            alt="preview"
                            className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}