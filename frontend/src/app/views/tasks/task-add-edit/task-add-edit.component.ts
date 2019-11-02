import { Component, OnInit } from '@angular/core';
import { CommonAddEdit } from '../../../classes/CommonAddEdit';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerInfo } from '../../../classes/ServerInfo';
import * as moment from 'moment';

@Component({
  selector: 'app-task-add-edit',
  templateUrl: './task-add-edit.component.html',
  styleUrls: ['./task-add-edit.component.scss']
})
export class TaskAddEditComponent extends CommonAddEdit {

  allPermissions:any = [];
  activatedUsers: Object;

  constructor(
    public fb: FormBuilder, 
    public http: HttpClient, 
    public router: Router,
    public activatedRoute: ActivatedRoute) { 
      super(http, router, activatedRoute, 'tasks');
    }

  async initMainForm() {
    this.mainForm = this.fb.group({
      task_description: ['', Validators.compose( [Validators.required] )],
      due_date: ['', Validators.compose( [Validators.required] )],
      assigned_to: ['', Validators.compose( [Validators.required] )]
    });

    await this.http.get(ServerInfo.Url + "/api/get-activated-users").toPromise()
      .then(data => {
        this.activatedUsers = data;
      });
  }

  patchFormValues(data) {
    console.log(moment(data['due_date']));
    this.mainForm.patchValue({
      task_description: data['task_description'],
      due_date: moment(data['due_date']),
      assigned_to: [data['assigned_to']+""],
    });
  }

}
