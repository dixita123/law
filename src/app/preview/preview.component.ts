import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PreviewService } from '../preview.service';
import {jsPDF} from "jspdf";
import {  Router } from '@angular/router';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
   
  @ViewChild('content',{static:false}) el!:ElementRef;
  @ViewChild('headerContent',{static:false}) head!:ElementRef;
  @ViewChild('footerContent',{static:false}) foot!:ElementRef;
  phone!:number;
  email!:string;
  text=this.p.preview;
  header?:boolean;
  logo:any;
  constructor(
    private p:PreviewService,private router:Router
  ) { }

  ngOnInit(): void {
    this.text=this.p.preview;
    this.logo=this.p.logo;
    console.log(this.logo);
    
    this.header=this.p.isHeader;
  }

 
  back(){
    this.router.navigate(['/editor']);
  
  }
  makePDF(){
    let name=this.p.name;
    
    let pdf=new jsPDF('p','pt','a3');
    let pageHeight= pdf.internal.pageSize.height;
  
    let res:any[]=[];
    
    
    pdf.html(
    
      this.head.nativeElement,{
      callback:(pdf)=>{
         console.log(pdf);
         
        pdf.cellAddPage();
        
        
          
        pdf.save(name!+".pdf");
      
      }
    })
    
  }




}
