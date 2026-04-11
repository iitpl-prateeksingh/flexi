"use client";

import { useState } from "react";
import ConfirmModal from "./common/ConfirmModel";

export default function Navbar() {

    const [openLogoutModal, setOpenLogoutModal] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("permissions")
        localStorage.removeItem("user")
        window.location.href = "/admin/login";
    };

    return (
        <>
            <header className="bg-white shadow p-4 flex justify-between">

                <h1 className="font-semibold text-lg">
                    Admin Dashboard
                </h1>

                <button
                    className="text-red-500"
                    onClick={() => setOpenLogoutModal(true)}
                >
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