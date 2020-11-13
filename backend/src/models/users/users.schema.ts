import { Schema } from "mongoose";
import { findOneOrCreate } from "./users.statics";
import { setLastUpdated, sameLastName } from "./users.methods";
const UserSchema = new Schema({
  userName:  { type: String, required: true, index: { unique: true } },
  password:  { type: String, required: true },
  dateOfEntry: {
    type: Date,
    default: new Date()
  },
  lastUpdated: {
    type: Date,
    default: new Date()
  }
});
UserSchema.statics.findOneOrCreate = findOneOrCreate;
UserSchema.methods.setLastUpdated = setLastUpdated;
UserSchema.methods.sameLastName = sameLastName;
export default UserSchema;
