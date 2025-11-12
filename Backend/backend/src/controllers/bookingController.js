// backend/src/controllers/bookingController.js
import Booking from '../model/Booking.js';

const MAX_PER_HOUR = 10;

const isSlotExpired = (date, time) => {
  try {
    const [h, p] = time.split(' ');
    let [hour] = h.split(':').map(Number);
    if (p === 'PM' && hour !== 12) hour += 12;
    if (p === 'AM' && hour === 12) hour = 0;
    const slot = new Date(`${date}T${hour.toString().padStart(2, '0')}:00:00`);
    return slot < new Date();
  } catch { return true; }
};

export const createBooking = async (req, res) => {
  try {
    const { name, email, phone, date, time, concern } = req.body;
    if (!name || !email || !phone || !date || !time || !concern) {
      return res.status(400).json({ error: 'All fields required' });
    }

    if (isSlotExpired(date, time)) {
      return res.status(410).json({ error: 'This time slot has ended' });
    }

    const count = await Booking.countDocuments({
      date,
      time,
      status: { $ne: 'cancelled' }
    });

    if (count >= MAX_PER_HOUR) {
      return res.status(409).json({ error: 'Slot fully booked (10/10)' });
    }

    const booking = await Booking.create({
      name, email, phone, date, time, concern,
      status: "confirmed"
    });

    res.status(201).json({
      success: true,
      message: 'Booked!',
      booking: { id: booking._id, name, date, time }
    });
  } catch (err) {
    console.error('Booking error:', err.message);
    res.status(500).json({ error: 'Failed to book' });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load' });
  }
};