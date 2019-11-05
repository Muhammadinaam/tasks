import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { AuthService } from '../../../services/auth.service';

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

  constructor(public auth: AuthService) { }

  async ngOnInit() {
    this.currentUser = await this.auth.getCurrentUser();
  }

  showTaskModal() {
    this.taskModalOpenedClosed.emit('opened');
    this.taskModal.show();
  }

  closeTaskModal() {
    this.taskModalOpenedClosed.emit('closed');
    this.taskModal.hide();
  }

}
