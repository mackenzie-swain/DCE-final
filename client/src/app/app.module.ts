import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './todo/add-task/add-task.component';
import { TodoComponent } from './todo/todo.component';
import { UpdateTaskComponent } from './todo/update-task/update-task.component';

const routes:Routes = [
  { path: '', component: TodoComponent },
  { path: 'add', component: AddTaskComponent },
  { path: 'update', component: UpdateTaskComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    AddTaskComponent,
    UpdateTaskComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      routes
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
