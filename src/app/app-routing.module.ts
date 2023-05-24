import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BlockedComponent } from './blocked/blocked.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditorComponent } from './editor/editor.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PreviewComponent } from './preview/preview.component';
import { AdminGuard } from './shared/admin.guard';
import { AuthGuard } from './shared/auth.guard';
import { LoginGuard } from './shared/login.guard';
import { SignComponent } from './sign/sign.component';
import { TemplateComponent } from './template/template.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'dashboard', component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'editor',component:EditorComponent,canActivate:[AuthGuard]},
  {path:'preview', component:PreviewComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent,canActivate:[LoginGuard]},
  {path:'sign-in',component:SignComponent,canActivate:[LoginGuard]},
  {path:'verify',component:VerifyComponent, canActivate:[LoginGuard]},
  {path:'forgot-password' , component:ForgotPasswordComponent, canActivate:[LoginGuard]},
  {path:'admin-dashboard',component:AdminDashboardComponent,canActivate:[AdminGuard]},
  {path:'template',component:TemplateComponent,canActivate:[AdminGuard]},
  {path:'block',component:BlockedComponent,canActivate:[LoginGuard]},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
