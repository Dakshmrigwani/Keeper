import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

 const ConnectDb = async () => {
  try {
    const connections = await mongoose.connect(
      `${process.env.MONGODB_URI}${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connections.connection.host}  DB NAME: ${DB_NAME}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export default ConnectDb