import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  constructor() { }

  html:any;
  preview:any;
  isHeader?:boolean;
  name?:string;
  logo:any;
}
