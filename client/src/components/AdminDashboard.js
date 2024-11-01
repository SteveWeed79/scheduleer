import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [analytics, setAnalytics] = useState({
        totalCompleted: 0,
        avgDuration: 0,
        employeeProductivity: []
    });

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const response = await axios.get('/api/admin-analytics/analytics');
            setAnalytics(response.data);
        } catch (error) {
            console.error("Error fetching analytics data:", error);
            alert("Failed to load analytics.");
        }
    };

    return (
        <div>
            <h2>Admin Analytics Dashboard</h2>
            <div>
                <h3>Total Completed Jobs: {analytics.totalCompleted}</h3>
                <h3>Average Job Duration: {analytics.avgDuration} minutes</h3>
            </div>
            <div>
                <h3>Employee Productivity</h3>
                <ul>
                    {analytics.employeeProductivity.map((employee, index) => (
                        <li key={index}>
                            Employee ID: {employee.employee_id} - Jobs Completed: {employee.jobsCompleted}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;
