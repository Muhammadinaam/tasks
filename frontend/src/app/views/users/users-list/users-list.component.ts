import { Component, OnInit } from '@angular/core';
import { CommonList } from '../../../classes/CommonList';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent extends CommonList {

  constructor(public http: HttpClient,
    public router: Router,
    public auth: AuthService) { 
      super(
        http, 
        router, 
        'users', 
        [
          { title: 'Name', data: 'name', name: 'name' },
          { title: 'Email', data: 'email', name: 'email' },
          { title: 'Is Super Admin', data: 'is_super_admin', name: 'is_super_admin' },
          { title: 'Role', data: 'role.name', name: 'role.name' },
          { title: 'Is Activated', data: 'is_activated', name: 'is_activated' },
        ],
        auth);
    }
}
