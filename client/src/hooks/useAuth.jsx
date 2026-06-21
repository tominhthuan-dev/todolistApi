import {useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import {loginApi, getProfileApi, registerApi} from "../services/authService";

function useAuth() {
    const {currentUser, setCurrentUser, isLoading } = useContext(AuthContext);
    const login = async (username, password) => {
        const result = await loginApi({ username, password });
        const accessToken = result.access_token;
        const refreshToken = result.refresh_token;

        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        //lấy thông tin user
        const user = await getProfileApi(accessToken);
        setCurrentUser(user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setCurrentUser(null);
    };

    const register = async (username, password) => {
        return registerApi({ username, password });
    };
    return { currentUser, isLoading, login, logout, register };
}
export default useAuth;
