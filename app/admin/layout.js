"use client";
import "../adminglobal.css"
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();

    const [loading, setLoading] = useState(true);
    const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("permissions");
        localStorage.removeItem("user");

        // ✅ Redirect with message flag
        window.location.href = "/admin/login?reason=inactive";
    };
    useEffect(() => {
        const updatePermissions = async () => {
            try {
                const res = await fetch(`${BaseUrl}/admin/me`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = await res.json();
                console.log("DATA", data);

                // 🔥 AUTO LOGOUT IF INACTIVE
                if (!res.ok && data?.statusCode === 402) {
                    handleLogout();
                    return;
                }

                if (!res.ok) {
                    console.error("API error:", data);
                    return;
                }

                localStorage.setItem(
                    "permissions",
                    JSON.stringify(data.permissions || [])
                );

            } catch (error) {
                console.error("Permission fetch error:", error);
            }
        };

        updatePermissions();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (pathname === "/admin/login") {
            if (token) {
                router.replace("/admin/dashboard");
            } else {
                setLoading(false);
            }
            return;
        }

        if (!token) {
            router.replace("/admin/login");
        } else {
            setLoading(false);
        }
    }, [pathname, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Checking authentication...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {children}
        </div>
    );
}