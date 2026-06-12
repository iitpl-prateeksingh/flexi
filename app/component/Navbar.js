"use client";

import { useState } from "react";
import ConfirmModal from "./common/ConfirmModel";
import { LogOut, Menu } from "lucide-react";

export default function Navbar({ onToggleSidebar }) {

    const [openLogoutModal, setOpenLogoutModal] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("permissions")
        localStorage.removeItem("user")
        window.location.href = "/admin/login";
    };

    return (
        <>
            <header className="sticky top-0 z-50 bg-white px-4 md:px-6 py-4 mb-0 flex justify-between items-center border-b border-[var(--admin-border)]">
                <button
                    type="button"
                    className="md:hidden inline-flex items-center justify-center rounded-lg border border-[var(--admin-border)] bg-white p-2 text-[var(--admin-primary)]"
                    onClick={onToggleSidebar}
                    aria-label="Open menu"
                >
                    <Menu size={18} />
                </button>
                <button
                    className=" ml-auto inline-flex items-center gap-2 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent-hover)] text-white px-4 py-2 rounded-lg transition"
                    onClick={() => setOpenLogoutModal(true)}
                >
                    <LogOut size={16} />
                    Logout
                </button>

            </header>

            <ConfirmModal
                isOpen={openLogoutModal}
                onClose={() => setOpenLogoutModal(false)}
                onConfirm={handleLogout}
                title="Logout Confirmation"
                description="Are you sure you want to logout?"
                confirmText="Yes, Logout"
                cancelText="Stay"
                confirmColor="bg-red-500"
            />
        </>
    );
}
