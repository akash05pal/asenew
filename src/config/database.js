const mongoose = require('mongoose');

/**
 * DATABASE CONNECTION WITH IMPROVED ERROR HANDLING
 *
 * FIXES APPLIED:
 * 1. Added serverSelectionTimeoutMS to fail faster if MongoDB is down
 * 2. Removed process.exit(1) - allows server to start even if DB is unavailable
 * 3. Added helpful error messages for troubleshooting
 * 4. Server continues running so you can see the actual error in console
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:');
    console.error(`   ${error.message}`);
    console.error('\n📌 TROUBLESHOOTING STEPS:');
    console.error('   1. Make sure MongoDB is running on your system');
    console.error('   2. Check your MONGODB_URI in .env file');
    console.error('   3. Verify MongoDB is listening on the correct port');
    console.error('\n💡 To start MongoDB:');
    console.error('   - macOS: brew services start mongodb-community');
    console.error('   - Linux: sudo systemctl start mongodb');
    console.error('   - Docker: docker run -d -p 27017:27017 --name mongodb mongo');
    console.error('\n⚠️  Server will continue running but database operations will fail\n');
  }
};

module.exports = connectDB;
