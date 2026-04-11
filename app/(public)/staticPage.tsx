'use client';

import { useEffect, useState } from 'react';
import API from '../services/api';

const StaticPage = ({ pageType }: { pageType: string }) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchPage = async () => {
        try {
            const res = await API.get(`/static/${pageType}`);

            // ✅ FIX: store full data object
            console.log("API RESPONSE ", res.data)
            setData(res.data);
        } catch (error) {
            console.error('Error fetching page:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (pageType) {
            fetchPage();
        }
    }, [pageType]);

    console.log("Data of staticPAge", data)
    if (loading) {
        return <div className="text-center py-20">Loading...</div>;
    }

    if (!data) {
        return <div className="text-center py-20">No Data Found</div>;
    }

    return (
        <div className="min-h-screen bg-white">

            {/* Header */}
            <div className="bg-[#0A2540] text-white py-12   text-center">

            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto py-10">
                <h1 className="text-3xl mt-5 font-semibold">
                    {data.pageTitle}
                </h1>

                <div
                    className="prose max-w-none text-black"
                    dangerouslySetInnerHTML={{
                        __html: data?.contentRef?.content || '',
                    }}
                />
            </div>

        </div>
    );
};

export default StaticPage;