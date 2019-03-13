import { Routes } from '@angular/router';
// import { CategoriesAddComponent } from './categories-add/categories-add.component';
import { CategoriesListComponent} from './categories-list/categories-list.component';
import { ProductsListComponent } from './products-list/products-list.component';


export const DashboardRoutes: Routes = [
    { path: 'categories-list', component: CategoriesListComponent},
    { path: 'product-list', component: ProductsListComponent}
   // { path: 'categories-add', component: CategoriesAddComponent},

];

