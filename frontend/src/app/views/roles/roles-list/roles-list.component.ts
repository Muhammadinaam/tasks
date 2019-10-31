import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RolesService } from '../../../services/roles.service';
import { Router } from '@angular/router';
import { DataTableHelper } from '../../../classes/DataTableHelper';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  data;
  url = 'roles';
  dataTableUrl = "/api/"+this.url+"-datatable";
  tableColumns = [
    { title: 'Role Name', data: 'name', name: 'name' },
    { title: 'Role Level', data: 'level', name: 'level' },
  ];

  constructor(private http: HttpClient, 
    private rolesService: RolesService,
    private router: Router) { }

  ngOnInit() {
    this.dtOptions = DataTableHelper.generateDataTableOptions(this, this.dataTableUrl, this.tableColumns);
  }

  edit(id) {
    this.router.navigate([this.url+ '/' + id]);
  }

  delete(id) {

  }

  addNew() {
    this.router.navigate([ this.url + '/create']);
  }

}
