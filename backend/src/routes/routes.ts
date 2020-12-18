import { ProjectModel } from "../models/project/project.model";
import { connect,disconnect } from "../models/database"
import { ObjectId } from 'mongodb'
const port = 5000;


module.exports = app => {

  
  connect();
  //get all project lines
  app.route('/projects').get(function(req, res) {
    (async () => {
      try {
        //connect();
          
          const projects = await ProjectModel.find({},{"dateOfEntry":0,"lastUpdated":0,"__v":0});
          res.send(projects);
        //disconnect();
      } catch (e) {
        console.error(e);
      }
    })();
  })
  
  //get a project line
  app.route('/projects/:id').get(function(req, res) {
    (async () => {
      try {
        const {id}=req.params;
        //connect();
        const line = await ProjectModel.findOne(new ObjectId(id))
        res.send(line);
        //disconnect();
      } catch (e) {
        console.error(e);
      }
    })();
  })


  //delete a project line
  app.route('/deleteProject/:id').post(function(req:{params:{id:string}}, res) {
    (async () => {
      try {
        //connect();


          const {id}=req.params;
          const deleteResult = await ProjectModel.findByIdAndDelete(id);
          res.send(deleteResult)  //returns object or null*/



        //disconnect();
      } catch (e) {
        console.error(e);
      }
    })();
  })

  //create a project line
  app.route('/createProject/').post(function(req:{body:{lastName:string,firstName:string,age:number}}, res) {
    (async () => {
      try {
        //connect();
          const {lastName,firstName, age}=req.body;
          const createResult = await ProjectModel.create({lastName: lastName, firstName: firstName, age: age});
          res.send(createResult)  //returns object or null
        //disconnect();
      } catch (e) {
        console.error(e);
      }
    })();
  })

   //update a project line
   app.route('/updateProject/').post(function(req:{body:{id:string,lastName:string,firstName:string,age:number}}, res) {
    (async () => {
      try {
        //connect();
          const {id,lastName,firstName, age}=req.body;
          const updateResult = await ProjectModel.findByIdAndUpdate(id,{lastName: lastName, firstName: firstName, age: age})
          res.send(updateResult)  //returns object or null
        //disconnect();
      } catch (e) {
        console.error(e);
      }
    })();
  })

  app.get('/',function(req,res){
    
    res.send(`Server started on http://localhost:${port}`);
  });
};