"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
    getInsightApi,
    deleteInsightItemApi
} from "../../../services/insightService";

import InsightForm from "../../../component/insight/InsightForm";

export default function InsightPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    // ==============================
    // ✅ FETCH INSIGHT + BLOGS
    // ==============================
    const fetchData = async () => {
        try {
            setLoading(true);

            const res = await getInsightApi();

            const insight = res?.data;

            setData(insight);

        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch insight");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // ==============================
    // ✅ DELETE INSIGHT (optional)
    // ==============================
    const handleInsightDelete = async (id) => {
        try {
            await deleteInsightItemApi(id);
            toast.success("Insight deleted");
            fetchData();
        } catch {
            toast.error("Delete failed");
        }
    };

    // ==============================
    // ✅ LOADING
    // ==============================
    if (loading) {
        return (
            <div className="p-10">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">

            {/* ================= HEADER ================= */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
                        Insight
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage your insight content and items.
                    </p>
                </div>

                {/* OPTIONAL DELETE INSIGHT */}
                {/* <button
                    onClick={() => handleInsightDelete(data._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                    Delete Insight
                </button> */}

            </div>

            {/* ================= INSIGHT FORM ================= */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
                <InsightForm data={data} refresh={fetchData} />
            </div>

        </div>
    );
}