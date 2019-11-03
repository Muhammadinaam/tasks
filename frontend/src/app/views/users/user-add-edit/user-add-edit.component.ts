import { Component, OnInit } from '@angular/core';
import { CommonAddEdit } from '../../../classes/CommonAddEdit';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerInfo } from '../../../classes/ServerInfo';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent extends CommonAddEdit {

  allPermissions:any = [];
  allowedRoles:Array<any> = [];

  constructor(
    public fb: FormBuilder, 
    public http: HttpClient, 
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public auth: AuthService) { 
      super(http, router, activatedRoute, 'users', auth);
    }

  async initMainForm() {
    this.mainForm = this.fb.group({
      name: ['', Validators.compose( [Validators.required] )],
      email: ['', Validators.compose( [Validators.email, Validators.required] )],
      password: [''],
      password_confirmation: [''],
      is_super_admin: [''],
      is_activated: [''],
      role_id: ['']
    });

    await this.http.get(ServerInfo.Url + "/api/allowed-roles").toPromise()
      .then(data => {
        this.allowedRoles = <Array<any>>data;
      });
  }

  patchFormValues(data) {
    this.mainForm.patchValue({
        name: data['name'],
        email: data['email'],
        password: data['password'],
        is_super_admin: data['is_super_admin'],
        is_activated: data['is_activated'],
        role_id: data['role_id'],
    });
  }

  onSubmit() {
    if(this.isFormValid()) {
      super.onSubmit();
    }
  }

  isFormValid() {

    if(!this.mainForm.get('is_super_admin').value && this.mainForm.get('role_id').value == null) {
      alert('Please select Role');
      return false;
    }

    return true;
  }

}
