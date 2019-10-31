import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RoleAddEditComponent } from './role-add-edit/role-add-edit.component';


const routes: Routes = [
  {
    path: '',
    component: RolesListComponent,
    data: {
      title: 'Roles'
    }
  },
  {
    path: 'create',
    component: RoleAddEditComponent,
    data: {
      title: 'Create Role'
    }
  },
  {
    path: ':id',
    component: RoleAddEditComponent,
    data: {
      title: 'Role'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
