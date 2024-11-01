// src/components/Calendar.js

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments from the API for the selected date
    const fetchAppointments = async () => {
      // Replace with your API endpoint
      const response = await fetch(
        `http://localhost:5000/api/appointments?date=${date.toISOString()}`
      );
      const data = await response.json();
      setAppointments(data);
    };

    fetchAppointments();
  }, [date]);

  return (
    <div className="calendar-container">
      <h3>Select a Date:</h3>
      <Calendar onChange={setDate} value={date} />
      <h4>Appointments on {date.toDateString()}:</h4>
      <ul>
        {appointments.map((appt, index) => (
          <li key={index}>{appt.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyCalendar;
