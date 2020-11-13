import { connect, disconnect } from "../models/database"
import { UserModel } from "../../src/models/users/users.model";
(async () => {
  const db = connect();
  // test static methods
  const newUser = await db.UserModel.findOneOrCreate({
    userName: "Mike",
    password: "Smith"
  });
  const existingUser = await db.UserModel.findOneOrCreate({
    userName: "Emma",
    password: "Bradley"
  });
  const numOfUsers = (await db.UserModel.find()).length;
  console.log({newUser, existingUser, numOfUsers });
  // test instance methods
  await existingUser.setLastUpdated();
  disconnect();
})();