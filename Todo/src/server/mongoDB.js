import mongoose from "mongoose";

const connectToMongoDB = () => {
  const url = "mongodb://localhost:27017/todo";

  try {
    mongoose.connect(url);
  } catch (error) {
    console.error(error);
  }
  const dbConnect = mongoose.connection;

  dbConnect.once("open", (_) => {
    console.log("DB connected: " + url);
  });

  dbConnect.on("error", (error) => {
    console.error(error);
  });
};

export default connectToMongoDB;
