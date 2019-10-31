import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RoleAddEditComponent } from './role-add-edit/role-add-edit.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [RolesListComponent, RoleAddEditComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    DataTablesModule
  ]
})
export class RolesModule { }
