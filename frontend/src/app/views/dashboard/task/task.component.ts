import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { AuthService } from '../../../services/auth.service';
import { TaskService } from '../../tasks/services/task.service';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { ServerInfo } from '../../../classes/ServerInfo';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task;
  @Output() taskModalOpenedClosed: EventEmitter<any> = new EventEmitter();
  @ViewChild('taskModal', {static: false}) public taskModal: ModalDirective;
  currentUser;
  allTaskStatuses;
  allowedTaskStatuses:Array<any>;
  dueIn;
  new_comment="";
  unreadComments = 0;

  constructor(public auth: AuthService, public taskService: TaskService, public http: HttpClient) { }

  async ngOnInit() {
    this.currentUser = await this.auth.getCurrentUser();
    this.allTaskStatuses = await this.taskService.getAllTaskStatuses();

    this.setAllowedTaskStatuses();

    let currentTime = moment();
    this.dueIn = moment.duration( moment(this.task.due_date + ' UTC').diff(currentTime) );

    this.unreadComments = this.task.task_comments.length;
    this.task.task_comments.forEach(comment => {
      comment.task_comment_reads.forEach(comment_reads => {
        if(comment_reads.read_by == this.currentUser.id) {
          this.unreadComments--;
        }
      });
    });
  }

  setAllowedTaskStatuses(): void {
    let allowedTaskStatusesIdts = [];
    if(this.task.assigned_by.id == this.currentUser.id) {
      allowedTaskStatusesIdts = [
        'assigned',
        'cancelled',
        'completed',
        'completed_and_approved'
      ];
    } else {
      allowedTaskStatusesIdts = [
        'assigned',
        'completed'
      ];
    }

    this.allowedTaskStatuses = [];
    this.allTaskStatuses.forEach(taskStatus => {
      allowedTaskStatusesIdts.forEach(allowedTaskStatuseIdt => {
        if(allowedTaskStatuseIdt == taskStatus.idt) {
          this.allowedTaskStatuses.push(taskStatus);
        }
      });
    });
  }

  showTaskModal() {
    this.taskModalOpenedClosed.emit('opened');
    this.taskModal.show();
  }

  closeTaskModal() {
    this.taskModalOpenedClosed.emit('closed');
    this.taskModal.hide();
    this.updateCommentsReads();
  }

  updateCommentsReads() {
    let data = {
      task_id: this.task.id,
      comments: this.task.task_comments
    };
    this.http.post(ServerInfo.Url + '/api/update-comments-reads', data)
      .subscribe(data => {

      });
  }

  changeStatus(taskId, statusIdt) {
    this.taskService.changeStatus(taskId, statusIdt)
      .subscribe(data => {
        alert(data['message']);
      })
  }

  postComment(taskId) {

    if(this.new_comment == '') {
      alert('Please enter comment');
    }

    this.taskService.postComment(taskId, this.new_comment)
    .subscribe(data => {
      this.task['task_comments'].push({
        id: data['id'],
        task_id: this.task.id,
        comment: this.new_comment,
        created_by: {
          id: this.currentUser.id,
          name: this.currentUser.name
        }
      });
      this.new_comment = '';
    })
  }
}
