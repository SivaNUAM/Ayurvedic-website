// backend/src/model/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  concern: { type: String, required: true, trim: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now }
});

// NON-UNIQUE INDEX
bookingSchema.index({ date: 1, time: 1, status: 1 });

export default mongoose.model('Booking', bookingSchema);