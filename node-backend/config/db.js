const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);
 

const mongoose = require("mongoose");

const connectDB = async () => {

  try {

    await mongoose.connect("mongodb+srv://aasifjahapana_db_user:08VryCdw5DxnK4IP@ems-cluster.0g0eprf.mongodb.net/ems?appName=ems-cluster");

    console.log("MongoDB connected");

  } catch (error) {

    console.log("MongoDB connection error:", error);

  }

};

module.exports = connectDB;