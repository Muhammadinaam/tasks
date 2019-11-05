import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerInfo } from '../../../classes/ServerInfo';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  allTaskStatuses: Array<any> = [];

  constructor(private http: HttpClient) { }
    
  async getAllTaskStatuses() {
    if(this.allTaskStatuses != null && this.allTaskStatuses.length != 0) {
      return this.allTaskStatuses;
    }

    await this.http.get(ServerInfo.Url + "/api/get-all-task-statuses").toPromise()
      .then(data => {
        this.allTaskStatuses = <Array<any>>data;
      })

    return this.allTaskStatuses;

  }

  changeStatus(taskId: any, statusIdt: any) {
    let data = {
      task_id: taskId,
      status_idt: statusIdt
    };
    return this.http.post(ServerInfo.Url + "/api/change-task-status", data);
  }

  postComment(taskId: any, taskComment: any) {
    let data = {
      task_id: taskId,
      task_comment: taskComment
    };
    return this.http.post(ServerInfo.Url + "/api/task-comments", data);
  }

}
