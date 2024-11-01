import React from "react";
import MyCalendar from "./Calendar"; // Import the calendar component

const AdminEmployeeLanding = () => {
  return (
    <div className="landing-page">
      <h2>Welcome to the Admin/Employee Dashboard</h2>
      <p>
        Here you can manage customers, view reports, and handle job assignments.
      </p>
      <div className="actions">
        <button className="btn btn-primary">View Customers</button>
        <button className="btn btn-secondary">Manage Jobs</button>
        <button className="btn btn-warning">Generate Reports</button>
      </div>
      <MyCalendar /> {/* Calendar integrated */}
    </div>
  );
};

export default AdminEmployeeLanding;
