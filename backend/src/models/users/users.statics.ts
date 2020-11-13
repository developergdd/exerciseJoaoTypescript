import { IUserDocument, IUserModel } from "./users.types";
export async function findOneOrCreate(
    this: IUserModel,
    {
      userName,
      password,
    }:{ userName: string; password: string; }
  ): Promise<IUserDocument> {
    console.log("findOneOrCreate")
    const record = await this.findOne({ userName, password});
    console.log("record")
    if (record) {
      return record;
    } else {
      return this.create({ userName, password });  //issue hereee with userId
    }
  }