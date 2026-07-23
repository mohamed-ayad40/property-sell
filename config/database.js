import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // هنسأل Mongoose نفسها عن حالة الاتصال الفعلي
  if (mongoose.connections[0].readyState === 1) {
    console.log("MongoDB is already connected...");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      family: 4,
    });
    console.log("Mongodb Connected Successfully!");
  } catch (err) {
    // إياك تعمل كومنت للسطر ده وإنت بتبرمج، ده اللي بيفضح أي مشكلة في الاتصال!
    console.log("MongoDB Connection Error: ", err); 
  }
};

export default connectDB;