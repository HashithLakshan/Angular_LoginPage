import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './Component/login-page/login-page.component';
import { LogOutComponent } from './Component/log-out/log-out.component';
import { RegistraionFormComponent } from './Component/registraion-form/registraion-form.component';

const routes: Routes = [
  
  { path: 'Login', component: LoginPageComponent },
  { path: 'Logout', component: LogOutComponent },  
  { path: 'Registration', component: RegistraionFormComponent },
  { path: '', redirectTo: '/Login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
