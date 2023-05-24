import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor() { }
  isUpdate=false;
  newData:any;
  passData(data:any){
    this.isUpdate=true;
    this.newData=data;
    return data;
  }
}
