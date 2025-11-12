// backend/src/config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ayurvedic');
    console.log('MongoDB Connected');

    const collection = mongoose.connection.collection('bookings');
    const indexes = await collection.indexes();
    const oldUnique = indexes.find(i => i.name === 'date_1_time_1' && i.unique);

    if (oldUnique) {
      await collection.dropIndex('date_1_time_1');
      console.log('Dropped old unique index: date_1_time_1');
    }
  } catch (error) {
    console.error('DB Error:', error.message);
    throw error;
  }
};

export default connectDB;