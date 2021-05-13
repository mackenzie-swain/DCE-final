//tasks.js
const express = require('express');
const router = express.Router();
const taskController = require('../../controllers/taskController');
const TaskService = taskController.TaskService;

router.use((req, res, next)=>{
  res.set({
  // allow any domain, allow REST methods we've implemented
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers",
  // Set content-type for all api requests
    'Content-type':'application/json'
  });
  if (req.method == 'OPTIONS'){
    return res.status(200).end();
  }
  next();
});

// read
router.get('/', (req, res, next)=>{
   TaskService.list()
    .then((tasks) => {
      console.log(`API: List images: ${tasks}`);
      res.status(200);
      res.send(JSON.stringify(tasks));
    });
  console.log("placeholder")
});

// read
router.get('/:taskid', (req, res, next)=>{
  console.log(`finding ${req.params.taskid}`);
  TaskService.read(req.params.taskid)
    .then((task) => {
     console.log(`Found images: ${task}`);
     res.status(200);
     res.send(JSON.stringify(task));
   }).catch((err)=>{
     res.status(404);
     res.end();
   });
});

//update
router.put('/:taskid', (req, res, next)=>{
  console.log(`putting ${req.params.taskid}`);
  const putdata  = {
    name: req.body.name,
    type: req.body.type,
    assignee: req.body.assignee,
    description: req.body.description
  }
  
  TaskService.update(req.params.taskid, putdata)
    .then((updatedTask)=>{
      res.status(200);
      res.send(JSON.stringify(updatedTask));
    }).catch((err)=> {
      res.status(404);
      res.end();
    });
 });

// save
router.post('/', async (req, res, next)=>{

  const task  = {
    name: req.body.name,
    type: req.body.type,
    assignee: req.body.assignee,
    description: req.body.description
  }

  console.log(task);

 try{
    const taskSave = await TaskService.create(task);
    res.status(201);
    res.send(JSON.stringify(taskSave));
  }catch(err){
    console.log(err);
    throw new Error("TaskSaveError", task);
  }
});

// delete
router.delete('/:taskid', (req, res, next)=>{
  let id = req.params.taskid;
  TaskService.delete(req.params.taskid)
    .then((task) => {
     console.log(`Deleted image: ${id}`);
     res.status(200);
     res.send(JSON.stringify(task));
   }).catch((err)=> {
     res.status(404);
     res.end();
   });;
});

// error
router.use(function(err, req, res, next){
  console.error(err);
  res.status(500);
  res.end();
});

module.exports = router;
