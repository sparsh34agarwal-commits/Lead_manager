import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback
} from "react";

import api from "../services/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check whether a valid session already exists
    const refreshUser = useCallback(async () => {
        try {
            const res = await api.get("/auth/me");

            setUser(res.data.user);

            return res.data.user;

        } catch (error) {
            setUser(null);
            return null;

        } finally {
            setLoading(false);
        }
    }, []);

    // Run once when the provider mounts
    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    // Logout function
    const logout = async () => {
        await api.post("/auth/logout");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                logout,
                refreshUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};