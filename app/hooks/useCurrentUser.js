import { useEffect, useState } from "react";
import API from "../services/api";

export const useCurrentUser = (shouldFetch) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);


    const fetchUser = async () => {
        try {
            setLoading(true);
            const res = await API.get("/admin/me");
            console.log(res, "RES")
            setUser(res); // ✅ correct

        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (shouldFetch && token) {
            fetchUser();
        }
    }, [shouldFetch]);

    return { user, loading, refetchUser: fetchUser };
};