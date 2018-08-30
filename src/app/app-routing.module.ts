import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/item/list', pathMatch: 'full' },
  { path: 'item', children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ItemListComponent },
    { path: ':id', component: ItemDetailComponent }
  ]},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
