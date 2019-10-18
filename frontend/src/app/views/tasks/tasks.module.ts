import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { DataTablesModule } from 'angular-datatables';
import { TaskAddEditComponent } from './task-add-edit/task-add-edit.component';


@NgModule({
  declarations: [TasksListComponent, TaskAddEditComponent],
  imports: [
    TasksRoutingModule,
    DataTablesModule,
    CommonModule
  ]
})
export class TasksModule { }
