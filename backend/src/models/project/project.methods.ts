import { Document } from "mongoose";
import { IProjectDocument } from "./project.types";
import { ObjectId } from 'mongodb'

export async function setLastUpdated(this: IProjectDocument): Promise<void> {
  const now = new Date();
  if (!this.lastUpdated || this.lastUpdated < now) {
    this.lastUpdated = now;
    await this.save();
  }
}
export async function sameFirstName(this: IProjectDocument): Promise<Document[]> {
  return this.model("project").find({ firstName: this.firstName });
}

/*export async function updateProject(this: IProjectDocument): Promise<void> {
  const now = new Date();
  if (!this.lastUpdated || this.lastUpdated < now) {
    this.lastUpdated = now;
    await this.save();
  }
}*/

export async function deleteLine(_id: ObjectId) {
  /**
   * @todo Use transaction here to remove the reference relations
   *
   */
  try {
    const project = await this.model("project").findById(_id)
    if (!project) {
      return { success: false, error: 'Project does not exist' }
    }
    else{
      return {success:true}
    }
  } catch (ex) {
    this.logger.error(ex)
    return { success: false, error: 'Something went wrong' }
  }
}