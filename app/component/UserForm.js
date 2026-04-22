"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { createAdminService } from "../services/admin/adminService";

const schema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Minimum 6 digit password required")
});

export default function UserForm({
    defaultValues = {},
    onSubmit,
    isEdit = false,
}) {

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    // ✅ Reset form when editing
    useEffect(() => {
        if (defaultValues && Object.keys(defaultValues).length > 0) {
            reset({
                name: defaultValues.name || "",
                email: defaultValues.email || "",
                password: "", // never prefill password
            });
        }
    }, [defaultValues, reset]);

    const handleFormSubmit = async (data) => {
        try {
            setLoading(true);

            // Remove empty password in edit mode
            if (isEdit && !data.password) {
                delete data.password;
            }

            // Edit
            if (onSubmit) {
                await onSubmit(data);
                return;
            }

            // Create
            await createAdminService({
                ...data,
                role: "CONTENT_ADMIN",
            });

            toast.success("User created successfully 🎉");
            reset();

        } catch (err) {
            toast.error(err?.message || "Something went wrong ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center">

            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                autoComplete="off"
                className="bg-white w-full max-w-xl p-8 rounded-lg shadow-md space-y-6"
            >

                {/* ✅ Hidden inputs to prevent browser autofill */}
                <input type="text" name="fake-username" autoComplete="username" className="hidden" />
                <input type="password" name="fake-password" autoComplete="new-password" className="hidden" />

                <h2 className="text-2xl font-semibold">
                    {isEdit ? "Edit User" : "Create User"}
                </h2>

                {/* Name */}
                <div>
                    <label className="block mb-1 font-medium">
                        Full Name
                    </label>

                    <input
                        {...register("name")}
                        autoComplete="off"
                        placeholder="Enter full name"
                        className="w-full border rounded-md p-3"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1 font-medium">
                        Email Address
                    </label>

                    <input
                        {...register("email")}
                        autoComplete="off"
                        placeholder="Enter email"
                        className="w-full border rounded-md p-3"
                    />

                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="block mb-1 font-medium">
                        Password
                    </label>

                    <input
                        type="password"
                        {...register("password")}
                        autoComplete="new-password" // ✅ key fix
                        placeholder={
                            isEdit
                                ? "Leave blank to keep current password"
                                : "Enter password"
                        }
                        className="w-full border rounded-md p-3"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-3 rounded-md"
                >
                    {loading
                        ? "Processing..."
                        : isEdit
                            ? "Update User"
                            : "Create User"}
                </button>

            </form>

        </div>
    );
}