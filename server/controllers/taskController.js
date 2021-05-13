const Task = require('../models/taskModel');

class TaskService {

  static create(obj){
    const task = new Task(obj);
    return task.save();
  }

  static update(id, data){
      return Task.findById(id)
       .then((task)=>{
         task.set(data);
         task.save();
         return photo;
       });
  }

  static read(id){
    return Task.findById(id)
      .then((task)=>{
        // found
        return task;
      });
  }

  static list(){
    return Task.find({})
      .then((tasks)=>{
        // found
        return tasks;
      });
  }

  static delete(id){
    return Task.deleteOne({_id: id})
      .then((obj)=>{
        //removed
        return obj;
      })
  }
}

module.exports.TaskService = TaskService;
