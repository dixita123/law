import { Component,Input,OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../services/letter.service';
import { UpdateService } from '../services/update.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  modalRef?: BsModalRef;

  @Input() collapsed=false;
  @Input() screenWidth=0;
  loadingIndicator: boolean=true;
  limit=10;
  searchText='';

  constructor(private router:Router,private letter:ItemService,
    private update:UpdateService,private modalService: BsModalService, private confirmationService:ConfirmationService,
    private messageService:MessageService) {


    
  }

  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
 }

 rows:any;
 r:any;
  ngOnInit(): void {
    this.letter.getItems().subscribe(row=>{
      this.rows=row;
      this.r=this.rows;

      
    })
  }

  getBodyClass():string{
    let styleClass = '';
    if(this.collapsed && this.screenWidth>700){
      styleClass='body-trimmed';

    }
    else if(this.collapsed && this.screenWidth <=768 && this.screenWidth>0){
      styleClass='bos'
    }
    return '';
  }
  edit(row:any){
    this.update.isUpdate=true;
    this.update.passData(row);
    this.router.navigate(['/editor']);
  }

  v(){
    this.router.navigate(['/editor'])
  }
  del(row:any){
    this.confirmationService.confirm({
      message: 'Do you want to delete this template?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-circle',
      accept: () => {
        this.letter.deleteItem(row);
        this.messageService.add({severity:'success', summary:'Deleted', detail:'Template deleted successfully!!'});
        },
      reject: (type:any) => {
         
      }
  });
   

  }
  search(value: string): void {
    this.r = this.rows.filter((val: { name: string; }) =>
      val.name.toLowerCase().includes(value));
  } 
}
