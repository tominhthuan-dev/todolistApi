import { useState } from "react";
import useAuth from "../../hooks/useAuth";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const handleLogin = async() => {
    if (!username.trim() || !password.trim()) {
      alert("Nhập đầy đủ thông tin");
      return;
    }

    try {
      await login(username, password);
    } catch (error) {
      alert("Đăng nhập thất bại");
    }     
  };

  return (
    <div className="auth-card">
      <h1 className="auth-title">Đăng nhập</h1>

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

      <button className="auth-button" onClick={handleLogin}>
        Đăng nhập
      </button>
    </div>
  );
}

export default LoginForm;