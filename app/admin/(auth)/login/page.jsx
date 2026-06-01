"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { loginService } from "../../../services/authService/authService";

export default function AdminLogin() {
    const searchParams = useSearchParams();
    const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dev.invoidea.in/flexi/api";
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
            window.location.href = "/admin/pages/home";

        } catch (err) {
            console.log(err)
            toast.error(err?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[radial-gradient(circle_at_top,_#ffffff,_#f7f4ee_50%,_#f2ede4)] px-4">

            <div className="w-full max-w-md p-8 admin-card">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--admin-muted)] text-center mb-2">
                    Flexi Capital
                </p>
                <h2 className="text-3xl font-semibold text-center mb-6 text-[var(--admin-primary)] font-playfair">
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
                            className="w-full px-3 py-2.5 border border-[var(--admin-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8c7a2] focus:border-[var(--admin-accent)]"
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
                            className="w-full px-3 py-2.5 border border-[var(--admin-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8c7a2] focus:border-[var(--admin-accent)]"
                            required
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[var(--admin-accent)] text-white py-2.5 rounded-lg hover:bg-[var(--admin-accent-hover)] transition disabled:bg-gray-400"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

            </div>

        </div>
    );
}
