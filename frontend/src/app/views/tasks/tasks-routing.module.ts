import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskAddEditComponent } from './task-add-edit/task-add-edit.component';


const routes: Routes = [
  {
    path: '',
    component: TasksListComponent,
    data: {
      title: 'Tasks'
    }
  },
  {
    path: 'create',
    component: TaskAddEditComponent,
    data: {
      title: 'Create Task'
    }
  },
  {
    path: ':id',
    component: TaskAddEditComponent,
    data: {
      title: 'Task'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
