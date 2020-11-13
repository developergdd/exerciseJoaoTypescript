import { Document, Model } from "mongoose";
export interface IUser {
  userName: string;
  password: string;
  dateOfEntry?: Date;
  lastUpdated?: Date;
}
export interface IUserDocument extends IUser, Document {
  setLastUpdated: (this: IUserDocument) => Promise<void>;
  sameLastName: (this: IUserDocument) => Promise<Document[]>;
}
export interface IUserModel extends Model<IUserDocument> {
    findOneOrCreate: (
        this: IUserModel,
        {
          userName,
          password,
        }: { userName: string; password: string; }
      ) => Promise<IUserDocument>;
}