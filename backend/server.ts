import * as express from "express";
import { connect } from "./src/database/database"
const app = express();
const port = 5000;
connect();
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});