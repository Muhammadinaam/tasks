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
    { title: 'Role Name', data: 'task_description', name: 'task_description' },
    { title: 'Role Level', data: 'assigned_to.name', name: 'assignedTo.name' },
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
