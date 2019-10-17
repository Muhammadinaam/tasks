import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksListComponent } from './tasks-list/tasks-list.component';


@NgModule({
  declarations: [TasksListComponent],
  imports: [
    TasksRoutingModule
  ]
})
export class TasksModule { }
