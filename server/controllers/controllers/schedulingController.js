const db = require('../config/db');

const getAvailableSlots = async (req, res) => {
    try {
        const [availableSlots] = await db.execute(`
            SELECT slot_date, start_time, end_time FROM TimeSlots WHERE is_available = true
        `);
        res.json({ availableSlots });
    } catch (error) {
        console.error("Error fetching availability:", error);
        res.status(500).json({ message: "Could not fetch available slots." });
    }
};

const bookSlot = async (req, res) => {
    const { customerId, slotDate, startTime } = req.body;
    try {
        const [existingBooking] = await db.execute(`
            SELECT * FROM TimeSlots WHERE slot_date = ? AND start_time = ? AND is_available = true
        `, [slotDate, startTime]);

        if (!existingBooking.length) {
            return res.status(400).json({ message: "Selected slot is unavailable." });
        }

        await db.execute(`
            UPDATE TimeSlots SET is_available = false, customer_id = ? WHERE slot_date = ? AND start_time = ?
        `, [customerId, slotDate, startTime]);

        res.json({ message: "Appointment successfully booked." });
    } catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).json({ message: "Failed to book the appointment." });
    }
};

module.exports = { getAvailableSlots, bookSlot };