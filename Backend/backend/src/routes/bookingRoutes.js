// backend/src/routes/bookingRoutes.js
import express from 'express';
import { createBooking, getBookings } from '../controllers/bookingController.js';
import Booking from '../model/Booking.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/', getBookings);

router.get('/availability', async (req, res) => {
  try {
    const { date } = req.query;
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: 'Valid date required' });
    }

    const result = await Booking.aggregate([
      { $match: { date, status: { $ne: 'cancelled' } } },
      { $group: { _id: '$time', count: { $sum: 1 } } }
    ]);

    const slots = {};
    result.forEach(({ _id, count }) => { slots[_id] = { count }; });

    res.json({ slots });
  } catch (err) {
    console.error('Availability error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;