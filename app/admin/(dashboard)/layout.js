"use client";

import Sidebar from "../../component/Sidebar";
import Navbar from "../../component/Navbar";
import "../../adminglobal.css"

export default function AdminLayout({ children }) {
    return (
        <div className="flex h-screen">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex flex-col flex-1">

                <Navbar />

                <main className="p-6 overflow-y-auto flex-1 bg-gray-100">
                    {children}
                </main>

            </div>

        </div>
    );
}