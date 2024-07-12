import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB);
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
};

export default ConnectDB;
