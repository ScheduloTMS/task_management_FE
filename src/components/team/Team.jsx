import React, { useState } from "react";
import "./Team.css";
import { FaFilter } from "react-icons/fa";

const sampleUsers = [
  { id: "ST001", name: "John Doe", email: "john.doe@example.com", role: "Student", photo: "https://www.nature-and-garden.com/wp-content/uploads/sites/4/2022/04/lily.jpg" },
  { id: "MT001", name: "Jane Smith", email: "jane.smith@example.com", role: "Mentor", photo: "https://www.nature-and-garden.com/wp-content/uploads/sites/4/2022/04/lily.jpg" },
  { id: "ST002", name: "Alice Brown", email: "alice.brown@example.com", role: "Student", photo: "https://www.nature-and-garden.com/wp-content/uploads/sites/4/2022/04/lily.jpg" },
  { id: "ST003", name: "John Doe", email: "john.doe@example.com", role: "Student", photo: "https://www.nature-and-garden.com/wp-content/uploads/sites/4/2022/04/lily.jpg" },
  { id: "ST004", name: "John Doe", email: "john.doe@example.com", role: "Student", photo: "https://www.nature-and-garden.com/wp-content/uploads/sites/4/2022/04/lily.jpg" },
];

const Team = () => {
  const [filterRole, setFilterRole] = useState("All");

  const handleFilterChange = (e) => {
    setFilterRole(e.target.value);
  };

  const filteredUsers = sampleUsers.filter(user =>
    filterRole === "All" || user.role === filterRole
  );

  return (
    <div className="team-container">
      <div className="top-bar">
       
        <div className="filter-container">
          <FaFilter className="filter-icon" />
          <select value={filterRole} onChange={handleFilterChange} className="filter-select">
            <option value="All">Filter:All</option>
            <option value="Student">Student</option>
            <option value="Mentor">Mentor</option>
          </select>
        </div>
        <button className="create-user-btn">Create User</button>
      </div>

      <div className="team-cards">
        {filteredUsers.map((user) => (
          <div className="team-card" key={user.id}>
            <img src={user.photo} alt={user.name} className="user-photo" />
            <div className="user-info">
              <h3 className="user-name">{user.name}</h3>
              <p className="user-email">{user.email}</p>
              <p className="user-id">{user.id}</p>
              <span className="user-role">{user.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;