import { Schema } from "mongoose";
import { findOneOrCreate } from "./project.statics";
import { setLastUpdated, sameFirstName } from "./project.methods";
const ProjectSchema = new Schema({
  firstName:  { type: String, required: true},
  lastName:  { type: String, required: true },
  age:  { type: Number, required: true },
  dateOfEntry: {
    type: Date,
    default: new Date()
  },
  lastUpdated: {
    type: Date,
    default: new Date()
  }
});
ProjectSchema.statics.findOneOrCreate = findOneOrCreate;
ProjectSchema.methods.setLastUpdated = setLastUpdated;
ProjectSchema.methods.sameLastName = sameFirstName;
export default ProjectSchema;
