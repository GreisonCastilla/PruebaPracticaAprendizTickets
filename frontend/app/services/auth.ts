export const getAuthHeaders = () => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("access");
        return {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        };
    }
    return {
        "Content-Type": "application/json",
    };
};
