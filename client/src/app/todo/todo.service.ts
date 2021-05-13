import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiurl = environment.apiurl;

  constructor(private http:HttpClient) { }

  listAllTasks() {
    return this.http.get(this.apiurl + 'api/tasks/');
  }

  findDailyTaskById(id: number) {
    return this.http.get(this.apiurl + 'api/tasks/' + id);
  }

  deleteTaskById(taskid: number) {
    return this.http.delete(this.apiurl + 'api/tasks/' + taskid);
  }

  createTask(task: object){
    return this.http.post(this.apiurl+'api/tasks/', task);
  }

  updateTask(id: string, data: any){
    return this.http.put(this.apiurl + 'api/tasks/' + id, data);
}
}
