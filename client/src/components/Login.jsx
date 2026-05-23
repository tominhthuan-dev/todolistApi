function Login({
  username,
  setUsername,
  password,
  setPassword,
  onLogin,
}) {
  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={onLogin}>
        Login
      </button>

    </div>
  );
}

export default Login;