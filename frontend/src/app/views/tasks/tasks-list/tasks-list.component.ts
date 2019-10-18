import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../services/tasks.service';
import { DataTablesResponse } from '../../../classes/DataTablesResponse';
import { HttpClient } from '@angular/common/http';
import { ServerInfo } from '../../../classes/ServerInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  data;

  constructor(private http: HttpClient, 
    private tasksService: TasksService,
    private router: Router) { }

  ngOnInit() {
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            ServerInfo.Url + "/api/tasks-datatable",
            dataTablesParameters, {}
          ).subscribe(resp => {
            that.data = resp.data;

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [
        { data: 'project', name: 'project' }, 
        { data: 'task_description', name: 'task_description' },
        { data: 'assigned_to.name', name: 'assignedTo.name' },
        { data: 'assigned_by.name', name: 'assignedBy.name' },
        { data: 'task_status.name', name: 'taskStatus.name' },
        { data: 'due_date', name: 'due_date' }, 
      ]
    };
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
