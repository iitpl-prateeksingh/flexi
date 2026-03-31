"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

import {
    getInsightApi,
    deleteInsightItemApi
} from "../../../services/insightService";

import InsightForm from "../../../component/insight/InsightForm";
import InsightTable from "../../../component/insight/InsightTable";
import InsightModal from "../../../component/insight/InsightModal";
import { hasPermission } from "../../../utils/hasPermission"

export default function InsightPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const fetchData = async () => {
        try {
            const res = await getInsightApi();
            setData(res.data);
        } catch {
            toast.error("Failed to fetch insight");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteInsightItemApi(id);
            toast.success("Deleted");
            fetchData();
        } catch {
            toast.error("Delete failed");
        }
    };

    if (loading) {
        return (
            <div className="p-6">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
                        Insight
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage your insight content and items
                    </p>
                </div>

                {hasPermission("create_insight") && (<button
                    onClick={() => {
                        setEditItem(null);
                        setModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 transition text-white px-4 py-2 rounded-lg shadow-sm"
                >
                    <Plus size={18} />
                    Add Insight
                </button>)}
            </div>

            {/* CONTENT FORM (CARD STYLE) */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
                <InsightForm data={data} refresh={fetchData} />
            </div>

            {/* TABLE CARD */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">

                <div className="px-6 py-4 text-gray-700 font-medium">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Insight Data
                    </h2>
                </div>

                <div className="overflow-x-auto px-6 py-4 pt-0">
                    <InsightTable
                        list={data?.list || []}
                        onEdit={(item) => {
                            setEditItem(item);
                            setModalOpen(true);
                        }}
                        onDelete={handleDelete}
                    />
                </div>
            </div>

            {/* MODAL */}
            {modalOpen && (
                <InsightModal
                    item={editItem}
                    onClose={() => setModalOpen(false)}
                    refresh={fetchData}
                />
            )}
        </div>
    );
}