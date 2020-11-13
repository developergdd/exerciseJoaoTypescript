import { UserModel } from "../models/users/users.model";
import { connect, disconnect } from "../models/database"
(async () => {
  connect();
  const users = [
    { userName: "Emma", password: "Bradley" },
    { userName: "Elise", password: "Conner" },
    { userName: "Jack", password: "Lawson"},
    { userName: "Oliver", password: "Moss" },
    { userName: "Jamie", password: "Reid" },
    { userName: "Aidan", password: "Bradley" },
    { userName: "Jordan", password: "Gallagher" },
    { userName: "Erin", password: "Miles" },
    { userName: "William", password: "May" },
    { userName: "Ethan", password: "Butler" },
  ];
  try {
    for (const user of users) {
      await UserModel.create(user);
      console.log(`Created user ${user.userName} ${user.password}`);
    }
    disconnect();
  } catch (e) {
    console.error(e);
  }
})();