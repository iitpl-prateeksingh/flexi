"use client";

import UserForm from "../../../../component/UserForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { createAdminService } from "../../../../services/admin/adminService";

export default function CreateUserPage() {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            await createAdminService(data);

            toast.success("User created successfully ");

            router.push("/admin/users");

        } catch (err) {
            toast.error(err?.message || "Failed to create user ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <UserForm
            onSubmit={onSubmit}
            isEdit={false}
            loading={loading}
        />
    );
}