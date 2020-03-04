import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import {CarOwnersComponent} from './components/car-owners/car-owners.component';
import {OwnerEditComponent} from './components/owner-edit/owner-edit.component';
const routes: Routes = [
  { path: '', redirectTo: 'car-list', pathMatch: 'full' },
  {
    path: 'car-list',
    component: CarListComponent
  },
  {
    path: 'car-owners',
    component: CarOwnersComponent
  },
  {
    path: 'car-add',
    component: CarEditComponent
  },
  {
    path: 'owner-add',
    component: OwnerEditComponent
  },
  {
    path: 'owner-edit/:id',
    component: OwnerEditComponent
  },
  {
    path: 'car-edit/:id',
    component: CarEditComponent
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
