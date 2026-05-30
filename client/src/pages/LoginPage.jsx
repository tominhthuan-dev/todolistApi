import LoginForm from "../components/auth/LoginForm";

function LoginPage({ setCurrentUser }) {
  return (
    <div>
      <LoginForm
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
}

export default LoginPage;