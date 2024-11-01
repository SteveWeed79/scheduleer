import React from "react";
import MyCalendar from "./Calendar"; // Import the calendar component

const CustomerLanding = () => {
  return (
    <div className="landing-page">
      <h2>Welcome to the Customer Portal</h2>
      <p>
        Here you can view your appointments, manage your profile, and contact
        support.
      </p>
      <div className="actions">
        <button className="btn btn-primary">View Appointments</button>
        <button className="btn btn-secondary">Manage Profile</button>
        <button className="btn btn-warning">Contact Support</button>
      </div>
      <MyCalendar /> {/* Calendar integrated */}
    </div>
  );
};

export default CustomerLanding;
