const mongoose = require("mongoose");
const dns = require("dns");

// Override DNS to use Google's servers - fixes SRV lookup issues on restrictive networks
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is not defined in .env file");
    }

    // Mask password in logs
    const maskedUri = uri.replace(/\/\/.*:.*@/, "//****:****@");
    console.log(`Connecting to MongoDB: ${maskedUri}`);

    await mongoose.connect(uri);
    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.error("MongoDB Connection Error ❌");
    console.error(`Message: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;