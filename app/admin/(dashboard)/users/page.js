"use client";

import { useEffect, useState } from "react";
import UserTable from "../../../component/UserTable";
import Link from "next/link";
import toast from "react-hot-toast";

import {
    deleteAdminUser,
    getAdminsService,
    updateAdminStatusService
} from "../../../services/admin/adminService"

export default function UsersPage() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // ✅ Fetch Admins
    const fetchUsers = async () => {
        try {
            setLoading(true);

            const res = await getAdminsService();

            setUsers(res?.data || res); // depends on your backend format

        } catch (err) {
            toast.error("Failed to load users ❌");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // ✅ Delete / Disable User
    const toggleUser = async (user) => {
        try {
            const newStatus =
                user.status === "active" ? "inactive" : "active";

            const res = await updateAdminStatusService(user._id, newStatus);

            toast.success(res.message);

            fetchUsers();

        } catch (err) {
            toast.error("Failed ");
        }
    };
    const deleteUser = async (id) => {
        try {
            const res = await deleteAdminUser(id);

            toast.success(res.message);

            fetchUsers();

        } catch (err) {
            toast.error("Failed to delete");
        }
    };
    return (
        <div className="p-8 bg-gray-50">

            <div className="flex justify-between mb-6">

                <h1 className="text-3xl font-semibold text-gray-800">
                    Users
                </h1>

                <Link
                    href="/admin/users/create"
                    className="bg-blue-700 rounded-lg text-white px-4 py-2"
                >
                    Create User
                </Link>

            </div>

            {loading ? (
                <p>Loading users...</p>
            ) : (
                <UserTable
                    users={users}
                    toggleUser={toggleUser}
                    deleteUser={deleteUser}
                />
            )}

        </div>
    );
}