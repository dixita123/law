import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../services/template.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  limit=10;
  searchText='';
  rows:any;
  r:any
  class!:string;

  constructor(private data:DataService,
    private template:TemplateService ,private router:Router, private confirmationService:ConfirmationService,
    private messageService:MessageService) { }

  ngOnInit(): void {
    this.data.getItems().subscribe(row=>{
      this.rows=row;
      this.r=this.rows;
      this.rows.createdAt=this.rows.createdAt.t;
      
      console.log(this.rows);
      
    })
  }
  block(row:any){
    this.data.blockItem(row);
  }
  unblock(row:any){
    this.data.unblockItem(row);
  }
  del(row:any){

  }
  confirmBlock(event:any, row:any) {
    
    this.confirmationService.confirm({
      
         
        message: 'Do you want to block?',
        header: 'Block Confirmation',
        icon: 'pi pi-info-circle',
         accept:  () =>{
            
             this.block(row);
            this.messageService.add({severity:'info', summary:'Blocked', detail:'user blocked successfully'});
            
          },
        reject: (type:any) => {
           
            
        }
    });
}
 confirmUnblock(event:any,row:any){
  this.confirmationService.confirm({
    message: 'Do you want to unblock?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
        this.messageService.add({severity:'info', summary:'Unblocked', detail:'user unblocked successfully'});
        this.unblock(row);
      },
    reject: (type:any) => {
       
    }
});

 }
  view(row:any){
     this.template.id=row.uid;
     this.router.navigate(['/template']);
  }

  
  

}
