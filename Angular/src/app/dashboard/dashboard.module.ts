import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardRoutes } from './dashboard-routing.module';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { ProductsListComponent } from './products-list/products-list.component';
import {ProductAddComponent} from './product-add/product-add.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { CategoryDeleteComponent } from './category-delete/category-delete.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DistributorListComponent } from './distributor-list/distributor-list.component';
import { DistributorAddComponent } from './distributor-add/distributor-add.component';
import { DistributorEditComponent } from './distributor-edit/distributor-edit.component';
import { DistributorDeleteComponent } from './distributor-delete/distributor-delete.component';





@NgModule({
  declarations: [
    CategoriesListComponent,
    CategoryAddComponent,
    ProductsListComponent,
    ProductAddComponent,
    CategoryEditComponent,
    ProductEditComponent,
    ProductDeleteComponent,
    CategoryDeleteComponent,
    DistributorListComponent,
    DistributorAddComponent,
    DistributorEditComponent,
    DistributorDeleteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  entryComponents: [
    ProductAddComponent,
    ProductEditComponent,
    ProductDeleteComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    CategoryDeleteComponent,
    DistributorAddComponent,
    DistributorEditComponent,
    DistributorDeleteComponent
  ]
})
export class DashboardModule { }
