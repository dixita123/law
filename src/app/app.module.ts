import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { NavbarComponent } from './navbar/navbar.component';
import { EditorComponent } from './editor/editor.component';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';
import { DefaultComponent } from './default/default.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { PreviewComponent } from './preview/preview.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignComponent } from './sign/sign.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { VerifyComponent } from './verify/verify.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SearchfilterPipe } from './searchfilter.pipe';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TemplateComponent } from './template/template.component';
import {ToastModule} from 'primeng/toast';
import {ConfirmPopup, ConfirmPopupModule} from 'primeng/confirmpopup';
import { MessageService } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { NotFoundComponent } from './not-found/not-found.component';
import { BlockedComponent } from './blocked/blocked.component';
import { AdminSidenavComponent } from './admin-sidenav/admin-sidenav.component';
import { ProfileComponent } from './profile/profile.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidenavComponent,
    NavbarComponent,
    EditorComponent,
    DefaultComponent,
    PreviewComponent,
    LoginComponent,
    SignComponent,
    VerifyComponent,
    ForgotPasswordComponent,
    SearchfilterPipe,
    AdminDashboardComponent,
    TemplateComponent,
    NotFoundComponent,
    BlockedComponent,
    AdminSidenavComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TableModule,
    QuillModule,
    ReactiveFormsModule,
    ModalModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ToastModule,
    ConfirmPopupModule,
    ReactiveFormsModule,
    ConfirmDialogModule
  ],
  providers: [BsModalService,ConfirmationService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
