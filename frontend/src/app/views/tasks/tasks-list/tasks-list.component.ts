import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../services/tasks.service';
import { DataTablesResponse } from '../../../classes/DataTablesResponse';
import { HttpClient } from '@angular/common/http';
import { ServerInfo } from '../../../classes/ServerInfo';
import { Router } from '@angular/router';
import { DataTableHelper } from '../../../classes/DataTableHelper';
import { CommonList } from '../../../classes/CommonList';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent extends CommonList {

  constructor(public http: HttpClient,
    public router: Router) { 
      super(
        http, 
        router, 
        'tasks', 
        [
          { title: 'Task Description', data: 'task_description', name: 'task_description' },
          { title: 'Due Date', data: 'due_date', name: 'due_date' },
          { title: 'Assigned To', data: 'assigned_to.name', name: 'assignedTo.name' },
          { title: 'Assigned By', data: 'assigned_by.name', name: 'assignedBy.name' },
          { title: 'Task Status', data: 'task_status.name', name: 'taskStatus.name' },
        ]);
    }
}
