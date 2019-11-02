import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RolesService } from '../../../services/roles.service';
import { Router } from '@angular/router';
import { DataTableHelper } from '../../../classes/DataTableHelper';
import { ServerInfo } from '../../../classes/ServerInfo';
import { CommonList } from '../../../classes/CommonList';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent extends CommonList {

  constructor(public http: HttpClient,
    public router: Router) { 
      super(
        http, 
        router, 
        'roles', 
        [
          { title: 'Role Name', data: 'name', name: 'name' },
          { title: 'Role Level', data: 'level', name: 'level' },
        ]);
    }
}
