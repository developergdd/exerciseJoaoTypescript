import { ProjectModel } from "./models/project/project.model";
import { connect,disconnect } from "./models/database"
import { ObjectId } from 'mongodb'
const app = require('../config/express')();
const port = 5000;
//connect();

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

