import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef ,BsModalService} from 'ngx-bootstrap/modal';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  modalRef?: BsModalRef;
  collapsed!:boolean;
  constructor(private auth:AuthService,private modalService: BsModalService) { }

  ngOnInit(): void {
  }
  logout(){
    this.auth.logout();
    this.modalRef?.hide();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
 }

}
