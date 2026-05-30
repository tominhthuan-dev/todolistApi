import { useState } from "react";
import { loginApi } from "../../services/authService";

function LoginForm({ setCurrentUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async() => {
    if (!username.trim() || !password.trim()) {
      alert("Nhập đầy đủ thông tin");
      return;
    }

    try {
      const user = await loginApi({ username, password });
      console.log("Login successful:", user);
      setCurrentUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error);
      const message = error?.response?.data?.message ?? "Sai tài khoản hoặc mật khẩu";
      alert(message);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default LoginForm;