"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import UserForm from "../../../../../component/UserForm";

import {
    getAdminsService,
    updateAdminService
} from "../../../../../services/admin/adminService";

export default function EditUserPage() {

    const { id } = useParams();
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // ✅ Fetch user
    const fetchUser = async () => {
        try {
            const res = await getAdminsService();

            const users = res?.data || res;

            const foundUser = users.find(
                (u) => String(u._id) === String(id)
            );

            if (!foundUser) {
                toast.error("User not found ❌");
                router.push("/admin/users");
                return;
            }

            setUser(foundUser);

        } catch (err) {
            toast.error("Failed to load user ❌");
        }
    };

    useEffect(() => {
        if (id) fetchUser();
    }, [id]);

    // ✅ Update user
    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const payload = {
                name: data.name,
                email: data.email,
            };

            // ✅ Only send password if filled
            if (data.password && data.password.trim() !== "") {
                payload.password = data.password;
            }

            console.log("FINAL PAYLOAD:", payload);

            await updateAdminService(id, payload);

            toast.success("User updated successfully ✅");
            router.push("/admin/users");

        } catch (err) {
            toast.error(err?.message || "Update failed ❌");
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <p className="p-6">Loading...</p>;

    return (
        <UserForm
            key={user._id} // 🔥 FORCE RE-RENDER FIX
            defaultValues={user}
            onSubmit={onSubmit}
            isEdit={true}
            loading={loading}
        />
    );
}