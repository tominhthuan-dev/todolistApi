function AdminPage({currentUser, users, onLogout }) {
  return (
    <div>
      <h1>Welcome {currentUser.username}</h1>
      <button onClick={onLogout}>Logout</button>
      <h2>Danh sách user</h2>
{
        users.map((user) => (
          <div key={user.username}>
            <p>Username:{user.username}</p>
            <p>Password:{user.password}</p>
            <p>Role:{user.role}</p>
          </div>
        ))
      }
    </div>
  );
}

export default AdminPage;