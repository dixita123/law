import { Component, OnInit, TemplateRef } from '@angular/core';
import { TemplateService } from '../services/template.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  rows:any;
  r:any;
  limit=10;
  searchText='';

  constructor(private template:TemplateService, private modalService:BsModalService) { }

  ngOnInit(): void {
    this.template.getItems().subscribe(row=>{
      this.rows=row;
      this.r=this.rows;
      console.log(this.rows);
      
    })
  }
  modalRef?: BsModalRef;

  edit(row:any){

  }
  del(row:any){

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
 }

}

