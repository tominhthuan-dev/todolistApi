import { useState } from "react";
import AdminPage from "./components/admin/AdminPage";
import Login from "./components/Login";
import UserPage from "./components/user/UserPage";

 const users = [
    { username: "admin", password: "admin", role: "admin" },
    { username: "user1", password: "user1", role: "user" },
    { username: "user2", password: "user2", role: "user" },
    { username: "user3", password: "user3", role: "user" },
  ];
function App() {
  // chức năng login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = () => {
    if (!username.trim() || !password.trim())
      return;

    const foundUser = users.find(
      (e) => e.username === username && e.password === password
    );

    // nếu không đúng tài khoản
    if (!foundUser) {
      alert("Sai tài khoản hoặc mật khẩu");
      return;
    }

    // lưu localStorage
    // localStorage.setItem("currentUser",foundUser.username);

    // cập nhật state
    setCurrentUser(foundUser);


    // reset input
    setUsername("");
    setPassword("");
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // NẾU CHƯA LOGIN
  if (!currentUser) {
    return (
      <Login
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onLogin={handleLogin}
      />
    );
  }

  if (currentUser.role === "admin") {
    return (
      <AdminPage 
        onLogout={handleLogout}
        users={users}
        currentUser={currentUser}
      />
    );
  }
  // USER PAGE
  return (
  <>
    <UserPage
      //chức năng login
      currentUser={currentUser}
      onLogout={handleLogout}
    />
  </>
  );
}

export default App