import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';

const modules = [
  CommonModule,
  CategoryRoutingModule,
  MaterialModule,
  SharedModule,
];

@NgModule({
  declarations: [CategoryListComponent],
  imports: [...modules],
})
export class CategoryModule {}
