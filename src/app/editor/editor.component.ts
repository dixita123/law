import { Component, destroyPlatform, Input, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Quill} from 'quill';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PreviewService } from '../preview.service';
import { Router } from '@angular/router';
import { ItemService } from '../services/letter.service';
import { UpdateService } from '../services/update.service';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  modalRef?: BsModalRef;
 
  form!: FormGroup;
  html?: string;
  isSaved=false;
 
 

  quillConfig={
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike','image','video'],
        [{ 'size': ['xsmall', 'small', 'medium', 'large', 'xlarge']}],
        [{ 'align': [] }],
        ['clean'],                    
        ['link'],
      ],
    },
 }


 object?:any;
 constructor(private modalService: BsModalService, private p:PreviewService
  ,private router:Router,private letter:ItemService,private update:UpdateService,
  private confirmationService:ConfirmationService,
    private messageService:MessageService,private storage:StorageService) {}

 openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
 }

  ngOnInit(): void {
     

    this.form = new FormGroup({
      'name': new FormControl('',Validators.required),
      'type':new FormControl('Support Letter',Validators.required),
      'address':new FormControl('Address Header',Validators.required),
      'logo':new FormControl('',Validators.required),
      'letter':new FormControl('',Validators.required)
    
    });
    if(this.update.isUpdate==true){
    
      this.form.patchValue(this.update.newData);
    } 
 
  }
  
use(){
  this.modalRef?.hide();
  this.html=this.p.html

}

save(){
  if(!this.isSaved){
   
  this.confirmationService.confirm({
      message: 'Do you want to save?',
      header: 'Save Confirmation',
      icon: 'pi pi-info-circle',
      accept: async () => {
          this.messageService.add({severity:'success', summary:'Saved', detail:'Template saved successfully!!'});
          this.isSaved=true;
          const url= await this.storage.upload(this.object.path,this.object.file);
          this.object.url=url;
          delete this.object.file;
          this.form.value.logo=url;
          
          console.log(url);
          const letter=this.form.value;
          this.letter.addItem(letter);
          this.update.isUpdate=true;
        },
      reject: (type:any) => {
         
      }
  });

   
  }
  else{
    this.confirmationService.confirm({
      message: 'Do you want to update?',
      header: 'Update Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.messageService.add({severity:'success', summary:'Updated', detail:'Template updated successfully!!'});
  
          this.letter.updateItem(this.form.value);

        },
      reject: (type:any) => {
         
      }
  });

    
  }
  
}

back(){
  
  this.router.navigate(['/dashboard']);
  this.update.isUpdate=false;

}

  pre(){

    if(!this.isSaved){
      this.messageService.add({severity:'info', summary:'Warning', detail:'Please Save the document!!'});
     
    }
    else{
    
      
      this.p.preview=this.form.value.letter;
      this.p.logo=this.form.value.logo;
    
      this.router.navigate(['/preview']);
      if(this.form.value.address=='Address Header'){
        this.p.isHeader=true;
      }
      else if(this.form.value.address=='Address Footer'){
        console.log("lower");
        this.p.isHeader=false;
      }
    }

  }

  path=localStorage.getItem('id');
  async singleDocumentProcessing(event:any) {
  
      if (event?.target?.files[0].size) {
         this.object = {
          file: event.target.files[0],
          name: event.target.files[0].name,
          path: `${this.path}/${event.target.files[0].name}${new Date()}`,
          type: event.target.files[0].type,
          size: event.target.files[0].size,
        }
      
      }
     
    
  }
}

