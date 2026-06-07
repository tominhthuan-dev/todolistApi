import { useEffect, useState } from "react";
import { getUsersApi } from "../services/userService";

function AdminPage({currentUser, onLogout }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsersApi();
      setUsers(data);
    };
    fetchUsers();
  }, []);
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