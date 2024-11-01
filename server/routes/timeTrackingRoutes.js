const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticateToken = require('../middleware/auth');

router.post('/clock-in', authenticateToken, async (req, res) => {
    const { employeeId, jobId } = req.body;
    try {
        const [existingClockIn] = await db.execute(`
            SELECT * FROM TimeTracking WHERE employee_id = ? AND job_id = ? AND clock_out IS NULL
        `, [employeeId, jobId]);

        if (existingClockIn.length) {
            return res.status(400).json({ message: "Already clocked in for this job." });
        }

        await db.execute(`
            INSERT INTO TimeTracking (employee_id, job_id, clock_in)
            VALUES (?, ?, NOW())
        `, [employeeId, jobId]);

        res.json({ message: "Clock-in recorded successfully." });
    } catch (error) {
        console.error("Error recording clock-in:", error);
        res.status(500).json({ message: "Failed to record clock-in." });
    }
});

router.post('/clock-out', authenticateToken, async (req, res) => {
    const { employeeId, jobId } = req.body;
    try {
        const [clockInRecord] = await db.execute(`
            SELECT clock_in FROM TimeTracking WHERE employee_id = ? AND job_id = ? AND clock_out IS NULL
        `, [employeeId, jobId]);

        if (!clockInRecord.length) {
            return res.status(400).json({ message: "No active clock-in found for this job." });
        }

        await db.execute(`
            UPDATE TimeTracking SET clock_out = NOW() WHERE employee_id = ? AND job_id = ?
        `, [employeeId, jobId]);

        res.json({ message: "Clock-out recorded successfully." });
    } catch (error) {
        console.error("Error recording clock-out:", error);
        res.status(500).json({ message: "Failed to record clock-out." });
    }
});

router.get('/schedule', authenticateToken, async (req, res) => {
    const { employeeId } = req.query;
    try {
        const [schedule] = await db.execute(`
            SELECT job_id, clock_in, clock_out FROM TimeTracking WHERE employee_id = ?
        `, [employeeId]);

        res.json({ schedule });
    } catch (error) {
        console.error("Error fetching schedule:", error);
        res.status(500).json({ message: "Failed to retrieve schedule." });
    }
});

module.exports = router;