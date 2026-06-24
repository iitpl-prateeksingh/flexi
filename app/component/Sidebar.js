"use client";

import {
  ChevronRight,
  LayoutDashboard,
  FileText,
  Settings,
  Users,
  BriefcaseBusiness,
  Newspaper,
  ShieldCheck,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { hasPermission } from "../utils/hasPermission";

export default function Sidebar({ className = "", onNavigate }) {
  const pathname = usePathname();

  const [openPages, setOpenPages] = useState(false);
  const [openStaticPages, setOpenStaticPages] = useState(false);

  const menu = [
    // { name: "Dashboard", path: "/admin/dashboard", permission: null, icon: LayoutDashboard },
    { name: "Services", path: "/admin/services", permission: "view_services", icon: BriefcaseBusiness },
    { name: "Users", path: "/admin/users", permission: "manage_users", icon: Users },
    { name: "Settings", path: "/admin/settings", permission: "update_setting", icon: Settings },
    { name: "Assign Permissions", path: "/admin/roles-permissions", permission: "*", icon: ShieldCheck },
    { name: "Insight", path: "/admin/insight", permission: "view_insight", icon: Newspaper },
    { name: "Blogs", path: "/admin/blogs", permission: "view_insight", icon: FileText },
  ];

  const pages = [
    { name: "Home Page", path: "/admin/pages/home", permission: "update_home_page" },
    { name: "About Page", path: "/admin/pages/about", permission: "update_about_page" },
    { name: "Contact Page", path: "/admin/pages/contact", permission: "update_contact_page" },
    { name: "Interview Page", path: "/admin/pages/interview", permission: "update_about_page" },
  ];

  const staticPages = [
    // { name: "Code of conduct", path: "/admin/staticPage/code-of-conduct" },
    // { name: "Code of conduct revised", path: "/admin/staticPage/code-of-conduct-revised" },
    { name: "Disclaimer", path: "/admin/staticPage/disclaimer" },
    { name: "Disclosure", path: "/admin/staticPage/disclosure" },
    { name: "Privacy Policy", path: "/admin/staticPage/privacy-policy" },
    { name: "Risk Factor", path: "/admin/staticPage/risk-factor" },
    // { name: "SID/SAI/KIM", path: "/admin/staticPage/sid-sai-kim" },
    {
      name: "Terms and Condition",
      path: "/admin/staticPage/terms-and-condition",
    },
    { name: "FAQ's", path: "/admin/staticPage/faq" },
  ];

  const canViewPages = pages.some((p) => !p.permission || hasPermission(p.permission));
  const canViewStaticPages = hasPermission("update_static_pages");

  return (
    <aside className={`w-72 min-w-72 shrink-0 h-dvh bg-[var(--admin-sidebar)] text-white p-6 overflow-y-auto custom-scrollbar border-r border-[#ffffff1a] ${className}`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <p className="text-3xl uppercase text-white mb-2">Flexi Capital</p>
        <button
          className="md:hidden rounded-md p-1.5 text-white/80 hover:bg-white/10"
          onClick={onNavigate}
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex flex-col gap-3">
        {menu
          .filter((item) => item.name === "Dashboard")
          .filter((item) => (!item.permission ? true : hasPermission(item.permission)))
          .map((item) => {
            const active = pathname.startsWith(item.path);
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={onNavigate}
                className={`p-3 rounded-xl transition flex items-center gap-3 ${
                  active
                    ? "bg-white text-[var(--admin-sidebar)] shadow-[0_8px_20px_rgba(0,0,0,0.2)]"
                    : "text-white/85 hover:bg-[var(--admin-sidebar-soft)]"
                }`}
              >
                <Icon size={17} />
                {item.name}
              </Link>
            );
          })}

        {canViewPages && (
          <div>
            <button
              onClick={() => setOpenPages(!openPages)}
              className="w-full text-left p-3 rounded-xl hover:bg-[var(--admin-sidebar-soft)] text-white/90 flex justify-between items-center"
            >
              <span className="flex items-center gap-3">
                <FileText size={16} />
                Pages
              </span>
              <ChevronRight size={16} className={`transition-transform duration-200 ${openPages ? "rotate-90" : ""}`} />
            </button>

            {openPages && (
              <div className="ml-4 mt-2 flex flex-col gap-2">
                {pages
                  .filter((p) => !p.permission || hasPermission(p.permission))
                  .map((page) => {
                    const active = pathname === page.path;

                    return (
                      <Link
                        key={page.path}
                        href={page.path}
                        onClick={onNavigate}
                        className={`p-2.5 rounded-lg text-sm transition block ${
                          active
                            ? "bg-white text-[var(--admin-sidebar)]"
                            : "text-white/75 hover:bg-[var(--admin-sidebar-soft)]"
                        }`}
                      >
                        {page.name}
                      </Link>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {canViewStaticPages && (
          <div>
            <button
              onClick={() => setOpenStaticPages(!openStaticPages)}
              className="w-full text-left p-3 rounded-xl hover:bg-[var(--admin-sidebar-soft)] text-white/90 flex justify-between items-center"
            >
              <span className="flex items-center gap-3">
                <FileText size={16} />
                Static Pages
              </span>
              <ChevronRight size={16} className={`transition-transform duration-200 ${openStaticPages ? "rotate-90" : ""}`} />
            </button>

            {openStaticPages && (
              <div className="ml-4 mt-2 flex flex-col gap-2">
                {staticPages.map((page) => {
                  const active = pathname === page.path;

                  return (
                    <Link
                      key={page.path}
                      href={page.path}
                      onClick={onNavigate}
                      className={`p-2.5 rounded-lg text-sm transition block ${
                        active
                          ? "bg-white text-[var(--admin-sidebar)]"
                          : "text-white/75 hover:bg-[var(--admin-sidebar-soft)]"
                      }`}
                    >
                      {page.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {menu
          .filter((item) => item.name !== "Dashboard")
          .filter((item) => (!item.permission ? true : hasPermission(item.permission)))
          .map((item) => {
            const active = pathname.startsWith(item.path);
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={onNavigate}
                className={`p-3 rounded-xl transition flex items-center gap-3 ${
                  active
                    ? "bg-white text-[var(--admin-sidebar)] shadow-[0_8px_20px_rgba(0,0,0,0.2)]"
                    : "text-white/85 hover:bg-[var(--admin-sidebar-soft)]"
                }`}
              >
                <Icon size={17} />
                {item.name}
              </Link>
            );
          })}
      </nav>
    </aside>
  );
}
