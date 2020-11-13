import { Document, Model } from "mongoose";
export interface IProject {
  firstName: String;
  lastName: String;
  age:Number;
  dateOfEntry?: Date;
  lastUpdated?: Date;
}
export interface IProjectDocument extends IProject, Document {
  setLastUpdated: (this: IProjectDocument) => Promise<void>;
  sameLastName: (this: IProjectDocument) => Promise<Document[]>;
}
export interface IProjectModel extends Model<IProjectDocument> {
    findOneOrCreate: (
        this: IProjectModel,
        {
          firstName,
          lastName,
          age,
        }: { firstName: string; lastName: string; age: Number; }
      ) => Promise<IProjectDocument>;
}