import { IProjectDocument, IProjectModel } from "./project.types";
export async function findOneOrCreate(
    this: IProjectModel,
    projectId: string
  ): Promise<IProjectDocument> {
    const record = await this.findOne({ projectId });
    if (record) {
      return record;
    } else {
      console.log(projectId)
      //return this.create({ projectId });  //issue hereee with projectId
    }
  }