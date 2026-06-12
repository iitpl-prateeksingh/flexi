"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../component/Sidebar";
import Navbar from "../../component/Navbar";
import ConfirmModal from "../../component/common/ConfirmModel";
import "../../adminglobal.css"

export default function AdminLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [confirmState, setConfirmState] = useState({
        isOpen: false,
        title: "Are you sure?",
        description: "This action cannot be undone.",
        confirmText: "Confirm",
        cancelText: "Cancel",
        confirmColor: "bg-red-500",
        onResolve: null,
    });

    useEffect(() => {
        const onConfirmEvent = (event) => {
            const detail = event?.detail || {};
            setConfirmState({
                isOpen: true,
                title: detail.title || "Are you sure?",
                description: detail.description || "This action cannot be undone.",
                confirmText: detail.confirmText || "Confirm",
                cancelText: detail.cancelText || "Cancel",
                confirmColor: detail.confirmColor || "bg-red-500",
                onResolve: detail.resolve || null,
            });
        };

        window.addEventListener("admin:confirm", onConfirmEvent);
        return () => window.removeEventListener("admin:confirm", onConfirmEvent);
    }, []);

    const handleCancelConfirm = () => {
        confirmState.onResolve?.(false);
        setConfirmState((prev) => ({ ...prev, isOpen: false, onResolve: null }));
    };

    const handleAcceptConfirm = () => {
        confirmState.onResolve?.(true);
        setConfirmState((prev) => ({ ...prev, isOpen: false, onResolve: null }));
    };

    return (
        // Removed the outer flex container, using standard block layout
        <div className="min-h-dvh admin-theme relative bg-gray-100">

            {/* Desktop Sidebar - Fixed Position */}
            {/* Note: I used 'w-64' (256px) here. Adjust this to match your actual Sidebar width */}
            <div className="hidden md:block fixed top-0 left-0 h-dvh w-64 z-30">
                <Sidebar />
            </div>

            {/* Mobile Sidebar Drawer */}
            {isSidebarOpen && (
                <>
                    <button
                        className="md:hidden fixed inset-0 bg-black/40 z-40"
                        onClick={() => setIsSidebarOpen(false)}
                        aria-label="Close menu overlay"
                    />
                    <div className="md:hidden fixed left-0 top-0 z-50 h-full">
                        <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
                    </div>
                </>
            )}

            {/* Main Content */}
            {/* Added md:pl-64 to push content to the right of the fixed sidebar on desktop */}
            <div className="flex flex-col min-h-dvh md:pl-70">

                {/* Navbar */}
                <div className="sticky top-0 z-20">
                    <Navbar onToggleSidebar={() => setIsSidebarOpen(true)} />
                </div>

                {/* Main Content Area */}
                <main className="p-4 flex-1 admin-shell-main">
                    {children}
                </main>

            </div>

            <ConfirmModal
                isOpen={confirmState.isOpen}
                onClose={handleCancelConfirm}
                onConfirm={handleAcceptConfirm}
                title={confirmState.title}
                description={confirmState.description}
                confirmText={confirmState.confirmText}
                cancelText={confirmState.cancelText}
                confirmColor={confirmState.confirmColor}
            />

        </div>
    );
}