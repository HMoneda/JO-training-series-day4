const mongoose = require('mongoose');

async function connectDB() {
  try {
    const conn = await mongoose.connect(
      'mongodb://localhost:27017/JOTrainingDay4',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`DB Succesfully Connected ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = connectDB;
