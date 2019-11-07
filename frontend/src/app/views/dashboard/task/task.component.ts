import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { AuthService } from '../../../services/auth.service';
import { TaskService } from '../../tasks/services/task.service';
import * as moment from 'moment';

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

  constructor(public auth: AuthService, public taskService: TaskService) { }

  async ngOnInit() {
    this.currentUser = await this.auth.getCurrentUser();
    this.allTaskStatuses = await this.taskService.getAllTaskStatuses();

    this.setAllowedTaskStatuses();

    let currentTime = moment();
    this.dueIn = moment.duration( moment(this.task.due_date + ' UTC').diff(currentTime) );
  }

  setAllowedTaskStatuses(): void {
    let allowedTaskStatusesIdts = [];
    if(this.task.assigned_by.id == this.currentUser.id) {
      allowedTaskStatusesIdts = [
        'assigned',
        'review',
        'cancelled',
        'completed',
        'completed_and_approved'
      ];
    } else {
      allowedTaskStatusesIdts = [
        'assigned',
        'review',
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
  }

  changeStatus(taskId, statusIdt) {
    this.taskService.changeStatus(taskId, statusIdt)
      .subscribe(data => {
        alert(data['message']);
      })
  }

  postComment(taskId, taskComment) {
    this.taskService.postComment(taskId, taskComment)
    .subscribe(data => {
    })
  }
}
