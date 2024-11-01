import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeTimeTracking = () => {
    const [schedule, setSchedule] = useState([]);
    const [jobId, setJobId] = useState("");

    useEffect(() => {
        fetchSchedule();
    }, []);

    const fetchSchedule = async () => {
        try {
            const response = await axios.get('/api/time-tracking/schedule', {
                params: { employeeId: 1 }  // Replace with actual logged-in employee ID
            });
            setSchedule(response.data.schedule);
        } catch (error) {
            console.error("Error fetching schedule:", error);
            alert("Failed to load schedule.");
        }
    };

    const handleClockIn = async () => {
        try {
            await axios.post('/api/time-tracking/clock-in', {
                employeeId: 1,  // Replace with actual employee ID
                jobId: jobId
            });
            alert("Clock-in successful!");
            fetchSchedule();
        } catch (error) {
            console.error("Error during clock-in:", error);
            alert("Failed to clock in.");
        }
    };

    const handleClockOut = async () => {
        try {
            await axios.post('/api/time-tracking/clock-out', {
                employeeId: 1,  // Replace with actual employee ID
                jobId: jobId
            });
            alert("Clock-out successful!");
            fetchSchedule();
        } catch (error) {
            console.error("Error during clock-out:", error);
            alert("Failed to clock out.");
        }
    };

    return (
        <div>
            <h2>Employee Time Tracking</h2>
            <input
                type="text"
                placeholder="Enter Job ID"
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
            />
            <button onClick={handleClockIn}>Clock In</button>
            <button onClick={handleClockOut}>Clock Out</button>

            <h3>Schedule</h3>
            <ul>
                {schedule.map((entry, index) => (
                    <li key={index}>
                        Job ID: {entry.job_id}, Clock In: {entry.clock_in || 'N/A'}, Clock Out: {entry.clock_out || 'N/A'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeTimeTracking;
