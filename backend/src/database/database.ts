import * as Mongoose from "mongoose";
const config = require('config');
//import { UserModel } from "./users/users.model";
let database: Mongoose.Connection;


export const connect = () => {
  // add your own uri below
  const db = config.get('mongoURI');
  if (database) {
    return;
  }
  Mongoose.connect(db, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  database = Mongoose.connection;
  database.once("open", async () => {
    console.log("Connected to database");
  });
  database.on("error", () => {
    console.log("Error connecting to database");
  });
};
export const disconnect = () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};