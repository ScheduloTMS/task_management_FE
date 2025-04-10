import React, { useEffect, useState } from "react";
import "./Team.css";
import { FaFilter } from "react-icons/fa";
import { getAllUsers } from "../../services/userService";
import { useRecoilValue } from "recoil";
import { authState } from "../../states/authState";
import CreateUserModal from "../../components/sidesheets/CreateUserModal.jsx";

const Team = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("All");
  const auth = useRecoilValue(authState);
  const token = auth?.token;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers(token);
        setUsers(data);
      } catch (err) {
        console.error("Error loading users", err);
      }
    };

    fetchUsers();
  }, [token]);

  const handleFilterChange = (e) => {
    setFilterRole(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) => filterRole === "All" || user.role === filterRole.toUpperCase()
  );

  return (
    <div className="team-container">
      <div className="top-bar">
        <div className="filter-container">
          <FaFilter className="filter-icon" />
          <select
            value={filterRole}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="All">Filter:All</option>
            <option value="Student">Student</option>
            <option value="Mentor">Mentor</option>
          </select>
        </div>
        <button
  className="create-user-btn"
  data-bs-toggle="modal"
  data-bs-target="#createUserModal"
>
  Create User
</button>

      </div>

      <div className="team-cards">
        {filteredUsers.map((user) => (
          <div className="team-card" key={user.userId}>
            {user.photo ? (
              <div className="user-photo-square">
                <img
                  src={`data:image/png;base64,${user.photo}`}
                  alt={user.name}
                />
              </div>
            ) : (
              <div className="user-photo-square fallback">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="user-info">
              <h3 className="user-name">{user.name}</h3>
              <p className="user-email">{user.email}</p>
              <p className="user-id">{user.userId}</p>
              <span className="user-role">{user.role}</span>
            </div>
          </div>
        ))}
      </div>

      
      <CreateUserModal />
    </div>
  );
};

export default Team;