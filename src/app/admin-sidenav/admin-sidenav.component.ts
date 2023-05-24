import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import  {AuthService} from "../services/auth.service";

import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
interface SideNavToggle{
  screenwidth:number;
  collapsed:boolean;
}

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.css']
})
export class AdminSidenavComponent implements OnInit {

  collapsed=true;
  modalRef?: BsModalRef;
  constructor(
    private auth:AuthService,
    private modalService: BsModalService,
    private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.screenWidth=window.innerWidth;
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
 }
  @Output() onToggleSideNav:EventEmitter<any>=new EventEmitter();
   
  screenWidth=0;

  toggleCollapse():void{
    this.collapsed=!this.collapsed;
    this.onToggleSideNav.emit({collapsed:this.collapsed,screenwidth:this.screenWidth})
  }
  closeSideNav():void{
    this.collapsed=false;
    this.onToggleSideNav.emit({collapsed:this.collapsed,screenwidth:this.screenWidth})
  }
  logout(){
    this.auth.logout();
    this.modalRef?.hide();
  }
  confirm2() {
    this.confirmationService.confirm({
        message: 'Do you want to logout?',
        header: 'Logout Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.messageService.add({severity:'success', summary:'Logout', detail:'You logged out successfully!!'});
            this.logout();
          },
        reject: (type:any) => {
            return;
        }
    });
}

}
