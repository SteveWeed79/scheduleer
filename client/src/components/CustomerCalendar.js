import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerCalendar = () => {
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);

    useEffect(() => {
        fetchAvailableSlots();
    }, []);

    const fetchAvailableSlots = async () => {
        try {
            const response = await axios.get('/api/scheduling/availability');
            setAvailableSlots(response.data.availableSlots);
        } catch (error) {
            console.error("Error fetching available slots:", error);
            alert("Could not load available slots.");
        }
    };

    const handleBookSlot = async () => {
        try {
            await axios.post('/api/scheduling/book', {
                customerId: 1,  // Replace with actual logged-in customer ID
                slotDate: selectedSlot.slot_date,
                startTime: selectedSlot.start_time,
                endTime: selectedSlot.end_time
            });
            alert("Appointment successfully booked!");
            fetchAvailableSlots();  // Refresh availability
        } catch (error) {
            console.error("Error booking slot:", error);
            alert("Failed to book the appointment.");
        }
    };

    return (
        <div>
            <h2>Available Time Slots</h2>
            <ul>
                {availableSlots.map((slot, index) => (
                    <li key={index}>
                        {slot.slot_date} - {slot.start_time} to {slot.end_time}
                        <button onClick={() => setSelectedSlot(slot)}>Select</button>
                    </li>
                ))}
            </ul>
            {selectedSlot && (
                <div>
                    <h3>Confirm Booking</h3>
                    <p>Date: {selectedSlot.slot_date}</p>
                    <p>Time: {selectedSlot.start_time} - {selectedSlot.end_time}</p>
                    <button onClick={handleBookSlot}>Book Appointment</button>
                </div>
            )}
        </div>
    );
};

export default CustomerCalendar;
