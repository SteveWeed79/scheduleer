const db = require('../config/db');

const getAnalytics = async (req, res) => {
    try {
        const [completedJobs] = await db.execute(`
            SELECT COUNT(*) AS totalCompleted FROM JobRequests WHERE status = 'completed'
        `);

        const [avgJobDuration] = await db.execute(`
            SELECT AVG(TIMESTAMPDIFF(MINUTE, clock_in, clock_out)) AS avgDuration FROM TimeTracking WHERE clock_out IS NOT NULL
        `);

        const [employeeProductivity] = await db.execute(`
            SELECT employee_id, COUNT(*) AS jobsCompleted FROM JobRequests WHERE status = 'completed' GROUP BY employee_id
        `);

        res.json({
            totalCompleted: completedJobs[0].totalCompleted,
            avgDuration: avgJobDuration[0].avgDuration,
            employeeProductivity
        });
    } catch (error) {
        console.error("Error fetching analytics data:", error);
        res.status(500).json({ message: "Failed to retrieve analytics data." });
    }
};

module.exports = { getAnalytics };