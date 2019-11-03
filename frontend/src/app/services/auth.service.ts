import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerInfo } from '../classes/ServerInfo';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: Object;
  
  constructor(private http: HttpClient, private router: Router) { }

  public async login(username, password) {
    let data = {
      'grant_type': 'password',
      'client_id': ServerInfo.clientId,
      'client_secret': ServerInfo.secret,
      'username': username,
      'password': password,
      'scope': '',
    };

    await this.http.post(ServerInfo.Url + "/oauth/token", data).toPromise()
      .then(data => {
        localStorage.setItem("access_token", data['access_token']);
        localStorage.setItem("token_expiry", (moment.now() / 1000 + +data['expires_in']).toString() );
        
      }).catch(error => {
        alert(error.error.message);
      });

    await this.http.get( ServerInfo.Url + '/api/get-current-user').toPromise()
      .then(data => {
        this.currentUser = data;
      })

    this.router.navigate(['/dashboard']);
  }

  public async getCurrentUser() {
    await this.http.get( ServerInfo.Url + '/api/get-current-user').toPromise()
      .then(data => {
        this.currentUser = data;
      });

    return this.currentUser;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }
  
  public isAuthenticated() : boolean {
    const tokenExpiry = +localStorage.getItem('token_expiry');

    let currentSeconds = moment.now() / 1000;

    return currentSeconds < tokenExpiry;
  }

}
