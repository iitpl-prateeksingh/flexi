"use client";

import Link from "next/link";
import { useState } from "react";
import ConfirmModal from "./common/ConfirmModel";

export default function UserTable({ users, toggleUser, deleteUser }) {

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setOpenDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedUser) return;

        await deleteUser(selectedUser._id);
        setOpenDeleteModal(false);
        setSelectedUser(null);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-md text-center">

                    <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4 tect-center">Name</th>
                            <th className="px-6 py-4 tect-center">Email</th>
                            <th className="px-6 py-4 tect-center">Role</th>
                            <th className="px-6 py-4 tect-center">Status</th>
                            <th className="px-6 py-4  tect-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">

                        {users.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-8 text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}

                        {users.map((user) => (
                            <tr
                                key={user._id}
                                className="hover:bg-gray-50 transition duration-200"
                            >
                                <td className="px-6 py-4 font-medium text-gray-800">
                                    {user.name}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {user.email}
                                </td>

                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-700 rounded-full">
                                        {user.role?.replace(/_/g, " ")}
                                    </span>
                                </td>

                                {/* STATUS */}
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 text-sm font-semibold rounded-full ${user.status === "active"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {user.status?.charAt(0).toUpperCase() + user.status?.slice(1)}
                                    </span>
                                </td>

                                <td className="px-6 py-4 flex justify-end gap-3 items-center">

                                    {/* TOGGLE */}
                                    <div
                                        onClick={() => toggleUser(user)}
                                        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${user.status === "active"
                                            ? "bg-green-500"
                                            : "bg-gray-400"
                                            }`}
                                    >
                                        <div
                                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${user.status === "active"
                                                ? "translate-x-6"
                                                : "translate-x-0"
                                                }`}
                                        />
                                    </div>

                                    {/* EDIT */}
                                    <Link
                                        href={`/admin/users/edit/${user._id}`}
                                        className="px-3 py-1 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md transition"
                                    >
                                        Edit
                                    </Link>

                                    {/* DELETE */}
                                    <button
                                        onClick={() => handleDeleteClick(user)}
                                        className="px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition"
                                    >
                                        Delete
                                    </button>


                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            {/* ✅ DELETE CONFIRM MODAL */}
            <ConfirmModal
                isOpen={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                title="Delete User"
                description={`Are you sure you want to delete ${selectedUser?.name || "this user"
                    }? This action cannot be undone.`}
                confirmText="Yes, Delete"
                cancelText="Cancel"
                confirmColor="bg-red-500"
            />
        </div>
    );
}