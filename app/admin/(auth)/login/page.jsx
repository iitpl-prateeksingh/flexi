"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { loginService } from "../../../services/authService/authService";

export default function AdminLogin() {
    const searchParams = useSearchParams();
    const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const hasShownToast = useRef(false);

    useEffect(() => {
        const reason = searchParams.get("reason");

        if (reason === "inactive" && !hasShownToast.current) {
            toast.error("Your account is currently inactive. Please contact support.");
            hasShownToast.current = true;
        }
    }, [searchParams]);
    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            setLoading(true);

            const res = await loginService({
                email,
                password
            });

            // ✅ Save token
            console.log(res, "REsponse of auth ", res.token, res.user.role)

            localStorage.setItem("token", res.token);
            console.log(localStorage.getItem("token"))

            localStorage.setItem("user", JSON.stringify(res.user) || [])

            toast.success("Login successful");

            // Redirect
            console.log(localStorage.getItem("token"), "*****************token")
            const response = await fetch(`${BaseUrl}/admin/me`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log("DATA", data)

            localStorage.setItem(
                "permissions",
                JSON.stringify(data.permissions || [])
            );
            window.location.href = "/admin/dashboard";

        } catch (err) {
            console.log(err)
            toast.error(err?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">

                <h2 className="text-2xl font-bold text-center mb-6">
                    Admin Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="admin@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

            </div>

        </div>
    );
}