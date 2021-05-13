import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  providers: [ TodoService ],
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  constructor(private todoService: TodoService, private router: Router ) { }

  dailyTasks: any;
  weeklyTasks: any;
  tasks: any;  
  taskByAssignee: any;
  showByType = true;

  allTasks: any;
  assigneeTasks: any;
  moreAssigneeTasks : any;
  assignees: string[] = [];
  showAddTaskDisplay = false;
  editing = true;

  task:any = {}



  ngOnInit(): void {

    this.todoService.listAllTasks().subscribe(tasks => {
      this.allTasks = tasks;
    });
  }



  getKeys(map: any[]){
    return Array.from(map.keys());
  }

 

  sortByType() {
    this.showAddTaskDisplay = false;
    this.showByType = true;
  }

  showAddTask() {
    this.showByType = false;
    this.showAddTaskDisplay = true;
  }

  deleteTask(taskid: number) {
    console.log(taskid);
    this.todoService.deleteTaskById(taskid).subscribe(task => {
        alert(`Photo has been deleted`);
        this.router.navigate(['/']);
        location.reload();
      })
    
  }


}
