import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { UsersService } from '../../../services/users.service';
import { ServerInfo } from '../../../classes/ServerInfo';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading: boolean;
  currentUser: any;
  mainForm: any;

  constructor(
    public fb: FormBuilder, 
    public http: HttpClient,
    public auth: AuthService
  ) { }

  async ngOnInit() {
    this.loading = true;

    this.currentUser = this.auth.currentUser;
    if(this.currentUser == null) {
        this.currentUser = await this.auth.getCurrentUser();
    }

    this.mainForm = this.fb.group({
      name: ['', Validators.compose( [Validators.required] )],
      email: ['', Validators.compose( [Validators.email, Validators.required] )],
      password: [''],
      password_confirmation: ['']
    });

    await this.http.get(ServerInfo.Url + "/api/users/" + this.currentUser.id + "/edit").toPromise()
      .then(data => {
        this.mainForm.patchValue({
          name: data['name'],
          email: data['email'],
        });
      })

    this.loading = false;
  }

  onSubmit() {
    this.http.post(ServerInfo.Url + "/api/update-profile", this.mainForm.value)
      .subscribe(data => {
        alert(data['message']);
      })
  }

}
