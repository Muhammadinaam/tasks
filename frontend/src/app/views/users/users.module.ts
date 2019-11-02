import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { CommonComponentsModule } from '../../common-components/common-components.module';


@NgModule({
  declarations: [UsersListComponent, UserAddEditComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    CommonComponentsModule
  ]
})
export class UsersModule { }
