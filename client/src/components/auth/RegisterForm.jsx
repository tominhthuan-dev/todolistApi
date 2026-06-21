import useAuth from "../../hooks/useAuth";
import { useState } from "react";

function RegisterForm() {
    const { register } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        try {
            console.log("username:", username);
            console.log("password:", password);
            await register(username, password);
            alert("Đăng ký thành công!");
            setUsername("");
            setPassword("");
        } catch (error) {
            console.error(error);
            const errorMessage = error?.response?.data?.message || error.message || "Đăng ký thất bại!";
            alert(errorMessage);
        }

    }

    return (
        <div className="auth-card">
            <h1 className="auth-title">Đăng ký tài khoản</h1>
            <input
                className="auth-input"
                type="text"
                placeholder="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className="auth-input"
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="auth-button" onClick={handleSubmit}>Đăng ký</button>
        </div>
    )
}

export default RegisterForm;