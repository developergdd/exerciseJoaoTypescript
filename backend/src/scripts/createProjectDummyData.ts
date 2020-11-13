import { ProjectModel } from "../models/project/project.model";
import { connect, disconnect } from "../models/database"
import { ObjectId } from 'mongodb'
(async () => {
  connect();

  interface DashboardRow {
    lastName: string,
    firstName: string,
    age: number
}

  const rows:DashboardRow[] = [
    {
      lastName: 'Snow', firstName: 'Jon', age: 35,
    },
    {
      lastName: 'Lannister', firstName: 'Cersei', age: 42,
    },
    {
      lastName: 'Lannister', firstName: 'Jaime', age: 45,
    },
    {
      lastName: 'Stark', firstName: 'Arya', age: 16,
    },
    {
      lastName: 'Targaryen', firstName: 'Daenerys', age: 25,
    },
    {
      lastName: 'Melisandre', firstName: 'Teste', age: 150,
    },
    {
      lastName: 'Clifford', firstName: 'Ferrara', age: 44,
    },
    {
      lastName: 'Frances', firstName: 'Rossini', age: 36,
    },
    {
      lastName: 'Roxie', firstName: 'Harvey', age: 65,
    },
  ]
  try {
    // for (const row of rows) {
    //   await ProjectModel.create(row);
    //   console.log(`Created project ${row.firstName} ${row.lastName} ${row.age}`);
    // }

    //Create Line
    //const createNew = await ProjectModel.create({lastName: 'Snow', firstName: 'Jon', age: 35});
    //console.log(createNew)  //return the created project
    
    //Delete Line
    //const deleteResult = await ProjectModel.findByIdAndDelete("5faea0b24193b503f54f9878");
    //console.log(deleteResult)  //returns object or null

    //Update Line
    const update = await ProjectModel.findByIdAndUpdate("5faea0b24193b503f54f9878",{lastName: 'Joao', firstName: 'Nuno', age: 99999})
    console.log(update) //updated object or null


    //List All
    //const projects = await ProjectModel.find();
    //console.log(projects)


    //Find One
    //const line = await ProjectModel.findOne(new ObjectId("5faea0b24193b503f54f9878"))
    //console.log(line) //return object or null
    disconnect();
  } catch (e) {
    console.error(e);
  }
})();