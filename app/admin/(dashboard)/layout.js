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
        <div className="flex h-dvh overflow-hidden admin-theme relative">

            {/* Desktop Sidebar */}
            <div className="hidden md:block">
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
            <div className="flex flex-col flex-1 min-h-0">

                <Navbar onToggleSidebar={() => setIsSidebarOpen(true)} />

                <main className="p-4 pt-4 overflow-y-auto flex-1 min-h-0 bg-gray-100 admin-shell-main">
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
