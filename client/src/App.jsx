import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import RegisterPage from "./pages/RegisterPage";
import useAuth from "./hooks/useAuth";
import "./App.css";


function App() {
   
  const { currentUser, isLoading, logout } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  } 
  // NẾU CHƯA LOGIN
  if (!currentUser) {
    return (
      <div className="auth-pages">
        <LoginPage />
        <RegisterPage />
      </div>
    );
  }

  if (currentUser.role === "admin") {
    return (
      <AdminPage 
        onLogout={logout}
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
      onLogout={logout}
    />
  </>
  );
}

export default App