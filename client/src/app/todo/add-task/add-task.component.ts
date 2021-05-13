import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodoService } from '../../todo/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  providers: [ TodoService ]
})
export class AddTaskComponent implements OnInit {

    @Output() newTask = new EventEmitter();

    task:any = {}

    constructor(private todoService: TodoService, private router: Router) { }

    ngOnInit(): void {
    }

    save() : void {

        const task = {
            name: this.task.name,
            assignee: this.task.assignee,
            type: this.task.type,
            description: this.task.description
        };

        console.log(task);

        console.log("submitting");
        try {
            this.todoService.createTask(task)
            .subscribe((task)=>{
                console.log(task)
                this.newTask.emit()
            });
        }
        catch {
            console.log('error')
        }

        this.router.navigate(['/']);
    }

}