import {createContext, useState, useEffect } from "react";
import { getProfileApi } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {

            const token = localStorage.getItem("token");        
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const user = await getProfileApi();
                setCurrentUser(user);
            } catch (error) {
                console.error(error);
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
            } finally {
                setIsLoading(false);
            }   
        };
        loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}