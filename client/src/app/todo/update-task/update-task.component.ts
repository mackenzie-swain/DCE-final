import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodoService } from '../../todo/todo.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  providers: [ TodoService ]
})
export class UpdateTaskComponent implements OnInit {

    @Output() updateTaskEvent = new EventEmitter();

    task:any = {}

    constructor(private todoService: TodoService) { }

    ngOnInit(): void {
    }

    updateTask(obj: any):void {
        this.task.name = obj.title;
        this.task.type = obj.type;
        this.task.assignee = obj.assignee;
        this.task.description = obj.description;
        console.log(this.task);
        this.todoService.updateTask(this.task._id, this.task)
          .subscribe((result)=>{
            location.reload();
        });
      }


}