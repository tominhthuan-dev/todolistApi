import { useState } from "react";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";

function App() {
  
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // NẾU CHƯA LOGIN
  if (!currentUser) {
    console.log("Current user:", currentUser);
    return (
      <LoginPage
        setCurrentUser={setCurrentUser}
      />
    );
  }

  if (currentUser.role === "admin") {
    return (
      <AdminPage 
        onLogout={handleLogout}
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