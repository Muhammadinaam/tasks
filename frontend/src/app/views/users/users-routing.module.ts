import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';


const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    data: {
      title: 'Users'
    }
  },
  {
    path: 'create',
    component: UserAddEditComponent,
    data: {
      title: 'Create User'
    }
  },
  {
    path: ':id',
    component: UserAddEditComponent,
    data: {
      title: 'User'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
