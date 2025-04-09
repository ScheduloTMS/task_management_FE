import React, { useEffect, useState } from "react";
import "./Team.css";
import { FaFilter, FaEllipsisV } from "react-icons/fa";
import { getAllUsers, deleteUser } from "../../services/userService.js";
import { useRecoilValue } from "recoil";
import { authState } from "../../states/authState.jsx";
import CreateUserModal from "../../components/sidesheets/CreateUserSheet.jsx";
import Alert from "../../components/modal/Alert.jsx"; 

const Team = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("All");
  const [activeMenu, setActiveMenu] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteUserId, setPendingDeleteUserId] = useState(null);

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

  const confirmDelete = (userId) => {
    setPendingDeleteUserId(userId);
    setShowConfirm(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deleteUser(pendingDeleteUserId, token);
      setUsers((prev) => prev.filter((user) => user.userId !== pendingDeleteUserId));
    } catch (error) {
      alert("Failed to delete user. See console for details.");
      console.error(error);
    } finally {
      setShowConfirm(false);
      setPendingDeleteUserId(null);
    }
  };

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

        {/* Trigger Create User modal via component */}
        <CreateUserModal />
      </div>

      <div className="team-cards">
        {filteredUsers.map((user) => (
          <div className="team-card" key={user.userId}>
            <div className="kebab-menu-wrapper">
              <FaEllipsisV
                className="kebab-icon"
                onClick={() =>
                  setActiveMenu((prev) => (prev === user.userId ? null : user.userId))
                }
              />
              {activeMenu === user.userId && (
                <div className="dropdown-menu">
                  <button
                    className="dropdown-item delete"
                    onClick={() => confirmDelete(user.userId)}
                  >
                    Delete User
                  </button>
                </div>
              )}
            </div>

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
              <h3 className="username">{user.name}</h3>
              <p className="user-email">{user.email}</p>
              <p className="user-id">{user.userId}</p>
              <span className="user-role">{user.role}</span>
            </div>
          </div>
        ))}
      </div>

      {/* SweetAlert Confirm Modal */}
      {showConfirm && (
        <Alert
          title="Delete User?"
          message="Are you sure you want to delete this user?"
          icon="warning"
          buttons={{
            cancel: true,
            confirm: {
              text: "Yes, Delete",
              className: "btn-danger",
            },
          }}
          dangerMode={true}
          onConfirm={handleDeleteConfirmed}
          onCancel={() => {
            setShowConfirm(false);
            setPendingDeleteUserId(null);
          }}
        />
      )}
    </div>
  );
};

export default Team;
