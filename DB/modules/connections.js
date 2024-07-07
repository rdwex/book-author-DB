import mongoose from "mongoose";

export const db_connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/books-app");
    console.log("Connected to database");
  } catch (error) {
    console.log("Error Connecting To Database");
  }
};
