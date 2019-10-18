import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerInfo } from '../classes/ServerInfo';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  
  constructor(private http: HttpClient) { }
  
  getData() {
    this.http.get(ServerInfo.Url + '/api/tasks').subscribe(data => {})
  }
}
