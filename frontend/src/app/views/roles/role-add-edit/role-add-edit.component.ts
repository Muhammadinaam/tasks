import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ServerInfo } from '../../../classes/ServerInfo';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonAddEdit } from '../../../classes/CommonAddEdit';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-role-add-edit',
  templateUrl: './role-add-edit.component.html',
  styleUrls: ['./role-add-edit.component.scss']
})
export class RoleAddEditComponent extends CommonAddEdit {

  allPermissions:any = [];

  constructor(
    public fb: FormBuilder, 
    public http: HttpClient, 
    public router: Router,
    public activatedRoute: ActivatedRoute, 
    public auth: AuthService) { 
      super(http, router, activatedRoute, 'roles', auth);
    }

  async initMainForm() {
    this.mainForm = this.fb.group({
      name: ['', Validators.compose( [Validators.required] )],
      level: ['', Validators.compose( [ Validators.required, Validators.min(0) ] )],
      permissions: this.fb.group({})
    });

    await this.http.get(ServerInfo.Url + "/api/get-all-permissions").toPromise()
      .then(data => {
        this.allPermissions = data;

        Object.keys(this.allPermissions).forEach(permissionGroup => {
          this.allPermissions[permissionGroup].forEach(permission => {
            (<FormGroup>this.mainForm.get('permissions')).addControl( permission['idt'], this.fb.control('') );
          });
        });
      });
  }

  patchFormValues(data) {
    let permissions = [];
    data['permissions'].forEach(permission => {
        permissions[permission['idt']] = true;
    });

    this.mainForm.patchValue({
        name: data['name'],
        level: data['level'],
        'permissions': permissions
    });
  }

}
