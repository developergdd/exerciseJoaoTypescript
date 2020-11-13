import * as Mongoose from "mongoose";
const config = require('config');
import { UserModel } from "./users/users.model";
let database: Mongoose.Connection;
//"mongoURI": "mongodb+srv://testuser123:2016rmjyJP@cluster0.7osxm.mongodb.net/<dbname>?retryWrites=true&w=majority"

export const connect = () => {
  // add your own uri below
  //const db = config.get('MongoURI');
  const db = "mongodb+srv://testuser123:2016rmjyJP@cluster0.7osxm.mongodb.net/JoaoExerciseProject?retryWrites=true&w=majority"
  console.log(db)
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

  return {
    UserModel,
  };
};
export const disconnect = () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};

