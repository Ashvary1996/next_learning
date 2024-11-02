import mongoose from "mongoose";
import { prependOnceListener } from "process";

const connectToDb = async () => {
  try {
    const connection = () => {
      mongoose.connect(process.env.MONGO_URI!);

      const connection = mongoose.connection;

      connection.on("connected", () => {
        console.log("Mongo Db Connected Successfully");
      });
      connection.on("error", (err) => {
        console.log(
          "Mongodb connection error, please make sure db is up and running" +
            err
        );
        process.exit();
      });
    };
  } catch (error) {
    console.log("Something went wrong in connecting to database");
    console.log(error);
  }
};

export default connectToDb;
