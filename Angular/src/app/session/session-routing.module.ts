import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const SessionRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: LoginComponent}
];

