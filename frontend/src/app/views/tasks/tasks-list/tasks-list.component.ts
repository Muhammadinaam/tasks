import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../services/tasks.service';
import { DataTablesResponse } from '../../../classes/DataTablesResponse';
import { HttpClient } from '@angular/common/http';
import { ServerInfo } from '../../../classes/ServerInfo';
import { Router } from '@angular/router';
import { DataTableHelper } from '../../../classes/DataTableHelper';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  data;
  dataTableUrl = "/api/tasks-datatable";
  tableColumns = [
    { title: 'Task Description', data: 'task_description', name: 'task_description' },
    { title: 'Assigned To', data: 'assigned_to.name', name: 'assignedTo.name' },
    { title: 'Assigned By', data: 'assigned_by.name', name: 'assignedBy.name' },
    { title: 'Status', data: 'task_status.name', name: 'taskStatus.name' },
    { title: 'Due Date <br> (YYYY-MM-DD - Time)', data: 'due_date', name: 'due_date' },
  ];

  constructor(private http: HttpClient, 
    private tasksService: TasksService,
    private router: Router) { }

  ngOnInit() {
    this.dtOptions = DataTableHelper.generateDataTableOptions(this, this.dataTableUrl, this.tableColumns);
  }

  viewTask(taskId) {
    this.router.navigate(['tasks/' + taskId]);
  }

  deleteTask(taskId) {

  }

  addNewTask() {
    this.router.navigate(['tasks/create']);
  }

}
