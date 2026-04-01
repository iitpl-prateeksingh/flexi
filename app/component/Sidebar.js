"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { hasPermission } from "../utils/hasPermission";
import { permission } from "node:process";

export default function Sidebar() {
    const pathname = usePathname();

    const [openPages, setOpenPages] = useState(false);
    const [openStaticPages, setOpenStaticPages] = useState(false);

    // ✅ Dynamic permission-based menu
    const menu = [
        {
            name: "Dashboard",
            path: "/admin/dashboard",
            permission: null,
        },
        {
            name: "Services",
            path: "/admin/services",
            permission: "view_services",
        },
        {
            name: "Users",
            path: "/admin/users",
            permission: "manage_users",
        },
        {
            name: "Settings",
            path: "/admin/settings",
            permission: "update_setting",
        },
        {
            name: "Assign Permissions",
            path: "/admin/roles-permissions",
            permission: "*",
        },
        {
            name: "Insight",
            path: "/admin/insight",
            permission: "view_insight"
        }
    ];

    const pages = [
        {
            name: "Home Page",
            path: "/admin/pages/home",
            permission: "update_home_page",
        },
        {
            name: "About Page",
            path: "/admin/pages/about",
            permission: "update_about_page",
        }, {
            name: "Contact Page",
            path: "/admin/pages/contact",
            permission: "update_contact_page",
        },

    ];

    const staticPages = [
        { name: "Code of conduct", path: "/admin/staticPage/code-of-conduct" },
        { name: "Code of conduct revised", path: "/admin/staticPage/code-of-conduct-revised" },
        { name: "Disclaimer", path: "/admin/staticPage/disclaimer" },
        { name: "Disclosure", path: "/admin/staticPage/disclosure" },
        { name: "Privacy Policy", path: "/admin/staticPage/privacy-policy" },
        { name: "Risk Factor", path: "/admin/staticPage/risk-factor" },
        { name: "SID/SAI/KIM", path: "/admin/staticPage/sid-sai-kim" },
        { name: "Terms and Condition", path: "/admin/staticPage/terms-and-condition" },
    ];

    // ✅ Helpers
    const canViewPages = pages.some(p =>
        !p.permission || hasPermission(p.permission)
    );

    const canViewStaticPages = hasPermission("update_static_pages");

    return (
        <aside className="w-64 min-w-64 shrink-0 bg-black text-white p-6 min-h-screen overflow-y-auto custom-scrollbar">
            <h2 className="text-xl font-bold mb-10">
                Flexi Capital
            </h2>

            <nav className="flex flex-col gap-3">

                {/* ✅ DASHBOARD FIRST */}
                {menu
                    .filter(item => item.name === "Dashboard")
                    .filter(item => {
                        if (!item.permission) return true;
                        return hasPermission(item.permission);
                    })
                    .map((item) => {
                        const active = pathname.startsWith(item.path);

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`p-2 rounded transition
                                ${active
                                        ? "bg-white text-black"
                                        : "hover:bg-gray-700"}
                                `}
                            >
                                {item.name}
                            </Link>
                        );
                    })}

                {/* ✅ PAGES */}
                {canViewPages && (
                    <div>
                        <button
                            onClick={() => setOpenPages(!openPages)}
                            className="w-full text-left p-2 rounded hover:bg-gray-700 flex justify-between items-center"
                        >
                            Pages
                            <ChevronRight
                                size={16}
                                className={`transition-transform duration-200 ${openPages ? "rotate-90" : ""}`}
                            />
                        </button>

                        {openPages && (
                            <div className="ml-4 mt-2 flex flex-col gap-2">
                                {pages
                                    .filter(p => !p.permission || hasPermission(p.permission))
                                    .map((page) => {
                                        const active = pathname === page.path;

                                        return (
                                            <Link
                                                key={page.path}
                                                href={page.path}
                                                className={`p-2 rounded text-sm transition
                                                ${active
                                                        ? "bg-white text-black"
                                                        : "hover:bg-gray-700"}
                                                `}
                                            >
                                                {page.name}
                                            </Link>
                                        );
                                    })}
                            </div>
                        )}
                    </div>
                )}

                {/* ✅ STATIC PAGES */}
                {canViewStaticPages && (
                    <div>
                        <button
                            onClick={() => setOpenStaticPages(!openStaticPages)}
                            className="w-full text-left p-2 rounded hover:bg-gray-700 flex justify-between items-center"
                        >
                            Static Pages
                            <ChevronRight
                                size={16}
                                className={`transition-transform duration-200 ${openStaticPages ? "rotate-90" : ""}`}
                            />
                        </button>

                        {openStaticPages && (
                            <div className="ml-4 mt-2 flex flex-col gap-2">
                                {staticPages.map((page) => {
                                    const active = pathname === page.path;

                                    return (
                                        <Link
                                            key={page.path}
                                            href={page.path}
                                            className={`p-2 rounded text-sm transition
                                            ${active
                                                    ? "bg-white text-black"
                                                    : "hover:bg-gray-700"}
                                            `}
                                        >
                                            {page.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* ✅ REST MENU */}
                {menu
                    .filter(item => item.name !== "Dashboard")
                    .filter(item => {
                        if (!item.permission) return true;
                        return hasPermission(item.permission);
                    })
                    .map((item) => {
                        const active = pathname.startsWith(item.path);

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`p-2 rounded transition
                                ${active
                                        ? "bg-white text-black"
                                        : "hover:bg-gray-700"}
                                `}
                            >
                                {item.name}
                            </Link>
                        );
                    })}

            </nav>
        </aside>
    );
}